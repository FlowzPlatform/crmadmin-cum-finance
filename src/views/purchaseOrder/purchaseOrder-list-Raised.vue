<template>
    <div style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">
         <div class="drpdwn1" style="display: inline;">
            <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
            </Select>
       
        </div>
        <h4 class="panel-title filterData" style="text-align:-webkit-right;display: -webkit-inline-box; margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion12" href="#collapseT"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
        <div class="panel panel-default panel-group" id="accordion12" style="border: none;margin-top:1%;text-align: -webkit-left;">
              <!-- <div class="panel-heading">
              </div> -->
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
                                        <label>From</label>
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
            <div class="panel-heading generate-po-button" style="display:none;">
                <h4 class="panel-title" style="text-align:-webkit-right;">
                    <button class="btn btn-default btn-sm" type="button" style="background-color: red;color: white; font-weight: bold;" @click="generatePO">
                        <span class="glyphicon glyphicon-file"></span> Generate Purchase Order 
                    </button>
                </h4>
            </div>
            <!-- <Table stripe size="small" @on-expand="viewDetails" :height="tableHeight" :columns="columns1" :data="list"></Table> -->
            <Table stripe size="small" @on-expand="viewDetails" :columns="columns1" :data="list"></Table>
             <div style="margin: 10px;overflow: hidden">
                    <div class="pagination" style="float: right;">
                    <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import config from '../../config/customConfig.js'
    import moment from 'moment'
    const accounting = require('accounting-js');
    let axios = require('axios'); 
    import Cookies from 'js-cookie';
    import psl from 'psl';
    import _ from 'lodash'
    import expandRow from './view-purchaseOrder-list.vue';
    // var pageSize = 10
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                spinShow : false,
                tableHeight: 450,
                data1: [],
                filterArray: [],
                websiteList: {},
                ponum: '',
                dategt: '',
                datelt: '',
                pageSize: 10,
                optionsPage:[10,20,30,50],
                mode: '',
                len: 1,
                order_id: '',
                orderFilter: [],
                ponumFilter: [],
                website: '',
                list: [],
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
                        title: 'P.O. #',
                        align:  'center',
                        width: 230,
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.PO_id)
                            ]);
                        }
                    },
                    {
                        title: 'P.O Generate Date',
                        align:  'center',
                        // width: 250,
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
                    },
                    {
                        title: 'Action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Tooltip', {
                                    props: {
                                    placement: 'top',
                                    content: 'Resend Email'
                                    },
                                    style:{
                                    // float:'left',
                                    cursor:'pointer'
                                    }
                                },[
                                    h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'large',
                                        icon: 'android-send'
                                    },
                                    style: {
                                        marginRight: '3px',
                                        padding: '0px',
                                        fontSize: '20px',
                                        color: '#2d8cf0'
                                    },
                                    on: {
                                        click: () => {
                                            console.log("=========resend mail",params.row)
                                            this.resendEmail(params.row)
                                        }
                                    }
                                }, '')
                                ])
                            ]);
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
            resendEmail (data) {
                let emailAddress=data.products[0].product_description.supplier_info.email
                this.$Modal.confirm({
                    title: 'Email would be sent to',
                    okText: 'OK',
                    cancelText: 'Cancel',
                    loading:true,
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value:emailAddress ,
                                autofocus: true,
                                placeholder: 'Please enter email Id...'
                            },
                            on: {
                                input: (val) => {
                                    emailAddress= val;
                                }
                            }
                        })
                    },
                    onOk: ()=>{
                        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",data)
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%",emailAddress)

                        if (this.checkEmail(emailAddress)) {
                            this.$Loading.start()
                            var self = this;
                            let supplierName = data.products[0].product_description.supplier_info.supplier_name;
                            let toMail = emailAddress;
                            let websiteName = data.websiteName;
                            let websiteId = data.websiteId;
                            let distributorEmail = data.distributor_email;
                            let emailBody = `<div ref="email">
                            <h3>Dear ${(supplierName && supplierName.length > 0) ? supplierName : toMail}</h3>
                            <p style="font-size:16px">You have received purchase order for website <b>${(websiteName && websiteName.length > 0) ? websiteName : websiteId}</b> for distributor <b>${distributorEmail}</b></p>
                            <p style="font-size:16px">To view the Purchase order detail:</p>
                            <a href=" https://crm.${process.env.domainkey}/#/purchase-order-received?PO_id=${data.PO_id}" style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:14px;line-height:30px;text-align:center;text-decoration:none;width:90px;-webkit-text-size-adjust:none;mso-hide:all;">View Order</a>    
                            <p style="font-size:16px">Regards</p>
                            </div>`;
                            let myData = {
                                "to": toMail,
                                "from": Cookies.get('user'),
                                "subject": "Purchase order for website " + data.websiteName,
                                "body": emailBody
                            };
                            myData = JSON.stringify(myData)
                            console.log("=============----------------mail data", myData);
                            axios({
                                method: 'post',
                                url: config.default.emailUrl,
                                data: myData,
                                headers: {
                                    'authorization': Cookies.get('auth_token'),
                                }
                            }).then(async function (response) {
                                console.log(response);
                                self.$message.success("Email Sent Successfully");
                                self.$Loading.finish()
                                await axios({
                                    method: 'patch',
                                    url: config.default.serviceUrl + 'purchase-order/' + data.id,
                                    data: {
                                        "EmailStatus": "Sent"
                                    },
                                    headers: {
                                        'Authorization': Cookies.get('auth_token'),
                                        'subscriptionId': Cookies.get('subscriptionId')
                                    }
                                }).then(async function (response) {
                                    self.$Modal.remove();

                                    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", response)
                                })
                            })
                                .catch(function (error) {
                                    self.$Modal.remove();
                                    console.log(error);
                                    self.$Loading.error()
                                    self.$Message.warning("Email Sent Failed, Please try again later");
                                    if (error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401) {
                                        let location = psl.parse(window.location.hostname)
                                        location = location.domain === null ? location.input : location.domain

                                        Cookies.remove('auth_token', { domain: location })
                                        Cookies.remove('subscriptionId', { domain: location })
                                        self.$store.commit('logout', self);

                                        self.$router.push({
                                            name: 'login'
                                        });
                                        self.$Notice.error({
                                            title: error.response.data.name,
                                            desc: error.response.data.message,
                                            duration: 10
                                        })
                                    } else if (error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403) {
                                        self.$Notice.error({
                                            title: error.response.statusText,
                                            desc: error.response.data.message + '. Please <a href="' + config.default.flowzDashboardUrl + '/subscription-list" target="_blank">Subscribe</a>',
                                            duration: 4.5
                                        })
                                    } else {
                                        self.$Notice.error({
                                            title: error.response.data.name,
                                            desc: error.response.data.message,
                                            duration: 10
                                        })
                                    }
                                });
                                
                        }else{
                            this.$Modal.remove();
                            this.$message.error("Invalid Email Id");
                        }
                    }
                })
            },
            checkEmail(emailValue) {
                
                var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return filter.test(emailValue)
            },
            reset() {
                this.ponum = ''
                this.dategt = ''
                this.datelt = ''
                this.order_id = ''
                this.mode = ''
                this.listData(this.website)
            },
            viewDetails (row,status) {
                // if(this.row === undefined){
                //     console.log("on-expand call",status)
                //     this.tableHeight = (this.len * 40) + 35
                //     if (!status) return 
                //     $('.ivu-table-cell-expand-expanded').click()
                // }

                // if(status){
                //     this.tableHeight = 530
                //     console.log("###############################",this.tableHeight)
                // }
                // if(status){
                //     this.tableHeight = 450
                // }else{
                //     this.tableHeight = (this.len * 40) + 35
                // }
            },
            changepagesize(pageSize){
                console.log("####################################",pageSize)
                this.pageSize = pageSize
                if(this.pageSize > 10){
                this.tableHeight = 530
                }else{
                this.tableHeight = 450
                }
                this.changePage(1)
            },
            async mockTableData1 (p,size) {
                console.log("mocktable call---------------")
                this.len = this.data1.length
                console.log("data length--------------->",this.len)
                if(this.len == 0){
                    console.log("data length 0--------------->",this.tableHeight)
                    this.tableHeight = 100
                }else if(this.len < 10){
                    console.log("data length 10--------------->",this.tableHeight)
                     this.tableHeight = (this.len * 40) + 35
                }else{
                    this.tableHeight = 450
                }
                return this.data1.slice((p - 1) * size, p * size);
            },
            async mockTableData2 (p,size) {
                console.log("p-------------->",p)
                console.log("p-------------->",size)
                console.log("console.log------------>",this.filterArray)
                this.len = this.filterArray.length
                console.log("data length--------------->",this.len)
                if(this.len == 0){
                    console.log("data length 0--------------->",this.tableHeight)
                    this.tableHeight = 100
                }else if(this.len < 10){
                    console.log("data length 10--------------->",this.tableHeight)
                     this.tableHeight = (this.len * 40) + 35
                }else{
                    this.tableHeight = 450
                }
                return this.filterArray.slice((p - 1) * size, p * size);
            },
            async changeData() {
                console.log("this.data1", this.data1)
                this.filterArray = this.data1
                var self = this

                if(this.ponum != ''){
                console.log("this.ponum", this.ponum)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    console.log("item",item)
                    return item.PO_id === self.ponum;
                });
                console.log("myarr",this.filterArray)
                // this.list = this.filterArray
                // this.list = await this.mockTableData2(1,self.pageSize)
                }

                if(this.order_id != ''){
                console.log("this.order_id", this.order_id)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    console.log("item",item)
                    return item.orderId === self.order_id;
                });
                console.log("myarr",this.filterArray)
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
                console.log("this.dategt", this.dategt)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    var a = moment(item.PO_generate_date).format('YYYY-MM-DD')
                    if(moment(a).diff(moment(self.dategt).format(), 'days') >= 0){
                        console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                        return item;
                    }
                });
                console.log("myarr",this.filterArray)
                // this.list = this.filterArray
                // this.list = await this.mockTableData2(1,self.pageSize)
                }

                if(this.datelt != ''){
                console.log("this.datelt", this.datelt)
                this.filterArray = _.filter(this.filterArray,  function(item){
                    var a = moment(item.PO_generate_date).format('YYYY-MM-DD')
                    if(moment(a).diff(moment(self.datelt).format(), 'days') <= 0){
                        return item;
                    }
                });
                console.log("myarr",this.filterArray)
                // this.list = this.filterArray
                // this.list = await this.mockTableData2(1,self.pageSize)
                }

                this.list = await this.mockTableData2(1,self.pageSize)
               
            },
            filterMethod (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
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
                      self.listData(self.website);
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
                let params1;
                if(this.row != undefined){
                    params1 = {
                        websiteId :val,
                        orderId : this.row.order_id 
                    }
                }else{
                    params1 = {
                        websiteId :val
                    }
                }
                console.log("############################################",params1)
                axios({
                    method: 'get',
                    url: config.default.serviceUrl + 'purchase-order',
                    params: params1,
                    headers: {
                        'Authorization': Cookies.get('auth_token'),
                        'subscriptionId': Cookies.get('subscriptionId')
                    } 
                }).then(async function (response){
                    console.log("------------------------response",response.data.data);
                    self.data1 = _.orderBy(response.data.data, ['created_at'], ['desc']);
                    self.list = await self.mockTableData1(1,self.pageSize)
                    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",self.list)
                    self.data1.forEach(item => {
                        self.ponumFilter.push(item.PO_id)
                        self.orderFilter.push(item.orderId)
                    })
                    self.ponumFilter = _.chain(self.ponumFilter).sort().uniq().value();
                    self.orderFilter = _.chain(self.orderFilter).sort().uniq().value();
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
            async changePage (p) {
                // this.page = p
                console.log("not inside",this.filterArray.length)
                if(this.filterArray.length == 0){
                    console.log("inside",this.filterArray)
                    this.list = await this.mockTableData1(p,this.pageSize);
                }else{
                    this.list = await this.mockTableData2(p,this.pageSize);
                }
            }
        },
        mounted() {
            console.log("********************generate po",this.row);
            var self = this
            $('.panel-group').on('hidden.bs.collapse', this.toggleIcon);
            $('.panel-group').on('shown.bs.collapse', this.toggleIcon);
            if(this.row != undefined){
                $('.generate-po-button').css("display","block")
                $('.pagination .ivu-page-options').css("display","none")
                $('.drpdwn1').css("display","none")
                $('.filterData').css("display","none")
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
    .ivu-table-body {
        overflow-x: hidden;
    }
</style>