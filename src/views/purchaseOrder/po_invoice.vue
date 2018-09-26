<template>
	<div style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div class="drpdwn1" style="display: inline;">
      <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
          <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
      </Select>
    </div>
		<div style="text-align:-webkit-right;display: -webkit-inline-box; margin-left: 2%;">
			<h4 class="panel-title" style="text-align:right;display: inline-block;">
				<a data-toggle="collapse" data-parent="#accordion13" href="#collapseTwo">
					<button class="btn btn-default btn-sm" type="button">
						<span class="glyphicon glyphicon-filter"></span> Filter 
					</button>
				</a>
			</h4>
		</div>
			<div class="panel panel-default panel-group" id="accordion13" style="border: none;margin-top:1%;text-align: left;font-size:10px;">
				<div class="panel-collapse collapse" id="collapseTwo">
					<div class="panel-body">
						<form>
							<div class="collapse-maindiv maindiv" >
								<div class="panel panel-default">
									<div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#po">
                    <label style="padding-left:  7px;">PO #</label>
                    </span>
									</div>
									<div class="panel-collapse collapse" id="po">
										<AutoComplete v-model="ponum" :data="ponumFilter" :filter-method="filterMethod" placeholder="input here" clearable>
										</AutoComplete>
									</div>
								</div>
								<div class="panel panel-default">
									<div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#invoice">
                    <label style="padding-left:  7px;">Invoice #</label>
                    </span>
									</div>
									<div class="panel-collapse collapse" id="invoice">
										<AutoComplete v-model="invoicenum" :data="invoicenumFilter" :filter-method="filterMethod" placeholder="input here" clearable>
										</AutoComplete>
									</div>
								</div>
                <div class="panel panel-default">
									<div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#order">
                    <label style="padding-left:  7px;">Order Id</label>
                    </span>
									</div>
									<div class="panel-collapse collapse" id="order">
										<AutoComplete v-model="orderid" :data="orderidfilter" :filter-method="filterMethod" placeholder="input here" clearable>
										</AutoComplete>
									</div>
								</div>
								<div class="panel panel-default">
                                  <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;"
                                      data-target="#date">
                                      <label style="padding-left:  7px;">Date</label>
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
                                  <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;"
                                      data-target="#duedate">
                                      <label style="padding-left:  7px;">Due Date</label>
                                      </span>
                                  </div>
                                  <div class="form-group row panel-collapse collapse" id="duedate">
                                      <div class="col-xs-3">
                                        <label>From Date</label>
                                          <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="duedategt" style="width: 100%;"></DatePicker>
                                      </div>
                                      <div class="col-xs-3">
                                        <label>To Date</label>
                                          <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="duedatelt" style="width: 100%;"></DatePicker>
                                      </div>
                                  </div>
                              </div>
							  <div class="panel panel-default">
                                  <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#supplier">
                                      <label style="padding-left:  7px;">Supplier</label>
                                      </span>
                                  </div>
                                  <div class="panel-collapse collapse" id="supplier">
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
		<!-- <Table size="small" @on-expand="viewDetails" :height="tableHeight" stripe :columns="columns1" :data="list"></Table> -->
		<Table size="small" @on-expand="viewDetails" stripe :columns="columns1" :data="list"></Table>
		<div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
          <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
      </div>
    </div>

	</div>
</template>
<script>
import config from '../../config/customConfig.js'
import axios from 'axios'
import Cookies from 'js-cookie';
const accounting = require('accounting-js');
import money from '../../images/Payment.png'
import _ from 'lodash';
import psl from 'psl';
var crmpostapiurl = config.default.serviceUrl;
import expandRow from './viewpo_invoice.vue';
import moment from 'moment';

