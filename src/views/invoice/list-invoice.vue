<template>
<div>
  
  <!-- <div style="padding: 10px; margin: 5px; display: block;" >
    <div>
        <h1>Invoice List </h1>
        <div class="panel panel-default panel-group" id="accordion">
            <div class="panel-heading">
                <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
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
</div> -->

<div>
  
  <div v-if="spinShow">
                <Spin size="large"></Spin>
  </div>
  <div v-else>
    
     <Tabs  @on-click="tabClicked">
        <TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
          <Table v-if ="tabPane.domain=='Xero'" :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
          <Table v-else :columns="columns2" :data="list" border size="small" ref="table" stripe></Table>
          
          <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                  <Page :total="len" :current="1" @on-change="changePage"></Page>
              </div>
          </div>
      </TabPane>
    </Tabs>  
  </div>  

    <!-- <div style="" keys="InvoiceID,Name,Total,Date,AmountPaid,AmountDue,status,action">
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
          </div> -->

</div>


<div>
  
  <div v-if="emailData != ''" ref="email1" style="display:none">
 
 <div class="invoice-box" style="max-width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, .15);font-size: 16px;line-height: 24px;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;color: #555;">
        <table cellpadding="0" cellspacing="0" style="width: 100%;line-height: inherit;text-align: left;">
            <tbody><tr class="top">
                <td colspan="3" style="padding: 5px;vertical-align: top;">
                    <table style="width: 100%;line-height: inherit;text-align: left;">
                        <tbody><tr>
                            <td class="title" style="font-size: 45px;line-height: 45px;color: #333;padding-bottom: 20px;padding: 5px;vertical-align: top;">
                                <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;">
                            </td>
                            
                            <td style="padding-bottom: 20px;text-align: right;padding: 5px;vertical-align: top;">
                                Invoice #: {{emailData.row.InvoiceNumber}}<br>
                                Created: {{emailData.row.Date}}<br>
                                Due: {{emailData.row.DueDate}}
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            
            <tr>
            <td colspan="3" style="padding: 5px;vertical-align: top;">
                    <table style="width: 100%;line-height: inherit;text-align: left;">
                        <tbody><tr>
                            <td style="padding-bottom: 40px;padding: 5px;vertical-align: top;">
                                <b>To :</b><br>
                                {{emailData.row.Contact.Name}}<br>
                                Sparksuite, Inc.<br>
                                12345 Sunny Road<br>
                                Sunnyville, CA 12345
                            </td>
                            
                            <td style="padding-bottom: 40px;text-align: right;padding: 5px;vertical-align: top;">
                                <b>From :</b><br>
                                Acme Corp.<br>
                                John Doe<br>
                                john@example.com
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
            
            <tr>
                <td style="background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;padding: 5px;vertical-align: top;">
                    Payment Method
                </td>
                <td style="background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;padding: 5px;vertical-align: top;"></td>
                <td style="background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;padding: 5px;vertical-align: top;text-align: right;">
                    Check 
                </td>
            </tr>
            
            <tr>
                <td style="padding: 5px;vertical-align: top;padding-bottom: 20px;">
                    Stripe
                </td>
                <td></td>
                <td style="padding-bottom: 20px;text-align: right;padding: 5px;vertical-align: top;">
                    1000
                </td>
            </tr>

             <tr>
                <td style="background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;padding: 5px;vertical-align: top;text-align:center">
                    Item
                </td>
                
                <td style="background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;padding: 5px;vertical-align: top;text-align:center">
                    Paid Amount
                </td>

                <td style="background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;padding: 5px;vertical-align: top;text-align:center">
                    Due Amount
                </td>
            </tr>
            
            <tr>
                <td style="border-bottom: 1px solid #eee;padding: 5px;vertical-align: top;text-align:center">
                    Website design
                </td>
                
                <td style="border-bottom: 1px solid #eee;padding: 5px;vertical-align: top;text-align:center">
                    ${{emailData.row.AmountPaid}}
                </td>
                <td style="border-bottom: 1px solid #eee;text-align:center;padding: 5px;vertical-align: top;">
                    ${{emailData.row.AmountDue}}
                </td>
            </tr>
            
            
            <tr>
                <td style="padding: 5px;vertical-align: top;"></td>
                <td style="padding: 5px;vertical-align: top;"></td>
                <td style="padding: 5px;vertical-align: top;"></td>
            </tr>
            <tr>
                <td style="padding: 5px;vertical-align: top;"></td>
                <td style="padding: 5px;vertical-align: top;"></td>
                <td style="border-top: 2px solid #eee;font-weight: bold;text-align: right;padding: 5px;vertical-align: top;">
                   Sub Total: ${{emailData.row.SubTotal}}
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;vertical-align: top;"></td>
                <td style="padding: 5px;vertical-align: top;"></td>
                
                <td style="border-top: 2px solid #eee;font-weight: bold;text-align: right;padding: 5px;vertical-align: top;">
                   Tax: ${{emailData.row.TotalTax * 100}}%
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;vertical-align: top;"></td>
                <td style="padding: 5px;vertical-align: top;"></td>
                
                <td style="border-top: 2px solid #eee;font-weight: bold;text-align: right;padding: 5px;vertical-align: top;">
                   Total: ${{emailData.row.Total}}
                </td>
            </tr>
            
           
        </tbody></table>
    </div>

