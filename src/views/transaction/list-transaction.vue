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
                              <div class="panel-collapse collapse" id="invoiceId">
                                 <input class="form-control" type="text" v-model="invoiceId"/>
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
                                      <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="dategt" style="width: 368px;"></DatePicker>
                                  </div>
                                  <div class="col-xs-3">
                                    <label>To Date</label>
                                      <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="datelt" style="width: 368px;"></DatePicker>
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

            <Tabs  @on-click="tabClicked" :value="tabIndex">
                <TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
                <Table v-if ="tabPane.domain=='Xero'"  :columns="columns1" :data="getData()" border size="small" ref="table" stripe></Table>
                <Table v-if ="tabPane.domain=='QB'"  :columns="columns2" :data="getData()" border size="small" ref="table" stripe></Table>
                <Table v-if ="tabPane.domain=='custom'"  :columns="columns3" :data="getData()" border size="small" ref="table" stripe></Table>

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
     list : {
         default: function () { return [] }
     },
     tabIndex : {
         default: function () { return 0 }
     }
  },
  data() {
      return {
       // msg : "weqweq",
       list1: this.list,
        tabPanes : [],
        //tabIndex: 0,
        spinShow: true,
        data : [],
        len:1,
        //list: [],
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


               let date = row.paymentAccounting.Invoice.Date;

               let initial = date.split(/\//);
                let formatDate = [ initial[1], initial[0], initial[2] ].join('/'); //=> 'mm/dd/yyyy'

                return moment(formatDate).format("ll")


              }
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
                render:(h,{row})=>{ return row.paymentAccounting.Account.value }
            },
            {
                title: 'Invoice No',
                key: 'InvoiceId',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Invoice.InvoiceID }
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

                var date1 = moment(row.paymentAccounting.Invoice.Date).format('DD-MMM-YYYY')
                return date1
                }
            },
            {
                title: 'Amount',
                key: 'Amount',
                sortable: true,
                render:(h,{row})=>{ return row.paymentAccounting.Amount }
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
    getData() {
      if (this.list1.length <= 0) {
        return this.list
      } else {
        return this.list1
      }
    },
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

       this.list1 = await this.mockTableData2(1,pageSize)
      }else{
        console.log("myarr",this.filterArray)
        this.list1 = await this.mockTableData2(1,pageSize)

      }

      if(this.invoiceId != ''){
        console.log("this.invoiceId", this.invoiceId)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)
          return item.paymentAccounting.Invoice.InvoiceNumber === self.invoiceId;
        });
         console.log("myarr",this.filterArray)
         this.list1 = await this.mockTableData2(1,pageSize)
      }

     if(this.dategt != ''){
        console.log("this.dategt", this.dategt)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item.paymentAccounting.Invoice.Date)
          var newdate = moment(self.dategt).format('MM/DD/YYYY');
          console.log("newdate",newdate)
          return item.paymentAccounting.Invoice.Date >= newdate;
        });
         console.log("myarr",this.filterArray)
         this.list1 = await this.mockTableData2(1,pageSize)
      }

      if(this.datelt != ''){
        console.log("this.datelt", this.datelt)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item.paymentAccounting.Invoice.Date)
          var newdate = moment(self.datelt).format('MM/DD/YYYY');
          console.log("newdate",newdate)
          return item.paymentAccounting.Invoice.Date <= newdate;
        });
         console.log("myarr",this.filterArray)
         this.list1 = await this.mockTableData2(1,pageSize)
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
            isActive : true,
            user : Cookies.get('user')
        },
        headers:{
            Authorization : Cookies.get('auth_token')
        },
      })
      .then(function (response) {
        // console.log("setting response",response);
        self.spinShow = false;
        if (response.data.data.length != 0)
        {

          self.tabPanes = response.data.data;
          console.log('self.tabPanes', self.tabIndex)
          $('.preload').css("display","none")
          let settingId = self.tabPanes[0].id;


          self.getTransaction(settingId)

        }
        else {
            self.$Modal.warning({
            title: 'No Configuration available',
            okText : "Go to Settings",
            content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
            onOk: () => {
                self.$router.push({
                    name: 'newsettings'
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
        this.list1 = await this.mockTableData1(p,pageSize);
      }else{
        this.list1 = await this.mockTableData2(p,pageSize);
      }
    },
    async getTransaction(settingId) {


        this.$Loading.start();
        this.data = [];
        let self = this;
        self.list1 = [];
        await axios.get(config.default.serviceUrl + 'transaction', {
            params : {

                settingId : settingId
            }
        })
        .then(async function (response) {
            console.log("transaction response",response);

            self.data = response.data.data;
            self.$Loading.finish();
            $('.preload').css("display","none")
            if(self.list1.length == 0){
              self.list1 = await self.mockTableData1(1,pageSize)
            } else {
            }
        })
        .catch(function (error) {
            console.log("error",error);
            self.$Loading.error();
        });

        var NameArr = [];


            self.data.forEach (obj => {

                console.log("/////////////////////////////////////////////////////////////////",obj.Name)
                NameArr.push(obj.paymentAccounting.Contact.Name);
              })
            NameArr.sort();

            NameArr.forEach(item => {
                var x = document.getElementById("selectCustomer");
                var option = document.createElement("option");
                option.text = item;
                console.log()
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
