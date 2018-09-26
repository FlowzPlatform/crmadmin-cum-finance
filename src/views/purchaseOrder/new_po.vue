
<template>
    <div>
        <div style="text-align:center; font-size:10px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;" >
            <div  class="drpdwn" style="text-align:center">
                <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: left;" @on-change="listData">
                    <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
                </Select>
                <h4 class="panel-title" style="text-align:right;display: inline-block;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion13" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
            </div>
            <div class="panel panel-default panel-group" id="accordion11" style="border: none;margin-top:1%;text-align: left;">
                <!-- <div class="panel-heading">
                </div> -->
                <div class="panel-collapse collapse" id="collapseTwo">
                    <div class="panel-body">
                        <form>
                            <div class="collapse-maindiv maindiv" >
                                <div class="panel panel-default">
                                    <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#order">
                                        <label style="padding-left:  7px;">Order Id</label>
                                        </span>
                                    </div>
                                    <div class="panel-collapse collapse" id="order">
                                        <AutoComplete v-model="filterorderid" :data="orderidFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                        </AutoComplete>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                        <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;"
                                                data-target="#date">
                                                <label style="padding-left:  7px;">Order Date</label>
                                                </span>
                                        </div>
                                        <div class="form-group row panel-collapse collapse" id="date">
                                                <div class="col-xs-3">
                                                    <label>From Date</label>
                                                    <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="dategt" style="width: 100%;"></DatePicker>
                                                </div>
                                                <div class="col-xs-3">
                                                    <label>To Date</label>
                                                    <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="datelt" style="width: 100%;"></DatePicker>
                                                </div>
                                        </div>
                                </div>
                                    <div class="panel panel-default">
                                    <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#Customer">
                                        <label style="padding-left:  7px;">Name</label>
                                        </span>
                                    </div>
                                    <div class="panel-collapse collapse" id="Customer">
                                        <select class="form-control"  v-model="cname" id="selectCustomer">
                                            <option value="">All</option>
                                        </select>
                                    </div>
                                </div>
                                    <div style="margin-top: 5px;">
                                        <Button type="warning" @click= "reset()" style= "float:right;margin-right: 5px;">Reset</Button>
                                        <Button type="primary" @click= "changeData()" style= "float:right;    margin-right: 5px;">Apply</Button>
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Table size="small" stripe @on-selection-change="Onselectdata" :columns="columns1" :data="list1"></Table>
        <div style="margin: 10px;overflow: hidden">
            <Button v-show="selectedRows.length > 0" type="primary" @click= "generatePO()" style="float:left;">Generate PO</Button>
            <div style="float: right;">
                <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
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
    export default {
        name: 'newpo',
        data() {
            return { 
                modal1: false,
                orderid: '',
                tableHeight: 450,
                len:1,
                email:'',
                dategt: '',
                datelt: '',
                websiteList: {},
                website: '',
                pageSize: 10,
                optionsPage:[10,20,30,50],
                orderList: {},
                cname: '',
                orderDate: '',
                orderidFilter: [],
                filterorderid:'',
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
                    // {
                    //     title: 'PO Sent',
                    //     width: 125,
                    //     align:  'center',
                    //     render : (h , {row}) => { 
                    //         if(row.po_detail != undefined){
                    //             return h('div', [
                    //                 h('span','true')
                    //             ]);
                    //         }else{
                    //             return h('div', [
                    //                 h('span','false')
                    //             ]);
                    //         }
                    //     }
                    // },
                    {
                        title: 'PO Sent',
                        width: 125,
                        align:  'center',
                        render : (h , {row}) => {
                            if(row.po_detail != undefined){
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
                    },
                ],
                data1: [],
                list1: [],
                finalresult: [],
                filterArray: [],
                selectedRows: []
            }
        },
        methods: {
            toggleIcon: function (e) {
            $(e.target)
                .prev('.panel-heading')
                .find(".more-less")
                .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
            },
            reset(){
                this.dategt = '';
                this.datelt = '';
                this.filterorderid = '';
                this.cname = '';
                this.listData(this.website);
            },
            filterMethod (value, option) {
              return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            changepagesize(pageSize){
                this.selectedRows.length=0
                // console.log("####################################",pageSize)
                this.pageSize = pageSize
                this.pageSize = pageSize
                if(this.pageSize > 10){
                    this.tableHeight = 530
                }else{
                    this.tableHeight = 450
                }
                this.changePage(1)
            },
            async changePage (p) {
                this.selectedRows.length=0
                // console.log("page------------------------->",p)
                var self = this
                if(self.filterArray.length == 0){
                    // console.log("inside",this.filterArray)
                    self.list1 = await self.mockTableData1(p,self.pageSize);
                    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",self.list1)
                }else{
                    self.list1 = await self.mockTableData2(p,self.pageSize);
                }
            },
            async mockTableData1 (p,size) {
                // console.log("mocktable call---------------",size)
                this.len = this.data1.length
                // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.data1)
                if(this.len == 0){
                    // console.log("data length 0--------------->",this.tableHeight)
                    this.tableHeight = 100
                }else if(this.len < 10){
                    // console.log("data length 10--------------->",this.tableHeight)
                     this.tableHeight = (this.len * 40) + 35
                }else{
                    this.tableHeight = 450
                }
                return this.data1.slice((p - 1) * size, p * size);
            },
            async mockTableData2 (p,size) {
                this.len = this.filterArray.length
                if(this.len == 0){
                    // console.log("data length 0--------------->",this.tableHeight)
                    this.tableHeight = 100
                }else if(this.len < 10){
                    // console.log("data length 10--------------->",this.tableHeight)
                     this.tableHeight = (this.len * 40) + 35
                }else{
                    this.tableHeight = 450
                }
                return this.filterArray.slice((p - 1) * size, p * size);
            },
            init () {
                var self = this
                // console.log("config.default.orderapi", config.default.orderapi)
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
                    // console.log("------------------------response",response);
                    if(response.data.data.length == 0){
                      // console.log("in if condition")
                      self.$Notice.error({
                        desc: 'Websites not available for this subscription',
                        title: 'Error',
                        duration: 4.5
                      })
                    }else{    
                      var result = _.uniqBy(response.data.data,'websiteId')
                      // console.log("result", result)
                      self.websiteList = result
                      // console.log("self.websiteList", self.websiteList[0].websiteId)                    
                      self.website = self.websiteList[0].websiteId
                      self.listData(self.website);
                    }                       

                }).catch(error => {
                    // console.log("-------",error.response);
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
                // console.log("val", val)
                let Namearr = [];
                $('#selectCustomer').children('option:not(:first)').remove();
                axios.get( config.default.orderapi , {
                    params: {
                        website_id: val
                    }
                }).then(async function (response){
                    // console.log("response val", response.data)
                    self.data1 = _.orderBy(response.data.data, ['created_at'], ['desc']);
                    self.data1 = _.filter(self.data1, function(o) { return !o.po_detail; });
                    self.data1.forEach(item => {
                      self.orderidFilter.push(item.order_id)
                      Namearr.push(item.user_billing_info.name)
                    })
                    Namearr = _.chain(Namearr).sort().uniq().value();
                    Namearr.forEach(item => {
                        var x = document.getElementById("selectCustomer");
                        var option = document.createElement("option");
                        option.text = item;
                        // console.log()
                        x.add(option);
                    })
                    // console.log("self.orderidFilter------->",self.orderidFilter)
                    self.list1 = await self.mockTableData1(1,self.pageSize)
                }).catch(function (error) {
                      // console.log("-------",error);
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
                this.selectedRows = selection
                // console.log("selection-------->",this.selectedRows)
            },
            async changeData() {
                // console.log("this.data1", this.data1)
                this.filterArray = this.data1
                var self = this

                if(this.dategt != ''){
                // console.log("this.dategt", this.dategt)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    var a = moment(item.products[0].createdAt).format('YYYY-MM-DD')
                    if(moment(a).diff(moment(self.dategt).format(), 'days') >= 0){
                        // console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                        return item;
                    }
                });
                // console.log("myarr",this.filterArray)
                // this.list1 = await this.mockTableData2(1,self.pageSize)
                }

                if(this.datelt != ''){
                // console.log("this.datelt", this.datelt)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    var a = moment(item.products[0].createdAt).format('YYYY-MM-DD')
                    if(moment(a).diff(moment(self.datelt).format(), 'days') <= 0){
                        return item;
                    }
                });
                // console.log("myarr",this.filterArray)
                // this.list1 = await this.mockTableData2(1,self.pageSize)
                }

                if(this.filterorderid != ''){
                    // console.log("this.filterorderid", this.filterorderid)
                    this.filterArray = _.filter(this.filterArray,  function(item){    
                        return item.order_id === self.filterorderid;
                    });
                    // console.log("myarr",this.filterArray)
                    // this.list1 = await this.mockTableData2(1,self.pageSize)
                }

                if(this.cname != ''){
                    // console.log("this.cname", this.cname)
                    this.filterArray = _.filter(this.filterArray,  function(item){    
                        return item.user_billing_info.name === self.cname;
                    });
                    // console.log("myarr",this.filterArray)
                    // this.list1 = await this.mockTableData2(1,self.pageSize)
                }
                this.list1 = await this.mockTableData2(1,self.pageSize)
                

            },
            async generatePO() {
                if (this.selectedRows.length > 0) {
                    let self = this;
                    self.loading = true;
                    for (let po in self.selectedRows) {
                        // console.log('-----------------------', self.selectedRows[po])
                        self.selectedRows[po].isManual = true;
                        self.selectedRows[po].subscription_id = Cookies.get("subscriptionId");
                        if (self.selectedRows[po].products.length > 0) {
                            await axios({
                                method: 'post',
                                url: config.default.serviceUrl + 'purchase-order',
                                data: self.selectedRows[po]
                            }).then(function (response) {
                                self.loading = false;
                                self.$Message.success("Purchase Order Generated Successfully");
                                let removeIndex = _.findIndex(self.list1, function (item) { return item.id == self.selectedRows[po].id })
                                self.list1.splice(removeIndex, 1)
                                self.filterArray.splice(removeIndex, 1)
                                let removeDataIndex = _.findIndex(self.data1, function (item) { return item.id == self.selectedRows[po].id })
                                self.data1.splice(removeDataIndex, 1)
                                self.selectedRows.length = 0

                                    //self.listData(self.website);
                            })
                        }
                        else {

                        }
                    }
                } else {
                    this.$Message.error("No Purchase Order selected");
                }
            }
        },
        async mounted() {
            var self = this
            this.init()
            $('.panel-group').on('hidden.bs.collapse', this.toggleIcon);
            $('.panel-group').on('shown.bs.collapse', this.toggleIcon);
            // // console.log("@@@@@@@@@@@@@@@@@@@@@22!!!!!!!!!!!!!!!!!!!!!!!!!!!1",this.$refs.selection)
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