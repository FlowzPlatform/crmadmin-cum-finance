<template>
<div>
  <div style="padding: 10px; margin: 5px; display: block;">
    <div>
        <h1>Invoice List </h1>
        <div class="panel panel-default panel-group" id="accordion">
            <div class="panel-heading">
                <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
            </div>
            <div class="panel-collapse collapse" id="collapseTwo">
                <div class="panel-body">
                    <form>
                        <div class="collapse-maindiv maindiv">
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#Customer"></span>
                                    <label>Customer Name</label>
                                </div>
                                <div class="panel-collapse collapse" id="Customer">
                                    <select class="form-control"  v-model="cname" id="selectCustomer">
                                      <option disabled value="">Please select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                    data-target="#status"></span>
                                    <label>status</label>
                                </div>
                                <div class="panel-collapse collapse" id="status">
                                    <select class="form-control mb-2 mb-sm-0" v-model="status" name="status">
                                        <option disabled value="">Please select</option>
                                        <option value="PAID">PAID</option>
                                        <option value="AUTHORISED">AUTHORISED</option>
                                        <option value="DRAFT">DRAFT</option>
                                    </select>
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
                                        <input class="form-control" type="date" v-model="dategt"/>
                                    </div>
                                    <div class="col-xs-3">
                                      <label>To Date</label>
                                        <input class="form-control" type="date" v-model="datelt" />
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                    data-target="#amount"></span>
                                    <label>Total Amount</label>
                                </div>
                                <div class="form-group row panel-collapse collapse" id="amount">
                                    <div class="col-xs-3">
                                        <input class="form-control" type="text" v-model="totalgt" placeholder="Min-Amount" />
                                    </div>
                                    <div class="col-xs-3">
                                       
                                        <input class="form-control" type="text" v-model="totallt" placeholder="Max-Amount" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                                    data-target="#dueamount"></span>
                                    <label>Due Amount</label>
                                </div>
                                <div class="form-group row panel-collapse collapse" id="dueamount">
                                    <div class="col-xs-3">
                                        <input class="form-control" type="text" v-model="duegt" placeholder="Min-Due Amount"/>
                                    </div>
                                    <div class="col-xs-3">
                                      <input class="form-control" type="text" v-model="duelt" placeholder="Max-Due Amount"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                              <Button type="warning" @click= "reset()" style= "float:right;">Reset</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div>
    <div style="" keys="InvoiceID,Name,Total,Date,AmountPaid,AmountDue,status,action">
        <div v-if="!spind">
          <Spin size="large"></Spin>
        </div>
        <div v-else>
         <Table border :columns="columns1" :data="list" id="tbdata" stripe></Table>
         <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="len" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
        </div>
    </div>
</div>
</div>
</template>



