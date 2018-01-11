<template>
<div>
  
  <div style="padding: 10px; margin: 5px; display: block;" >
    <div>
        <h1>Invoice List </h1>
        <div class="panel panel-default panel-group" id="accordion">
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
                                    data-target="#status"></span>
                                    <label>Status</label>
                                </div>
                                <div class="panel-collapse collapse" id="status">
                                    <select class="form-control mb-2 mb-sm-0" v-model="status" name="status">
                                        <option value="">All</option>
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
</div>

<div>
  
  <div v-if="spinShow">
                <Spin size="large"></Spin>
  </div>
  <div v-else>
    
     <Tabs  @on-click="tabClicked">
        <TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
          <Table v-if ="tabPane.domain=='Xero'" :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
          <Table v-if ="tabPane.domain=='QB'" :columns="columns2" :data="list" border size="small" ref="table" stripe></Table>
          <Table v-if ="tabPane.domain=='custom'" :columns="columns3" :data="list" border size="small" ref="table" stripe></Table>
          
          <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                  <Page :total="len" :current="1" @on-change="changePage"></Page>
              </div>
          </div>
           <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
          <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
          
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
                                <img src="../../images/Flowz-logo.png" key="max-logo" style="width:32%;">
                            </td>
                            
                            <td style="padding-bottom: 20px;text-align: right;padding: 5px;vertical-align: top;">
                                Invoice #: {{emailData.row.InvoiceNumber}}<br>
                                Created: {{createdDate}}<br>
                                Due: {{dueDate}}
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
                                <p>{{emailData.row.Contact.Name}}</p>
                                <p>{{emailDataCustomer.Addresses[0].AddressLine1}}</p>
                                <p>{{emailDataCustomer.Addresses[0].AddressLine2}}</p>
                                <p>{{emailDataCustomer.Addresses[0].City}}</p>
                                <p>{{emailDataCustomer.Addresses[0].Country}},{{emailDataCustomer.Addresses[0].PostalCode}}</p>
                            </td>
                            
                            <td style="padding-bottom: 40px;text-align: right;padding: 5px;vertical-align: top;">
                                <b>From :</b><br>
                                Acme Corp.<br>
                                John Doe<br>
                                
                            </td>
                        </tr>
                    </tbody></table>
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
                   Total Due Amount: ${{emailData.row.AmountDue}}
                </td>
            </tr>
            
           
        </tbody></table>
    </div>

</div>



<div v-if="emailDataCustom != ''" ref="email2" style="display:none">
 
