
<template>
    <div style="text-align: center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; ">
        <div class="drpdwn" style="text-align:center">
            <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: left;" @on-change="listData">
                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
            </Select>

            <h4 class="panel-title" style="text-align:right;display: inline-block;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion13" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>

        </div>

           <div class="panel panel-default panel-group" id="accordion13" style="border: none;margin-top:1%;text-align: left;">
              <!-- <div class="panel-heading">
              </div> -->
              <div class="panel-collapse collapse" id="collapseTwo">
                  <div class="panel-body">
                      <form>
                          <div class="collapse-maindiv maindiv" >
                              <div class="panel panel-default">
                                  <div class="panel-heading">
                                    <span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" data-target="#order" style="width: 100%;">
                                      <label style="padding-left:  7px;">Order Id</label>
                                      </span>
                                  </div>
                                  <div class="panel-collapse collapse" id="order">
                                      <AutoComplete v-model="orderid" :data="orderidFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                      </AutoComplete>
                                  </div>
                              </div>
                               <div class="panel panel-default">
                                  <div class="panel-heading">
                                        <span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#send" >
                                      <label style="padding-left:  7px;">po_Sent</label>
                                        </span>
                                  </div>
                                  <div class="panel-collapse collapse" id="send">
                                      <select class="form-control"  v-model="po_sent" id="selectPOSend">
                                        <option value="">All</option>
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading">
                                      <span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#sku">
                                      <label style="padding-left:  7px;">Item Number</label>
                                      </span>
                                  </div>
                                  <div class="panel-collapse collapse" id="sku">
                                      <AutoComplete v-model="itemno" :data="itemnoFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                      </AutoComplete>
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
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;"  data-target="#email">
                                      <label style="padding-left:  7px;">Email</label>
                                      </span>
                                  </div>
                                  <div class="panel-collapse collapse" id="email">
                                      <select class="form-control"  v-model="email" id="selectEmail">
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
        <!-- <Table stripe :height="tableHeight" @on-expand="viewDetails" size="small" :columns="columns1" :data="list1"></Table> -->
        <Table stripe @on-expand="viewDetails" size="small" :columns="columns1" :data="list1"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
            </div>
        </div>

        <Modal
            v-model="modal1"
            title="Preview Order Details"
            width="59%"
            ok-text= "Download PDF"
            @on-ok="download"
            @on-cancel="cancel">
            <downloadOrderList id="orderList" :row="orderList"></downloadOrderList>
        </Modal>

    </div>
</template>