<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import Handlebars from 'handlebars'
import { mjml2html } from 'mjml'
import Cookies from 'js-cookie';
var pageSize = 10
export default {
  name: 'hello',
  data () {
    return {
      spind: false,
       columns1: [
          {
              title: 'InvoiceID',
              key: 'InvoiceID',
              sortable: true
          },
          {
              title: 'Name',
              key: 'Name',
              sortable: true
          },
          {
              title: 'Date',
              key: 'Date',
              sortable: true
          },
           {
              title: 'AmountPaid',
              key: 'AmountPaid',
              sortable: true
          },
          {
              title: 'AmountDue',
              key: 'AmountDue',
              sortable: true
          },
          {
              title: 'Total',
              key: 'Total',
              sortable: true
          },
          {
              title: 'status',
              key: 'status',
              sortable: true
          },
          {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              if(params.row.status == 'AUTHORISED'){
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      loading: params.row.loading 
                      },
                    style: {
                    },
                    on: {
                      click: () => {   
                        this.makepayment(params)
                      }
                    }
                  }, 'Payment'),
                   h('Button', {
                   props: {
                      type: 'primary',
                      size: 'small',
                      loading: params.row.loading1
                    },
                    style: {
                      margin: '2px'
                    },
                    on: {
                      click: () => {
                        this.sendemail(params)
                      }
                    }
                  }, 'Email')
                ])
              }else{
                return h('div', [
                   h('Button', {
                   props: {
                      type: 'primary',
                      size: 'small',
                      loading: params.row.loading1
                    },
                    style: {
                    },
                    on: {
                      click: () => {
                        this.sendemail(params)
                      }
                    }
                  }, 'Email')
                ])
              }
            }
          }
      ],
      data1: [],
      page: 1,
      pageSize: pageSize,
      list: [],
      resdata: '',
      resp: '',
      ids: '',
      titles: '',
      len: 1,
      cname: '',
      status: '',
      dategt: '',
      datelt: '',
      totalgt: '',
      totallt: '',
      duegt: '',
      duelt: ''
    }
  },
   methods: {
    async mockTableData1 (p,size) {
      this.len = this.data1.length
      console.log("this.data1",this.data1)
                return this.data1.slice((p - 1) * size, p * size);
    },
    async changePage (p) {
      
      this.page = p
      this.list = await this.mockTableData1(p,pageSize);
    },
    async searchdata() {
      $('.preload').css("display","block")
      this.resdata = await this.apiData();
      console.log("response------------------------>", this.resdata)
      this.tableDataBind();
      this.list = await this.mockTableData1(1,pageSize)
      this.spind = true
    },
    reset() {
      this.cname = '';
      this.status = '';
      this.dategt = '';
      this.datelt = '';
      this.totalgt = '';
      this.totallt = '';
      this.duegt = '';
      this.duelt = '';
      this.data1 = []
      this.list = []
      this.searchdata();
    },
    async changeData() {
      this.data1 = []
      this.list = []
      console.log("Inside change data")
      this.resdata = await this.changeApiData();
      console.log("response------------------------>", this.resdata)
      this.tableDataBind();
      this.list = await this.mockTableData1(1,pageSize);
    },
    async getCustomerUrl(){
      console.log("inside getCustomerUrl " )
      var res
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.default.serviceUrl + 'contacts',
        "method": "GET",
        "headers": {
          "cache-control": "no-cache"
        }
      }
      console.log("settings", settings)
      await $.ajax(settings).done(function (response) {
          res = response
          console.log("$$$$$$$$$$$$$$!!!!!!!!!!!!!!!!!!", response)
        });
          res.forEach (obj => {
        var x = document.getElementById("selectCustomer");
            var option = document.createElement("option");
            option.text = obj.Name;
            x.add(option);
      })
    },
    async apiData () {
      var resp;
      console.log("TRTYYTYTT");
      await axios.get(config.default.serviceUrl + 'invoice', {
        params: {
          domain : "Xero"
        }
      })
      .then(function (response) {
        resp = response
        console.log("response------>iuy",resp);
        $('.preload').css("display","none")
      })
      .catch(function (error) {
        console.log("error",error);
      });
      return resp
    },
    async changeApiData () {
      var resp;
      var params = {}
      if(this.cname != ''){
        params['Name'] = this.cname   
      }
      if(this.status != ''){ 
        params['Status'] = this.status  
      }
      if(this.dategt != ''){
        params['Date'] = this.dategt        
      }
      if(this.totalgt != ''){
        params['Total'] = this.totalgt
        
      }
      if(this.duegt != ''){ 
        params['AmountDue'] =  this.duegt
      }
      
      console.log("params api data", params)
      await axios.get(config.default.serviceUrl + 'invoice?domain=Xero', {
        params: params
      })
      .then(function (response) {
        resp = response
        console.log("response changePage------>",resp);
        $('.preload').css("display","none")
      })
      .catch(function (error) {
        console.log("error",error);
      });
      return resp
    },
    tableDataBind(){
          var self = this
          if(this.resdata.data.Err){
            console.log("error in response",this.resdata.data.Err)
          }else{
            this.resp = this.resdata.data
            console.log("inside table data bind",this.resp)
            this.resp.forEach(result =>{
              var myobj = {}
              myobj.Name = result.Contact.Name
              myobj.InvoiceID = result.InvoiceID
              myobj.AmountDue = result.AmountDue
              myobj.AmountPaid = result.AmountPaid
              myobj.Date = result.Date
              myobj.Total = result.Total
              myobj.status = result.Status
              myobj.loading = false
              myobj.loading1 = false
              self.data1.push(myobj)
            })
            }
          
    },
    async makepayment(params){
      this.$router.push('/checkout/' + params.row.InvoiceID)
    },
    async sendemail(params){
      var self = this
      this.list[params.index].loading1 = true
      console.log("inside send mail", params)
      var responseData
        await axios.get(config.default.serviceUrl + 'invoice?domain=Xero', {
          params: {
            Invoiceid:params.row.InvoiceID
          }
        })
        .then(function (response) {
          console.log("response data", response)
          responseData = response.data
        })
        .catch(function (error) {
          console.log("error",error);
        });
      console.log("send mail responsedata", responseData)
      var MjmlTemplate
      await $.get( "mailtemplate.txt", function( data ) {
        MjmlTemplate = data
      });
      
      var template = Handlebars.compile(MjmlTemplate); 
      console.log("template", template)
       var context = {
          invoice : responseData
        }
      const mjml = template(context);
      const html1 = mjml2html(mjml);
       let myData = {
            "to": "npaul@officebrain.com",
            "from": "kdalsania@officebrain.com",
            "subject": "email invoice",
            "body": html1.html
          }
          myData = JSON.stringify(myData)
          axios({
            method: 'post',
            url:  'http://api.flowz.com/vmailmicro/sendEmail',
            data: myData,
            headers: {
              'authorization':  Cookies.get('auth_token')
            }
            }).then(function (response) {
              console.log(response);
              self.$Message.success(response.data.success);
              self.list[params.index].loading1 = false
            })
            .catch(function (error) {
              console.log(error);
            });
    }
     
  },
  mounted() {
    let self = this;
    
     $('.maindiv').change(async function() {
      await self.changeData();
    }); 
    this.getCustomerUrl();
    this.searchdata();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.panel {
  margin-bottom: 7px;
}
.panel-heading{
  padding: 4px 8px;
}
.ivu-table table {
  font-size: 14px;
}
.ivu-table th{
  background-color: #d9edf7;
}
.ivu-table-border th {
    border-right: 1px solid #ddd;
}
.ivu-spin-main {
    width: 100%;
    text-align: -webkit-center;
}
</style>