</div>
<div id="editor"></div>
</div>
</div>
</template>



<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import jsPDF from 'jspdf'
import money from '../../images/Payment.png'
import mail from '../../images/Mail.png'
import download from '../../images/Download.png'

//import Handlebars from 'handlebars'
//import { mjml2html } from 'mjml'
import Cookies from 'js-cookie';

var pageSize = 10
export default {
  name: 'hello',
  data () {
    return {
      tabPanes : [],
      spinShow: true,
      money,
      mail,
      download,
      emailData : '',
      columns2: [
          {
              title: 'Invoice',
              key: 'InvoiceNumber',
              sortable: true
          },
          {
              title: 'Name',
              key: 'CustomerRef',
              sortable: true,
              render : (h , {row}) => { return row.CustomerRef.name}
          },
          {
              title: 'Due Date',
              key: 'DueDate',
              sortable: true,
              render : (h,{row}) => {
                var date = new Date(row.DueDate); 
                var date1 = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
                return date1
              }
          },
          {
              title: 'Amount Paid',
              sortable: true,
              render : (h , {row}) => { return row.TotalAmt-row.Balance}
          },
          {
              title: 'Amount Due',
              key: 'Balance',
              sortable: true
          },
          {
              title: 'Total Amount',
              key: 'TotalAmt',
              sortable: true
              
          },
          {
              title: 'Status',
              sortable: true,
              render : (h , {row}) => {
                 if(row.TotalAmt-row.Balance == 0){
                   return "PAID"
                 }else{
                   return "AUTHORISED"
                 }
              }
          },
          {
            title: 'Action',
            key: 'Status',
            align: 'center',
            render: (h, {row}) => {
              if(row.TotalAmt-row.Balance != 0){
                return h('div', [
                  h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Make Payment'
                      },
                      style:{
                        float:'left'
                      }
                    }, [
                      h('img', {
                        attrs: {
                          src:this.money
                        },
                        style: {
                          height:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {   
                            this.makepayment(row)
                          }
                        }
                      },'')
                    ]),
                  h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Download'
                      },
                      style:{
                        float:'center'
                      }
                    }, [
                       h('img', {
                        attrs: {
                          src :this.download
                          },
                        style: {
                          height:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {   
                            this.createPDF(row)
                          }
                        }
                      }, '')
                    ]),
               h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Send Mail'
                      },
                      style:{
                        float:'center'
                      }
                    }, [
                      h('img', {
                        attrs: {
                          src : this.mail
                        },
                        style: {
                          height:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {
                            this.sendemail(row)
                          }
                        }
                      }, '')
                    ])
                ])
              }else{
                return h('div', [
                  h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Send Mail'
                      },
                      style:{
                        float:'center'
                      }
                    }, [
                      h('img', {
                        attrs: {
                          src : this.mail
                        },
                        style: {
                          height:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {
                            this.sendemail(row)
                          }
                        }
                      }, '')
                    ]),
                    h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Download'
                      },
                      style:{
                        float:'right'
                      }
                    }, [
                    h('img', {
                      attrs: {
                          src : this.download
                      },
                      style: {
                        height:'30px',
                        width:'30px',
                        margin: '2px'
                      },
                      on: {
                        click: () => {   
                          this.createPDF(row)
                        }
                      }
                    }, '')
                  ])
                ])
              }
            }
          }
      ],
       columns1: [
          {
              title: 'Invoice',
              key: 'InvoiceNumber',
              sortable: true
          },
          {
              title: 'Name',
              key: 'Contact',
              sortable: true,
              render:(h,{row})=>{ return row.Contact.Name }
          },
          {
              title: 'Date',
              key: 'Date',
              sortable: true,
              render:(h,{row})=>{ 
  
               var date = new Date(row.Date); 
               var date1 = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
                return date1
              }
          },
           {
              title: 'Paid',
              key: 'AmountPaid',
              sortable: true
          },
          {
              title: 'Due',
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
              key: 'Status',
              sortable: true
          },
          {
            title: 'Action',
            key: 'Status',
            align: 'center',
            render: (h, params) => {
              if(params.row.Status == 'AUTHORISED'){
                return h('div', [
                  h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Make Payment'
                      },
                      style:{
                        float:'left'
                      }
                    }, [
                        h('img', {
                          attrs: {
                            src: this.money
                          },
                          style: {
                            hight:'30px',
                            width:'30px',
                            margin: '2px'
                          },
                          on: {
                            click: () => {   
                              this.makepayment(params.row)
                            }
                        }
                      }, '')
                    ]),
                   h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Send Mail'
                      },
                      style:{
                        float:'center'
                      }
                    }, [
                      h('img', {
                       attrs: {
                          src: this.mail
                        },
                        style: {
                          hight:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {
                            this.sendemail(params)
                          }
                        }
                      },'')
                    ]),
                    h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Download'
                      },
                      style:{
                        float:'right'
                      }
                    }, [
                       h('img', {
                       attrs: {
                          src: this.download
                        },
                        style: {
                          hight:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {   
                            this.createPDF(params)
                          }
                        }
                      }, '')
                  ])
                ])
              }else{
                return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Send Mail'
                      },
                      style:{
                        float:'center'
                      }
                    }, [
                      h('img', {
                       attrs: {
                          src: this.mail
                        },
                        style: {
                          hight:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {
                            this.sendemail(params)
                          }
                        }
                      }, '')
                    ]),
                    h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Download'
                      },
                      style:{
                        float:'right'
                      }
                    }, [
                    h('img', {
                      attrs: {
                          src: this.download
                        },
                        style: {
                          hight:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                      on: {
                        click: () => {   
                          this.createPDF(params)
                        }
                      }
                    }, '')
                  ])
                ])
              }
            }
          }
      ],

       
      settingIdForPayment : '',
      data6: [],
      emailIdTobeSent : '',
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
    // async mockTableData1 (p,size) {
    //   this.len = this.data1.length
    //   console.log("this.data111",this.data1)
    //             return this.data1.slice((p - 1) * size, p * size);
    // },
    // async changePage (p) {
      
    //   this.page = p
    //   this.list = await this.mockTableData1(p,pageSize);
    // },
    // async searchdata() {
    //   $('.preload').css("display","block")
    //   this.resdata = await this.apiData();
    //   console.log("response------------------------>", this.resdata)
    //   this.tableDataBind();
    //   this.list = await this.mockTableData1(1,pageSize)
    //   this.spind = true
    // },
    // reset() {
    //   this.cname = '';
    //   this.status = '';
    //   this.dategt = '';
    //   this.datelt = '';
    //   this.totalgt = '';
    //   this.totallt = '';
    //   this.duegt = '';
    //   this.duelt = '';
    //   this.data1 = []
    //   this.list = []
    //   this.searchdata();
    // },
    // async changeData() {
    //   this.data1 = []
    //   this.list = []
    //   console.log("Inside change data")
    //   this.resdata = await this.changeApiData();
    //   console.log("response------------------------>", this.resdata)
    //   this.tableDataBind();
    //   this.list = await this.mockTableData1(1,pageSize);
    // },
    // async getCustomerUrl(){
    //   console.log("inside getCustomerUrl " )
    //   var res
    //     var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": config.default.serviceUrl + 'contacts',
    //     "method": "GET",
    //     "headers": {
    //       "cache-control": "no-cache"
    //     }
    //   }
    //   console.log("settings", settings)
    //   await $.ajax(settings).done(function (response) {
    //       res = response
    //       console.log("$$$$$$$$$$$$$$!!!!!!!!!!!!!!!!!!", response)
    //     });
    //       res.forEach (obj => {
    //     var x = document.getElementById("selectCustomer");
    //         var option = document.createElement("option");
    //         option.text = obj.Name;
    //         x.add(option);
    //   })
    // },
    // async apiData () {
    //   var resp;
    //   let self=this;
    //   console.log("TRTYYTYTT");
    //   await axios.get(config.default.serviceUrl + 'invoice', {
    //     headers:{
    //         Authorization : Cookies.get('auth_token')
    //     },
    //   })
    //   .then(function (response) {
    //     resp = response
    //     console.log("response------>iuy",resp);
    //     self.tabPanes = response.data
    //     $('.preload').css("display","none")
    //   })
    //   .catch(function (error) {
    //     console.log("error",error);
    //   });
    //   return resp
    // },
    // async changeApiData () {
    //   var resp;
    //   var params = {};
    //   let self = this;
    //   if(this.cname != ''){
    //     params['Name'] = this.cname   
    //   }
    //   if(this.status != ''){ 
    //     params['Status'] = this.status  
    //   }
    //   if(this.dategt != ''){
    //     params['Date'] = this.dategt        
    //   }
    //   if(this.totalgt != ''){
    //     params['Total'] = this.totalgt
        
    //   }
    //   if(this.duegt != ''){ 
    //     params['AmountDue'] =  this.duegt
    //   }
      
    //   console.log("params api data", params)
    //   await axios.get(config.default.serviceUrl + 'invoice?domain=Xero', {
    //     params: params
    //   })
    //   .then(function (response) {
    //     resp = response
    //     console.log("response changePage------>",resp);
        
    //     $('.preload').css("display","none")
    //   })
    //   .catch(function (error) {
    //     console.log("error",error);
    //   });
    //   return resp
    // },
    // tableDataBind(){
    //       var self = this
    //       if(this.resdata.data.Err){
    //         console.log("error in response",this.resdata.data.Err)
    //       }else{
    //         this.resp = this.resdata.data
    //         console.log("inside table data bind",this.resp)
    //         this.resp.forEach(result =>{
    //           //console.log(result)
    //           result.data.forEach(result2 =>{
    //             var myobj = {}
    //           myobj.Name = result2.Contact.Name
    //           myobj.InvoiceID = result2.InvoiceID
    //           myobj.AmountDue = result2.AmountDue
    //           myobj.AmountPaid = result2.AmountPaid
    //           myobj.Date = result2.Date
    //           myobj.Total = result2.Total
    //           myobj.status = result2.Status
    //           myobj.loading = false
    //           myobj.loading1 = false
    //           self.data1.push(myobj)
    //           })
              
    //         })
    //         }
          
    // },
    async mockTableData1 (p,size) {
              this.len = this.data6.length
              return this.data6.slice((p - 1) * size, p * size);
    },
    async changePage (p) {
              this.page = p
              this.list = await this.mockTableData1(p,pageSize);
    },
    createPDF (params) {
      this.emailData = params;
      var self = this;
      setTimeout(function(){ 
        self.$Modal.confirm({
          title: '',
          content: self.$refs.email1.innerHTML,
          width: 1000,
          okText: 'Download',
          onOk: () => {
            var filename = "invoice.html";
            var data = self.$refs.email1.innerHTML;
            var blob = new Blob([data], {
                type: "text/html;charset=utf-8"
            });
            saveAs(blob, filename);
          },
          onCancel: () => {
          }
        })
        // console.log(self.$refs.email1.innerHTML)
        //   var filename = "invoice.html";
        //   var data = self.$refs.email1.innerHTML;
        //   var blob = new Blob([data], {
        //       type: "text/html;charset=utf-8"
        //   });
        //   saveAs(blob, filename);
       }, 2000);
    },

    async makepayment(params){
      console.log(params)
      this.$store.state.invoiceData = params;
      this.$store.state.settingId = this.settingIdForPayment
      console.log(">>>>>>>>> " , this.$store.state.invoiceData);
       this.$router.push('/checkout/' + params.InvoiceID)
    },
    async sendemail(params){
      this.$Loading.start();
      this.emailData = params;
       var self = this;
       this.$Modal.confirm({
                    okText: 'OK',
                    cancelText: 'Cancel',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                
                                placeholder: 'Please enter email Id...'
                            },
                            on: {
                                input: (val) => {
                                    
                                    this.emailIdTobeSent = val;
                                }
                            }
                        })
                    },
                    onOk: ()=>{
                               console.log(self.$refs.email1.innerHTML)
                                    
                                    let myData = {
                                          "to": self.emailIdTobeSent,
                                          "from": "obsoftcare@gmail.com",
                                          "subject": "email invoice",
                                          "body": self.$refs.email1.innerHTML
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
                                            self.$Message.success("email send failed , Please try again later");
                                            console.log(error);
                                          });
                    }
                })
      // this.list[params.index].loading1 = true
      // console.log("inside send mail", params)
      // var responseData
      //   await axios.get(config.default.serviceUrl + 'invoice?domain=Xero', {
      //     params: {
      //       Invoiceid:params.row.InvoiceID
      //     }
      //   })
      //   .then(function (response) {
      //     console.log("response data", response)
      //     responseData = response.data
      //   })
      //   .catch(function (error) {
      //     console.log("error",error);
      //   });
      // console.log("send mail responsedata", responseData)
      // var MjmlTemplate
      // await $.get( "mailtemplate.txt", function( data ) {
      //   MjmlTemplate = data
      // });
      
      // var template = Handlebars.compile(MjmlTemplate); 
      // console.log("template", template)
      //  var context = {
      //     invoice : responseData
      //   }
      // const mjml = template(context);
      // const html1 = mjml2html(mjml);
      
    },
    async tabClicked(data){
      console.log(data)
      let settingId = this.tabPanes[data].id
      this.settingIdForPayment = settingId;
      this.getInvoiceBySettingId(settingId)
    },
    async getInvoiceBySettingId(settingId){
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTtt",settingId)
      this.$Loading.start();
      this.data6 = [];
      let self = this;
      self.list = [];
      axios.get(config.default.serviceUrl + 'invoice', {
        headers:{
            Authorization : Cookies.get('auth_token')
        },
        params : {
          settingId : settingId
        }
      })
      .then(async function (response) {
        console.log("response------>iuy",response);
        
        self.data6 = response.data[0].data;
        self.$Loading.finish();
        $('.preload').css("display","none")
        self.list = await self.mockTableData1(1,pageSize)
      })
      .catch(function (error) {
        console.log("error",error);
        self.$Loading.error();
        
      });
      
    },
    // async getAllInvoice(){
    //   let self = this;
      
    //   axios.get(config.default.serviceUrl + 'invoice', {
    //     headers:{
    //         Authorization : Cookies.get('auth_token')
    //     },
    //   })
    //   .then(function (response) {
        
    //     console.log("response------>iuy",response);
    //     self.spinShow = false;
    //     self.tabPanes = response.data;
    //     $('.preload').css("display","none")
        
    //   })
    //   .catch(function (error) {
    //     console.log("error",error);
    //     self.spinShow = false;
    //   });
    // },
    async getAllSettings(){
      let self = this;
      axios.get(config.default.serviceUrl + 'settings?isActive=true', {
        headers:{
            Authorization : Cookies.get('auth_token')
        },
      })
      .then(function (response) {
        console.log("response------>iuy",response);
        self.spinShow = false;
        if (response.data.data.length != 0)
        {
          self.tabPanes = response.data.data;
          $('.preload').css("display","none")
          let settingId = self.tabPanes[0].id;
          self.settingIdForPayment = self.tabPanes[0].id;
          self.getInvoiceBySettingId(settingId)
        }else
        {
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
    }
     
  },
  mounted() {
    let self = this;
    this.$store.state.invoiceData = "";
    //  $('.maindiv').change(async function() {
    //   await self.changeData();
    // }); 
    //this.getCustomerUrl();
    //this.searchdata();
    //this.getAllInvoice()
    this.getAllSettings()
    
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
tbody.ivu-table-tbody tr.ivu-table-row td.ivu-table-column-center .ivu-table-cell > div > div {
    margin: 0 9px;
    float: none !important;
}
.ivu-icon.ivu-icon-help-circled{
    display: none;
}
</style>