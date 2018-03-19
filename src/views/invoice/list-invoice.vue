<template>
  <div>
    <div style="padding: 10px; margin: 5px; display: block;" >
      <div style="text-align:left;">
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
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#invoice"></span>
                                      <label>Invoice No.</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="invoice">
                                      <AutoComplete v-model="invoiceno" :data="invnoFilter" :filter-method="filterMethod" placeholder="input here" clearable>
                                      </AutoComplete>
                                  </div>
                              </div>
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
                                          <option value="AUTHORISED">AUTHORISED</option>
                                          <option value="DRAFT">DRAFT</option>
                                          <option value="PAID">PAID</option>
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
                                          <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="dategt" style="width: 100%;"></DatePicker>
                                      </div>
                                      <div class="col-xs-3">
                                        <label>To Date</label>
                                          <DatePicker format="dd-MMM-yyyy" type="date" placeholder="Select date" v-model="datelt" style="width: 100%;"></DatePicker>
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

       <Tabs  @on-click="tabClicked" :value="tabIndex">
          <TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
            <i-table @on-expand="viewDetails" v-if ="tabPane.domain=='Xero'" :columns="columns1" :data="list" border size="small" ref="table" stripe></i-table>
            <i-table @on-expand="viewDetails" v-if ="tabPane.domain=='QB'" :columns="columns2" :data="list" border size="small" ref="table" stripe></i-table>
            <i-table @on-expand="viewDetailsCustom" v-if ="tabPane.domain=='custom'" :columns="columns3" :data="list" border size="small" ref="table" stripe></i-table>

            <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                    <Page :total="len" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
             <!-- <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
            <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
             -->
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

    <div style="position: relative;color: #555555;background: #FFFFFF; 'Roboto Condensed', sans-serif;font-size:10px">
      <header  style="padding: 10px 0;margin-bottom: 20px;border-bottom: 1px solid #AAAAAA;display: inline-block;width: 100%;">
          <div id="logo" style="float: left;margin-top: 8px;">
              <img :src="emailDataCompany.logo" style="height: 70px;">
          </div>
          <div id="company" v-if = "emailDataCompany.address != undefined" style="float: right;text-align: right;font-size: 14px;font-family: Verdana;">
              <h2  style="font-size: 18px;font-weight: normal;margin: 0;">{{emailDataCompany.address.name}}</h2>
              <div>{{emailDataCompany.address.AddressLine1}}<br> {{emailDataCompany.address.AddressLine2}}<br> {{emailDataCompany.address.city}}  {{emailDataCompany.address.PostalCode}}</div>
              <div>{{emailDataCompany.address.country}}</div>
              <!--<div>
                      <a href="mailto:company@example.com" style="color: #0087C3;text-decoration: none;">company@example.com</a>
              </div>-->
          </div>
      </header>
      <main>
          <div id="details" style="display: inline-block;width: 100%;margin-bottom: 20px;font-size:12px;font-family: Verdana;">
              <div id="client" style="padding-left: 6px;border-left: 6px solid #0087C3;float: left;">
                  <div  style="color: #777777;">INVOICE TO:</div>
                  <h2  style="font-size: 16px;font-weight: normal;margin: 0;" v-if="emailData.row == undefined">{{emailData.CustomerRef.name}}</h2>
                  <h2  style="font-size: 16px;font-weight: normal;margin: 0;" v-else>{{emailData.row.Contact.Name}}</h2>
                  <div v-if="emailDataCustomer.Addresses != undefined">                    
                    <div >{{emailDataCustomer.Addresses[0].AddressLine1}}<br> {{emailDataCustomer.Addresses[0].AddressLine2}}<br> {{emailDataCustomer.Addresses[0].City}}  {{emailDataCustomer.Addresses[0].PostalCode}} </div>
                    <div >{{emailDataCustomer.Addresses[0].Country}}</div>                    
                  </div>
                  <div v-else>                    
                    <div v-if="emailDataCustomer.BillAddr != undefined">{{emailDataCustomer.BillAddr.Line1}}<br> {{emailDataCustomer.BillAddr.City}}  {{emailDataCustomer.BillAddr.PostalCode}}</div>                  
                  </div>                  

                  <!--<div >
                      <a href="mailto:john@example.com" style="color: #0087C3;text-decoration: none;"> customer@example.com </a>
                  </div>-->
              </div>
              <div id="invoice" style="float: right;text-align: right;">
                  <h1 style="color: #0087C3;font-size: 18px;line-height: 1em;font-weight: normal;margin: 0 0 10px 0;" v-if="emailData.row != undefined">{{emailData.row.InvoiceNumber}}</h1>
                  <h1 style="color: #0087C3;font-size: 18px;line-height: 1em;font-weight: normal;margin: 0 0 10px 0;" v-else>{{emailData.Id}}</h1>
                  <div  style="font-size: 12px;color: #777777;">Date of Invoice: {{createdDate}}</div>
                  <div  style="font-size: 12px;color: #777777;">Due Date: {{dueDate}}</div>
              </div>
          </div>
          <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;border-collapse: collapse;border-spacing: 0;font-size:12px;font-family: Verdana;margin-bottom:20px;">
              <thead>
                  <tr>
                      <th  style="color: #FFFFFF;font-size: 1.6em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;
                      ">#</th>
                      <th  style="text-align: center;white-space: nowrap;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">DESCRIPTION</th>
                      <th  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;">UNIT PRICE</th>
                      <th  style="text-align: center;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">QUANTITY</th>
                      <th  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">TOTAL</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,inx) in DescriptionPdf">
                      <div v-if="item.Description">
                      <td  style="color: #FFFFFF;font-size: 1.6em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{inx+1}}</td>
                      <td  style="text-align: left;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">
                        <h3 style="color: #57B223;font-size: 1.2em;font-weight: normal;margin: 0 0 0.2em 0;"></h3>
                        
                        <span v-html="text(item.Description)"></span>
                      </td>
                      </div>
                      <td  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;font-size: 1em;" v-if="item.UnitAmount != undefined">{{ accounting(item.UnitAmount)}}</td>

                      <td  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;font-size: 1em;"v-else-if="item.SalesItemLineDetail">{{ accounting(item.SalesItemLineDetail.UnitPrice) }}</td>
                      <!-- <td  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: right;border-bottom: 1px solid #FFFFFF;color: #555555;font-size: 1em;"v-else>Not available</td> -->

                      <td  style="text-align: center;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;font-size: 1em;" v-if="item.Quantity != undefined">{{item.Quantity}}</td>
                       <td  style="text-align: center;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;font-size: 1em;"v-else-if="item.SalesItemLineDetail">{{ item.SalesItemLineDetail.Qty }}</td>
                       <!-- <td  style="text-align: right;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;font-size: 1em;"v-else></td> -->

                      <td  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;" v-if="item.LineAmount != undefined">{{ accounting(item.LineAmount) }}</td>
                      <td  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;" v-else-if="item.SalesItemLineDetail">{{ accounting(item.SalesItemLineDetail.UnitPrice * item.SalesItemLineDetail.Qty)}}</td>
                     <!--  <td  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;" v-else></td> -->
                  </tr>
              </tbody>
              <tfoot>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">SUBTOTAL</td>
                      <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;" v-if="emailData.row != undefined">{{ accounting(emailData.row.SubTotal) }}</td>
                      <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;" v-else>{{accounting(emailData.TotalAmt-emailData.TxnTaxDetail.TotalTax)}}</td>
                  </tr>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">TAX</td>
                      <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;" v-if="emailData.row != undefined">{{accounting(emailData.row.TotalTax)}}</td>
                      <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;" v-else>{{ accounting(emailData.TxnTaxDetail.TotalTax) }}</td>
                  </tr>
                  <tr>
                      <td colspan="3" style="border: none;"></td>
                      <td colspan="1" style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">GRAND TOTAL</td>
                      <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;" v-if="emailData.row">{{accounting(emailData.row.Total)}}</td>

                      <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;" v-else>{{accounting(emailData.TotalAmt)}}</td>

                  </tr>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">TOTAL DUE</td>
                      <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;" v-if="emailData.row != undefined">{{accounting(emailData.row.AmountDue)}}</td>
                      <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;" v-else>{{accounting(emailData.Balance)}}</td>
                  </tr>
              </tfoot>
          </table>
          <div id="thanks" style="font-size: 16px;margin-bottom: 10px;font-family: Verdana;color: #555555;">Thank you!</div>
      </main>
      <footer style="font-size:12px;font-family: Verdana;">
          Invoice was created on a computer and is valid without the signature and seal.
          <div id="myfooter" style="text-align:center;bottom:0px;width: 100%;">
              Powered by : FLOWZ DIGITAL, LLC © 2018. All Rights Reserved.
          </div>
      </footer>
    </div>

  </div>

  <div v-if="emailDataCustom != ''" ref="email2" style="display:none">

    <div style="position: relative;color: #555555;background: #FFFFFF; 'Roboto Condensed', sans-serif;font-size:10px">
      <header  style="padding: 10px 0;margin-bottom: 20px;border-bottom: 1px solid #AAAAAA;display: inline-block;width: 100%;">
          <div id="logo" style="float: left;margin-top: 8px;">
              <img :src="emailDataCompany.logo" style="height: 70px;">
          </div>
          <div id="company" v-if = "emailDataCompany.address != undefined" style="float: right;text-align: right;font-size: 14px;font-family: Verdana;">
              <h2  style="font-size: 18px;font-weight: normal;margin: 0;">{{emailDataCompany.address.name}}</h2>
              <div>{{emailDataCompany.address.AddressLine1}}<br> {{emailDataCompany.address.AddressLine2}}<br> {{emailDataCompany.address.city}}  {{emailDataCompany.address.PostalCode}}</div>
              <div>{{emailDataCompany.address.country}}</div>
          </div>
      </header>
      <main>
          <div id="details" style="display: inline-block;width: 100%;margin-bottom: 20px;font-size:12px;font-family: Verdana;">
              <div id="client" style="padding-left: 6px;border-left: 6px solid #0087C3;float: left;">
                  <div  style="color: #777777;">INVOICE TO:</div>
                  <h2  style="font-size: 16px;font-weight: normal;margin: 0;">{{emailDataCustom.Name}}</h2>
                  <div v-for="i in customaddress">  
                  <div>{{i}}</div>                   
                  </div>
              </div>
              <div id="invoice" style="float: right;text-align: right;">
                 <h1 style="color: #0087C3;font-size: 18px;line-height: 1em;font-weight: normal;margin: 0 0 10px 0;">{{emailDataCustom.Invoice_No}}</h1>
                  <div  style="font-size: 12px;color: #777777;">Date of Invoice: {{createdDate}}</div>
                  <div  style="font-size: 12px;color: #777777;">Due Date: {{dueDate}}</div>
              </div>
          </div>
          <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;border-collapse: collapse;border-spacing: 0;font-size:12px;font-family: Verdana;margin-bottom:20px;">
              <thead>
                  <tr>
                      <th  style="color: #FFFFFF;font-size: 1.6em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;
                      ">#</th>
                      <th  style="text-align: center;white-space: nowrap;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">DESCRIPTION</th>
                      <th  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;">UNIT PRICE</th>
                      <th  style="text-align: center;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">QUANTITY</th>
                      <th  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">TOTAL</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,inx) in DescriptionPdf">
                      <div v-if="item.description">
                      <td  style="color: #FFFFFF;font-size: 1.6em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{inx+1}}</td>
                      <td  style="text-align: left;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">
                        <h3 style="color: #57B223;font-size: 1.2em;font-weight: normal;margin: 0 0 0.2em 0;"></h3>                       
                        <span>{{item.description}}</span>
                      </td>
                      </div>
                      <td  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;font-size: 1em;">{{ accounting(item.amount)}}</td>
  
                      <td  style="text-align: center;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;font-size: 1em;">{{item.qty}}</td>
                     
                      <td  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{ accounting(item.amount * item.qty) }}</td>
                  </tr>
              </tbody>
              <tfoot>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">SUBTOTAL</td>
                      <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{ accounting(emailDataCustom.Total - customTotaltax) }}</td>
                  </tr>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">TAX</td>
                      <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{accounting(customTotaltax)}}</td>
                  </tr>
                  <tr>
                      <td colspan="3" style="border: none;"></td>
                      <td colspan="1" style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">GRAND TOTAL</td>
                      <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(emailDataCustom.Total)}}</td>
                  </tr>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">TOTAL DUE</td>
                      <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(emailDataCustom.Due)}}</td>
                  </tr>
              </tfoot>
          </table>
          <div id="thanks" style="font-size: 16px;margin-bottom: 10px;font-family: Verdana;color: #555555;">Thank you!</div>
      </main>
      <footer style="font-size:12px;font-family: Verdana;">
          Invoice was created on a computer and is valid without the signature and seal.
          <div id="myfooter" style="text-align:center;bottom:0px;width: 100%;">
              Powered by : FLOWZ DIGITAL, LLC © 2018. All Rights Reserved.
          </div>
      </footer>
    </div>
 
  </div>

  <div id="editor"></div>



  <!-- <Modal
          title="All Transaction List"
          id = "viewDetailInInvoice"
          v-model="viewDetailModal"
          :styles="{width:'95%'}">

          <listtransaction :list="newList" :tabIndex="newTabIndex"></listtransaction>
      </Modal> -->

  </div>
  </div>
