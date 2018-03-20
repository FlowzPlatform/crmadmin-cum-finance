<template>
    <div>

        <div class="panel panel-default panel-group my-panel" id="accordion">
          <div class="panel-heading">
              <h4 class="panel-title" style="text-align:-webkit-right;"><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
          </div>
          <div class="panel-collapse collapse" id="collapseTwo">
              <div class="panel-body">
                  <form>
                      <div class="collapse-maindiv maindiv" >
                          <div class="panel panel-default">
                              <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#Customer"></span>
                                  <label>Customer Name</label>
                              </div>
                              <div class="panel-collapse collapse" id="Customer">
                                  <select class="form-control"  v-model="cname" id="selectCustomer">
                                    <option value="">All</option>
                                  </select>
                              </div>
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                  data-target="#invoiceId"></span>
                                  <label>Invoice No.</label>
                              </div>
                              <!--<div class="panel-collapse collapse" id="invoiceId">
                                 <input class="form-control" type="text" v-model="invoiceId"/>
                              </div>-->
                              <div class="panel-collapse collapse" id="invoiceId">
                                  <AutoComplete v-model="invoiceId" :data="invnoFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                  </AutoComplete>
                              </div>
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                  data-target="#date"></span>
                                  <label>Date</label>
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
                          <div style="margin-top: 5px;">
                            <Button type="warning" @click= "reset()" style= "float:right;margin-right: 5px;">Reset</Button>
                            <Button type="primary" @click= "changeData()" style= "float:right;    margin-right: 5px;">Apply</Button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
        </div>

        <div v-if="spinShow">
                <Spin size="large"></Spin>
        </div>
        <div v-else>

            <Tabs  @on-click="tabClicked" :value="tabIndex" class="my-tab">
                <TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
                <div v-if ="tabPane.domain=='Xero'">
                  <div v-if=" list.length > 0"><Table :columns="columns1" :data="list" :no-data-text="nodataMsg" border size="small" ref="table" stripe></Table></div>
                  <div v-else style="margin-left: 30%;color: red;">No transaction has been made for this Invoice</div>
                </div>
                <div v-if ="tabPane.domain=='QB'">
                  <div v-if=" list.length > 0"><Table :columns="columns2" :data="list" border size="small" ref="table" stripe></Table></div>
                  <div v-else style="margin-left: 30%;color: red;">No transaction has been made for this Invoice</div>
                </div>
                <div v-if ="tabPane.domain=='custom'">
                  <div v-if=" list.length > 0"><Table :columns="columns3" :data="list" border size="small" ref="table" stripe></Table></div>
                  <div v-else style="margin-left: 30%;color: red;">No transaction has been made for this Invoice</div>
                </div>
                <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                        <Page :total="len" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>

            </TabPane>
            </Tabs>
        </div>

  </div>
</template>

<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import moment from 'moment'
import Cookies from 'js-cookie';
import _ from 'lodash'


