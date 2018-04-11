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
            <Table   stripe @on-expand="viewDetails" v-if ="tabPane.domain=='Xero'" :columns="columns1" :data="list"  size="small" ref="table" ></Table>
            <Table  stripe @on-expand="viewDetails" v-if ="tabPane.domain=='QB'" :columns="columns2" :data="list"  size="small" ref="table" ></Table>
            <Table  stripe @on-expand="viewDetailsCustom" v-if ="tabPane.domain=='custom'" :columns="columns3" :data="list"  size="small" ref="table" ></Table>

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
                align: 'center',
                sortable: true
            },
            {
                title: 'Customer Name',
                key: 'CustomerRef',
                align: 'center',
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
                align: 'center',
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
                align: 'right',
                render : (h , {row}) => { 
                  // return  accounting.formatMoney((row.TotalAmt-row.Balance)) 
                  return h('div', [
                    h('div',{
                      style: {
                          textAlign: 'right'
                      }
                    }, accounting.formatMoney((row.TotalAmt-row.Balance)))
                  ]);
                }

            },
            {
                title: 'Total Amount',
                key: 'TotalAmt',
                sortable: true,
                align: 'right',
                render : (h , {row}) => { 
                  // return  accounting.formatMoney(row.TotalAmt)
                  return h('div', [
                    h('div',{
                      style: {
                          textAlign: 'right'
                      }
                    }, accounting.formatMoney((row.TotalAmt-row.Balance)))
                  ]);
                }


            },
            {
                title: 'Status',
                sortable: true,
                align: 'center',
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
                align: 'center',
                sortable: true
            },
            {
                title: 'Customer Name',
                align: 'center',
                sortable: true,
                render:(h,{row})=>{ 
                  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " , row.Contact.Name)
                  return h('div', [
                                
                                h('span', row.Contact.Name)
                            ]);
                }
            },
            {
                title: 'Date',
                //key: 'Date',
                align: 'center',
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
                align: 'right',
                render:(h,{row})=>{ 
                  // return  accounting.formatMoney(row.AmountPaid)  
                  return h('div', [
                        h('div',{
                          style: {
                              textAlign: 'right'
                          }
                        }, accounting.formatMoney(row.AmountPaid))
                    ]);
                }

            },
            {
                title: 'Total Amount',
                key: 'Total',
                align: 'right',
                sortable: true,

                render:(h,{row})=>{ 
                  // return  accounting.formatMoney(row.Total) 
                  return h('div', [
                    h('div',{
                        style: {
                            textAlign: 'right'
                        }
                      }, accounting.formatMoney(row.Total))
                    ]);
                  }

            },
            {
                title: 'Status',
                key: 'Status',
                align: 'center',
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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
              }
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
                        duration: 4.5
                    })
                }else {
                    self.$Notice.error({
                        title: error.response.data.name,
                        desc: error.response.data.message,
                        duration: 10
                    })
                }
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
                        duration: 4.5
                    })
                }else {
                    self.$Notice.error({
                        title: error.response.data.name,
                        desc: error.response.data.message,
                        duration: 10
                    })
                }
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
                        duration: 4.5
                    })
                }else {
                    self.$Notice.error({
                        title: error.response.data.name,
                        desc: error.response.data.message,
                        duration: 10
                    })
                }
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
                  duration: 4.5
              })
          }else {
              self.$Notice.error({
                  title: error.response.data.name,
                  desc: error.response.data.message,
                  duration: 10
              })
          }
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
                        duration: 4.5
                    })
                }else {
                    self.$Notice.error({
                        title: error.response.data.name,
                        desc: error.response.data.message,
                        duration: 10
                    })
                }
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
                        duration: 4.5
                    })
                }else {
                    self.$Notice.error({
                        title: error.response.data.name,
                        desc: error.response.data.message,
                        duration: 10
                    })
                }
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
                        duration: 4.5
                    })
                }else {
                    self.$Notice.error({
                        title: error.response.data.name,
                        desc: error.response.data.message,
                        duration: 10
                    })
                }
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
                  duration: 4.5
              })
          }else {
              self.$Notice.error({
                  title: error.response.data.name,
                  desc: error.response.data.message,
                  duration: 10
              })
          }
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
                        duration: 4.5
                    })
                }else {
                    self.$Notice.error({
                        title: error.response.data.name,
                        desc: error.response.data.message,
                        duration: 10
                    })
                }
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
                  duration: 4.5
              })
          }else {
              self.$Notice.error({
                  title: error.response.data.name,
                  desc: error.response.data.message,
                  duration: 10
              })
          }
        });
        await axios({
              method: 'get',
              url: config.default.serviceUrl + 'Settings/' + settingID,
              headers:{
                  Authorization : Cookies.get('auth_token'),
                  subscriptionId : Cookies.get('subscriptionId')
              },
		}).then(function (response) {
			// console.log("ooooooooooooooooo",response);
			self.emailDataCompany = response.data
		})
		.catch(function (error) {
      console.log(error);
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
              duration: 4.5
          })
      }else {
          self.$Notice.error({
              title: error.response.data.name,
              desc: error.response.data.message,
              duration: 10
          })
      }
		});

              // console.log('self.emailDataCompany--------------->',self.emailDataCompany)

        axios.get(config.default.serviceUrl + 'invoice/' + params.row.InvoiceID, {
          headers:{
              Authorization : Cookies.get('auth_token')
          },
          params : {
            settingId : settingID
          }
        })
        .then(async function (response) {
        //   console.log('response>>>>>>>>>>>>>>', response)
          self.DescriptionPdf = response.data[0].data.LineItems;

        })
        .catch(function (error) {
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
                  duration: 4.5
              })
          }else {
              self.$Notice.error({
                  title: error.response.data.name,
                  desc: error.response.data.message,
                  duration: 10
              })
          }
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
                            // self.$message.success(response.data.success);
                            self.$message.success("Email Sent Successfully");
                            // self.list[params.index].loading1 = false
                            self.$Loading.finish();
                          })
                          .catch(function (error) {
                            self.$Message.warning("Email Send Failed, Please try again later");
                            self.$Loading.finish();
                            console.log(error);
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
                                    duration: 4.5
                                })
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
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
				// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^",self.emailDataCustomer)
			})
			.catch(function (error) {
        console.log(error);
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
                duration: 4.5
            })
        }else {
            self.$Notice.error({
                title: error.response.data.name,
                desc: error.response.data.message,
                duration: 10
            })
        }
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
                duration: 4.5
            })
        }else {
            self.$Notice.error({
                title: error.response.data.name,
                desc: error.response.data.message,
                duration: 10
            })
        }
			});

				//   console.log('self.emailDataCompany--------------->',self.emailDataCompany)
			axios.get(config.default.serviceUrl + 'invoice/' + params.Id, {
				headers:{
					Authorization : Cookies.get('auth_token')
				},
				params : {
					settingId : settingID
				}
			}).then(async function (response) {
				console.log('response>>>>>>>>>>>>>>', response)
				self.DescriptionPdf = response.data[0].data[0].Line;
				//   console.log("$$$$$$$$$$$$$$$4",self.DescriptionPdf)
			})
			.catch(function (error) {
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
                duration: 4.5
            })
        }else {
            self.$Notice.error({
                title: error.response.data.name,
                desc: error.response.data.message,
                duration: 10
            })
        }
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
					};
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
						// self.$Message.success(response.data.success);
						self.$message.success("Email Send Successfully");
						self.$Loading.finish();
						// self.list[params.index].loading1 = false
					})
					.catch(function (error) {
						console.log(error);
						self.$Message.warning("Email Send Failed, Please try again later");
            self.$Loading.finish();
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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
              }
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
                  align: 'right',
                  sortable: true,
                  render:(h,{row})=>{ 
                    return h('div', [
                      h('span', accounting.formatMoney(row[columnArray[i]]))
                    ]);
                  }
                  // render : (h , {row}) => { return  accounting.formatMoney(row[columnArray[i]]) }
                });
              }
              else if (columnArray[i] == 'Name') {
                arr.push({
                  title: 'Customer Name',
                  key : columnArray[i],
                  align: 'center',
                  sortable: true
                });
              }
              else {
                arr.push({
                  title: columnArray[i],
                  key : columnArray[i],
                  align: 'center',
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
                  console.log("============params",params);
                  if (params.row.Due != 0) {
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
                    ])
                  }
                  else {
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
                    ])
                  }

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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
              }
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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
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
                var deep = _.cloneDeep(response.data.data);
                  _(deep).each(function(item , index){
                      var dt = moment(item.paymentAccounting.Invoice.Date,['DD-MM-YYYY','MM-DD-YYYY'])
                      item.paymentAccounting.Invoice.Date = dt._d
                  })
                  var desc =  _.orderBy(deep, 'paymentAccounting.Invoice.Date',  'desc');                         
                    // self.data = desc;
                  self.newList = desc;
              }
              // self.$Loading.finish();
              // $('.preload').css("display","none")
              // self.newList = await self.mockTableData1(1,pageSize)
          })
          .catch(function (error) {
              console.log("error",error);
              self.$Loading.error();
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
                      duration: 4.5
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
        console.log('id..........',params.Id)
        let id
        if(self.tabPanes[self.tabIndex].domain == "QB"){
          id = params.Id
        } else if(self.tabPanes[self.tabIndex].domain == "Xero"){
          id = params.InvoiceID
        }
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
                  var deep = _.cloneDeep(response.data.data);
                  _(deep).each(function(item , index){
                      var dt = moment(item.paymentAccounting.Invoice.Date,['DD-MM-YYYY','MM-DD-YYYY'])
                      item.paymentAccounting.Invoice.Date = dt._d
                  })
                  var desc =  _.orderBy(deep, 'paymentAccounting.Invoice.Date',  'desc');                         
                    // self.data = desc;
                  self.newList = desc;
              }
          })
          .catch(function (error) {
              console.log("error",error);
              self.$Loading.error();
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
                      duration: 4.5
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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
              }
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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
              }
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
                        duration: 4.5
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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
              }
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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
              }
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
                                    duration: 4.5
                                })
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
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
          if(error.message == 'Network Error'){
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
                      duration: 4.5
                  })
              }else {
                  self.$Notice.error({
                      title: error.response.data.name,
                      desc: error.response.data.message,
                      duration: 10
                  })
              }
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
 
.ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
    background-color: #f8f8f9 !important;
}
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