</template>

<script>
  import config from '@/config/customConfig.js'
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import money from '../../images/Payment.png'
  import eye from '../../images/Eye.png'
  import mail from '../../images/Mail.png'
  import download from '../../images/Download.png'
  import _ from 'lodash'
  // import expandRow from '../my-account/view-request-quote.vue';

  import listtransaction from '../transaction/list-transaction.vue'

  //import Handlebars from 'handlebars'
  import moment from 'moment'
  import Cookies from 'js-cookie'
  const accounting = require('accounting-js');  
  var pageSize = 10
  var settingID
  export default {
    name: 'hello',
    See full history
Wednesday, March 7th at 4:01 pm
:loading="loading"
loading: false,
this.loading = true
 self.loading = false;
                                self.$router.push({
                                  name:'Customer List'
                                })
Wednesday, March 7th at 6:06 pm
hi
chal
aavu che?
Hiral Dheniya
ha
Krishna dalsania
Thursday, March 8th at 11:20 am
chal
Hiral Dheniya
ha
Krishna dalsania
Thursday, March 8th at 1:38 pm
hii
chsl
Hiral Dheniya
ha
Krishna dalsania
Thursday, March 8th at 2:31 pm
<div v-if="emailDataCustom != ''" ref="email2" style="display:none">

    <div style="position: relative;color: #555555;background: #FFFFFF; 'Roboto Condensed', sans-serif;font-size:10px">
      <header  style="padding: 10px 0;margin-bottom: 20px;border-bottom: 1px solid #AAAAAA;display: inline-block;width: 100%;">
          <div id="logo" style="float: left;margin-top: 8px;">
              <img :src="emailDataCompany.logo" style="height: 70px;">
          </div>
          <div id="company" v-if = "emailDataCompany.address != undefined" style="float: right;text-align: right;font-size: 14px;font-family: Verdana;">
              <h2  style="font-size: 18px;font-weight: normal;margin: 0;">{{emailDataCompany.address.name}}</h2>
              <div>{{emailDataCompany.address.AddressLine1}}<br> {{emailDataCompany.address.AddressLine2}}<br> {{emailDataCompany.address.city}}  {{emailDataCompany.address.PostalCode}}</div>
              <div>{{emailDataCompany.address.country}}</div>
          </div>
      </header>
      <main>
          <div id="details" style="display: inline-block;width: 100%;margin-bottom: 20px;font-size:12px;font-family: Verdana;">
              <div id="client" style="padding-left: 6px;border-left: 6px solid #0087C3;float: left;">
                  <div  style="color: #777777;">INVOICE TO:</div>
                  <h2  style="font-size: 16px;font-weight: normal;margin: 0;">{{emailDataCustom.Name}}</h2>
                  <div v-for="i in customaddress">  
                  <div>{{i}}</div>                   
                  </div>
              </div>
              <div id="invoice" style="float: right;text-align: right;">
                 <h1 style="color: #0087C3;font-size: 18px;line-height: 1em;font-weight: normal;margin: 0 0 10px 0;">{{emailDataCustom.Invoice_No}}</h1>
                  <div  style="font-size: 12px;color: #777777;">Date of Invoice: {{createdDate}}</div>
                  <div  style="font-size: 12px;color: #777777;">Due Date: {{dueDate}}</div>
              </div>
          </div>
          <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;border-collapse: collapse;border-spacing: 0;font-size:12px;font-family: Verdana;margin-bottom:20px;">
              <thead>
                  <tr>
                      <th  style="color: #FFFFFF;font-size: 1.6em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;
                      ">#</th>
                      <th  style="text-align: center;white-space: nowrap;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">DESCRIPTION</th>
                      <th  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;">UNIT PRICE</th>
                      <th  style="text-align: center;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">QUANTITY</th>
                      <th  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">TOTAL</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,inx) in DescriptionPdf">
                      <div v-if="item.description">
                      <td  style="color: #FFFFFF;font-size: 1.6em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{inx+1}}</td>
                      <td  style="text-align: left;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">
                        <h3 style="color: #57B223;font-size: 1.2em;font-weight: normal;margin: 0 0 0.2em 0;"></h3>                       
                        <span>{{item.description}}</span>
                      </td>
                      </div>
                      <td  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;font-size: 1em;">{{ accounting(item.amount)}}</td>
  
                      <td  style="text-align: center;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;font-size: 1em;">{{item.qty}}</td>
                     
                      <td  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{ accounting(item.amount * item.qty) }}</td>
                  </tr>
              </tbody>
              <tfoot>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">SUBTOTAL</td>
                      <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{ accounting(emailDataCustom.Total - customTotaltax) }}</td>
                  </tr>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">TAX</td>
                      <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{accounting(customTotaltax)}}</td>
                  </tr>
                  <tr>
                      <td colspan="3" style="border: none;"></td>
                      <td colspan="1" style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">GRAND TOTAL</td>
                      <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(emailDataCustom.Total)}}</td>
                  </tr>
                  <tr>
                      <td colspan="3"></td>
                      <td colspan="1" style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">TOTAL DUE</td>
                      <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(emailDataCustom.Due)}}</td>
                  </tr>
              </tfoot>
          </table>
          <div id="thanks" style="font-size: 16px;margin-bottom: 10px;font-family: Verdana;color: #555555;">Thank you!</div>
      </main>
      <footer style="font-size:12px;font-family: Verdana;">
          Invoice was created on a computer and is valid without the signature and seal.
          <div id="myfooter" style="text-align:center;bottom:0px;width: 100%;">
              Powered by : FLOWZ DIGITAL, LLC © 2018. All Rights Reserved.
          </div>
      </footer>
    </div>
 
  </div>
customaddress: '',
        customTotaltax: '',
 async createPDFCustom(params){

        var self = this
        this.$Loading.start();
        console.log("paramsssssssssssssssss " , params)
        this.emailDataCustom = params.row;
        var date = new Date(params.row.Date);
        this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
        var date1 = new Date(params.row.DueDate);
        this.dueDate =  date1.getDate() + '/' + (date1.getMonth() + 1) + '/' +  date1.getFullYear()
       
        console.log("%%%%%%%%%%%%%",this.emailData)
        console.log("this.createdDate",this.createdDate)
        console.log("this.dueDate",this.dueDate)
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'customcustomer',
              params: {
                settingId : settingID,
                Name : params.row.Name
              },
              headers:{
              Authorization : Cookies.get('auth_token')
          },
              }).then(function (response) {
                self.emailDataCustomer = response.data.data[0]
              })
              .catch(function (error) {
                console.log(error);
              });
                console.log('self.emailDataCustomer---------->',self.emailDataCustomer)

                this.customaddress = self.emailDataCustomer.Address.split(",");
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
              }).then(function (response) {
                console.log("ooooooooooooooooo",response);
                self.emailDataCompany = response.data
              })
              .catch(function (error) {
                console.log(error);
              });

              console.log('self.emailDataCompany--------------->',self.emailDataCompany)

              self.DescriptionPdf = this.emailDataCustom.products;

              self.customTotaltax = 0

              self.DescriptionPdf.forEach(item => {
                self.customTotaltax += item.tax
              })

              console.log("self.customTotaltax---->",self.customTotaltax)
                // axios.get(config.default.serviceUrl + 'invoice', {
                //   headers:{
                //       Authorization : Cookies.get('auth_token')
                //   },
                //   params : {
                //     settingId : settingID,
                //     Invoice_No : params.row.Invoice_No
                //   }
                // })
                // .then(async function (response) {
                //   console.log('response>>>>>>>>>>>>>>', response)
                //   self.DescriptionPdf = response.data[0].data.LineItems;

                // })
                // .catch(function (error) {
                // });
        setTimeout(function(){
          self.$Loading.finish();
          document.querySelector('#myfooter').style.position = 'initial'
          self.$Modal.confirm({
            title: '',
            content: self.$refs.email2.innerHTML,
            width: 1000,
            okText: 'Download PDF',
            onOk: () => {
              document.querySelector('#myfooter').style.position = 'fixed'
              axios({
              method: 'post',
              url: config.default.serviceUrl + 'exporttopdf',
              data: {
                  "html" : self.$refs.email2.innerHTML
              },

              }).then(function (response) {
                console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                document.querySelector('#myfooter').style.position = 'initial'
                var arrayBufferView = new Uint8Array( response.data.data );
                var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download=params.row.Invoice_No == undefined ? "custom_Invoice" : params.row.Invoice_No;
                link.click();
              })
            },
            onCancel: () => {
            }
          })
         }, 2000);
      },
 async sendemailCustom(params){

        var self = this
        this.$Loading.start();
        console.log("paramsssssssssssssssss " , params)
        this.emailDataCustom = params.row;
        var date = new Date(params.row.Date);
        this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
        var date1 = new Date(params.row.DueDate);
        this.dueDate =  date1.getDate() + '/' + (date1.getMonth() + 1) + '/' +  date1.getFullYear()
       
        console.log("%%%%%%%%%%%%%",this.emailData)
        console.log("this.createdDate",this.createdDate)
        console.log("this.dueDate",this.dueDate)
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'customcustomer',
              params: {
                settingId : settingID,
                Name : params.row.Name
              },
              headers:{
              Authorization : Cookies.get('auth_token')
          },
              }).then(function (response) {
                self.emailDataCustomer = response.data.data[0]
              })
              .catch(function (error) {
                console.log(error);
              });
                console.log('self.emailDataCustomer---------->',self.emailDataCustomer)

                this.customaddress = self.emailDataCustomer.Address.split(",");
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
              }).then(function (response) {
                console.log("ooooooooooooooooo",response);
                self.emailDataCompany = response.data
              })
              .catch(function (error) {
                console.log(error);
              });

              console.log('self.emailDataCompany--------------->',self.emailDataCompany)

              self.DescriptionPdf = this.emailDataCustom.products;

              self.customTotaltax = 0

              self.DescriptionPdf.forEach(item => {
                self.customTotaltax += item.tax
              })

              console.log("self.customTotaltax---->",self.customTotaltax)


        
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
                          "body": self.$refs.email2.innerHTML
                        }
                        myData = JSON.stringify(myData)
                        axios({
                          method: 'post',
                          url:  'https://api.'+process.env.domainkey+'/vmailmicro/sendEmail',
                          data: myData,
                          headers: {
                            'authorization':  Cookies.get('auth_token'),
                            
                          }
                          }).then(function (response) {
                            console.log(response);
                            self.$Message.success(response.data.success);
                            self.$Loading.finish();
                            // self.list[params.index].loading1 = false
                          })
                          .catch(function (error) {
                            self.$Message.warning("email send failed , Please try again later");
                            self.$Loading.finish();
                            console.log(error);
                          });
                      }
                  })
        
      },
$('#selectCustomer').children('option:not(:first)').remove();
Hiral Dheniya
Friday, March 9th at 10:27 am
chal
Krishna dalsania
ha
Monday, March 12th at 11:31 am
hii
Hiral Dheniya
hi
Krishna dalsania
hello
Hiral Dheniya
ha bol
Krishna dalsania
chal
Hiral Dheniya
5 MIN
Krishna dalsania
na jaldi kar
Hiral Dheniya
e ha
Tuesday, March 13th at 3:23 pm
if (columnArray[i] == 'Paid' || columnArray[i] == 'Total' ) {
                arr.push({
                  title: columnArray[i] + ' Amount',
                  key : columnArray[i],
                  sortable: true,
                  render : (h , {row}) => { return  accounting.formatMoney(row[columnArray[i]]) }
                });
              }