<script>
    import moment from 'moment';
    import config from '../../config/customConfig.js'
    import orderList from './view-order-list.vue';
    import purchaseOrderList from '../purchaseOrder/purchaseOrder-list-Raised.vue';
    import psl from 'psl';
    import downloadOrderList from './download-orderlist.vue';
    import Cookies from 'js-cookie';
    let axios = require('axios');
    let _ = require('lodash');

    const accounting = require('accounting-js');
    var res;
    export default {
        name: 'orderlist',
        components: { orderList, purchaseOrderList , downloadOrderList},
        data() {
            return {
                tableHeight: 450,
                value1: '1',
                modal1: false,
                orderid: '',
                len:1,
                po_sent:'',
                orderidFilter:[],
                pageSize:10,
                itemno: '',
                optionsPage:[10,20,30,50],
                itemnoFilter:[],
                cname:'',
                email:'',
                websiteList: {},
                website: '',
                orderList: {},
                orderDate: '',
                userid: '',
                columns1: [
                    {
                        // title: 'Order',
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            // // console.log('rowwwwwwwwwwwwww-------Expand', params.row)
                            // return h(expandRow, {
                            //     props: {
                            //         row: params.row
                            //     }
                            // })
                            return h('Tabs', [
                                h('TabPane', {
                                    props : {
                                        label : 'Order Detail'
                                    }
                                },[
                                    h(orderList, {
                                        props: {
                                            row: params.row
                                        }
                                    })
                                ]),
                                h('TabPane', {
                                    props : {
                                        label : 'Purchase Order Detail'
                                    }
                                },[
                                    h(purchaseOrderList, {
                                        props: {
                                            row: params.row
                                        }
                                    })
                                ])
                            ])
                        }
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
                            var date = moment(row.created_at).format('DD-MMM-YYYY')
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
                    {
                        title: 'Download',
                        width: 100,
                        align:  'center',
                        render: (h, params) => {
							return h('Button', {
				                props: {
									type: 'text',
									size: 'large',
									icon: 'ios-cloud-download-outline'
				                },
				                style: {
									marginRight: '3px',
									padding: '0px',
									fontSize: '20px',
									color: '#2d8cf0'
				                },
				                on: {
				                    click: () => {
				                        this.show(params)
				                    }
				                }
				            }, '')
						}
                    }
                ],
                filterArray: [],
                data1: [],
                list1: [],
                finalresult: []
            }
        },
        methods: {
            changepagesize(pageSize){
                // // console.log("####################################",pageSize)
                this.pageSize = pageSize
                if(this.pageSize > 10){
                    this.tableHeight = 530
                }else{
                    this.tableHeight = 450
                }
                this.changePage(1)
            },
            async changePage (p) {
                // this.page = p
                var self = this
                // // console.log("not inside",self.filterArray.length)
                if(self.filterArray.length == 0){
                    // // console.log("inside",self.filterArray)
                    self.list1 = await self.mockTableData1(p,self.pageSize);
                }else{
                    self.list1 = await self.mockTableData2(p,self.pageSize);
                }
            },
            async mockTableData1 (p,size) {
                // // console.log("mocktable call---------------")
                this.len = this.data1.length
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
                this.len = this.filterArray.length
                // if(this.len == 0){
                //     // console.log("data length 0--------------->",this.tableHeight)
                //     this.tableHeight = 100
                // }else if(this.len < 10){
                //     // console.log("data length 10--------------->",this.tableHeight)
                //      this.tableHeight = (this.len * 40) + 35
                // }else{
                //     this.tableHeight = 450
                //     }
                return this.filterArray.slice((p - 1) * size, p * size);
            },
            reset() {
              this.orderid = '';
              this.cname = '';
              this.email = '';
              this.itemno = '';
              this.po_sent = '';
              this.listData(this.website)
            },
            async changeData() {
              // // console.log("Before this.filterArray------->",this.filterArray)
              this.filterArray = this.data1
               // // console.log("After this.filterArray------->",this.filterArray)
              var self = this
                self.finalresult = [];

              if(this.orderid != ''){
                // // console.log("this.orderid", this.orderid)
                this.filterArray = _.filter(this.filterArray,  function(item){
                  // // console.log("item",item)
                    return item.order_id === self.orderid;

                });
                // this.list1 = await this.mockTableData2(1,self.pageSize)
              }

              if(this.po_sent != ''){
                // // console.log("this.filterArray",this.filterArray)
                this.filterArray = _.filter(this.filterArray,  function(item){

                    if(self.po_sent == 'true'){
                        if(item.po_detail != undefined){
                        return item
                        }
                    }else{
                        if(item.po_detail == undefined){
                            return item
                        }
                    }

                });
                // this.list1 = await this.mockTableData2(1,self.pageSize)
              }


              if(this.cname != ''){
                this.filterArray = _.filter(this.filterArray,  function(item){
                  return item.user_billing_info.name === self.cname;
                });
                //  this.list1 = await this.mockTableData2(1,self.pageSize)
              }else{
                // this.list1 = await this.mockTableData2(1,self.pageSize)
              }

              if(this.email != ''){
                this.filterArray = _.filter(this.filterArray,  function(item){
                  return item.user_billing_info.email === self.email;
                });
                //  this.list1 = await this.mockTableData2(1,self.pageSize)
              }else{
                // this.list1 = await this.mockTableData2(1,self.pageSize)
              }

              if(this.itemno != ''){
                this.filterArray = _.filter(this.filterArray,  function(item){
                    item.products.forEach(obj => {
                        if(obj.product_description.sku == self.itemno){
                            self.finalresult.push(item)
                        }
                      })
                    //   return finalresult
                });
                this.filterArray = self.finalresult
                //  this.list1 = await this.mockTableData2(1,self.pageSize)
              }else{
                // this.list1 = await this.mockTableData2(1,self.pageSize)
              }
                this.list1 = await this.mockTableData2(1,self.pageSize)

            },
            filterMethod (value, option) {
              return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },

            init () {
                var self = this
                axios({
                    method: 'get',
                    url: config.default.subscriptionWebsitesapi,
                    // params: {
                    //   owner_id: self.userid
                    // },
                    // config.default.subscriptionWebsitesapi
                    headers: {
                      'Authorization': Cookies.get('auth_token'),
                      'subscriptionId': Cookies.get('subscriptionId')
                    }
                })
                .then(function (response){
                    // // console.log("------------------------response",response);
                    if(response.data.data.length == 0){
                      self.$Notice.error({
                        desc: 'Websites not available for this subscription',
                        title: 'Error',
                        duration: 4.5
                      })
                    }else{
                      var result = _.uniqBy(response.data.data,'websiteId')
                      self.websiteList = result
                      self.website = self.websiteList[0].websiteId
                      self.listData(self.website)
                    }

                }).catch(error => {
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
                var len;
                let Namearr = [];
                let Emailarr = [];
                $('#selectCustomer').children('option:not(:first)').remove();
                $('#selectEmail').children('option:not(:first)').remove();
                axios.get( config.default.orderapi , {
                    params: {
                        website_id: val
                    },
                    // headers: {
                    //   'Authorization': Cookies.get('auth_token'),
                    //   // 'subscriptionId': Cookies.get('subscriptionId')
                    // }
                }).then(async function (response){
                    self.data1 = _.orderBy(response.data.data, ['created_at'], ['desc']);

                    self.list1 = await self.mockTableData1(1,self.pageSize)
                    self.data1.forEach(item => {
                      self.orderidFilter.push(item.order_id)
                      Namearr.push(item.user_billing_info.name)
                      Emailarr.push(item.user_billing_info.email)
                      item.products.forEach(obj => {
                          self.itemnoFilter.push(obj.product_description.sku)
                      })
                    })

                    Namearr = _.chain(Namearr).sort().uniq().value();
                    Emailarr = _.chain(Emailarr).sort().uniq().value();
                    Namearr.forEach(item => {
                        var x = document.getElementById("selectCustomer");
                        var option = document.createElement("option");
                        option.text = item;
                        x.add(option);
                    })
                     Emailarr.forEach(item => {
                        var x = document.getElementById("selectEmail");
                        var option = document.createElement("option");
                        option.text = item;
                        x.add(option);
                    })
                }).catch(function (error) {
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
            show (params) {
                var self = this

                self.modal1 = true
                self.orderList = params.row
                self.orderDate = moment(self.orderList.products[0].createdAt).format('DD-MMM-YYYY')
                // setTimeout(function(){// console.log('.........self.$refs.email2.innerHTML......', $('#orderList').html())
                //     self.download()
                // },100)
            },
            async cancel() {
                self.modal1 = false
            },
            async download() {
                var self = this
		        self.$Loading.start()

                await axios({
                    method: 'post',
                    url: config.default.serviceUrl + 'exporttopdf',
                    data: {
                        "html" : $('#orderList').html()
                    },
                }).then(function (response) {
                    self.$Loading.finish()
                    var arrayBufferView = new Uint8Array( response.data.data );
                    var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                    var link=document.createElement('a');
                    link.href=window.URL.createObjectURL(blob);
                    link.download=self.orderList.id == undefined ? "custom_Invoice" : self.orderList.id;
                    link.click();
                }).catch(function (error){
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
                })
            },
            getMulti(a, b) {
                return accounting.formatMoney(a * b);
            },
            getSubTotal (a, b, c) {
                var res = c.hasOwnProperty('charges')
                if ( res == false) {
                    return accounting.formatMoney(a*b)
                }
                else {
                    return accounting.formatMoney((a*b + parseInt(c.charges.setup_charge)))
                }
            },
            accounting(item){
              return accounting.formatMoney(item)
            },
            // clicked (inx) {
            //     // console.log("Clickeddddd...............", inx);
            //     $('#description'+inx).slideToggle(700);
            //     $(document).ready(function(){
            //         $('.owl-carousel').owlCarousel({
            //             stopOnHover : true,
            //             navigation:true,
            //             items : 4,
            //             itemsDesktop: [1199, 4],
            //             itemsDesktopSmall: [979, 4],
            //             itemsTablet: [767, 2],
            //             itemsMobile: [479, 2]
            //         });
            //     });
            //     // $(".description").css("display", "table-row");
            // },
            downloadBill () {
                this.billinfo = true
            },
            async viewDetails(params,status){
                // this.tableHeight = 250
                // // console.log("this.tableHeight------->",this.len)
                // this.tableHeight = (this.len * 40) + 35
                // if(this.tableHeight >= 450){
                //     this.tableHeight = 450
                // }
                if (!status) return
                $('.ivu-table-cell-expand-expanded').click()

                // if(status){
                //     this.tableHeight = 530
                //     // console.log("###############################",this.tableHeight)
                // }
            },
            toggleIcon: function (e) {
                $(e.target)
                    .prev('.panel-heading')
                    .find(".more-less")
                    .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
            }
        },

        async mounted() {
            var self = this
            // await axios({
            //     method: 'get',
            //     url: config.default.userDetail,
            //     headers: {'Authorization': Cookies.get('auth_token')}
            //     }).then(async function (response) {
            //         self.userid = response.data.data._id
            //         // console.log('user detail response------>',self.userid)
            //     })
            //     .catch(function (error) {
            //         // console.log("-------",error);
            //         self.$Message.error(error)
            // });
            $('.panel-group').on('hidden.bs.collapse', this.toggleIcon);
            $('.panel-group').on('shown.bs.collapse', this.toggleIcon);
            this.init()
        },
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
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