<div class="invoice-box" style="max-width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, .15);font-size: 16px;line-height: 24px;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;color: #555;">
        <table cellpadding="0" cellspacing="0" style="width: 100%;line-height: inherit;text-align: left;">
            <tbody><tr class="top">
                <td colspan="3" style="padding: 5px;vertical-align: top;">
                    <table style="width: 100%;line-height: inherit;text-align: left;">
                        <tbody><tr>
                            <td class="title" style="font-size: 45px;line-height: 45px;color: #333;padding-bottom: 20px;padding: 5px;vertical-align: top;">
                                <img src="../../images/Flowz-logo.png" key="max-logo" style="width:32%;">
                            </td>
                            
                            <td style="padding-bottom: 20px;text-align: right;padding: 5px;vertical-align: top;">
                                Invoice #: {{emailDataCustom.Invoice_No}}<br>
                                Created: {{createdDate}}<br>
                                Due: {{dueDate}}
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
                                <p>{{emailDataCustom.Name}}</p>
                                
                                E-169<br>
                                New Alkapuri<br>
                                Vadodara<br>
                                India,799864<br>
                            </td>
                            
                            <td style="padding-bottom: 40px;text-align: right;padding: 5px;vertical-align: top;">
                                <b>From :</b><br>
                                Acme Corp.<br>
                                John Doe<br>
                                
                            </td>
                        </tr>
                    </tbody></table>
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
                    ${{emailDataCustom.Paid}}
                </td>
                <td style="border-bottom: 1px solid #eee;text-align:center;padding: 5px;vertical-align: top;">
                    ${{emailDataCustom.Due}}
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
                   Sub Total: ${{emailDataCustom.Total}}
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;vertical-align: top;"></td>
                <td style="padding: 5px;vertical-align: top;"></td>
                
                <td style="border-top: 2px solid #eee;font-weight: bold;text-align: right;padding: 5px;vertical-align: top;">
                   Tax: 0%
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;vertical-align: top;"></td>
                <td style="padding: 5px;vertical-align: top;"></td>
                
                <td style="border-top: 2px solid #eee;font-weight: bold;text-align: right;padding: 5px;vertical-align: top;">
                   Total Due Amount: ${{emailDataCustom.Due}}
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
import _ from 'lodash'
//import Handlebars from 'handlebars'
import moment from 'moment'
import Cookies from 'js-cookie'
var pageSize = 10
var settingID
export default {
  name: 'hello',
  data () {
    return {
      tabPanes : [],
      spinShow: true,
      money,
      mail,
      download,
      emailDataCustom:'',
      emailData : '',
      emailDataCustomer:'',
      filterArray : [],
      columns3 : [],
      columns2: [
          {
              title: 'Invoice No.',
              key: 'Id',
              sortable: true
          },
          {
              title: 'customer Name',
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
                var date1 =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
                return date1
              }
          },
          {
              title: 'Paid',
              sortable: true,
              render : (h , {row}) => { return '$' + row.TotalAmt-row.Balance }
          },
          {
              title: 'Due',
              key: 'Balance',
              sortable: true,
              render : (h , {row}) => { return '$' + row.Balance }
          },
          {
              title: 'Amount',
              key: 'TotalAmt',
              sortable: true,
              render : (h , {row}) => { return '$' + row.TotalAmt }
              
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
            width: 200,
            render: (h, {row}) => {
              if(row.TotalAmt-row.Balance != 0){
                return h('div', [
                  h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Make Payment'
                      },
                      style:{
                        float:'left',
                        cursor:'pointer'
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
                        float:'center',
                        cursor:'pointer'
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
                        float:'center',
                        cursor:'pointer'
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
                        float:'center',
                        cursor:'pointer'
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
                        float:'right',
                        cursor:'pointer'
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
              title: 'Invoice No.',
              key: 'InvoiceNumber',
              sortable: true
          },
          {
              title: 'Customer Name',
              key: 'Contact',
              sortable: true,
              render:(h,{row})=>{ return row.Contact.Name }
          },
          {
              title: 'Due Date',
              key: 'DueDate',
              sortable: true,
              render:(h,{row})=>{ 
  
               var date = new Date(row.DueDate); 
               var date1 =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
                return date1
              }
          },
           {
              title: 'Paid',
              key: 'AmountPaid',
              sortable: true,
              render:(h,{row})=>{ return '$' + row.AmountPaid  }
          },
          {
              title: 'Due',
              key: 'AmountDue',
              sortable: true,
              render:(h,{row})=>{ return '$' + row.AmountDue }
          },
          {
              title: 'Total',
              key: 'Total',
              sortable: true,
              render:(h,{row})=>{ return '$' + row.Total }
          },
          {
              title: 'Status',
              key: 'Status',
              sortable: true
          },
          {
            title: 'Action',
            key: 'Status',
            align: 'center',
            width: 200,
            render: (h, params) => {
              if(params.row.Status == 'AUTHORISED'){
                return h('div', [
                  h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Make Payment'
                      },
                      style:{
                        float:'left',
                        cursor:'pointer'
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
                        float:'center',
                        cursor:'pointer'
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
                        float:'right',
                        cursor:'pointer'
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
                        float:'center',
                        cursor:'pointer'
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
                        float:'right',
                        cursor:'pointer'
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
      data7: [],
      testArray: [],
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
    reset() {
      this.cname = '';
      this.status = '';
      this.dategt = '';
      this.datelt = '';
      this.totalgt = '';
      this.totallt = '';
      this.duegt = '';
      this.duelt = '';
      this.getAllSettings();
    },
    async changeData() {
     console.log("this.data6", this.data6)
      this.filterArray = this.data6
      var self = this

      if(this.cname != ''){
       console.log("this.cname", this.cname)
       this.filterArray = _.filter(this.filterArray,  function(item){
        console.log("item",item)
        if(item.Contact != undefined){
          return item.Contact.Name === self.cname;
        }else{
          return item.CustomerRef.name === self.cname
        }
      });
       console.log("myarr",this.filterArray)
       this.list = await this.mockTableData2(1,pageSize)
      }

      if(this.status != ''){
        console.log("this.status", this.status)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)
          return item.Status === self.status;
        });
         console.log("myarr",this.filterArray)
         this.list = await this.mockTableData2(1,pageSize)
      }

      if(this.dategt != ''){
        console.log("this.dategt", this.dategt)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)
          var itemdate = moment(item.DueDate).format('DD/MM/YYYY');
          var newdate = moment(self.dategt).format('DD/MM/YYYY')

          return itemdate >= newdate;
        });
         console.log("myarr",this.filterArray)
         this.list = await this.mockTableData2(1,pageSize)
      }

      if(this.datelt != ''){
        console.log("this.dategt", this.datelt)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)
           var itemdate = moment(item.DueDate).format('DD/MM/YYYY');
          var newdate = moment(self.datelt).format('DD/MM/YYYY')
          return itemdate <= newdate;
        });
         console.log("myarr",this.filterArray)
         this.list = await this.mockTableData2(1,pageSize)
      }

      if(this.totalgt != ''){
        console.log("this.totalgt", this.totalgt)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)
          if(item.Total != undefined){  
            return item.Total >= self.totalgt;
          }else{
            return item.TotalAmt >= self.totalgt;
          }
        });
         console.log("myarr",this.filterArray)
         this.list = await this.mockTableData2(1,pageSize)
      }

      if(this.totallt != ''){
        console.log("this.totallt", this.totallt)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)
           if(item.Total != undefined){  
            return item.Total <= self.totallt;
          }else{
            return item.TotalAmt >= self.totallt;
          }
        });
         console.log("myarr",this.filterArray)
         this.list = await this.mockTableData2(1,pageSize)
      }

      if(this.duegt != ''){
        console.log("this.duegt", this.duegt)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)
          if(item.AmountDue != undefined){
            return item.AmountDue >=self.duegt
          }else{
            return item.Balance >= self.duegt;
          }
        });
         console.log("myarr",this.filterArray)
         this.list = await this.mockTableData2(1,pageSize)
      }

      if(this.duelt != ''){
        console.log("this.duelt", this.duelt)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)
          if(item.AmountDue != undefined){
            return item.AmountDue >=self.duelt
          }else{
            return item.Balance >= self.duelt;
          }
        });
         console.log("myarr",this.filterArray)
         this.list = await this.mockTableData2(1,pageSize)
      }


    },
    async getCustomerBySettingId(settingId , settingDomain , data){
      console.log("inside getCustomerUrl " )
      let res
      console.log("settingId----------------------->",settingDomain)
      if(settingDomain == 'custom'){
        let customerUrl = this.tabPanes[data].customer_url;
         await axios({
            method: 'get',
            url: customerUrl,
            headers:{
            Authorization : Cookies.get('auth_token')
        },
            }).then(function (response) {
              console.log(response)
              res = response.data
            })
            .catch(function (error) {
              console.log(error);
            });
      }else{
        if (settingId != '') {
          await axios({
              method: 'get',
              url: config.default.serviceUrl + 'contacts',
              params: {
                settingId : settingId
              },
              headers:{
              Authorization : Cookies.get('auth_token')
          },
              }).then(function (response) {
                
                res = response.data[0].data
              })
              .catch(function (error) {
                console.log(error);
              });
        }
      }
      
      
          res.forEach (obj => {
            
          var x = document.getElementById("selectCustomer");
            var option = document.createElement("option");
            option.text = obj.Name;
            x.add(option);
          })
    },
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
    exportData (type) {
                if (type === 1) {
                  console.log(this.$refs);
                    this.$refs.table[0].exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table[0].exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } 
    },
    async mockTableData1 (p,size) {
      
      this.len = this.data6.length
      return this.data6.slice((p - 1) * size, p * size);
    },
    async mockTableData2 (p,size) {
      console.log("p-------------->",p)
      console.log("p-------------->",size)
      console.log("console.log------------>",this.filterArray)
      this.len = this.filterArray.length
      return this.filterArray.slice((p - 1) * size, p * size);
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
    async createPDF (params) {
      console.log("paramsssssssssssssssss " , params)
      this.emailData = params;
      var self = this
      var date = new Date(params.row.Date); 
      this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
      var date1 = new Date(params.row.DueDate); 
      this.dueDate =  date1.getDate() + '/' + (date1.getMonth() + 1) + '/' +  date1.getFullYear()
      await axios({
            method: 'get',
            url: config.default.serviceUrl + 'contacts',
            params: {
              settingId : settingID,
              Name : params.row.Contact.Name
            },
            headers:{
            Authorization : Cookies.get('auth_token')
        },
            }).then(function (response) {
              console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
              self.emailDataCustomer = response.data[0].data[0]
            })
            .catch(function (error) {
              console.log(error);
            });

      console.log('self.emailDataCustomer',self.emailDataCustomer)
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
      if(params.InvoiceID != undefined){
        this.$router.push('/checkout/' + params.InvoiceID)
      }else{
        this.$router.push('/checkout/' + params.Id)
      }
    },
    async sendemail(params){
      this.$Loading.start();
      this.emailData = params;
      var date = new Date(params.row.Date); 
      this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
      var date1 = new Date(params.row.DueDate); 
      this.dueDate =  date1.getDate() + '/' + (date1.getMonth() + 1) + '/' +  date1.getFullYear()
      console.log("this.emailData------------------------------------->",this.emailData)
      var self = this;
      await axios({
            method: 'get',
            url: config.default.serviceUrl + 'contacts',
            params: {
              settingId : settingID,
              Name : params.row.Contact.Name
            },
            headers:{
            Authorization : Cookies.get('auth_token')
        },
            }).then(function (response) {
              console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
              self.emailDataCustomer = response.data[0].data[0]
            })
            .catch(function (error) {
              console.log(error);
            });

      console.log('self.emailDataCustomer',self.emailDataCustomer.EmailAddress)
      this.$Modal.confirm({
                    title: 'Email would be sent to',
                    okText: 'OK',
                    cancelText: 'Cancel',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: self.emailDataCustomer.EmailAddress,
                                autofocus: true,
                                
                                placeholder: 'Please enter email Id...'
                            },
                            on: {
                                input: (val) => {
                                    
                                    self.emailIdTobeSent = val;
                                }
                            }
                        })
                    },
                    onOk: ()=>{
                               
                                    let myData = {
                                          "to": self.emailIdTobeSent == "" ? self.emailDataCustomer.EmailAddress : self.emailIdTobeSent ,
                                          "from": "obsoftcare@gmail.com",
                                          "subject": "email invoice",
                                          "body": self.$refs.email1.innerHTML
                                        }
                                        myData = JSON.stringify(myData)
                                        axios({
                                          method: 'post',
                                          url:  'http://api.'+process.env.domainkey+'/vmailmicro/sendEmail',
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
                                            self.$Message.warning("email send failed , Please try again later");
                                            console.log(error);
                                          });
                    }
                })

    },
    async tabClicked(data){
      console.log(data)
      let settingId = this.tabPanes[data].id;
      let settingDomain = this.tabPanes[data].domain;
      this.settingIdForPayment = settingId;
      
      this.getInvoiceBySettingId(settingId ,settingDomain , data)
      this.getCustomerBySettingId(settingId , settingDomain , data)
    },
    async getInvoiceBySettingId(settingId , settingDomain , data){
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTtt",settingId)
      settingID = settingId
      this.$Loading.start();
      this.data6 = [];
      let self = this;
      self.list = [];
      
      if(settingDomain == 'custom'){
        let Invoiceurl = self.tabPanes[data].invoice_url;
        
        axios.get(Invoiceurl, {
        
      })
      .then(async function (response) {
        self.$Loading.finish();
        $('.preload').css("display","none")
        console.log("response------>iuy",response);
        self.data6 = response.data.data;
        let columnArray =  _.union(...(_.chain(self.data6).map(m => { return _.keys(m) }).value()))
        let modifiedArray = _.pull(columnArray, "id", "importTracker_id" ,"Action","settingId" );
        
        console.log("############# " , columnArray);
        columnArray = ["Invoice_No","Name", "DueDate","Due",  "Paid",  "Total" , "Status"]
        let arr = [];
        let len = columnArray.length;
        for (let i = 0; i < len; i++) {
            arr.push({
                title: columnArray[i],
                key : columnArray[i],
                sortable: true,
                width: 200,
            });
        }
        if(modifiedArray.indexOf("Action") != -1){
          modifiedArray.push(modifiedArray.splice(modifiedArray.indexOf("Action"), 1)[0]);
        }else{
          arr.push({
                title: "Action",
                width: 200,
                render: (h, params) => {
                return h('div', [
                    h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Send Mail'
                      },
                      style:{
                        
                        cursor:'pointer'
                      }
                    }, [
                      h('img', {
                       attrs: {
                          src: self.mail
                        },
                        style: {
                          hight:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {
                            self.sendemailCustom(params)
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
                        
                        cursor:'pointer'
                      }
                    }, [
                    h('img', {
                      attrs: {
                          src: self.download
                        },
                        style: {
                          hight:'30px',
                          width:'30px',
                          margin: '2px'
                        },
                      on: {
                        click: () => {   
                          self.createPDFCustom(params)
                        }
                      }
                    }, '')
                  ])
                ])
              
            }
          })
        }
        self.list = await self.mockTableData1(1,pageSize)
        self.columns3 = arr;
        
      })
      .catch(function (error) {
        console.log("error",error);
        self.$Loading.error();
        
      });
      }else{
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
        
        self.data6 = response.data[0].data.reverse();
        self.$Loading.finish();
        $('.preload').css("display","none")
        self.list = await self.mockTableData1(1,pageSize)
      })
      .catch(function (error) {
        console.log("error",error);
        self.$Loading.error();
        
      });
      }
      
      
    },
    

    async createPDFCustom(params){
      console.log(params.row)
      this.emailDataCustom = params.row;
      var self = this
      var date = new Date(); 
      this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
      this.dueDate =  params.row.DueDate
      setTimeout(function(){ 
        self.$Modal.confirm({
          title: '',
          content: self.$refs.email2.innerHTML,
          width: 1000,
          okText: 'Download',
          onOk: () => {
            var filename = "invoice.html";
            var data = self.$refs.email2.innerHTML;
            var blob = new Blob([data], {
                type: "text/html;charset=utf-8"
            });
            saveAs(blob, filename);
          },
          onCancel: () => {
          }
        })
       }, 2000);
    },
    async sendemailCustom(params){
      this.$Loading.start();
      this.emailDataCustom = params.row;
      var self = this
      var date = new Date(); 
      this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
      this.dueDate =  params.row.DueDate
      var self = this;
      

      this.$Modal.confirm({
                    title: 'Email would be sent to',
                    okText: 'OK',
                    cancelText: 'Cancel',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: "",
                                autofocus: true,
                                
                                placeholder: 'Please enter email Id...'
                            },
                            on: {
                                input: (val) => {
                                    
                                    self.emailIdTobeSent = val;
                                }
                            }
                        })
                    },
                    onOk: ()=>{
                               
                                    let myData = {
                                          "to": self.emailIdTobeSent == "" ? self.emailDataCustomer.EmailAddress : self.emailIdTobeSent ,
                                          "from": "obsoftcare@gmail.com",
                                          "subject": "email invoice",
                                          "body": self.$refs.email2.innerHTML
                                        }
                                        myData = JSON.stringify(myData)
                                        axios({
                                          method: 'post',
                                          url:  'http://api.'+process.env.domainkey+'/vmailmicro/sendEmail',
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
                                            self.$Message.warning("email send failed , Please try again later");
                                            console.log(error);
                                          });
                    }
                })
    },
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
          let settingDomain = self.tabPanes[0].domain;
          self.settingIdForPayment = self.tabPanes[0].id;
          self.getInvoiceBySettingId(settingId , settingDomain , 0)
          self.getCustomerBySettingId(settingId , settingDomain , 0)
        }else
        {
            self.$Modal.warning({
            title: 'No Configuration available',
            okText : "Go to Settings",
            content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
            onOk: () => {
                  self.$router.push({
                      name: 'New-settings'
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
    // this.searchdata();
    // this.getAllInvoice()
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
