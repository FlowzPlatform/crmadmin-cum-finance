
<template>
<div>
    <div style="text-align: center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; ">
        <div class="drpdwn" style="text-align:center">
            <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: left;" @on-change="listData">
                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
            </Select>
        </div>     

    </div>
        <Table stripe @on-selection-change="Onselectdata" :columns="columns1" :data="list1"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="len" :current="1" @on-change="changePage"></Page>
            </div>
        </div>

</div>
</template>

<script>
    import moment from 'moment';
    import config from '../../config/customConfig.js'
    import psl from 'psl';
    import Cookies from 'js-cookie';
    let axios = require('axios'); 
    let _ = require('lodash');
    const accounting = require('accounting-js');
    var res;
    var pageSize = 10
    export default {
        name: 'newpo',
        data() {
            return { 
                modal1: false,
                orderid: '',
                len:1,
                email:'',
                websiteList: {},
                website: '',
                orderList: {},
                orderDate: '',
                userid: '',
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Order Id',
                        key: 'order_id',
                        align:  'center'
                    },
                    {
                        title: 'Name',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                
                                h('span', row.user_billing_info.name)
                            ]);
                        }
                    },
                    {
                        title: 'Email',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                
                                h('span', row.user_billing_info.email)
                            ]);
                        }
                    },
                    {
                        title: 'Order Date',
                        width: 110,
                        align:  'center',
                        render : (h , {row}) => {
                            var date = moment(row.products[0].createdAt).format('DD-MMM-YYYY')
                            return h('div', [
                                
                                h('span', date)
                            ]);
                        }
                    },
                    {
                        title: 'User Type',
                        width: 115,
                        align:  'center',
                        key: 'user_type'
                    },
                    {
                        title: 'Total Product',
                        width: 115,
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                
                                h('span', row.products.length)
                            ]);
                        }
                    },
                    {
                        title: 'Total Amount',
                        width: 115,
                        align:  'right',
                        render : (h , {row}) => { 
                            return h('div', [
                                
                                h('span', accounting.formatMoney(row.total))
                            ]);
                        }
                    },
                    {
                        title: 'po_Sent',
                        width: 125,
                        align:  'center',
                        render : (h , {row}) => { 
                            if(row.po_detail != undefined){
                                return h('div', [
                                    h('span','true')
                                ]);
                            }else{
                                return h('div', [
                                    h('span','false')
                                ]);
                            }
                        }
                    }
                ],
                data1: [],
                list1: [],
                finalresult: []
            }
        },
        methods: {
            async changePage (p) {
                var self = this
                self.list1 = await self.mockTableData1(p,pageSize);
            },
            async mockTableData1 (p,size) {
                console.log("mocktable call---------------")
                this.len = this.data1.length
                return this.data1.slice((p - 1) * size, p * size);
            },
            init () {
                var self = this
                console.log("config.default.orderapi", config.default.orderapi)
                axios({
                    method: 'get',
                    url: config.default.subscriptionWebsitesapi,
                    // params: {
                    //   owner_id: self.userid
                    // },
                    headers: {
                      'Authorization': Cookies.get('auth_token'),
                      'subscriptionId': Cookies.get('subscriptionId')
                    } 
                })
                .then(function (response){
                    console.log("------------------------response",response);
                    if(response.data.data.length == 0){
                      console.log("in if condition")
                      self.$Notice.error({
                        desc: 'Websites not available for this subscription',
                        title: 'Error',
                        duration: 4.5
                      })
                    }else{    
                      var result = _.uniqBy(response.data.data,'websiteId')
                      console.log("result", result)
                      self.websiteList = result
                      console.log("self.websiteList", self.websiteList[0].websiteId)                    
                      self.website = self.websiteList[0].websiteId
                    }                       

                }).catch(error => {
                    console.log("-------",error.response);
                    if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain
                        
                        Cookies.remove('auth_token' ,{domain: location}) 
                        Cookies.remove('subscriptionId' ,{domain: location}) 
                        self.$store.commit('logout', self);
                        
                        self.$router.push({
                            name: 'login'
                        });
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                        self.$Notice.error({
                            title: error.response.statusText,
                            desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                            duration: 0
                        })
                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                });

            },
            listData (val) {
                var self = this
                var len
                console.log("val", val)
                let Namearr = [];
                let Emailarr = [];
                axios.get( config.default.orderapi , {
                    params: {
                        website_id: val
                    }
                }).then(async function (response){
                    console.log("response val", response.data)
                    self.data1 = _.orderBy(response.data.data, ['created_at'], ['desc']);
                    self.list1 = await self.mockTableData1(1,pageSize)
                }).catch(function (error) {
                      console.log("-------",error);
                        if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain
                            
                            Cookies.remove('auth_token' ,{domain: location}) 
                            Cookies.remove('subscriptionId' ,{domain: location}) 
                            self.$store.commit('logout', self);
                            
                            self.$router.push({
                                name: 'login'
                            });
                            self.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                            self.$Notice.error({
                                title: error.response.statusText,
                                desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                                duration: 0
                            })
                        }else {
                            self.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }
                    });

            },
            accounting(item){
              return accounting.formatMoney(item)
            },
            Onselectdata(selection){
                console.log("selection-------->",selection)
                // console.log("row----------------->",row)
            }
        },
        async mounted() {
            var self = this
            this.init()
            // console.log("@@@@@@@@@@@@@@@@@@@@@22!!!!!!!!!!!!!!!!!!!!!!!!!!!1",this.$refs.selection)
        }
    }
</script>

<style scoped>
    .ivu-table-wrapper {
        margin-top: 20px;
    }
    .ivu-table-cell {
        word-break: break-word;
    }
</style>