
<template>
    <div style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; ">
        <div class="drpdwn" style="text-align:center">
            <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
            </Select>

            <h4 class="panel-title" style="text-align:-webkit-right;display: -webkit-inline-box;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion13" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
       
        </div>

           <div class="panel panel-default panel-group" id="accordion13" style="border: none;margin-top:1%;text-align: -webkit-left;">
              <!-- <div class="panel-heading">
              </div> -->
              <div class="panel-collapse collapse" id="collapseTwo">
                  <div class="panel-body">
                      <form>
                          <div class="collapse-maindiv maindiv" >
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#order"></span>
                                      <label>Order Id</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="order">
                                      <AutoComplete v-model="orderid" :data="orderidFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                      </AutoComplete>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#sku"></span>
                                      <label>Item Number</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="sku">
                                      <AutoComplete v-model="itemno" :data="itemnoFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                      </AutoComplete>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#Customer"></span>
                                      <label>Name</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="Customer">
                                      <select class="form-control"  v-model="cname" id="selectCustomer">
                                        <option value="">All</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#email"></span>
                                      <label>Email</label>
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

        <Table stripe @on-expand="viewDetails" :columns="columns1" :data="data1"></Table>

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
                value1: '1',
                modal1: false,
                orderid: '',
                orderidFilter:[],
                itemno: '',
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
                            // console.log('rowwwwwwwwwwwwww-------Expand', params.row)
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
                        key: 'id',
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
                    // {
                    //     title: 'Total Quantity',
                    //     key: 'quantity'
                    // },
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

                data1: [],
                list1: [],
                finalresult: []
            }
        },
        methods: {
            reset() {
              this.orderid = '';
              this.cname = '';
              this.email = '';
              this.itemno = '';
            },
            async changeData() {
              console.log("Before this.filterArray------->",this.filterArray)
              this.filterArray = this.list1
               console.log("After this.filterArray------->",this.filterArray)
              var self = this
                self.finalresult = [];
              if(this.orderid != ''){
                console.log("this.orderid", this.orderid)
                this.filterArray = _.filter(this.filterArray,  function(item){
                  console.log("item",item)                  
                    return item.id === self.orderid;
                  
                });
                console.log("myarr",this.filterArray)
                console.log(" Filter this.filterArray------->",this.filterArray)
                this.data1 = this.filterArray
                console.log("After Filter this.filterArray------->",this.filterArray)
              }

              if(this.cname != ''){
                console.log("this.cname", this.cname)
                this.filterArray = _.filter(this.filterArray,  function(item){
                  console.log("item",item)
                  return item.user_billing_info.name === self.cname;                 
                });
                console.log("myarr",this.filterArray)
                 this.data1 = this.filterArray
              }else{
                console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
                console.log("myarr",this.filterArray)
                this.data1 = this.filterArray
              }

              if(this.email != ''){
                console.log("this.cname", this.email)
                this.filterArray = _.filter(this.filterArray,  function(item){
                  console.log("item",item)
                  return item.user_billing_info.email === self.email;                 
                });
                console.log("myarr",this.filterArray)
                 this.data1 = this.filterArray
              }else{
                console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
                console.log("myarr",this.filterArray)
                this.data1 = this.filterArray
              }

              if(this.itemno != ''){
                console.log("this.itemno", this.itemno)
                this.filterArray = _.filter(this.filterArray,  function(item){
                  console.log("item",item)
                    item.products.forEach(obj => {
                        console.log("*****************",obj)
                        if(obj.product_description.sku == self.itemno){
                            self.finalresult.push(item)
                            console.log("matched",obj)
                        }
                      })
                    //   return finalresult                
                });
                console.log("myarr result",self.finalresult)
                this.filterArray = self.finalresult
                 this.data1 = this.filterArray
              }else{
                console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
                console.log("myarr",this.filterArray)
                this.data1 = this.filterArray 
              }


            },
            filterMethod (value, option) {
              return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
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
                    },
                    // headers: {
                    //   'Authorization': Cookies.get('auth_token'),
                    //   // 'subscriptionId': Cookies.get('subscriptionId')
                    // }
                }).then(function (response){
                    console.log("response val", response.data)
                    self.data1 = _.orderBy(response.data.data, ['created_at'], ['desc']);

                    self.list1 = self.data1
                    self.data1.forEach(item => {
                      self.orderidFilter.push(item.id)
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
                        console.log()
                        x.add(option);
                    })
                     Emailarr.forEach(item => {
                        var x = document.getElementById("selectEmail");
                        var option = document.createElement("option");
                        option.text = item;
                        console.log()
                        x.add(option);
                    })
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
            show (params) {
                var self = this
                console.log("params", params.row) 

                self.modal1 = true
                self.orderList = params.row
                self.orderDate = moment(self.orderList.products[0].createdAt).format('DD-MMM-YYYY')
                // setTimeout(function(){console.log('.........self.$refs.email2.innerHTML......', $('#orderList').html())
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
                    console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                    console.log("uuuuuuuuuuuuuuuuuuuuuuQQQQQQQQQQQQQQQQQQ",self.orderList.billing_details.data.InvoiceNumber);
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
            getImgUrl (url) {
                return this.imgurl + url
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
            clicked (inx) {
                console.log("Clickeddddd...............", inx);
                $('#description'+inx).slideToggle(700);
                $(document).ready(function(){
                    $('.owl-carousel').owlCarousel({
                        stopOnHover : true,
                        navigation:true,
                        items : 4,
                        itemsDesktop: [1199, 4],
                        itemsDesktopSmall: [979, 4],
                        itemsTablet: [767, 2],
                        itemsMobile: [479, 2]
                    });
                });
                // $(".description").css("display", "table-row");
            },
            downloadBill () {
                this.billinfo = true
            },
            async viewDetails(params,status){
                
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
            //         console.log('user detail response------>',self.userid)
            //     })
            //     .catch(function (error) {
            //         console.log("-------",error);
            //         self.$Message.error(error)
            // });
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