var pageSize = 10
export default {
  name: '',
  props: {
    //  list : {
    //      default: function () { return [] }
    //  },
    //  tabIndex : {
    //      default: function () { return 0 }
    //  }
  },
  data() {
      return {
       // msg : "weqweq",
       invnoFilter : [],
       nodataMsg: 'No Data',
       // list1: this.list,
        tabPanes : [],
        tabIndex: 0,
        spinShow: true,
        data : [],
        len:1,
        list: [],
        columns3:[],
        columns1: [
          {

              title: 'Payment Id',
              key: 'PaymentId',
              sortable: true,
              render:(h,{row})=>{ return row.paymentGateway.id }
          },
        //   {
        //       title: 'Accounting Id',
        //       key: 'AccountingId',
        //       sortable: true,
        //       render:(h,{row})=>{ return row.paymentAccounting.PaymentID }
        //   },


          {
              title: 'Invoice No.',
              key: 'InvoiceNumber',
              sortable: true,
              render:(h,{row})=>{ return row.paymentAccounting.Invoice.InvoiceNumber }
          },
          {
              title: 'Customer Name',
              key: 'Contact',
              sortable: true,
              render:(h,{row})=>{ return row.paymentAccounting.Contact.Name }
          },
          {
              title: 'Date',
              key: 'Date',
              sortable: true,
              render:(h,{row})=>{
                  var date = moment(row.paymentAccounting.Invoice.Date).format('DD-MMM-YYYY')
            //    let date = row.paymentAccounting.Invoice.Date;
            //    let initial = date.split(/\//);
            //     let formatDate = [ initial[1], initial[0], initial[2] ].join('/'); //=> 'mm/dd/yyyy'

                return date


              }
            //   render:(h,{row})=>{


            //    let date = row.paymentAccounting.Invoice.Date;
            //    let initial = date.split(/\//);
            //     let formatDate = [ initial[1], initial[0], initial[2] ].join('/'); //=> 'mm/dd/yyyy'

            //     return moment(formatDate).format("ll")


            //   }
          },
          {
              title: 'Amount',
              key: 'Amount',
              sortable: true,
              render:(h,{row})=>{ return row.paymentAccounting.Amount }
          }
        ],
        columns2: [
            {

              title: 'Payment Id',
              key: 'PaymentId',
              sortable: true,
              render:(h,{row})=>{ return row.paymentGateway.id }
            },

            tabIndex : {
                default: function () { return 0 }
            }
        },
        data() {
            return {
                flag: true,
                invnoFilter : [],
                nodataMsg: 'No Data',
                // list1: this.list,
                tabPanes : [],
                // tabIndex: 0,
                spinShow: true,
                data : [],
                len:1,
                // list: [],
                columns3:[],
                columns1: [
                    {

                        title: 'Payment Id',
                        key: 'PaymentId',
                        sortable: true,
                        render:(h,{row})=>{ 
                            // return row.paymentGateway.id
                            return h('div', [
                              h('span', row.paymentGateway.id)
                            ]); 
                        }
                    },
                    //   {
                    //       title: 'Accounting Id',
                    //       key: 'AccountingId',
                    //       sortable: true,
                    //       render:(h,{row})=>{ return row.paymentAccounting.PaymentID }
                    //   },


                    {
                        title: 'Invoice No.',
                        key: 'InvoiceNumber',
                        sortable: true,
                        render:(h,{row})=>{ 
                            // return row.paymentAccounting.Invoice.InvoiceNumber
                            return h('div', [
                              h('span', row.paymentAccounting.Invoice.InvoiceNumber)
                            ]); 
                        }
                    },
                    {
                        title: 'Customer Name',
                        key: 'Contact',
                        sortable: true,
                        render:(h,{row})=>{ 
                            // return row.paymentAccounting.Contact.Name 
                            return h('div', [
                              h('span', row.paymentAccounting.Contact.Name)
                            ]); 
                        }
                    },
                    {
                        title: 'Date',
                        key: 'Date',
                        sortable: true,
                        render:(h,{row})=>{
                            var date = moment(row.paymentAccounting.Invoice.Date).format('DD-MMM-YYYY')
                            return h('div', [
                                h('span', date)
                            ]);
                        }
                    },
                    {
                        title: 'Total Amount',
                        key: 'Amount',
                        sortable: true,
                        render:(h,{row})=>{
                          return h('div', [
                            h('span', accounting.formatMoney(row.paymentAccounting.Amount))
                          ]);  
                          // return  accounting.formatMoney(row.paymentAccounting.Amount) 
                        }
                    }
                ],
                columns2: [
                    {

                    title: 'Payment Id',
                    key: 'PaymentId',
                    sortable: true,
                    render:(h,{row})=>{ 
                      // return row.paymentGateway.id 
                      return h('div', [
                          h('span', row.paymentGateway.id)
                        ]);
                      }
                    },
                    // {
                    //     title: 'Accounting Id',
                    //     key: 'AccountingId',
                    //     sortable: true,
                    //     render:(h,{row})=>{ return row.paymentAccounting.PaymentID }
                    // },
                    {

                        title: 'Account Id',
                        key: 'value',
                        sortable: true,
                        render:(h,{row})=>{ 
                          // return row.paymentAccounting.Account.value 
                          return h('div', [
                              h('span', row.paymentAccounting.Account.value)
                            ]); 
                        }
                    },
                    {
                        title: 'Invoice No',
                        key: 'InvoiceId',
                        sortable: true,
                        render:(h,{row})=>{ 
                          // return row.paymentAccounting.Invoice.InvoiceID
                          return h('div', [
                              h('span', row.paymentAccounting.Invoice.InvoiceID)
                            ]);
                        }
                    },
                    {
                        title: 'Customer Name',
                        key: 'Contact',
                        sortable: true,
                        render:(h,{row})=>{ 
                          // return row.paymentAccounting.Contact.Name
                          return h('div', [
                              h('span', row.paymentAccounting.Contact.Name)
                            ]);
                        }
                    },
                    {
                        title: 'Date',
                        key: 'Date',
                        sortable: true,
                        render:(h,{row})=>{
                            var date1 = moment(row.paymentAccounting.Invoice.Date).format('DD-MMM-YYYY')
                            return h('div', [
                              h('span', date1)
                            ]);
                        }
                    },
                    {
                        title: 'Total Amount',
                        key: 'Amount',
                        sortable: true,
                        render:(h,{row})=>{ 
                           return h('div', [
                              h('span', accounting.formatMoney(row.paymentAccounting.Amount))
                            ]);
                        }
                    }
                ],
                columns3: [
                    {
                        title: 'Payment Id',
                        key: 'PaymentId',
                        sortable: true,
                        render:(h,{row})=>{ 
                          // return row.paymentGateway.id
                          return h('div', [
                              h('span', row.paymentGateway.id)
                            ]);
                          }
                    },
                    // {
                    //     title: 'Accounting Id',
                    //     key: 'AccountingId',
                    //     sortable: true,
                    //     render:(h,{row})=>{ return row.id }
                    // },
                    // {
                    //     title: 'Account Id',
                    //     key: 'value',
                    //     sortable: true,
                    //     render:(h,{row})=>{ return row.paymentAccounting.Account.value }
                    // },
                    {
                        title: 'Invoice No',
                        key: 'InvoiceId',
                        sortable: true,
                        render:(h,{row})=>{ 
                          // return row.paymentAccounting.Invoice.InvoiceNumber
                          return h('div', [
                              h('span', row.paymentAccounting.Invoice.InvoiceNumber)
                            ]);
                        }
                    },
                    {
                        title: 'Customer Name',
                        key: 'Contact',
                        sortable: true,
                        render:(h,{row})=>{ 
                          // return row.paymentAccounting.Contact.Name
                          return h('div', [
                              h('span', row.paymentAccounting.Contact.Name)
                            ]);
                        }
                    },
                    {
                        title: 'Payment Date',
                        key: 'Date',
                        sortable: true,
                        render:(h,{row})=>{
                            var date1 = moment(row.paymentAccounting.Invoice.Date).format('DD-MMM-YYYY')
                            // return date1
                            return h('div', [
                              h('span', date1)
                            ]);
                            // return row.paymentAccounting.Invoice.Date
                        }
                    },
                    {
                        title: 'Total Amount',
                        key: 'Amount',
                        sortable: true,
                        render:(h,{row})=>{ 
                          // return  accounting.formatMoney(row.paymentAccounting.Amount)
                          return h('div', [
                              h('span', accounting.formatMoney(row.paymentAccounting.Amount))
                            ]);
                        }
                    }
                ],
                filterArray: [],
                cname: '',
                invoiceId : '',
                dategt: '',
                datelt: ''

            }
        ],
        columns3: [
            {
              title: 'Payment Id',
              key: 'PaymentId',
              sortable: true,
              render:(h,{row})=>{ return row.paymentGateway.id }
            },
            // {
            //     title: 'Accounting Id',
            //     key: 'AccountingId',
            //     sortable: true,
            //     render:(h,{row})=>{ return row.id }
            // },
            // {
            //     title: 'Account Id',
            //     key: 'value',
            //     sortable: true,
            //     render:(h,{row})=>{ return row.paymentAccounting.Account.value }
            // },
            {
                title: 'Invoice No',
                key: 'InvoiceId',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Invoice.InvoiceNumber }
            },
            {
                title: 'Customer Name',
                key: 'Contact',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Contact.Name }
            },
            {
                title: 'Payment Date',
                key: 'Date',
                sortable: true,
                render:(h,{row})=>{

                return row.paymentAccounting.Invoice.Date
                }
            },
            {
                title: 'Amount',
                key: 'Amount',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Amount }
            }
        ],
        filterArray: [],
        cname: '',
        invoiceId : '',
        dategt: '',
        datelt: ''
      }
  },
  methods: {
      filterMethod (value, option) {
          return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
    // getData() {
    //   if (this.list1.length <= 0) {
    //     return this.list
    //   } else {
    //     return this.list1
    //   }
    // },
    // changeMessage(event) {
    //             this.message = event.target.value;
    //             this.$emit('messageChanged', this.message);
    // },
    reset() {
      this.cname = '';
      this.invoiceId = '';
      this.dategt = '';
      this.datelt = '';
      this.getAllSettings();
    },
    async changeData() {
      console.log("this.data", this.data)
      this.filterArray = this.data
      var self = this

      if(this.cname != ''){
       console.log("this.cname", this.cname)
       this.filterArray = _.filter(this.filterArray,  function(item){
        console.log("item",item)
          return item.paymentAccounting.Contact.Name === self.cname;

      });
       console.log("myarr",this.filterArray)
       this.list = await this.mockTableData2(1,pageSize)
      }else{
        console.log("myarr",this.filterArray)
        this.list = await this.mockTableData2(1,pageSize)
      }

      if(this.invoiceId != ''){
        console.log("this.invoiceId", this.invoiceId)
        this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)
            //   return item.paymentAccounting.Invoice.InvoiceNumber === self.invoiceId;
            if(item.paymentAccounting.Invoice.InvoiceNumber != undefined){
                return item.paymentAccounting.Invoice.InvoiceNumber === self.invoiceId;
            }else{
                return item.paymentAccounting.Invoice.InvoiceID === self.invoiceId;
            }
        });
         console.log("myarr",this.filterArray)
         this.list = await this.mockTableData2(1,pageSize)
      }

    //  if(this.dategt != ''){
    //     console.log("this.dategt", this.dategt)
    //     this.filterArray = _.filter(this.filterArray,  function(item){
    //       // if(moment(item.DueDate).diff(moment(self.dategt).format(), 'days') >= 0){
    //       //   console.log('item>>>>>>>>>>>>>>>>>>>>', item)
    //       //   return item;
    //       // }
    //       console.log("item",item.paymentAccounting.Invoice.Date)
    //       var newdate = moment(self.dategt).format('DD/MM/YYYY');
    //       console.log("newdate",newdate)
    //       console.log('item.paymentAccounting.Invoice.Date >= newdate;', item.paymentAccounting.Invoice.Date >= newdate)
    //       return item.paymentAccounting.Invoice.Date >= newdate;
    //     });
    //      console.log("myarr",this.filterArray)
    //      this.list = await this.mockTableData2(1,pageSize)

    //   }

    //   if(this.datelt != ''){
    //     console.log("this.datelt", this.datelt)
    //     this.filterArray = _.filter(this.filterArray,  function(item){
    //       console.log("item",item.paymentAccounting.Invoice.Date)
    //       var newdate = moment(self.datelt).format('DD/MM/YYYY');
    //       console.log("newdate",newdate)
    //       return item.paymentAccounting.Invoice.Date <= newdate;
    //     });
    //      console.log("myarr",this.filterArray)
    //      this.list = await this.mockTableData2(1,pageSize)
    //   }

        if(this.dategt != ''){
            console.log("this.dategt", this.dategt)
            this.filterArray = _.filter(this.filterArray,  function(item){
            if(moment(item.paymentAccounting.Invoice.Date).diff(moment(self.dategt).format(), 'days') >= 0){
                return item;
            }
            });
            console.log("myarr",this.filterArray)
            this.list = await this.mockTableData2(1,pageSize)

        }

        if(this.datelt != ''){
            console.log("this.datelt", this.datelt)
            this.filterArray = _.filter(this.filterArray,  function(item){
            if(moment(item.paymentAccounting.Invoice.Date).diff(moment(self.datelt).format(), 'days') <= 0){
                return item;
            }
            });
            console.log("myarr",this.filterArray)
            this.list = await this.mockTableData2(1,pageSize)
        }

    },
    async mockTableData2 (p,size) {
      console.log("p-------------->",p)
      console.log("p-------------->",size)
      console.log("console.log------------>",this.filterArray)
      this.len = this.filterArray.length
      return this.filterArray.slice((p - 1) * size, p * size);
    },
    async getAllSettings(){
      let self = this;

      axios.get(config.default.serviceUrl + 'settings', {
        params : {
            isActive : true
        },
        headers:{
            Authorization : Cookies.get('auth_token'),
            subscriptionId : Cookies.get('subscriptionId')
        },
      })
      .then(function (response) {
        console.log("setting response",response);
        self.list = self.list
        self.spinShow = false;
        if (response.data.data.length != 0)
        {

          self.tabPanes = response.data.data;
          $('.preload').css("display","none")
          console.log('this.tabPanes', self.tabPanes)
          console.log('this.tabIndex', self.tabIndex)
          let settingId = self.tabPanes[self.tabIndex].id;
          // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', self.list[0].key)

          self.getTransaction(settingId)

        }
        else {
            self.$Modal.warning({
            title: 'No Configuration available',
            okText : "Go to Settings",
            content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
            onOk: () => {
                self.$router.push({
                    name: 'Settings'
                })
              }
            });
        }
      })
      .catch(function (error) {

        console.log("error",error);
        self.spinShow = false;
      });
    },
    async tabClicked(data){
        console.log(this.tabPanes)
        console.log(">>>>>>>>>>>>>>>>>> " , data)
        this.reset();
        this.tabIndex = data;
        let settingId = this.tabPanes[data].id
        this.getTransaction(settingId);
    },

    async mockTableData1 (p,size) {
              this.len = this.data.length
              return this.data.slice((p - 1) * size, p * size);
    },
    async changePage (p) {
      this.page = p
      console.log("not inside",this.filterArray.length)
      if(this.filterArray.length == 0){
        console.log("inside",this.filterArray)
        this.list = await this.mockTableData1(p,pageSize);
      }else{
        this.list = await this.mockTableData2(p,pageSize);
      }
    },
    async getTransaction(settingId) {


        this.$Loading.start();
        this.data = [];
        let self = this;
        self.list = [];
        await axios.get(config.default.serviceUrl + 'transaction', {
            params : {
                settingId : settingId
            }
        })
        .then(async function (response) {
            console.log("transaction response",response);
            var deep = _.cloneDeep(response.data.data);
            _(deep).each(function(item , index){
                var dt = moment(item.paymentAccounting.Invoice.Date,['DD-MM-YYYY','MM-DD-YYYY'])
                item.paymentAccounting.Invoice.Date = dt._d
            })
            var desc =  _.orderBy(deep, 'paymentAccounting.Invoice.Date',  'desc');                         
            self.data = desc;
            self.invnoFilter = [];

            // self.data = response.data.data;
            self.$Loading.finish();
            $('.preload').css("display","none")
            if(self.list.length == 0){
              self.list = await self.mockTableData1(1,pageSize)
            } else {
              // if(self.list[0].key){
              //   self.list = []
              // } else {
              // }
              // $('.my-tab .ivu-tabs-tab').addClass('ivu-tabs-tab-disabled')

            }
        })
        .catch(function (error) {
            console.log("error",error);
            self.$Loading.error();
        });

        var NameArr = [];

            self.data.forEach (obj => {
                // console.log("/////////////////////////////////////////////////////////////////",obj.Name)
                NameArr.push(obj.paymentAccounting.Contact.Name);
                if(obj.paymentAccounting.Invoice.InvoiceNumber != undefined){
                  self.invnoFilter.push(obj.paymentAccounting.Invoice.InvoiceNumber);
                }else{
                  self.invnoFilter.push(obj.paymentAccounting.Invoice.InvoiceID);
                }
              })
            // NameArr.sort();
            NameArr = _.chain(NameArr).sort().uniq().value();

            NameArr.forEach(item => {
                var x = document.getElementById("selectCustomer");
                var option = document.createElement("option");
                option.text = item;
                // console.log()
                x.add(option);
            })
    }
  },
  mounted() {
      this.getAllSettings()

  },
  watch: {
    '$route': function (id) {
      console.log(id)

     // this.activetab = "2"
    }
  }
}
</script>

<style>
    .ivu-table-cell {
        word-break: break-word;
    }
    .ivu-auto-complete.ivu-select-dropdown {
        max-height: 200px !important;
    }
</style>