<template>
    <div>
        <div class="drpdwn1" style="display: inline-block;width: 90%;">
            <!--<Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
            </Select>-->
        </div>
        <h4 class="panel-title filterData" style="text-align:-webkit-right;display: -webkit-inline-box; margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion12" href="#collapseT"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
        <div class="panel panel-default panel-group" id="accordion12" style="border: none;margin-top:1%;text-align: -webkit-left;">
            <div class="panel-collapse collapse" id="collapseT">
                <div class="panel-body">
                    <form>
                        <div class="collapse-maindiv maindiv" >
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#poid">
                                    <label style="padding-left:  7px;">P.O.#</label>
                                    </span>
                                </div>
                                <div class="panel-collapse collapse" id="poid">
                                    <AutoComplete v-model="ponum" :data="ponumFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                    </AutoComplete>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#podate">
                                    <label style="padding-left:  7px;">P.O.Generate Date</label>
                                    </span>
                                </div>
                                <div class="form-group row panel-collapse collapse" id="podate">
                                    <div class="col-xs-3">
                                    <label style="padding-left:  7px;">From</label>
                                        <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="dategt" style="width: 100%;"></DatePicker>
                                    </div>
                                    <div class="col-xs-3">
                                    <label>To</label>
                                        <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="datelt" style="width: 100%;"></DatePicker>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#orderid">
                                    <label style="padding-left:  7px;">Order Id</label>
                                    </span>
                                </div>
                                <div class="panel-collapse collapse" id="orderid">
                                    <AutoComplete v-model="order_id" :data="orderFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                    </AutoComplete>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#mode">
                                    <label style="padding-left:  7px;">Mode</label>
                                    </span>
                                </div>
                                <div class="panel-collapse collapse" id="mode">
                                    <select class="form-control"  v-model="mode" id="selectmode">
                                    <option value="">All</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Manual">Manual</option>
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

        <div v-if="spinShow" class="demo-spin-container">
            <Spin fix></Spin>
        </div>
        <div v-else>
            <!-- <Table stripe size="small" @on-expand="viewDetails" :height="tableHeight" :columns="columns1" :data="list"></Table> -->
            <Table stripe size="small" :columns="columns1" :data="list"></Table>
             <div style="margin: 10px;overflow: hidden">
                    <div class="pagination" style="float: right;">
                    <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../config/customConfig.js';
    import Cookies from 'js-cookie';
    let axios = require('axios');
    import _ from 'lodash';
    const accounting = require('accounting-js');

    export default {
        data () {
            return {
                spinShow: false,
                websiteList: {},
                website: '',
                ponum: '',
                ponumFilter: [],
                dategt: '',
                datelt: '',
                order_id: '',
                orderFilter: [],
                mode: '',
                data1: [],
                filterArray: [],
                list: [],
                len: 1,
                pageSize: 10,
                optionsPage:[10,20,30,50],
                columns1 : [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            // console.log('rowwwwwwwwwwwwww-------Expand', params)
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'P.O. #',
                        align:  'center',
                        width: 250,
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.PO_id)
                            ]);
                        }
                    },
                    {
                        title: 'P.O Generate Date',
                        align:  'center',
                        width: 250,
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
                                h('span', row.orderId)
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
                        title: 'Website Name',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.websiteName)
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
            toggleIcon: function (e) {
                $(e.target)
                    .prev('.panel-heading')
                    .find(".more-less")
                    .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
            },
            // init() {
            //     let self = this;
            //     axios({
            //         method: 'get',
            //         url: config.default.subscriptionWebsitesapi,
            //         headers: {
            //           'Authorization': Cookies.get('auth_token'),
            //           'subscriptionId': Cookies.get('subscriptionId')
            //         } 
            //     })
            //     .then(function (response){
            //         // console.log("websitelist------------------------response",response);
            //         if(response.data.data.length == 0){
            //           // console.log("in if condition")
            //           self.$Notice.error({
            //             desc: 'Websites not available for this subscription',
            //             title: 'Error',
            //             duration: 4.5
            //           })
            //         }else{    
            //           var result = _.uniqBy(response.data.data,'websiteId')
            //           // console.log("result", result)
            //           self.websiteList = result
            //           // console.log("self.websiteList", self.websiteList[0].websiteId)                    
            //           self.website = self.websiteList[0].websiteId
            //           self.listData(self.website);
            //         }                       

            //     }).catch(error => {
            //         // console.log("-------",error);
            //         if(error.message == 'Network Error'){
            //             self.$Notice.error({
            //                 title: 'Error',
            //                 desc: 'API Service unavailable',
            //                 duration: 10
            //             })
            //         }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
            //             let location = psl.parse(window.location.hostname)
            //             location = location.domain === null ? location.input : location.domain
                        
            //             Cookies.remove('auth_token' ,{domain: location}) 
            //             Cookies.remove('subscriptionId' ,{domain: location}) 
            //             self.$store.commit('logout', self);
                        
            //             self.$router.push({
            //                 name: 'login'
            //             });
            //             self.$Notice.error({
            //                 title: error.response.data.name,
            //                 desc: error.response.data.message,
            //                 duration: 10
            //             })
            //         }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
            //             self.$Notice.error({
            //                 title: error.response.statusText,
            //                 desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
            //                 duration: 0
            //             })
            //         }else {
            //             self.$Notice.error({
            //                 title: error.response.data.name,
            //                 desc: error.response.data.message,
            //                 duration: 10
            //             })
            //         }
            //     });
            // },
            listData (val) {
                var self = this
                let params1;
                // params1 = {
                //         supplierEmail: Cookies.get('user')
                //     };
                params1 = {
                        'supplier_info.email' : Cookies.get('user')
                    };
                axios({
                    method: 'get',
                    url: config.default.serviceUrl + 'purchase-order',
                    params: params1,
                    headers: {
                        'Authorization': Cookies.get('auth_token'),
                        'subscriptionId': Cookies.get('subscriptionId')
                    } 
                }).then(async function (response){
                    // console.log("------------------------response",response.data.data);
                    self.data1 = _.orderBy(response.data.data, ['created_at'], ['desc']);
                    self.list = await self.mockTableData1(1,self.pageSize)
                    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",self.list)
                    self.data1.forEach(item => {
                        self.ponumFilter.push(item.PO_id)
                        self.orderFilter.push(item.orderId)
                    })
                    self.ponumFilter = _.chain(self.ponumFilter).sort().uniq().value();
                    self.orderFilter = _.chain(self.orderFilter).sort().uniq().value();
                }).catch(error => {
                    // console.log("-------",error);
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
            async mockTableData1 (p,size) {
                // // console.log("mocktable call---------------")
                // this.len = this.data1.length
                // // console.log("data length--------------->",this.len)
                // if(this.len == 0){
                //     // console.log("data length 0--------------->",this.tableHeight)
                //     this.tableHeight = 100
                // }else if(this.len < 10){
                //     // console.log("data length 10--------------->",this.tableHeight)
                //      this.tableHeight = (this.len * 40) + 35
                // }else{
                //     this.tableHeight = 450
                // }
                return this.data1.slice((p - 1) * size, p * size);
            },
            async mockTableData2 (p,size) {
                // // console.log("p-------------->",p)
                // // console.log("p-------------->",size)
                // // console.log("// console.log------------>",this.filterArray)
                // this.len = this.filterArray.length
                // // console.log("data length--------------->",this.len)
                // if(this.len == 0){
                //     // console.log("data length 0--------------->",this.tableHeight)
                //     this.tableHeight = 100
                // }else if(this.len < 10){
                //     // console.log("data length 10--------------->",this.tableHeight)
                //      this.tableHeight = (this.len * 40) + 35
                // }else{
                //     this.tableHeight = 450
                // }
                return this.filterArray.slice((p - 1) * size, p * size);
            },
            async changePage (p) {
                // this.page = p
                // console.log("not inside",this.filterArray.length)
                if(this.filterArray.length == 0){
                    // console.log("inside",this.filterArray)
                    this.list = await this.mockTableData1(p,this.pageSize);
                }else{
                    this.list = await this.mockTableData2(p,this.pageSize);
                }
            },
            changepagesize(pageSize){
                // console.log("####################################",pageSize)
                this.pageSize = pageSize
                if(this.pageSize > 10){
                this.tableHeight = 530
                }else{
                this.tableHeight = 450
                }
                this.changePage(1)
            },
            filterMethod (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            reset() {
                this.ponum = ''
                this.dategt = ''
                this.datelt = ''
                this.order_id = ''
                this.mode = ''
                this.listData()
            },
            async changeData() {
                // console.log("this.data1", this.data1)
                this.filterArray = this.data1
                var self = this

                if(this.ponum != ''){
                // console.log("this.ponum", this.ponum)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    // console.log("item",item)
                    return item.PO_id === self.ponum;
                });
                // console.log("myarr",this.filterArray)
                // this.list = this.filterArray
                // this.list = await this.mockTableData2(1,self.pageSize)
                }

                if(this.order_id != ''){
                // console.log("this.order_id", this.order_id)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    // console.log("item",item)
                    return item.orderId === self.order_id;
                });
                // console.log("myarr",this.filterArray)
                // this.list = this.filterArray
                // this.list = await this.mockTableData2(1,self.pageSize)
                }

                if(this.mode != ''){
                    this.filterArray  = _.filter(this.filterArray, function(item){
                        return item.PO_generate_mode === self.mode
                    })
                    this.list = this.filterArray
                }

                if(this.dategt != ''){
                // console.log("this.dategt", this.dategt)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    var a = moment(item.PO_generate_date).format('YYYY-MM-DD')
                    if(moment(a).diff(moment(self.dategt).format(), 'days') >= 0){
                        // console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                        return item;
                    }
                });
                // console.log("myarr",this.filterArray)
                // this.list = this.filterArray
                // this.list = await this.mockTableData2(1,self.pageSize)
                }

                if(this.datelt != ''){
                // console.log("this.datelt", this.datelt)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    var a = moment(item.PO_generate_date).format('YYYY-MM-DD')
                    if(moment(a).diff(moment(self.datelt).format(), 'days') <= 0){
                        return item;
                    }
                });
                // console.log("myarr",this.filterArray)
                // this.list = this.filterArray
                // this.list = await this.mockTableData2(1,self.pageSize)
                }

                this.list = await this.mockTableData2(1,self.pageSize)
               
            },
        },
        mounted() {
            //  this.init();
             this.listData();
             $('.panel-group').on('hidden.bs.collapse', this.toggleIcon);
            $('.panel-group').on('shown.bs.collapse', this.toggleIcon);
        }
    }
</script>