Tuesday, March 13th at 3:53 pm
chal
oy
Krishna dalsania
hii
chal
Tuesday, March 13th at 6:24 pm
https://www.upwork.com/hiring/development/15-node-js-frameworks-to-know/
https://stackshare.io/stackups/nodejs-vs-feathersjs
Wednesday, March 14th at 10:40 am
hii
Hiral Dheniya
chal
Krishna dalsania
ha
Wednesday, March 14th at 11:28 am
bau bhukh lagi che
Hiral Dheniya
Wednesday, March 14th at 1:03 pm
https://mjml.io/try-it-live/rJ9TW-Sff
Krishna dalsania
Thursday, March 15th at 6:12 pm
chal
Today at 3:08 PM
<template>
  <div>
  <!-- <div class="mj-container"> -->
    <div style="margin:0 auto;background:#f0f0f0">
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%;background:#f0f0f0" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;border:1px solid #ddd;direction:ltr;font-size:0;padding:0px 0">
              <p style="font-size:1px;margin:0 auto;border-top:2px solid #c11e18;width:100%"></p>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:10px 20px 0">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:5px" align="left">
                                  <div style="cursor:auto;color:#f45e43;font-family:helvetica;font-size:20px;line-height:22px;text-align:left">Quote Request</div>
                                </td>
                              </tr>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;" align="left">
                                  <div style="cursor:auto;color:#000;font-family:helvetica;font-size:15px;line-height:22px;text-align:left">Thank you for quote request. ! Below is a summary for your quote.</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:20px 0;padding-bottom:0;padding-left:10px;padding-right:10px;padding-top:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd;border-top:2px solid red" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:5px 15px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Billing Address</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;background:#fff;display:inline-block;font-size:0;line-height:0;text-align:left;width:100%;border-left: solid 1px #e5e5e5;border-right: solid 1px #e5e5e5;">
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:50%">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;padding-top:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.name}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.street1}},</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.city}} - {{row.billing_info.postalcode}},</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;padding-bottom:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.state}}, {{row.billing_info.country}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:50%">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-top:10px;padding-left: 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.phone}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left: 25px;" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.billing_info.email}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd;border-top:2px solid red" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:5px 15px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Product Summary</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-80 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border-right:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="border-left: solid 1px #e8e8e8;">
                                  <img alt="" :src="getImgUrl(row.product_description.default_image)" style="height: 70px;width: 105px;margin-left: 15%;">
                                </td>
                                <td style="word-wrap:break-word;font-size:0;" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{row.product_description.product_name}}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;padding: 10px 0px 10px 20px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;text-align:left;font-weight:700">Product Description</div>
                                </td>
                              </tr>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-top:0;padding-left:35px;padding-bottom:10px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:justify">{{row.product_description.activeSummary}}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-bottom:0;padding-left:20px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;text-align:left;font-weight:700">Special Instructions</div>
                                </td>
                              </tr>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-top:0;padding-left:35px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:justify">{{row.special_instruction}}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <!-- <div class="mj-column-per-10 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#868686;border-bottom:1px solid #ddd;border-left:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 10px 10px 20px" align="left">
                                  <div style="cursor:auto;color:#fff;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left"></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div> -->
                        <div class="mj-column-per-90 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background: rgb(255, 255, 255);border-width: 2px 1px 1px;border-style: solid;border-color: red rgb(221, 221, 221) rgb(221, 221, 221);border-image: initial;" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:5px 15px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Product Quantity</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-15 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                        </div>
                        <div class="mj-column-per-65 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <div class="row"  v-for="(item,index) in row.shipping_method.shipping_detail">
                          <div class="col-sm-12">
                          <!-- <div class="estimate-row heading" style="backgroundColor:white;">
                            <span>Quantity {{index+1}}</span>
                          </div> -->
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border-bottom:1px solid #ddd;border-right:1px solid #ddd;border-left: solid 1px #e5e5e5;" width="100%" border="0">
                          <tbody>
                            <tr v-for="(element,inx) in item.color_quantity">
                              <td style="word-wrap:break-word;font-size:0;padding-top:5px;padding-bottom:5px" align="center">
                                <div :style="{ backgroundColor: inx }" style="height:25px;width:25px;border: solid 1px #e8e8e8;">
                                  </div>
                              </td>
                              <td align="center">{{inx}}</td>
                              <td align="left">
                                <strong>Total : {{element}}</strong>
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
        
                        </div>
                        <!-- <div class="mj-column-per-20 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="background:#fff;border-bottom:1px solid #ddd;border-right:1px solid #ddd" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-wrap:break-word;font-size:0;padding:10px 25px" align="left">
                                  <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">{{this}}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin:0 auto;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:0;padding-left:10px;padding-right:10px">
                        <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;background:#fff;display:inline-block;font-size:0;line-height:0;text-align:left;width:100%;border-left: solid 1px #e5e5e5;border-right: solid 1px #e5e5e5;">
                          <!-- <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width: 2%;">
                          </div> -->
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody v-for="(item,index) in row.shipping_method.shipping_detail">
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:10px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Shipping Address</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:0px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{item.shipping_address.street1}},</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:0px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{item.shipping_address.city}} - {{item.shipping_address.postalcode}},</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:0px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">{{item.shipping_address.state}}, {{item.shipping_address.country}}.</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:0px 25px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">T: {{item.shipping_address.phone}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody v-for="(item,index) in row.shipping_method.shipping_detail">
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:10px 10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Shipping</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-top:0;padding-right:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">Shipping Type : {{row.shipping_method.shipping_type}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-top:0;padding-right:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">Shipping Carrier : {{item.shipping_detail.shipping_carrier}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-top:0;padding-right:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">In Hand Date : {{item.shipping_detail.on_hand_date}}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-top:0;padding-right:10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">Method : {{item.shipping_detail.shipping_method}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody v-for="(item,index) in row.shipping_method.shipping_detail">
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding:10px 10px" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;line-height:22px;text-align:left">Shipping Charge</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-wrap:break-word;font-size:0;padding-left:10px;padding-right:10px;padding-top:0" align="left">
                                    <div style="cursor:auto;color:#000;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:13px;line-height:22px;text-align:left">Charge:{{item.shipping_detail.shipping_carrier}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  <!-- </div> -->
</div>
</template>
<script>

    export default {
        props: {
            row: Object
        },
        data() {
            return {
              imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/'
            }
        },
        methods: {
          getImgUrl (url) {
            return this.imgurl + url
          },
        },
        mounted() {
        }
    };
</script>
<style>
</style>
<template>
  <div style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <Tabs type="card" @on-click="click">
        <TabPane label="Request Quote">
          <div class="drpdwn" style="display: inline;">
            <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
            </Select>
          </div>
          <h4 class="panel-title" style="text-align:-webkit-right;display: -webkit-inline-box;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion12" href="#collapseT"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
        <div class="panel panel-default panel-group" id="accordion12" style="border: none;margin-top:1%;text-align: -webkit-left;">
              <!-- <div class="panel-heading">
              </div> -->
              <div class="panel-collapse collapse" id="collapseT">
                  <div class="panel-body">
                      <form>
                          <div class="collapse-maindiv maindiv" >
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#uname"></span>
                                      <label>Name</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="uname">
                                      <select class="form-control"  v-model="cname" id="selectCustom">
                                        <option value="">All</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#prname"></span>
                                      <label>Product Name</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="prname">
                                      <select class="form-control"  v-model="pname" id="selectPro">
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
          <Table :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
        </TabPane>
        <TabPane label="Request Info">
          <requestInfo :row="websiteList"></requestInfo>
        </TabPane>
    </Tabs>
    <Modal
            v-model="modal1"
            title="Preview RequestQuote Details"
            width="45%"
            ok-text= "Download PDF"
            @on-ok="download"
            @on-cancel="cancel">
            <downloadRequestQuote id="requestQuote" :row="requestQuote"></downloadRequestQuote>
        </Modal>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment'
import config from '@/config/customConfig'
import expandRow from './view-request-quote.vue';
import requestInfo from './request-info.vue'
import _ from 'lodash';
import downloadRequestQuote from './download-requestQuote.vue';
var api = config.default.requestquoteapi;
export default {
  name: 'myaccount',
  components: { expandRow,requestInfo,downloadRequestQuote},
  data () {
  return {
    requestQuote: {},
    modal1: false,
    websiteList: [],
    website: '',
    userid:'',
    cname: '',
    pname:'',
    columns1:[
      {
        type: 'expand',
        width: 50,
        render: (h, params) => {
          console.log('params--------------->',params)
          return h(expandRow, {
            props: {
              row: params.row
            }
          })
        }
      },
      {
          "title": "ID",
          "key": "id"
      },
      {
          "title": "Name",
          "key": "user_info",
          render: (h,params) => {
            // return params.row.user_info.fullname
            return h('div', [
                h('span', params.row.user_info.fullname)
              ]); 
          }
      },
      {
          "title": "Product Name",
          "key": "product_name",
          render: (h,params) => {
            // return params.row.product_description.product_name
            return h('div', [
                h('span', params.row.product_description.product_name)
              ]);
          }
      },
      {
        "title": "TOTAL ITEM",
        "key": "total_qty"
      },
      {
        "title": "REQUESTED ON",
        "key": "created_at",
        render:(h,{row})=>{
                var date1 = moment(row.created_at).format('DD-MMM-YYYY')
                // return date1
                return h('div', [
                  h('span', date1)
                ]);
              }
      },
      {
          title: 'Download Request_Quote',
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
    list: [],
    data: []
    }
  },
  methods: {
     click (index) {
      console.log("Tab clicked", index)
      if(index == 1){
        this.getReuestInfoData()
      }else {
        this.getReuestQuoteData()
      }
    },
    async getReuestInfoData () {
      console.log("getReuestInfoData getReuestInfoData getReuestInfoData")
      var self = this;
      await axios({
        method: 'get',
        url: config.default.subscriptionWebsitesapi,
        // params : {
        //   userId:self.userid,
        // },
        headers:{
          'Authorization': Cookies.get('auth_token'),
          'subscriptionId': Cookies.get('subscriptionId')    
        }
        }).then(async function (response) {
          console.log('response------>',response)
          // self.list = response.data.data
          var result = _.uniqBy(response.data.data,'websiteId')
          self.websiteList = result
          console.log("self.websiteList self.websiteList self.websiteList", self.websiteList)
          // self.website = self.websiteList[0].websiteId
        }).catch(error => {
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
            }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                self.$Notice.error({
                    title: error.response.statusText,
                    desc: error.response.data.message,
                    duration: 4.5
                })
            }else {
                self.$Notice.error({
                    title: 'Error',
                    desc: error,
                    duration: 4.5
                })
            }
        });
    },
    reset() {
      this.cname = '';
      this.pname = '';
    },
     async changeData() {
        console.log("Before this.filterArray------->",this.filterArray)
        this.filterArray = this.data
         console.log("After this.filterArray------->",this.filterArray)
        var self = this

        if(this.cname != ''){
          console.log("this.cname", this.cname)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)                  
              return item.user_info.fullname === self.cname;                  
          });
          console.log("myarr",this.filterArray)
          console.log(" Filter this.filterArray------->",this.filterArray)
          this.list = this.filterArray
          console.log("After Filter this.filterArray------->",this.filterArray)
        }else{
          console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
          console.log("myarr",this.filterArray)
          this.list = this.filterArray
        }

        if(this.pname != ''){
          console.log("this.pname", this.pname)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)                  
              return item.product_description.product_name === self.pname;                  
          });
          console.log("myarr",this.filterArray)
          console.log(" Filter this.filterArray------->",this.filterArray)
          this.list = this.filterArray
          console.log("After Filter this.filterArray------->",this.filterArray)
        }else{
          console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.pname)
          console.log("myarr",this.filterArray)
          this.list = this.filterArray
        }

    },
    show (params) {
        var self = this
        console.log("params", params.row)
        self.modal1 = true
        self.requestQuote = params.row
        // self.orderDate = moment(self.orderList.products[0].createdAt).format('DD-MMM-YYYY')
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

                 "html" : $('#requestQuote').html()
             },

             }).then(function (response) {
               self.$Loading.finish()
               // console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
               // console.log("uuuuuuuuuuuuuuuuuuuuuuQQQQQQQQQQQQQQQQQQ",self.orderList.billing_details.data.InvoiceNumber);
               var arrayBufferView = new Uint8Array( response.data.data );
               var blob=new Blob([arrayBufferView], {type:"application/pdf"});
               var link=document.createElement('a');
               link.href=window.URL.createObjectURL(blob);
               link.download=self.requestQuote.id == undefined ? "custom_Invoice" : self.requestQuote.id;
               link.click();
         })
    },
    async getReuestQuoteData () {
      var self = this;
      await axios.get( config.default.subscriptionWebsitesapi, {
        // params : {
        //   owner_id: self.userid
        // },
        headers: {
          'Authorization': Cookies.get('auth_token'),
          'subscriptionId': Cookies.get('subscriptionId')
        } 
        }).then(async function (response) {
          console.log('response request quote------>',response.data.data)
          if(response.data.data.length == 0){
            console.log("in if condition")
            self.$Notice.error({
              desc: 'Websites not available for this plan',
              duration: 4.5
            })
          }else{    
            console.log("in else condition")       
            var result = _.uniqBy(response.data.data,'websiteId')
            self.websiteList = result
            self.website = self.websiteList[0].websiteId
          }
        }).catch(error => {
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
            }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                self.$Notice.error({
                    title: error.response.statusText,
                    desc: error.response.data.message,
                    duration: 4.5
                })
            }else {
                self.$Notice.error({
                    title: 'Error',
                    desc: error,
                    duration: 4.5
                })
            }
        });
    },
    listData (val) {
      var self = this
      var len
      this.reset();
      var Namearr = []
      var Productarr = []            
      $('#selectCustom').children('option:not(:first)').remove();
      $('#selectPro').children('option:not(:first)').remove();
      console.log("val", val)
      axios.get(api, {
          params: {
              website_id: val,
          },
           headers: {
            'Authorization': Cookies.get('auth_token'),
            // 'subscriptionId': Cookies.get('subscriptionId')
          } 
      })
      .then(function (response){
          console.log("response val", response.data)
          self.list = _.orderBy(response.data.data, ['created_at'],['desc'])
          self.data = self.list
          self.data.forEach(obj => {
            Namearr.push(obj.user_info.fullname)
            Productarr.push(obj.product_description.product_name)
          })
          Namearr = _.chain(Namearr).sort().uniq().value();
          Productarr = _.chain(Productarr).sort().uniq().value();
          Namearr.forEach(item => {
              var x = document.getElementById("selectCustom");
              var option = document.createElement("option");
              option.text = item;
              console.log()
              x.add(option);
          })
          Productarr.forEach(item => {
              var x = document.getElementById("selectPro");
              var option = document.createElement("option");
              option.text = item;
              console.log()
              x.add(option);
          })
      })
      .catch(function (error) {
          console.log("-------",error);
            self.$Notice.error({
              desc: error,
              duration: 4.5
            })
        });
    },
  },
  async mounted(){
    // var self = this
    // await axios({
    //   method: 'get',
    //   url: config.default.userDetail,
    //   headers: {'Authorization': Cookies.get('auth_token')}
    //   }).then(async function (response) {
    //     self.userid = response.data.data._id
    //     console.log('user detail response------>',self.userid)
    //   })
    //   .catch(function (error) {
    //     console.log("-------",error);
    //       self.$Message.error(error)
    //   });
  this.getReuestQuoteData();
  }
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
<template>
  <div style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div class="drpdwn" style="display: inline;">
      <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
          <Option v-for="item in row" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
      </Select>
    </div>
              <h4 class="panel-title" style="text-align:-webkit-right;display: -webkit-inline-box;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion11" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
        <div class="panel panel-default panel-group" id="accordion11" style="border: none;margin-top:1%;text-align: -webkit-left;">
              <!-- <div class="panel-heading">
              </div> -->
              <div class="panel-collapse collapse" id="collapseTwo">
                  <div class="panel-body">
                      <form>
                          <div class="collapse-maindiv maindiv" >
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#username"></span>
                                      <label>Name</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="username">
                                      <select class="form-control"  v-model="cname" id="selectCustomer">
                                        <option value="">All</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#productname"></span>
                                      <label>Product Name</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="productname">
                                      <select class="form-control"  v-model="pname" id="selectProduct">
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
    <Table :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