export default {
  data(){
    return {
      money,
      ponum: '',
      tableHeight: 450,
      orderid: '',
      orderidfilter: [],
      websiteList: '',
      ponumFilter: [],
      invoicenum: '',
      invoicenumFilter: [],
      optionsPage:[10,20,30,50],
      dategt: '',
      datelt: '',
      email: '',
      pageSize: 10,
      duedategt: '',
      duedatelt: '',
      columns1:[
        {
          type: 'expand',
          align: 'center',
          width: 30,
          render: (h, params) => {
            // console.log("params.row  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",params.row)
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: 'Invoice #',
          align:  'center',
          // width: 145,
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.invoiceId)
              ]);
          }
        },
        {
          title: 'Order Id',
          align:  'center',
          // width: 110,
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.orderId)
              ]);
          }
        },
        {
          title: 'P.O. #',
          align:  'center',
          // width: 145,
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.PO_id)
              ]);
          }
        },
        {
          title: 'Total Amount',
          align:  'center',
          // width: 110,
          render : (h , {row}) => {
              return h('div', [
                  h('span', accounting.formatMoney(row.total_amount))
              ]);
          }
        },
        {
          title: 'Supplier',
          align:  'center',
          // width: 180,
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.supplier_email)
              ]);
          }
        },
        {
          title: 'Date',
          align:  'center',
          width: 110,
          render : (h , {row}) => {
            var date1 = moment(row.createdAt).format('DD-MMM-YYYY')
              return h('div', [
                  h('span', date1)
              ]);
          }
        },
        {
          title: 'Due Date',
          align:  'center',
          width: 110,
          render : (h , {row}) => {
            var date1 = moment(row.dueDate).format('DD-MMM-YYYY')
              return h('div', [
                  h('span', date1)
              ]);
          }
        },
        {
          title: 'Status',
          align:  'center',
          width: 80,
          render : (h , {row}) => {
              return h('div', [
                  h('span', row.status)
              ]);
          }
        },
        {
          title: 'Action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            // console.log("params-------------------------------------->",params.row.status, params.row.paymentInfo)
            // if (Object.keys(params.row.paymentInfo).length === 0 && params.row.status == 'pending') {

            // } else 
            if(params.row.status == 'pending' && Object.keys(params.row.paymentInfo).length != 0){
              return h('div', [
                h('Tooltip', {
                  props: {
                    placement: 'top',
                    content: 'Pay Now'
                  },
                  style:{
                    cursor:'pointer'
                  }
                },[
                    h('img', {
                      attrs: {
                        src:this.money
                      },
                      style: {
                        height:'20px',
                        width:'20px',
                        margin: '5px'
                      },
                      on: {
                        click: () => {
                          this.makepayment(params)
                        }
                      }
                    },'')
                  ]),
                  h('Tooltip', {
                    props: {
                      placement: 'top',
                      content: 'Mark as paid'
                    },
                    style:{
                      cursor:'pointer'
                    }
                  },[
                      h('Button', {
                          props: {
                            type: 'text',
                            size: 'large',
                            icon: 'ios-circle-outline'
                          },
                          style: {
                            marginRight: '3px',
                            padding: '0px',
                            fontSize: '20px',
                            color: 'green'
                          },
                          on: {
                            click: () => {
                              this.markAsPaid(true,params);
                            }
                          }
                      }, '')
                      // h('Checkbox', {
                      //   props: {
                      //     value: false
                      //   },
                      //   style: {
                      //     margin: '5px'
                      //   },
                      //   on: {
                      //     input: (val) => {
                      //       // console.log("val",val)
                      //       this.markAsPaid(val,params);
                      //     }
                      //   }
                      // },'')
                    ])          
              ]);
            } else if (params.row.status == 'pending' && Object.keys(params.row.paymentInfo).length === 0) {
              return h('div', [  
                h('Tooltip', {
                    props: {
                      placement: 'top',
                      content: 'Mark as paid'
                    },
                    style:{
                      cursor:'pointer'
                    }
                  },[
                      h('Button', {
                          props: {
                            type: 'text',
                            size: 'large',
                            icon: 'ios-circle-outline'
                          },
                          style: {
                            marginRight: '3px',
                            padding: '0px',
                            fontSize: '20px',
                            color: 'green'
                          },
                          on: {
                            click: () => {
                              this.markAsPaid(true,params);
                            }
                          }
                      }, '')
                      // h('Checkbox', {
                      //   props: {
                      //     value: false
                      //   },
                      //   style: {
                      //     margin: '5px'
                      //   },
                      //   on: {
                      //     input: (val) => {
                      //       // console.log("val",val)
                      //       this.markAsPaid(val,params);
                      //     }
                      //   }
                      // },'')
                    ])
              ])
            } else {
               return h('div', [
                h('Tooltip', {
                  props: {
                    placement: 'top',
                    content: 'Paid'
                  },
                  style:{
                    cursor:'pointer'
                  }
                },[
                    h('Button', {
				                props: {
                          type: 'text',
                          size: 'large',
                          icon: 'checkmark-circled'
                        },
                        style: {
                          marginRight: '3px',
                          padding: '0px',
                          fontSize: '20px',
                          color: 'green'
                        },
                        on: {
                          click: () => {
                            // this.show(params)
                          }
				                }
				            }, '')
                  ]),          
              ]);
            }
					}
				}
      ],
      list:[],
      data: [],
      website: '',
      len: 1
    }
  },
  methods:{
    toggleIcon: function (e) {
        $(e.target)
          .prev('.panel-heading')
          .find(".more-less")
          .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
   },
    async reset(){
      this.ponum = '';
      this.dategt = '';
      this.datelt = '';
      this.duedatelt = '';
      this.duedategt = '';
      this.email = '';
      this.invoicenum = '';
      this.listData(this.website);
    },
    async changepagesize(pageSize){
      // console.log("####################################",pageSize)
      this.pageSize = pageSize
      if(this.pageSize > 10){
        this.tableHeight = 530
      }else{
        this.tableHeight = 450
      }
      this.changePage(1)
    },
    async mockTableData1 (p,size) {
      this.len = this.data.length
      if(this.len == 0){
        // console.log("data length 0--------------->",this.tableHeight)
        this.tableHeight = 100
      }else if(this.len < 10){
        // console.log("data length 10--------------->",this.tableHeight)
        this.tableHeight = (this.len * 40) + 35
      }else{
        this.tableHeight = 450
      }
      return this.data.slice((p - 1) * size, p * size);
    },
    async mockTableData2 (p,size) {
      // console.log("p-------------->",p)
      // console.log("p-------------->",size)
      // console.log("// console.log------------>",this.filterArray)
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
    async changePage (p) {
      var self = this
      // console.log("not inside",self.filterArray.length)
      if(self.filterArray.length == 0){
        // console.log("inside",self.filterArray)
        self.list = await self.mockTableData1(p,self.pageSize);
      }else{
        self.list = await self.mockTableData2(p,self.pageSize);
      }
    },
    async changeData() {
		  this.filterArray = this.data
      var self = this

        if(this.ponum != ''){
          this.filterArray = _.filter(this.filterArray,  function(item){
            // console.log("item",item)
            return item.PO_id === self.ponum;
          });
		      // console.log("myarr",this.filterArray)
          // this.list = await this.mockTableData2(1,self.pageSize)
        }

        if(this.invoicenum != ''){
          this.filterArray = _.filter(this.filterArray,  function(item){
            return item.invoiceId === self.invoicenum;
		      });
          // this.list = await this.mockTableData2(1,self.pageSize)
        }

        if(this.dategt != ''){
          // console.log("this.dategt", this.dategt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            if(moment(item.createdAt).diff(moment(self.dategt).format(), 'days') >= 0){
                // console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                return item;
            }
          });
		      // console.log("myarr",this.filterArray)
          // this.list = await this.mockTableData2(1,self.pageSize)
        }

        if(this.datelt != ''){
          // console.log("this.datelt", this.datelt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            // console.log("item",item.DueDate)
              if(moment(item.createdAt).diff(moment(self.datelt).format(), 'days') <= 0){
              return item;
              }
          });
		      // console.log("myarr",this.filterArray)
        	// this.list = await this.mockTableData2(1,self.pageSize)
		    }
		
		    if(this.duedategt != ''){
          // console.log("this.dategt", this.dategt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            if(moment(item.dueDate).diff(moment(self.duedategt).format(), 'days') >= 0){
                // console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                return item;
            }
          });
		      // console.log("myarr",this.filterArray)
        	// this.list = await this.mockTableData2(1,self.pageSize)
        }

        if(this.duedatelt != ''){
          // console.log("this.datelt", this.datelt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            // console.log("item",item.DueDate)
              if(moment(item.dueDate).diff(moment(self.duedatelt).format(), 'days') <= 0){
              return item;
              }
          });
          // console.log("myarr",this.filterArray)
          // this.list = await this.mockTableData2(1,self.pageSize)
        }
        
        if(this.email != ''){
          this.filterArray = _.filter(this.filterArray, function (item) {
            return item.supplier_email === self.email
          })
        }

        this.list = await this.mockTableData2(1,self.pageSize)
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    async init(){
      var self = this
      axios({
          method: 'get',
          url: config.default.subscriptionWebsitesapi,
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
            self.website = self.websiteList[0].websiteId;
            self.listData(self.website);
          }                       

      }).catch(error => {
          // console.log("-------",error);
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
    makepayment(data){
      // console.log("data---------------------------->",data)
      this.$router.push({
        name :"PO Checkout",
        params: {
          data:data.row
        }
      })
    },
    markAsPaid(value,params){
      let paymentNote = '';
      this.$Modal.confirm({
        title: "Payment Detail!",
        content: `Is payment of invoice <b>${params.row.invoiceId}</b> completed?`,
        okText:"Done",
        render: (h) => {
            return h('Input', {
                props: {
                    type: 'textarea',
                    value: paymentNote,
                    autofocus: true,
                    placeholder: 'Please enter Payment Detail...'
                },
                on: {
                    input: (val) => {
                        paymentNote= val;
                    }
                }
            })
        },
        onOk: () => {
          let self = this;
          if (value && paymentNote != '') {
            // console.log('-----------paymentNote',paymentNote)
            axios({
              method: 'patch',
              url: config.default.serviceUrl + 'po-invoice/' + params.row.id,
              data: {
                "status": "paid",
                "offlinePaymentNote" : paymentNote
              }
            })
            .then(async function (res) {
              // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@", res)
              self.data[params.index] = res.data
              self.list = await self.mockTableData1(1, self.pageSize)
              self.$Message.info(`Payment status changed for ${params.row.invoiceId}`);
            })
            .catch(function (error) {
              // console.log("$$$$$$$$$$$$$$$$$", error)
            })
          } else {
            self.$Modal.remove();
            self.$message.error("Enter payment detail");
          }
        },
        onCancel: () => {
          // this.$Message.info('Cancel');
        }
      });
    },
    listData (val) {
      let self = this
      let params1 = {
        websiteId :val
      }
      axios({
        method:'get',
        url: crmpostapiurl + 'po-invoice',
        params: params1,
      })
      .then(async function(response) {
          // console.log('response-------------->',response)
          self.data = _.orderBy(response.data.data, ['createdAt'], ['desc']);
          self.list = await self.mockTableData1(1,self.pageSize)
          var Emailarr = [];
          $('#selectEmail').children('option:not(:first)').remove();
          self.data.forEach(item => {
            self.ponumFilter.push(item.PO_id)
            self.invoicenumFilter.push(item.invoiceId)
            Emailarr.push(item.supplier_email);
            self.orderidfilter.push(item.orderId)
          })
          Emailarr = _.chain(Emailarr).sort().uniq().value();
          self.invoicenumFilter = _.chain(self.invoicenumFilter).sort().uniq().value();
          self.orderidfilter = _.chain(self.orderidfilter).sort().uniq().value();
          self.ponumFilter = _.chain(self.ponumFilter).sort().uniq().value();      
          // console.log("##########################",self.orderidfilter)
          Emailarr.forEach(item => {
            var x = document.getElementById("selectEmail");
            var option = document.createElement("option");
            option.text = item;
            // console.log()
            x.add(option);
          })
          // console.log('response-------------->list',self.list)
              
      }).catch(function (error){
        // console.log("error------------------->",error)
      })
    },
    async viewDetails(params,status){
      // this.tableHeight = 250
      // // console.log("this.tableHeight------->",this.len)
      // this.tableHeight = (this.len * 40) + 35
      // if(this.tableHeight >= 450){
      //     this.tableHeight = 450
      // }
      // if (!status) return 
      // $('.ivu-table-cell-expand-expanded').click()

      // if(status){
      //     this.tableHeight = 530
      //     // console.log("###############################",this.tableHeight)
      // }
    }
},
  mounted(){
    this.init();
    $('.panel-group').on('hidden.bs.collapse', this.toggleIcon);
            $('.panel-group').on('shown.bs.collapse', this.toggleIcon);
  }
}
</script>
<style>
.ivu-table-cell {
      word-break: break-word;
  }
</style>


