<template>
    <div>
        <div class="drpdwn" style="text-align:center;margin-bottom: 10px;">
            <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
            </Select>
       
        </div>
        <div v-if="spinShow" class="demo-spin-container">
            <Spin fix></Spin>
        </div>
        <div v-else>
            <div class="panel-heading generate-po-button" style="display:none;">
                <h4 class="panel-title" style="text-align:-webkit-right;">
                    <button class="btn btn-default btn-sm" type="button" style="background-color: red;color: white; font-weight: bold;" @click="generatePO">
                        <span class="glyphicon glyphicon-file"></span> Generate Purchase Order 
                    </button>
                </h4>
            </div>

            <Table stripe :columns="columns1" :data="data1"></Table>
        </div>
    </div>
</template>


<script>
    import config from '../../config/customConfig.js'
    import moment from 'moment'
    const accounting = require('accounting-js');
    let axios = require('axios'); 
    import Cookies from 'js-cookie';
    import _ from 'lodash'
    import expandRow from './view-purchaseOrder-list.vue';
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                spinShow : false,
                data1: [],
                websiteList: {},
                website: '',
                columns1 : [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            console.log('rowwwwwwwwwwwwww-------Expand', params)
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'P.O. Number',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.PO_id)
                            ]);
                        }
                    },
                    {
                        title: 'P.O Generate Date',
                        align:  'center',
                        render : (h , {row}) => {
                            var date1 = moment(row.PO_generate_date).format('DD-MMM-YYYY')
                            return h('div', [
                                h('span', date1)
                            ]);
                        }
                    },
                    {
                        title: 'Order Id',
                        align:  'left',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.order_id)
                            ]);
                        }
                    },
                    {
                        title: 'Total Quantity',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.quantity)
                            ]);
                        }
                    },
                    {
                        title: 'Total Amount',
                        align:  'right',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', accounting.formatMoney(row.total))
                            ]);
                        }
                    },
                    {
                        title: 'Mode',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.PO_generate_mode)
                            ]);
                        }
                    },
                    {
                        title: 'Email Sent',
                        align:  'center',
                        render : (h , {row}) => {
                            if(row.EmailStatus == 'Sent'){
                                return h('div', [
                                        h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'large',
                                            icon: 'checkmark'
                                        },
                                        style: {
                                            marginRight: '3px',
                                            padding: '0px',
                                            fontSize: '20px',
                                            color: 'green'
                                        }
                                    }, '')
                                ]);
                            }else{
                               return h('div', [
                                        h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'large',
                                            icon: 'close'
                                        },
                                        style: {
                                            marginRight: '3px',
                                            padding: '0px',
                                            fontSize: '20px',
                                            color: 'red'
                                        }
                                    }, '')
                                ]);
                            }
                        }
                    }
                ]
            }
        },
        methods: {
            generatePO() {
                this.$router.push({
                    name: 'Generate PurchaseOrder',
                    params: this.row
                });
            },
            init () {
                var self = this
                console.log("config.default.orderapi", config.default.orderapi)
                axios({
                    method: 'get',
                    url: config.default.subscriptionWebsitesapi,
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
                    console.log("-------",error);
                    if(error.message == 'Network Error'){
                        self.$Notice.error({
                            title: 'Error',
                            desc: 'API Service unavailable',
                            duration: 10
                        })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
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
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",val)
                var self = this
                if(this.row != undefined){
                    let params1 = {
                        website_id :val,
                        order_id : this.row.id 
                    }
                }else{
                    let params1 = {
                        website_id :val
                    }
                }
                axios({
                    method: 'get',
                    url: 'http://172.16.230.61:3037/purchase-order',
                    params: params1,
                    headers: {
                    'Authorization': Cookies.get('auth_token'),
                    'subscriptionId': Cookies.get('subscriptionId')
                    } 
                }).then(function (response){
                    console.log("------------------------response",response.data.data);
                    self.data1 = response.data.data
                }).catch(error => {
                    console.log("-------",error);
                    if(error.message == 'Network Error') {
                        self.$Notice.error({
                            title: "Error",
                            desc: 'API service unavailable',
                            duration: 10
                        })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
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
        },
        mounted() {
            console.log("********************generate po",this.row);
            var self = this
            if(this.row != undefined){
                $('.generate-po-button').css("display","block")
                $('.drpdwn').css("display","none")
                self.listData(this.row.website_id);
            }else{
                this.init();
            }
        }
    }    
</script>

<style>
    .demo-spin-container{
    	display: inline-block;
        width: 100%;
        height: 100px;
        position: relative;
    }
</style>