import moment from 'moment'
import config from '@/config/customConfig'
import expandRow from './view-request-info.vue';
import _ from 'lodash'
export default {
  name: 'myaccount',
  components: { expandRow },
  props: {
    row: Array
  },
  data () {
  return {
    websiteList: {},
    website: '',
    userid:'',
    cname: '',
    pname: '',
    columns1:[
      {
        type: 'expand',
        width: 50,
        render: (h, params) => {
          return h(expandRow, {
            props: {
              row: params.row
            }
          })
        }
      },
      {
          "title": "ID",
          "key": "id"
      },
      {
          "title": "Name",
          "key": "username",
          render: (h,params) => {
            // return params.row.productInfo[0].username
             return h('div', [
                h('span', params.row.productInfo[0].username)
              ]); 
          }
      },
      {
          "title": "Product Name",
          "key": "product_name",
          render: (h,params) => {
            // return params.row.productInfo[0].product_name
            return h('div', [
                h('span', params.row.productInfo[0].product_name)
              ]);
          }
      },
      {
        "title": "TOTAL ITEM",
        // "key": "productInfo",
        render:(h,{row})=>{
          var total = row.productInfo.length
          // return total
          return h('div', [
                h('span', total)
              ]);
        }
      },
      {
        "title": "REQUESTED ON",
        // "key": "created_at",
        render:(h,{row})=>{
                var date1 = moment(row.created_at).format('DD-MMM-YYYY')
                return h('div', [
                  h('span', date1)
                ]);
                // return date1
              }
      }
    ],
    list: [],
    data: []
    }
  },
  methods: {
    reset() {
      this.cname = '';
      this.pname = '';
    },
    async changeData() {
      console.log("Before this.filterArray------->",this.filterArray)
      this.filterArray = this.data
       console.log("After this.filterArray------->",this.filterArray)
      var self = this

      if(this.cname != ''){
        console.log("this.cname", this.cname)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)                  
            return item.productInfo[0].username === self.cname;                  
        });
        console.log("myarr",this.filterArray)
        console.log(" Filter this.filterArray------->",this.filterArray)
        this.list = this.filterArray
        console.log("After Filter this.filterArray------->",this.filterArray)
      }else{
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
        console.log("myarr",this.filterArray)
        this.list = this.filterArray
      }

      if(this.pname != ''){
        console.log("this.pname", this.pname)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)                  
            return item.productInfo[0].product_name === self.pname;                  
        });
        console.log("myarr",this.filterArray)
        console.log(" Filter this.filterArray------->",this.filterArray)
        this.list = this.filterArray
        console.log("After Filter this.filterArray------->",this.filterArray)
      }else{
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.pname)
        console.log("myarr",this.filterArray)
        this.list = this.filterArray
      }

    },
    listData (val) {
      this.reset();
      var Namearr = []
      var Productarr = []            
      $('#selectCustomer').children('option:not(:first)').remove();
      $('#selectProduct').children('option:not(:first)').remove();
               
      var self = this
      var len
      console.log("val", val)
      axios({
          method: 'get',
          url: config.default.requestinfoapi,
          params: {
              website_id: val
          },
          headers:{
            'Authorization': Cookies.get('auth_token'),
            // 'subscriptionId': Cookies.get('subscriptionId')    
          }
      })
      .then(function (response){
          console.log("response val", response.data)
          self.list = _.orderBy(response.data.data, ['created_at'],['desc'])
          self.data = self.list
          self.data.forEach(obj => {
            Namearr.push(obj.productInfo[0].username)
            Productarr.push(obj.productInfo[0].product_name)
          })
          Namearr = _.chain(Namearr).sort().uniq().value();
          Productarr = _.chain(Productarr).sort().uniq().value();
          Namearr.forEach(item => {
              var x = document.getElementById("selectCustomer");
              var option = document.createElement("option");
              option.text = item;
              console.log()
              x.add(option);
          })
          Productarr.forEach(item => {
              var x = document.getElementById("selectProduct");
              var option = document.createElement("option");
              option.text = item;
              console.log()
              x.add(option);
          })
      })
      .catch(function (error) {
          console.log("-------",error);
            self.$Notice.error({
              desc: error,
              duration: 4.5
            })
        });
    },
  }
}
</script>

<style>
  .ivu-table-wrapper {
    margin-top: 20px;
  }
  .ivu-table-cell {
        word-break: break-word;
    }
</style>
<template>
  <div>
    <Card>
      <div style="text-align:center">
        <div class="row">
          <div class="col-sm-12 header">
            <p slot="header" style="color:white;text-align:center;margin-top: 10px;">
              <icon type="eye"></icon>
              <span> REQUEST QUOTES DETAILS</span>
            </p>
          </div>
        </div>
      </div>
      <div style="text-align:center">
        <div class="row">
          <div class="col-sm-12">
            <div class="order-title">
              <div class="col-lg-3 col-lg-offset-2 col-md-4 col-sm-4">
                ID : {{row.id}}
              </div>
              <div class="col-lg-3 col-md-4 col-sm-4">
                Requested On : {{createdAt}}
              </div>
              <div class="col-lg-2 col-md-4 col-sm-4">
                Total Items : {{row.total_qty}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Collapse accordion>
        <Panel name="1">
          PRODUCT
          <p slot="content">
            <label style="width: -webkit-fill-available;">
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12 padding-right-0">
                <div class="detail-image">
                  <img alt="" :src="getImgUrl(row.product_description.default_image)" id="order_product_image_0" class="img-responsive">
                  </div>
                </div>
                <div class="col-lg-10 col-md-9 col-sm-12 col-xs-12" style="text-align: -webkit-center;">
                  <h2 class="heading-2">{{row.product_description.product_name}}</h2>
                  <div class="skuprice">
                    <div style="text-align: -webkit-center;background: #f5f5f5;
            padding: 7px 0;">Item Number :
                      <span>{{row.product_description.sku}}</span>
                    </div>
                  </div>
                </div>
            </div>
            <div v-for="item in row.product_description.pricing">
              <div v-if="item.price_type == 'regular' && item.type == 'decorative' && item.global_price_type == 'global'">
                <h3 class="quantity-price">Quantity Price</h3>
                <div class="quantity-table">
                  <div class="quantity-table-title" style="float: left;width: 23%;">
                    <div class="table-heading js-product-price-unit" data-product-price-unit="each">Quantity </div>
                    <div class="table-content">Price</div>
                  </div>
                  <div class="quantity-table-disc">
                    <div class="quantity-table-col owl-carousel owl-theme" style="opacity: 1; display: block;">
                      <div class="owl-wrapper-outer" v-for="element in item.price_range">
                        <ul class="owl-wrapper" style="width: 808px; left: 0px; display: block; transition: all 0ms ease; transform: translate3d(0px, 0px, 0px);">
                          <li class="owl-item" style="width: 101px;">
                            <div>
                              <div class="table-heading" v-if="element.qty.lte">{{element.qty.gte}} - {{element.qty.lte}}</div>
                              <div class="table-heading" v-else>{{element.qty.gte}} + </div>
                              <div class="table-content">$ {{element.price}}</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="owl-controls clickable" style="display: none;">
                        <div class="owl-pagination">
                          <div class="owl-page active">
                            <span class=""></span>
                          </div>
                        </div>
                        <div class="owl-buttons">
                          <div class="owl-prev"></div>
                          <div class="owl-next"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
            <h3 class="product-summary">Product Summary</h3>
              <div class="estimate-detail product-section-box">
                <div class="estimate-tag-block border-bottom">
                  <div class="row"  v-for="(item,index) in row.shipping_method.shipping_detail">
                    <div class="col-sm-12">
                     <div class="estimate-row heading">
                        <span>Quantity {{index+1}}</span>
                      </div>
                      <table class="product-color-price-table">
                        <tbody v-for="(element,inx) in item.color_quantity">

                          <tr>
                            <td>
                              <i class="white-color-box" :style="{ backgroundColor: inx }" >
                                <img src="">
                              </i>
                            </td>
                            <td>{{inx}}</td>
                            <td>
                              <strong>Total : {{element}}</strong>
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="estimate-tag-block" v-for="item in row.shipping_method.shipping_detail">
                    <h3 class="">Shipping Method</h3>
                      <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6">
                          <div class="estimate-row"><strong>Shipping Charge : </strong><span v-if="item.shipping_detail.shipping_charge == ''">&nbsp;&nbsp;&nbsp;-</span><span v-else>{{item.shipping_detail.shipping_charge}}</span></div>
                            <div class="estimate-row">
                              <div><strong>Shipping Address :</strong>
                                <br>{{item.shipping_address.name}},
                                <br>{{item.shipping_address.city}} - {{item.shipping_address.postalcode}},
                                <br>{{item.shipping_address.state}},
                                <br>{{item.shipping_address.country}}
                              </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6">
                          <div class="estimate-row">
                            <div><strong>Shipping Type : </strong><span>{{row.shipping_method.shipping_type}}</span></div>
                          </div>
                          <div class="estimate-row">
                            <div><strong>Shipping carrier : </strong><span v-if="item.shipping_detail.shipping_carrier == ''">&nbsp;&nbsp;&nbsp;-</span><span v-else>{{item.shipping_detail.shipping_carrier}}</span></div>
                          </div>
                          <div class="estimate-row">
                            <div><strong>Method : </strong><span v-if="item.shipping_detail.shipping_method == ''">&nbsp;&nbsp;&nbsp;-</span><span v-else>{{item.shipping_detail.shipping_method}}</span></div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6">
                          <div class="estimate-row">
                            <div><strong>In Hand Date :</strong> <span v-if="item.shipping_detail.on_hand_date == ''">&nbsp;&nbsp;&nbsp;-</span>
                            <span v-else>{{item.shipping_detail.on_hand_date}}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="estimate-tag-block" v-for="item in row.imprint">
                  <div class="row">
                    <div class="col-lg-12 col-md-6 col-sm-6">
                      <h3>Print Position: {{item.imprint_position_name}}</h3>
                      <div class="estimate-row">
                        Imprint Method :
                        <span>{{item.imprint_method_name}}</span>
                      </div>
                    <div v-if="item.no_of_color">
                      <div class="estimate-row">
                         How many colours :
                        <span> {{item.no_of_color}} Colour</span>
                      </div>
                      <div class="estimate-row" v-for="(i,index) in item.selected_colors">
                        <div>
                          Colour {{index+1}} :<span>{{i}}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else></div>
                    </div>
                  </div>
                </div>
            <div v-if="row.special_instruction != ''">    
              <h3>Special Instructions</h3>
              <div class="estimate-tag-block">
                <div>
                 {{row.special_instruction}}
                </div>
              </div>
            </div>
              </div>
            </div>
            </label>
          </p>
        </Panel>
        <Panel name="2">
          MY INFORMATION
            <p slot="content">
              <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12">
                <h4>{{row.user_info.fullname}}</h4>
                <p>
                  <span class="address">Office Address</span>
                  <br>
                    <span style="font-weight:500">
                      C-112 Girdharpark Soc.
                    <br>
                      Near New Era School
                    <br>
                      Opp. Novino Bettery
                    <br>
                      Makarpura, Vadodara
                    </span>
                </p>
              </label>
              <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12">
                <ul>
                  <li>
                    <Icon type="ios-telephone" size="15"></Icon>
                    <label style="font-weight:500">9978532084</label>
                  </li>
                  <li>
                    <Icon type="ios-email" size="15"></Icon>
                    <label style="font-weight:500">{{row.user_info.email}}</label>
                  </li>
                </ul>
              </label>
            </p>
          </Panel>
      </Collapse>
    </Card>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
import moment from 'moment';
// import eye from '../../images/Eye.png'
export default {
  props: {
    row: Object
  },
  name: 'list-billing',
  data () {
  return {
    imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
    createdAt: ''
    }
  },
  methods: {
    getImgUrl (url) {
      return this.imgurl + url
    }
  },
  mounted(){
    console.log('row@@@@@@@@@@@@@@@@@',this.row)
    this.createdAt = moment(this.row.created_at).format('DD-MMM-YYYY')
  }
}
</script>

<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .order-title {
        background: #f5f5f5;
        margin: 0 0 10px;
        margin-top: 10px;
        padding: 10px 0;
        text-align: center;
        color: #404040;
        font-size: 15px;
        overflow: hidden;
        text-transform: uppercase;
    }
    .ivu-table-expanded-cell {
        background-color: white !important;
    }
    .header {
        text-align: center;
        background-color: #3f4145;
        padding: 2px;
        /*border-top: 3px solid #C11E19*/
    }
    .data {
        font-weight: 500;
    }
    .address {
        color: #C11E19;
        font-size: 14px;
        font-family: Comic Sans MS
    }
    h4 {
        font-size: 15px;
        font-weight: 700
    }

  .quantity-price,
  .product-summary {
    background: #f3f2f2;
    /*border-left: 5px solid #c51327;*/
    color: #7e7e7e;
    display: block;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    font-size: 17px;
    margin: 8px 0;
    padding: 5px 0 5px 10px;
    width: 100%;
  }
  .quantity-table {
    margin-top: 15px;
  }
  .quantity-table-title {
        float: left;
    width: 23%;
  }
  .quantity-table-title .table-heading {
    font-size: 16px;
    color: #fff;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 700;
    text-align: center;
    padding: 4px 10px;
}
.quantity-table .table-heading {
    background: #999 none repeat scroll 0 0;
    /*border-right: 1px solid #fff;
    border-top: 0 none;*/
    color: #fff;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 300;
    font-size: 16px;
    padding: 6px;
    text-align: center;
    text-transform: uppercase;
}
.quantity-table-title .table-content, .quantity-table .table-content {
    font-size: 16px;
    color: #404040;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 700;
    text-align: center;
    padding: 4px 10px;
}
.quantity-table .table-content {
    background: #e6e6e6 none repeat scroll 0 0;
    /*border: 1px solid #fff;*/
    color: #444;
    font-size: 16px;
    padding: 6px;
    text-align: center;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 400;
    margin-left: -1px;
}
.quote-product-summary .estimate-detail {
    background: 0;
    padding: 0;
}
.product-section-box {
    margin-bottom: 20px;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 400;
}
.estimate-tag-block {
    margin-bottom: 5px;
    background: #fff;
    padding: 0px;
    font-size: 14px;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 300;
}
.border-bottom {
    /*border-bottom: 1px #ebebeb solid;*/
}
.estimate-row {
    margin-bottom: 8px;
    padding-bottom: 2px;
    font-size: 13px;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    color: #7f7f7f;
}

.estimate-tag-block .heading span {
    font-size: 15px;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    color: #404040;
}
.row {
    margin-right: -15px;
    margin-left: -15px;
}
.product-color-price-table {
    margin-bottom: 20px;
    /*width: 100%;*/
    border-top: solid 1px #e9eaec;
    border-left: solid 1px #e9eaec;
    /*border-color: white;*/
}
.product-color-price-table td {
    padding-right: 20px;
    display: inline-block;
    min-width: 60px;
    text-align: left;
}
.product-color-price-table td:last-child {
    float: right;
    min-width: 130px;
}
.product-color-price-table td {
    padding-right: 20px;
    display: inline-block;
    text-align: left;
}

i.white-color-box {
    border: solid 1px #ccc;
    height: 30px;
    margin-bottom: 2px;
    background: #fff;
    display: block;
    width: 30px;
    margin-left: 10px;
    margin-top: 5px;
}
h3 {
    background: #f3f2f2;
    /*border-left: 5px solid #c51327;*/
    color: #7e7e7e;
    display: block;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    font-size: 17px;
    margin: 8px 0;
    padding: 5px 0 5px 10px;
    width: 100%;
    line-height: 1.1;
}

.panel-body{
  width: 100%;
}
</style>
gii
<template>
  <div>
    <Card>
      <div style="text-align:center">
        <div class="row">
          <div class="col-sm-12 header">
            <p slot="header" style="color:white;text-align:center;margin-top: 10px;">
              <icon type="eye"></icon>
              <span>VIEW REQUEST INFO DETAILS</span>
            </p>
          </div>
        </div>
      </div>
      <div style="text-align:center">
        <div class="row">
          <div class="col-sm-12">
            <div class="order-title">
              <div class="col-lg-3 col-lg-offset-2 col-md-4 col-sm-4">
                ID : {{row.id}}
              </div>
              <div class="col-lg-3 col-md-4 col-sm-4">
                Requested On : {{created_date}}
              </div>
              <div class="col-lg-2 col-md-4 col-sm-4">
                Total Items : {{row.productInfo.length}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Collapse accordion>
        <Panel name="1">
          PRODUCT
          <p slot="content">
            <label style="width:-webkit-fill-available;">
          <div class="panel-body" v-for="item in row.productInfo">
            <div class="row">
              <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12 padding-right-0">
                <div class="detail-image">
                  <img alt="" :src="getImgUrl(item.default_image)" id="order_product_image_0" class="img-responsive">
                  </div>
                </div>
                <div class="col-lg-10 col-md-9 col-sm-12 col-xs-12" style="text-align: -webkit-center;">
                  <h2 class="heading-2">{{item.product_name}}</h2>
                  <div class="skuprice">
                    <div style="text-align: -webkit-center;background: #f5f5f5;
            padding: 7px 0;">Item Number :
                      <span>{{item.sku}}</span>
                    </div>
                  </div>
                </div>
            </div>
            <div v-for="i in item.pricing">
              <div v-if="i.price_type == 'regular' && i.type == 'decorative' && i.global_price_type == 'global'">
                <h3 class="quantity-price">Quantity Price</h3>
                <div class="quantity-table">
                  <div class="quantity-table-title" style="float: left;width: 23%;">
                    <div class="table-heading js-product-price-unit" data-product-price-unit="each">Quantity </div>
                    <div class="table-content">Price</div>
                  </div>
                  <div class="quantity-table-disc">
                    <div class="quantity-table-col owl-carousel owl-theme" style="opacity: 1; display: block;">
                      <div class="owl-wrapper-outer" v-for="element in i.price_range">
                        <ul class="owl-wrapper" style="width: 808px; left: 0px; display: block; transition: all 0ms ease; transform: translate3d(0px, 0px, 0px);">
                          <li class="owl-item" style="width: 101px;">
                            <div>
                              <div class="table-heading" v-if="element.qty.lte">{{element.qty.gte}} - {{element.qty.lte}}</div>
                              <div class="table-heading" v-else>{{element.qty.gte}} + </div>
                              <div class="table-content">$ {{element.price}}</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="owl-controls clickable" style="display: none;">
                        <div class="owl-pagination">
                          <div class="owl-page active">
                            <span class=""></span>
                          </div>
                        </div>
                        <div class="owl-buttons">
                          <div class="owl-prev"></div>
                          <div class="owl-next"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
            <h3 class="product-summary">Colours</h3>
              <div class="estimate-detail product-section-box">
                <div class="estimate-tag-block border-bottom">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="inquiry-color-block">
                        <ul v-for="i in item.attributes.colors">
                          <li class="color2" data-original-title="i" :style="{ backgroundColor: i }"></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="estimate-tag-block">
                    <h3 class="">Product Description</h3>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="estimate-row" v-html="item.description"></div>
                        </div>
                      </div>
                    </div>
                </div>
              <h3>Special Instructions</h3>
              <div class="estimate-tag-block">
                <div class="row">
                  <div class="col-sm-12">
                    {{row.instruction}}
                  </div>
                </div>
              </div>
              </div>
            </div>
            </label>
          </p>
        </Panel>
        <Panel name="2">
          MY INFORMATION
            <p slot="content">
              <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12">
                <h4>{{row.productInfo[0].username}}</h4>
                <p>
                  <span class="address">Office Address</span>
                  <br>
                    <span style="font-weight:500">
                      C-112 Girdharpark Soc.
                    <br>
                      Near New Era School
                    <br>
                      Opp. Novino Bettery
                    <br>
                      Makarpura, Vadodara
                    </span>
                </p>
              </label>
              <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12">
                <ul>
                  <li>
                    <Icon type="ios-telephone" size="15"></Icon>
                    <label style="font-weight:500">9978532084</label>
                  </li>
                  <li>
                    <Icon type="ios-email" size="15"></Icon>
                    <label style="font-weight:500">{{row.productInfo[0].username}}</label>
                  </li>
                </ul>
              </label>
            </p>
          </Panel>
      </Collapse>
    </Card>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
import moment from 'moment';
// import eye from '../../images/Eye.png'
export default {
  props: {
    row: Object
  },
  name: 'list-billing',
  data () {
  return {
    imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
    data: '',
    created_date: '',
    colors:[]
    }
  },
  methods: {
    getImgUrl (url) {
      return this.imgurl + url
    }
  },
  computed: {
    // styles() {
    //    return {
    //     'background-color': this.colors[0]
    //     };
    // }
  },
  mounted(){
    this.created_date = moment(this.row.createdAt).format('DD-MMM-YYYY')
  }
}
</script>

<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .order-title {
        background: #f5f5f5;
        margin: 0 0 10px;
        margin-top: 10px;
        padding: 10px 0;
        text-align: center;
        color: #404040;
        font-size: 15px;
        overflow: hidden;
        text-transform: uppercase;
    }
    .ivu-table-expanded-cell {
        background-color: white !important;
    }
    .header {
        text-align: center;
        background-color: #3f4145;
        padding: 2px;
        border-top: 3px solid #C11E19
    }
    .data {
        font-weight: 500;
    }
    .address {
        color: #C11E19;
        font-size: 14px;
        font-family: Comic Sans MS
    }
    h4 {
        font-size: 15px;
        font-weight: 700
    }

  .quantity-price,
  .product-summary {
    background: #f3f2f2;
    border-left: 5px solid #c51327;
    color: #7e7e7e;
    display: block;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    font-size: 17px;
    margin: 8px 0;
    padding: 5px 0 5px 10px;
    width: 100%;
  }
  .quantity-table {
    margin-top: 15px;
  }
  .quantity-table-title {
        float: left;
    width: 23%;
  }
  .quantity-table-title .table-heading {
    font-size: 16px;
    color: #fff;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 700;
    text-align: center;
    padding: 4px 10px;
}
.quantity-table .table-heading {
    background: #999 none repeat scroll 0 0;
    border-right: 1px solid #fff;
    border-top: 0 none;
    color: #fff;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 300;
    font-size: 16px;
    padding: 6px;
    text-align: center;
    text-transform: uppercase;
}
.quantity-table-title .table-content, .quantity-table .table-content {
    font-size: 16px;
    color: #404040;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 700;
    text-align: center;
    padding: 4px 10px;
}
.quantity-table .table-content {
    background: #e6e6e6 none repeat scroll 0 0;
    border: 1px solid #fff;
    color: #444;
    font-size: 16px;
    padding: 6px;
    text-align: center;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 400;
    margin-left: -1px;
}
.quote-product-summary .estimate-detail {
    background: 0;
    padding: 0;
}
.product-section-box {
    margin-bottom: 20px;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 400;
}
.estimate-tag-block {
    margin-bottom: 5px;
    background: #fff;
    padding: 0px;
    font-size: 14px;
    font-family: 'Roboto Condensed',sans-serif;
    font-weight: 300;
}
.border-bottom {
    border-bottom: 1px #ebebeb solid;
}
.estimate-row {
    margin-bottom: 8px;
    padding-bottom: 2px;
    font-size: 13px;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    color: #7f7f7f;
}

.estimate-tag-block .heading span {
    font-size: 15px;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    color: #404040;
}
.product-color-price-table {
    margin-bottom: 20px;

    border-color: white;
}
.product-color-price-table td {
    padding-right: 20px;
    display: inline-block;
    min-width: 60px;
    text-align: left;
}
.product-color-price-table td:last-child {
    float: right;
    min-width: 130px;
}
.product-color-price-table td {
    padding-right: 20px;
    display: inline-block;
    text-align: left;
}
i.white-color-box {
    border: solid 1px #ccc;
    height: 30px;
    margin-bottom: 2px;
    background: #fff;
    display: block;
    width: 30px;
}
h3 {
    background: #f3f2f2;
    border-left: 5px solid #c51327;
    color: #7e7e7e;
    display: block;
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    font-size: 17px;
    margin: 8px 0;
    padding: 5px 0 5px 10px;
    width: 100%;
    line-height: 1.1;
}
.product-color-price-table>tr>td{
  border: none;
}
.inquiry-color-block ul li {
    border: 2px solid #ccc;
    width: 25px;
    height: 25px;
    float: left;
    margin-right: 2px;
    margin-bottom: 2px;
}

</style>
Hiral Dheniya
------------------------------
Krishna dalsania
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
        },
 data () {
      return {
        customaddress: '',
        customTotaltax: '',
        invnoFilter: [],
        invoiceno:'',
        newList:[],
        previous: 'false',
        //message:"hello",
        newTabIndex : '',
        viewDetailModal : false,
        tabIndex : 0,
        tabPanes : [],
        spinShow: true,
        eye,
        money,
        mail,
        download,
        emailDataCustom:'',
        emailData : '',
        emailDataCustomer:'',
        emailDataCompany: '',
        filterArray : [],
        columns3 : [],
        columns2: [
            {
                title: 'Invoice No.',
                key: 'Id',
                sortable: true
            },
            {
                title: 'Customer Name',
                key: 'CustomerRef',
                sortable: true,
                render : (h , {row}) => { 
                  // return row.CustomerRef.name
                  return h('div', [
                    h('span', row.CustomerRef.name)
                  ]);
                }
            },
            {
                title: 'Date',
                key: 'TxnDate',
                sortable: true,
                render : (h,{row}) => {
                  var date1 = moment(row.TxnDate).format('DD-MMM-YYYY')
                  // return date1
                  return h('div', [
                                
                                h('span', date1)
                            ]);
                }
            },
            {
                title: 'Paid Amount',
                sortable: true,
                render : (h , {row}) => { 
                  // return  accounting.formatMoney((row.TotalAmt-row.Balance)) 
                  return h('div', [
                    h('span', accounting.formatMoney((row.TotalAmt-row.Balance)))
                  ]);
                }
            },
            {
                title: 'Total Amount',
                key: 'TotalAmt',
                sortable: true,
                render : (h , {row}) => { 
                  // return  accounting.formatMoney(row.TotalAmt)
                  return h('div', [
                    h('span', accounting.formatMoney((row.TotalAmt-row.Balance)))
                  ]);
                }

            },
            {
                title: 'Status',
                sortable: true,
                render : (h , {row}) => {
                    if(row.TotalAmt-row.Balance != row.TotalAmt){
                      return h('div', [
                        h('span',"AUTHORISED")
                      ]);
                     // return "AUTHORISED"
                   }else{
                      return h('div', [
                        h('span',"PAID")
                      ]);
                     // return "PAID"
                   }
                }
            },
            {
              title: 'Action',
              key: 'Status',
              align: 'center',
              width: 210,
              render: (h, {row}) => {
                if(row.TotalAmt-row.Balance != row.TotalAmt){
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
                            height:'20px',
                            width:'20px',
                            margin: '2px'
                          },
                          on: {
                            click: () => {
                              this.makepayment(row )
                            }
                          }
                        },'')
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
                            height:'20px',
                            width:'20px',
                            margin: '2px'
                          },
                          on: {
                            click: () => {
                              this.sendemailQB(row)
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
                          float:'center',
                          cursor:'pointer'
                        }
                      }, [
                         h('img', {
                          attrs: {
                            src :this.download
                            },
                          style: {
                            height:'20px',
                            width:'20px',
                            margin: '2px'
                          },
                          on: {
                            click: () => {
                              this.createPDFQB(row)
                            }
                          }
                        }, '')
                      ]),
                      h('Tooltip', {
                        props: {
                          placement: 'top',
                          content: 'View Detailed Transaction'
                        },
                        style:{

                          cursor:'pointer'
                        }
                      }
                    //   , [
                    //   h('img', {
                    //     attrs: {
                    //         src: this.eye
                    //       },
                    //       style: {
                    //         hight:'20px',
                    //         width:'20px',
                    //         margin: '2px'
                    //       },
                    //     on: {
                    //       click: () => {
                    //         // this.viewDetails(params)
                    //       }
                    //     }
                    //   }, '')
                    // ]
                  )
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
                            height:'20px',
                            width:'20px',
                            margin: '2px'
                          },
                          on: {
                            click: () => {
                              this.sendemailQB(row)
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
                          height:'20px',
                          width:'20px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {
                            this.createPDFQB(row)
                          }
                        }
                      }, '')
                    ])
                    // h('Tooltip', {
                    //     props: {
                    //       placement: 'top',
                    //       content: 'View Detailed Transaction'
                    //     },
                    //     style:{
                    //
                    //       cursor:'pointer'
                    //     }
                    //   }, [
                    //   h('img', {
                    //     attrs: {
                    //         src: this.eye
                    //       },
                    //       style: {
                    //         hight:'20px',
                    //         width:'20px',
                    //         margin: '2px'
                    //       },
                    //     on: {
                    //       click: () => {
                    //         // this.viewDetails(params)
                    //       }
                    //     }
                    //   }, '')
                    // ])
                  ])
                }
              }
            },
            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                console.log('params--------------->',this.newList)
                console.log('this.newTabIndex............', this.newTabIndex)
                return h(listtransaction, {

                  props: {
                    list:this.newList,
                    tabIndex:this.newTabIndex
                  }
                })
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
                sortable: true,
                render:(h,{row})=>{ 
                  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " , row.Contact.Name)
                  return h('div', [
                                
                                h('span', row.Contact.Name)
                            ]);
                }
            },
            {
                title: 'Date',
                //key: 'Date',
                sortable: true,
                render:(h,{row})=>{
                  var date1 = moment(row.Date).format('DD-MMM-YYYY')
                  
                  return h('div', [
                                
                                h('span', date1)
                            ]);
                
                }
            },
             {
                title: 'Paid Amount',
                key: 'AmountPaid',
                sortable: true,
                render:(h,{row})=>{ 
                  // return  accounting.formatMoney(row.AmountPaid)  
                  return h('div', [
                                
                                h('span', accounting.formatMoney(row.AmountPaid))
                            ]);
                  }
            },
            {
                title: 'Total Amount',
                key: 'Total',
                sortable: true,
                render:(h,{row})=>{ 
                  // return  accounting.formatMoney(row.Total) 
                  return h('div', [
                                
                                h('span', accounting.formatMoney(row.AmountPaid))
                            ]);
                  }
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
              width: 210,
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
                              hight:'20px',
                              width:'20px',
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
                            hight:'20px',
                            width:'20px',
                            margin: '2px'
                          },
                          on: {
                            click: () => {
                              this.sendemailXERO(params)
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
                            hight:'20px',
                            width:'20px',
                            margin: '2px'
                          },
                          on: {
                            click: () => {
                              this.createPDFXero(params)
                            }
                          }
                        }, '')
                    ]),
                    h('Tooltip', {
                        props: {
                          placement: 'top',
                          content: 'View Detailed Transaction'
                        },
                        style:{

                          cursor:'pointer'
                        }
                      }
                    //   , [
                    //   h('img', {
                    //     attrs: {
                    //         src: this.eye
                    //       },
                    //       style: {
                    //         hight:'20px',
                    //         width:'20px',
                    //         margin: '2px'
                    //       },
                    //     on: {
                    //       click: () => {
                    //         // this.viewDetails(params)
                    //       }
                    //     }
                    //   }, '')
                    // ]
                  )
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
                            hight:'20px',
                            width:'20px',
                            margin: '2px'
                          },
                          on: {
                            click: () => {
                              this.sendemailXERO(params)
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
                            hight:'20px',
                            width:'20px',
                            margin: '2px'
                          },
                        on: {
                          click: () => {
                            this.createPDFXero(params)
                          }
                        }
                      }, '')
                    ]),
                    // h('Tooltip', {
                    //     props: {
                    //       placement: 'top',
                    //       content: 'View Detailed Transaction'
                    //     },
                    //     style:{
                    //
                    //       cursor:'pointer'
                    //     }
                    //   }, [
                    //   h('img', {
                    //     attrs: {
                    //         src: this.eye
                    //       },
                    //       style: {
                    //         hight:'20px',
                    //         width:'20px',
                    //         margin: '2px'
                    //       },
                    //     on: {
                    //       click: () => {
                    //         // this.viewDetails(params)
                    //       }
                    //     }
                    //   }, '')
                    // ])
                  ])
                }
              }
            },
            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                console.log('params--------------->',this.newList)
                console.log('this.newTabIndex............', this.newTabIndex)
                return h(listtransaction, {

                  props: {
                    list:this.newList,
                    tabIndex:this.newTabIndex
                  }
                })
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
        duelt: '',
        DescriptionPdf : ''
      }
    },
    components: { listtransaction },
    methods: {
      filterMethod (value, option) {
          return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      text(item) {
         try{
           return JSON.parse(item).description
         } catch(e) {
           return item
         }
          // return (typeof item === 'object')? JSON.parse(item).description : item
          // return $(item).text();
      },
      accounting(item){
          // console.log("item",item)
          return accounting.formatMoney(item)
      },

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
        this.invoiceno = '';
        this.getAllSettings();
      },

      async changeData() {
        console.log("this.data6", this.data6)
        this.filterArray = this.data6
        var self = this

        if(this.invoiceno != ''){
          console.log("this.invoiceno", this.invoiceno)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)
            if(item.InvoiceNumber != undefined){
              return item.InvoiceNumber === self.invoiceno;
            }else {
              return item.Id === self.invoiceno;
            }
          });
          console.log("myarr",this.filterArray)
          this.list = await this.mockTableData2(1,pageSize)
        }

        if(this.cname != ''){
          console.log("this.cname", this.cname)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)
            if(item.Contact != undefined){
              return item.Contact.Name === self.cname;
            }else if(item.CustomerRef != undefined){
              return item.CustomerRef.name === self.cname;
            }else{
              return item.Name === self.cname;
            }
          });
          console.log("myarr",this.filterArray)
          this.list = await this.mockTableData2(1,pageSize)
        }else{
          console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
          console.log("myarr",this.filterArray)
          this.list = await this.mockTableData2(1,pageSize)
        }

        if(this.status != ''){
          console.log("this.status", this.status)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)
            if(item.Status != undefined){
              return item.Status === self.status;
            }
            else{
              if(self.status == 'AUTHORISED'){
                if(item.TotalAmt-item.Balance != item.TotalAmt){
                    return item
                }
              }else if(self.status == 'PAID'){
                if(item.TotalAmt-item.Balance == item.TotalAmt){
                    return item
                }
              }
            }
          });
           console.log("myarr",this.filterArray)
           this.list = await this.mockTableData2(1,pageSize)
        }else{
          console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.status)
          console.log("myarr",this.filterArray)
          this.list = await this.mockTableData2(1,pageSize)
        }

        if(this.dategt != ''){
          console.log("this.dategt", this.dategt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            if(item.Date != undefined){
              var a = moment(item.Date).format('YYYY-MM-DD')
              if(moment(a).diff(moment(self.dategt).format(), 'days') >= 0){
                console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                return item;
              }
              // if(moment(item.Date).diff(moment(self.dategt).format(), 'days') >= 0){
              // console.log('item>>>>>>>>>>>>>>>>>>>>', item)
              // return item;
              // }
            }else{
              if(moment(item.TxnDate).diff(moment(self.dategt).format(), 'days') >= 0){
                console.log('item>>>>>>>>>>>>>>>>>>>>', item)
                return item;
              }
            }
          });
          console.log("myarr",this.filterArray)
          this.list = await this.mockTableData2(1,pageSize)
        }

        if(this.datelt != ''){
          console.log("this.datelt", this.datelt)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item.DueDate)
            if(item.Date != undefined){
              var a = moment(item.Date).format('YYYY-MM-DD')
              if(moment(a).diff(moment(self.datelt).format(), 'days') <= 0){
                return item;
              }
              // if(moment(item.Date).diff(moment(self.datelt).format(), 'days') <= 0){
              // return item;
              // }
            }else{
              if(moment(item.TxnDate).diff(moment(self.datelt).format(), 'days') <= 0){
              return item;
              }
            }
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
              return item.TotalAmt <= self.totallt;
            }
          });
           console.log("myarr",this.filterArray)
           this.list = await this.mockTableData2(1,pageSize)
        }

      },

      async getCustomerBySettingId(settingId , settingDomain , data){
        // $('#selectCustomer').remove();
        var NameArr = [];
        $('#selectCustomer').children('option:not(:first)').remove();
        console.log("NameArr ", NameArr )
        let res
        console.log("settingId----------------------->",settingDomain)
        if(settingDomain == 'custom'){
            let customerUrl = this.tabPanes[data].customer_url;
            console.log('--------iiiiiiiiii------------',customerUrl)
            await axios({
              method: 'get',
              url: customerUrl,
              headers:{
                Authorization : Cookies.get('auth_token')
              },
              params: {
                  settingId : settingId
              }
            })
            .then(function (response) {
                console.log('------------->',response)
                res = response.data.data
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
                console.log("Error in customer by settingId",error);
            });
          }
        }


        console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',res)

              res.forEach (obj => {
                  // console.log("/////////////////////////////////////////////////////////////////",obj)
                  if(obj.Name == undefined){
                      NameArr.push(obj.DisplayName)
                  }else{
                      NameArr.push(obj.Name);
                  }
                })
              NameArr.sort();

              NameArr.forEach(item => {
                  var x = document.getElementById("selectCustomer");
                  var option = document.createElement("option");
                  option.text = item;
                  console.log()
                  x.add(option);
              })

      },
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
      async createPDFXero (params) {
        this.$Loading.start();
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
                self.emailDataCustomer = response.data[0].data[0]
              })
              .catch(function (error) {
                console.log(error);
              });
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
              }).then(function (response) {
                console.log("ooooooooooooooooo",response);
                self.emailDataCompany = response.data
              })
              .catch(function (error) {
                console.log(error);
              });

              console.log('self.emailDataCompany--------------->',self.emailDataCompany)

        axios.get(config.default.serviceUrl + 'invoice/' + params.row.InvoiceID, {
          headers:{
              Authorization : Cookies.get('auth_token')
          },
          params : {
            settingId : settingID
          }
        })
        .then(async function (response) {
          console.log('response>>>>>>>>>>>>>>', response)
          self.DescriptionPdf = response.data[0].data.LineItems;

        })
        .catch(function (error) {
        });

        console.log('self.emailDataCustomer',self.emailDataCustomer)
        setTimeout(function(){
          console.log('self.$refs.email1.innerHTML----->',self.$refs)
          self.$Loading.finish();
          document.querySelector('#myfooter').style.position = 'initial'
          self.$Modal.confirm({
            title: '',
            content: self.$refs.email1.innerHTML,
            width: 1000,
            okText: 'Download PDF',
            onOk: () => {
              document.querySelector('#myfooter').style.position = 'fixed'
              axios({
                method: 'post',
                url: config.default.serviceUrl + 'exporttopdf',
                data: {

                    "html" : self.$refs.email1.innerHTML
                },

              })
              .then(function (response) {
                  console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                  document.querySelector('#myfooter').style.position = 'initial' 
                  var arrayBufferView = new Uint8Array( response.data.data );
                  var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                  var link=document.createElement('a');
                  link.href=window.URL.createObjectURL(blob);
                  link.download=params.row.InvoiceNumber == undefined ? params.row.Id : params.row.InvoiceNumber;
                  link.click();
              })
              .catch(function (error) {
                console.log(error);
              });

              // saveAs(blob, filename);
              // console.log(self.$refs.email1.innerHTML)
              // var doc = new jsPDF();
              // doc.fromHTML(self.$refs.email1.innerHTML, 15, 15, {
              //     'width': 170
              // },function() {
              //     doc.save('sample-file.pdf');
              // });


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
         }, 5000);

      },
      async createPDFQB(params) {
        this.$Loading.start();
        console.log("paramsssssssssssssssss " , params)
        this.emailData = params;
        var self = this
        var date = new Date(params.TxnDate);
        this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
        var date1 = new Date(params.DueDate);
        this.dueDate =  date1.getDate() + '/' + (date1.getMonth() + 1) + '/' +  date1.getFullYear()
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'contacts',
              params: {
                settingId : settingID,
                Name : params.CustomerRef.name
              },
              headers:{
              Authorization : Cookies.get('auth_token')
          },
              }).then(function (response) {
                console.log("contact response",response);
                self.emailDataCustomer = response.data[0].data[0]
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^",self.emailDataCustomer)
              })
              .catch(function (error) {
                console.log(error);
              });
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
              }).then(function (response) {
                console.log("ooooooooooooooooosetting response",response);
                self.emailDataCompany = response.data
              })
              .catch(function (error) {
                console.log(error);
              });

              console.log('self.emailDataCompany--------------->',self.emailDataCompany)

        axios.get(config.default.serviceUrl + 'invoice/' + params.Id, {
          headers:{
              Authorization : Cookies.get('auth_token')
          },
          params : {
            settingId : settingID
          }
        })
        .then(async function (response) {
          console.log('response>>>>>>>>>>>>>>', response)
          self.DescriptionPdf = response.data[0].data[0].Line;
          console.log("$$$$$$$$$$$$$$$4",self.DescriptionPdf)

        })
        .catch(function (error) {
        });

        // console.log('self.emailDataCustomer',self.emailDataCustomer)
        setTimeout(function(){
          console.log('self.$refs.email1.innerHTML----->',self.$refs)
          self.$Loading.finish();
          self.$Modal.confirm({
            title: '',
            content: self.$refs.email1.innerHTML,
            width: 1000,
            okText: 'Download PDF',
            onOk: () => {
            document.querySelector('#myfooter').style.position = 'fixed'
            axios({
              method: 'post',
              url: config.default.serviceUrl + 'exporttopdf',
              data: {

                  "html" : self.$refs.email1.innerHTML
              },

              }).then(function (response) {
                console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                document.querySelector('#myfooter').style.position = 'initial' 
                var arrayBufferView = new Uint8Array( response.data.data );
                var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download=params.Id;
                link.click();
              })
              .catch(function (error) {
                console.log(error);
              });

              // saveAs(blob, filename);
              // console.log(self.$refs.email1.innerHTML)
              // var doc = new jsPDF();
              // doc.fromHTML(self.$refs.email1.innerHTML, 15, 15, {
              //     'width': 170
              // },function() {
              //     doc.save('sample-file.pdf');
              // });


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
         }, 5000);

      },
      async makepayment(params){
          //alert(">>>>>>>>>>> , "+this.settingIdForPayment)
         console.log(params)
        // this.$store.state.invoiceData = params;
        // this.$store.state.settingId = this.settingIdForPayment
        // console.log(">>>>>>>>> " , this.$store.state.invoiceData);
        if(params.InvoiceID != undefined){
          this.$router.push('/checkout/' + params.InvoiceID+"?settingId="+this.settingIdForPayment)
        }else{
          this.$router.push('/checkout/' + params.Id+"?settingId="+this.settingIdForPayment)
        }
      },
      
      async sendemailXERO(params){
        this.$Loading.start();
        // console.log("paramsssssssssssssssss " , params)
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
                self.emailDataCustomer = response.data[0].data[0]
              })
              .catch(function (error) {
                console.log(error);
              });
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
              }).then(function (response) {
                console.log("ooooooooooooooooo",response);
                self.emailDataCompany = response.data
              })
              .catch(function (error) {
                console.log(error);
              });

              console.log('self.emailDataCompany--------------->',self.emailDataCompany)

        axios.get(config.default.serviceUrl + 'invoice/' + params.row.InvoiceID, {
          headers:{
              Authorization : Cookies.get('auth_token')
          },
          params : {
            settingId : settingID
          }
        })
        .then(async function (response) {
          console.log('response>>>>>>>>>>>>>>', response)
          self.DescriptionPdf = response.data[0].data.LineItems;

        })
        .catch(function (error) {
        });

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
                          url:  'https://api.'+process.env.domainkey+'/vmailmicro/sendEmail',
                          data: myData,
                          headers: {
                            'authorization':  Cookies.get('auth_token'),
                            
                          }
                          }).then(function (response) {
                            console.log(response);
                            self.$Message.success(response.data.success);
                            // self.list[params.index].loading1 = false
                            self.$Loading.finish();
                          })
                          .catch(function (error) {
                            self.$Message.warning("email send failed , Please try again later");
                            self.$Loading.finish();
                            console.log(error);
                          });
                      }
                  })

      },
      async sendemailQB(params){

        this.$Loading.start();
        console.log("paramsssssssssssssssss " , params)
        this.emailData = params;
        var self = this
        var date = new Date(params.TxnDate);
        this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
        var date1 = new Date(params.DueDate);
        this.dueDate =  date1.getDate() + '/' + (date1.getMonth() + 1) + '/' +  date1.getFullYear()
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'contacts',
              params: {
                settingId : settingID,
                Name : params.CustomerRef.name
              },
              headers:{
              Authorization : Cookies.get('auth_token')
          },
              }).then(function (response) {
                console.log("contact response",response);
                self.emailDataCustomer = response.data[0].data[0]
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^",self.emailDataCustomer)
              })
              .catch(function (error) {
                console.log(error);
              });
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
              }).then(function (response) {
                console.log("ooooooooooooooooosetting response",response);
                self.emailDataCompany = response.data
              })
              .catch(function (error) {
                console.log(error);
              });

              console.log('self.emailDataCompany--------------->',self.emailDataCompany)

        axios.get(config.default.serviceUrl + 'invoice/' + params.Id, {
          headers:{
              Authorization : Cookies.get('auth_token')
          },
          params : {
            settingId : settingID
          }
        })
        .then(async function (response) {
          console.log('response>>>>>>>>>>>>>>', response)
          self.DescriptionPdf = response.data[0].data[0].Line;
          console.log("$$$$$$$$$$$$$$$4",self.DescriptionPdf)

        })
        .catch(function (error) {
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
                          url:  'https://api.'+process.env.domainkey+'/vmailmicro/sendEmail',
                          data: myData,
                          headers: {
                            'authorization':  Cookies.get('auth_token'),
                            
                          }
                          }).then(function (response) {
                            console.log(response);
                            self.$Message.success(response.data.success);
                            self.$Loading.finish();
                            // self.list[params.index].loading1 = false
                          })
                          .catch(function (error) {
                            self.$Message.warning("email send failed , Please try again later");
                            self.$Loading.finish();
                            console.log(error);
                          });
                      }
                  })

      },
      async tabClicked(data){
        // console.log(data)
        this.reset();
        this.tabIndex = data;
        this.newList = [];
        this.newTabIndex = '';
        let settingName = this.tabPanes[data].configName;
        let settingId = this.tabPanes[data].id;
        let settingDomain = this.tabPanes[data].domain;
        this.settingIdForPayment = settingId;

        this.getInvoiceBySettingId(settingId ,settingDomain , data, settingName)
        this.getCustomerBySettingId(settingId , settingDomain , data)
      },
      async getInvoiceBySettingId(settingId , settingDomain , data, settingName){
        console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTtt",settingId)
        settingID = settingId
        this.$Loading.start();
        this.data6 = [];
        let self = this;
        self.list = [];

        if(settingDomain == 'custom'){
          let Invoiceurl = self.tabPanes[data].invoice_url;
          axios({
            method: 'get',
            url: Invoiceurl,
            params : {
              settingId : this.tabPanes[data].id
            },
            headers:{
              Authorization : Cookies.get('auth_token')
            },
          })
          .then(async function (response) {
            self.$Loading.finish();
            $('.preload').css("display","none")
            console.log("iiiiiiiii------------------>",response);
            self.data6 = response.data.data;
            self.invnoFilter = []
            let columnArray =  _.union(...(_.chain(self.data6).map(m => { return _.keys(m) }).value()))
            let modifiedArray = _.pull(columnArray, "id", "importTracker_id" ,"Action","settingId" );

            console.log("############# " , columnArray);
            columnArray = ["Invoice_No","Name", "Date", "Paid",  "Total" , "Status"]
            let arr = [];
            let len = columnArray.length;
            for (let i = 0; i < len; i++) {
              if (columnArray[i] == 'Paid' || columnArray[i] == 'Total' ) {
                arr.push({
                  title: columnArray[i] + ' Amount',
                  key : columnArray[i],
                  sortable: true,
                  render : (h , {row}) => { return  accounting.formatMoney(row[columnArray[i]]) }
                });
              }
              else if (columnArray[i] == 'Name') {
                arr.push({
                  title: 'Customer Name',
                  key : columnArray[i],
                  sortable: true
                });
              }
              else {
                arr.push({
                  title: columnArray[i],
                  key : columnArray[i],
                  sortable: true
                });
              }
            }
            if(modifiedArray.indexOf("Action") != -1){
              modifiedArray.push(modifiedArray.splice(modifiedArray.indexOf("Action"), 1)[0]);
            }else{
              arr.push({
                title: "Action",
                width: 210,
                align: 'center',
                render: (h, params) => {
                return h('div', [
                  h('Tooltip', {
                    props: {
                    placement: 'top',
                    content: 'Make payment'
                    },
                    style:{

                    cursor:'pointer'
                    }
                  }, [
                  h('img', {
                    attrs: {
                      src: self.money
                    },
                    style: {
                      hight:'20px',
                      width:'20px',
                      margin: '2px'
                    },
                    on: {
                    click: () => {
                      self.makePaymentCustom(params ,settingId, settingDomain)
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

                    cursor:'pointer'
                    }
                  }, [
                    h('img', {
                    attrs: {
                      src: self.mail
                    },
                    style: {
                      hight:'20px',
                      width:'20px',
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
                      hight:'20px',
                      width:'20px',
                      margin: '2px'
                    },
                    on: {
                    click: () => {
                      self.createPDFCustom(params)
                    }
                    }
                  }, '')
                  ])
                  // h('Tooltip', {
                  //     props: {
                  //       placement: 'top',
                  //       content: 'View Detailed Transaction'
                  //     },
                  //     style:{
                  //
                  //       cursor:'pointer'
                  //     }
                  //   }, [
                  //   h('img', {
                  //     attrs: {
                  //         src: self.eye
                  //       },
                  //       style: {
                  //         hight:'20px',
                  //         width:'20px',
                  //         margin: '2px'
                  //       },
                  //     on: {
                  //       click: () => {
                  //         self.viewDetailsCustom(params ,settingId, settingDomain)
                  //       }
                  //     }
                  //   }, '')
                  // ])
                ])

              },

              },
              {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                console.log('params--------------->',self.newList)
                console.log('this.newTabIndex............',self.newTabIndex)
                return h(listtransaction, {
                props: {
                  list:self.newList,
                  tabIndex:self.newTabIndex
                }
                })
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
        }
        else{
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
              self.invnoFilter = []
              if(response.data[0].data[0].InvoiceNumber != undefined){
                response.data[0].data.forEach(item => {
                  self.invnoFilter.push(item.InvoiceNumber)
                })
              }else if(response.data[0].data[0].Id != undefined){
                response.data[0].data.forEach(item => {
                  self.invnoFilter.push(item.Id)
                })
              }
              self.$Loading.finish();
              $('.preload').css("display","none")
              self.filterArray = []
              self.list = await self.mockTableData1(1,pageSize)
          })
          .catch(function (error) {
            console.log("error",error);
            if (error.response.data.message === 'invalid_grant') {
              self.$Notice.error({
                duration:0, 
                title: "QB : Credential Expired",
                desc: "Token is expired for "+settingName
              });
            }
            self.$Loading.error();
          });
        }


      },

      async makePaymentCustom(params ,settingIdForPayment, domain){

          console.log(params)
          this.$router.push('/checkout/' + params.row.id+"?settingId="+settingIdForPayment+"&domain=custom")

      },

      async viewDetailsCustom(params ,status){
        // async viewDetailsCustom(params ,settingIdForPayment, domain){

        //this.$router.push('/transaction/list-transaction/'+ params.row.id+"?settingId="+settingIdForPayment+"&domain=custom")
        // this.viewDetailModal = true;
        // console.log(this)
        //alert(this.tabIndex);
        setTimeout(function(){
          $('.my-panel').css('display','none')
        },0)
        if (!status) return
        // $('.el-table__expand-icon.el-table__expand-icon--expanded').click()
        $('.ivu-table-cell-expand-expanded').click()
        let self = this;
        setTimeout(function(){
          $('.my-tab .ivu-tabs-tab').addClass('ivu-tabs-tab-disabled')
        },1000)
        await axios.get(config.default.serviceUrl + 'transaction', {
              params : {
                  settingId : params.settingId,
                  InvoiceNumber : params.Invoice_No
              }
          })
          .then(function (response) {
              console.log("transaction response",response);
              //alert(self.tabPanes[self.tabIndex].configName)
              self.newTabIndex = self.tabIndex
              if(response.data.data.length == 0){
                self.newList = []
              } else {
                self.newList = response.data.data;
              }
              // self.$Loading.finish();
              // $('.preload').css("display","none")
              // self.newList = await self.mockTableData1(1,pageSize)
          })
          .catch(function (error) {
              console.log("error",error);
              self.$Loading.error();
          });
      },

      async viewDetails(params,status){
        // console.log(this.previous)
        // if(this.previous == true){
        // console.log('status', status)
        setTimeout(function(){
          $('.my-panel').css('display','none')
        },100)
        if (!status) return
        $('.ivu-table-cell-expand-expanded').click()
        setTimeout(function(){
          $('.my-tab .ivu-tabs-tab').addClass('ivu-tabs-tab-disabled')
        },1000)
        let self = this;
        console.log(self.tabPanes[self.tabIndex].domain)
        let id
        if(self.tabPanes[self.tabIndex].domain == "QB"){
          id = params.Id
        } else if(self.tabPanes[self.tabIndex].domain == "Xero"){
          id = params.InvoiceID
        }
        console.log('id..........',params.Id)
        await axios.get(config.default.serviceUrl + 'transaction', {
              params : {
                  settingId : self.tabPanes[self.tabIndex].id,
                  InvoiceID : id
              }
          })
          .then(function (response) {
            console.log('rrrrrrrrrrrrrrrrrr',response)
              self.newTabIndex = self.tabIndex
              console.log(response.data.data)
              if(response.data.data.length == 0){
                // self.newList = [{"paymentAccounting":{"Invoice":{"InvoiceNumber":"", "Date":"00/00/0000"},"Contact":{"Name":""},"Amount": ""}, "paymentGateway": {"id": ""},"key" : "No transaction has been made for this Invoice"}]
                console.log("self.newList>>>>>>>>>>>>>", self.newList)
                // self.newList = [{key : "No transaction has been made for this Invoice"}]
                self.newList = []
              } else {
                self.newList = response.data.data;
              }
          })
          .catch(function (error) {
              console.log("error",error);
              self.$Loading.error();
          });
      },

       async createPDFCustom(params){

        var self = this
        this.$Loading.start();
        console.log("paramsssssssssssssssss " , params)
        this.emailDataCustom = params.row;
        var date = new Date(params.row.Date);
        this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
        var date1 = new Date(params.row.DueDate);
        this.dueDate =  date1.getDate() + '/' + (date1.getMonth() + 1) + '/' +  date1.getFullYear()
       
        console.log("%%%%%%%%%%%%%",this.emailData)
        console.log("this.createdDate",this.createdDate)
        console.log("this.dueDate",this.dueDate)
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'customcustomer',
              params: {
                settingId : settingID,
                Name : params.row.Name
              },
              headers:{
              Authorization : Cookies.get('auth_token')
          },
              }).then(function (response) {
                self.emailDataCustomer = response.data.data[0]
              })
              .catch(function (error) {
                console.log(error);
              });
                console.log('self.emailDataCustomer---------->',self.emailDataCustomer)

                this.customaddress = self.emailDataCustomer.Address.split(",");
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
              }).then(function (response) {
                console.log("ooooooooooooooooo",response);
                self.emailDataCompany = response.data
              })
              .catch(function (error) {
                console.log(error);
              });

              console.log('self.emailDataCompany--------------->',self.emailDataCompany)

              self.DescriptionPdf = this.emailDataCustom.products;

              self.customTotaltax = 0

              self.DescriptionPdf.forEach(item => {
                self.customTotaltax += item.tax
              })

              console.log("self.customTotaltax---->",self.customTotaltax)
                // axios.get(config.default.serviceUrl + 'invoice', {
                //   headers:{
                //       Authorization : Cookies.get('auth_token')
                //   },
                //   params : {
                //     settingId : settingID,
                //     Invoice_No : params.row.Invoice_No
                //   }
                // })
                // .then(async function (response) {
                //   console.log('response>>>>>>>>>>>>>>', response)
                //   self.DescriptionPdf = response.data[0].data.LineItems;

                // })
                // .catch(function (error) {
                // });
        setTimeout(function(){
          self.$Loading.finish();
          document.querySelector('#myfooter').style.position = 'initial'
          self.$Modal.confirm({
            title: '',
            content: self.$refs.email2.innerHTML,
            width: 1000,
            okText: 'Download PDF',
            onOk: () => {
              document.querySelector('#myfooter').style.position = 'fixed'
              axios({
              method: 'post',
              url: config.default.serviceUrl + 'exporttopdf',
              data: {
                  "html" : self.$refs.email2.innerHTML
              },

              }).then(function (response) {
                console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                document.querySelector('#myfooter').style.position = 'initial'
                var arrayBufferView = new Uint8Array( response.data.data );
                var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download=params.row.Invoice_No == undefined ? "custom_Invoice" : params.row.Invoice_No;
                link.click();
              })
            },
            onCancel: () => {
            }
          })
         }, 2000);
      },
      
       async sendemailCustom(params){

        var self = this
        this.$Loading.start();
        console.log("paramsssssssssssssssss " , params)
        this.emailDataCustom = params.row;
        var date = new Date(params.row.Date);
        this.createdDate =  date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()
        var date1 = new Date(params.row.DueDate);
        this.dueDate =  date1.getDate() + '/' + (date1.getMonth() + 1) + '/' +  date1.getFullYear()
       
        console.log("%%%%%%%%%%%%%",this.emailData)
        console.log("this.createdDate",this.createdDate)
        console.log("this.dueDate",this.dueDate)
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'customcustomer',
              params: {
                settingId : settingID,
                Name : params.row.Name
              },
              headers:{
              Authorization : Cookies.get('auth_token')
          },
              }).then(function (response) {
                self.emailDataCustomer = response.data.data[0]
              })
              .catch(function (error) {
                console.log(error);
              });
                console.log('self.emailDataCustomer---------->',self.emailDataCustomer)

                this.customaddress = self.emailDataCustomer.Address.split(",");
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
              }).then(function (response) {
                console.log("ooooooooooooooooo",response);
                self.emailDataCompany = response.data
              })
              .catch(function (error) {
                console.log(error);
              });

              console.log('self.emailDataCompany--------------->',self.emailDataCompany)

              self.DescriptionPdf = this.emailDataCustom.products;

              self.customTotaltax = 0

              self.DescriptionPdf.forEach(item => {
                self.customTotaltax += item.tax
              })

              console.log("self.customTotaltax---->",self.customTotaltax)


        
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
                          "body": self.$refs.email2.innerHTML
                        }
                        myData = JSON.stringify(myData)
                        axios({
                          method: 'post',
                          url:  'https://api.'+process.env.domainkey+'/vmailmicro/sendEmail',
                          data: myData,
                          headers: {
                            'authorization':  Cookies.get('auth_token'),
                            
                          }
                          }).then(function (response) {
                            console.log(response);
                            self.$Message.success(response.data.success);
                            self.$Loading.finish();
                            // self.list[params.index].loading1 = false
                          })
                          .catch(function (error) {
                            self.$Message.warning("email send failed , Please try again later");
                            self.$Loading.finish();
                            console.log(error);
                          });
                      }
                  })
        
      },

      async getAllSettings(){
        let self = this;
        axios.get(config.default.serviceUrl + 'settings?isActive=true', {
          headers:{
              Authorization : Cookies.get('auth_token'),
              subscriptionId : Cookies.get('subscriptionId')
          },
        })
        .then(function (response) {
          console.log("response------>iuy",response);
          self.spinShow = false;
          if (response.data.data.length != 0)
          {
            self.tabPanes = response.data.data;
            console.log('this.tabIndex', self.tabIndex)
            $('.preload').css("display","none")
            let settingId = self.tabPanes[self.tabIndex].id;
            let settingDomain = self.tabPanes[self.tabIndex].domain;
            self.settingIdForPayment = self.tabPanes[self.tabIndex].id;
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
  .ivu-table-border th {
      border-right: 1px solid #ddd;
  }
  .ivu-spin-main {
      width: 100%;
      text-align: -webkit-center;
  }
  tbody.ivu-table-tbody tr.ivu-table-row td.ivu-table-column-center .ivu-table-cell > div > div {
      margin: 0 6px;
      float: none !important;
  }
  .ivu-icon.ivu-icon-help-circled{
      display: none;
  }


  #viewDetailInInvoice #accordion {
    display: none;
  }
  .ivu-table-cell {
      word-break: break-word;
  }
  .ivu-auto-complete.ivu-select-dropdown {
    max-height: 200px !important;
  }
</style>