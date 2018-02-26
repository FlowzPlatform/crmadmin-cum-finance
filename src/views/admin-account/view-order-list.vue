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
    .table {
        border: 1px solid #e3e3e3;
        margin-bottom: 0px;
        table-layout: auto;
    }
    .table thead tr th,
     .table1 thead tr th {
        text-align: -webkit-center;
    }
    .table1 {
        width: -webkit-fill-available;
        table-layout: auto;
    }
    .table1 tbody tr td {
        text-align: center;
    }
    .table1 tbody tr th {
        text-align: center;
    }
    .ivu-table-border td,
    .ivu-table-border th {
        border: 1px solid #e9eaec;
    }
    .item_total {
        text-transform: uppercase;
    }
    a {
        color: #4b5262;
        text-decoration: none;
    }
    a:hover {
        color:#C11E19;
    }
    .quantity-table-title {
        float: left;
        width: 23%;
    }
    .quantity-table-disc {
        float: left;
        max-width: 400px;
        overflow: auto;
        width: 100%;
    }
    .quantity-table .table-heading {
        background: #999 none repeat scroll 0 0;
        border-right: 1px solid #fff;
        border-top: 0 none;
        color: #fff;
        font-family: "roboto_condensedlight";
        font-size: 16px;
        padding: 6px;
        text-align: center;
        text-transform: uppercase;
    }
    .quantity-table .table-content {
        background: #e6e6e6 none repeat scroll 0 0;
        border: 1px solid #fff;
        color: #444;
        font-size: 16px;
        padding: 6px;
        text-align: center;
        font-family: "roboto_condensedregular";
        text-transform: uppercase;
        margin-left: -1px;
    }
    .description .quantity-table-disc > ul {
        display: inline-block;
        width: 500px;
        margin-bottom: -5px;
    }

    .description .quantity-table-disc > ul > li {
        display: inline-block;
        float: left;;
    }
    .product-quantity-list {
        width: 100%;
        table-layout: auto;
    }
    .product-quantity-list .item-list-number {
        padding-bottom: 0;
        padding-left: 0;
        padding-top: 0;
        vertical-align: middle;
    }
    .quantity-item {
        background: #898989;
        color: #fff;
        display: inline-block;
        font-size: 14px;
        height: 41px;
        line-height: 41px;
        margin: 0 10px 0 0;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        width: 36px;
    }
    .product-quantity-list thead tr th {
        background: #fafafa!important;
        border-bottom: 1px dashed #e3e3e3;
        border-top: 1px solid #e3e3e3;
        text-align: left;
    }
    .size-quantity-table {
	    width: 83%;
	    margin-top: 15px;
    	margin-left: 30px;
    	table-layout: auto;
    	margin-bottom: 15px;
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
                            <span>VIEW ORDER DETAILS</span>
                        </p>
                    </div>
                </div>
            </div>    
            <div style="text-align:center">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="order-title">
                            <div class="col-md-4 col-sm-4">
                            Order ID : {{row.id}}
                            </div>
                            <div class="col-md-4 col-sm-4">
                                Created Date : {{moment(row.products[0].createdAt).format('DD-MMM-YYYY')}} 
                            </div>
                            <div class="col-md-4 col-sm-4">
                                Total Items : {{row.products.length}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Collapse v-model="value1" accordion>
                <Panel name="1">
                    Personal Information
                    <p slot="content">
                        <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12"> 
                            <h4>{{row.user_billing_info.name}}</h4> 
                            <p>
                                <span class="address">Office Address</span> <br>
                                <span style="font-weight:500">
                                    {{row.user_billing_info.street1}} <br>
                                    <span v-if="row.user_billing_info.street2"> {{row.user_billing_info.street2}}<br></span>
                                     <span v-else></span>
                                    {{row.user_billing_info.city}} - {{row.user_billing_info.postalcode}}<br>
                                    {{row.user_billing_info.state}} , {{row.user_billing_info.country}}
                                </span>
                            </p>
                        </label>
                        <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12"> 
                            <ul>
                                <li>
                                    <Icon type="ios-telephone" size="15"></Icon> 
                                    <label style="font-weight:500">{{row.user_billing_info.phone}}</label>
                                </li>
                                <li>
                                    <Icon type="ios-email" size="15"></Icon> 
                                    <label style="font-weight:500">{{row.user_billing_info.email}}</label>
                                </li>
                            </ul>
                        </label>
                    </p>
                </Panel>
                <Panel name="2">
                    Product Information
                    <p slot="content">

                        <span v-for="(item, inx) in row.products">
                            <div class="row" style="padding: 20px 40px 20px;border-top: 1px solid #cdd8e3;">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th> ORDER ID : {{row.id}} </th>
                                            <th> ORDER TYPE : {{item.order_type | upper}} </th>
                                            <th> SHIPPING : {{item.shipping_method.shipping_type | upper}} </th>
                                            <th> <a @click="clicked(inx)">
                                                <Icon type="eye" size="20"></Icon></a> </th>
                                        </tr>
                                    </thead>
                                </table>
                                <table class="table1">
                                    <thead>
                                        <tr>
                                            <th> PRODUCT IMAGE </th>
                                            <th> ITEM NUMBER </th>
                                            <th> PRODUCT NAME </th>
                                            <th> QUANTITY </th>
                                            <th> UNIT PRICE </th>
                                            <th> TOTAL </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <!-- <td> {{"http://image.promoworld.ca/migration-api-hidden-new/web/images/" + row.products[0].product_description.default_image}}</td> -->
                                            <td><img :src="getImgUrl(item.product_description.default_image)" style="max-width:75px;max-height:75px"/></td>
                                            <td> {{item.product_description.sku}}</td>
                                            <td> {{item.product_description.product_name}}</td>
                                            <td> {{item.total_qty}}</td>
                                            <td> {{ accounting(item.unit_price)}} </td>
                                            <td> {{ getMulti(item.total_qty, item.unit_price) }}</td>
                                        </tr>
                                        <tr class="description" :id="'description'+inx" style="display: none;">
                                            <td colspan="6">
                                                <table class="details" style="width:100%">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <table class="info" style="width:100%;table-layout: auto;margin-top: -1px;">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Size &amp; Quantity</th>
                                                                            <th>Imprint Information</th>
                                                                            <th>Additional Charges</th>
                                                                            <th>Charges</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="width:60%">
                                                                                <div class="quantity-table" style="margin: 10px;">
                                                                                    <div class="quantity-table-title" style="margin-top: 15px;">
                                                                                        <div class="table-heading">Quantity </div>
                                                                                        <div class="table-content">Price</div>
                                                                                    </div>
                                                                                    <div  v-for="(element, inx) in item.product_description.pricing">
                                                                                        <div class="quantity-table-disc owl-carousel owl-theme" v-if="element.price_type == 'regular' && element.type == 'decorative' && element.global_price_type == 'global'" style="margin-top: 15px;margin-bottom: 20px;">
                                                                                            <div v-for="(itm,inx) in element.price_range" >
                                                                                                <div class="table-heading" v-if="itm.qty.lte">{{itm.qty.gte}} - {{itm.qty.lte}}</div>
                                                                                                <div class="table-heading" v-else>{{itm.qty.gte}} + </div>
                                                                                                <div class="table-content"> {{accounting(itm.price)}}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="estimate-detail" style="width:20%">
                                                                                <div class="estimate-tag-block" v-for="(element, index) in item.imprint" style="text-align: -webkit-left;">
                                                                                    <div class="estimate-row heading">
                                                                                        <span>Print Position: {{element.imprint_position_name}}</span>
                                                                                        <div class="estimate-row">
                                                                                            <span>Imprint Method: {{element.imprint_method_name}}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="estimate-row" v-if="element.no_of_color">
																							How many colours : <span>{{element.no_of_color}} Colour </span>
                                                                                    </div>
                                                                                    <div v-else></div>
                                                                                    <div class="estimate-row" v-if="element.selected_colors">
                                                                                        <div v-for="(item) in element.selected_colors">
																							Colour : <span>{{item}}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div v-else></div>
                                                                                </div> 
                                                                            </td>
                                                                            <td>
                                                                                <span v-if="item.charges">{{Object.keys(item.charges)[0]}}-{{item.charges.setup_charge | upper}}</span>
                                                                                <span v-else> N/A </span>
                                                                            </td>
                                                                            <td> <span v-if="item.charges">{{ accounting(item.charges.setup_charge)}}</span>
                                                                                <span v-else> N/A </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan="4">
                                                                                <table class="product-quantity-list">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th class="item-list-number">
                                                                                                <div class="quantity-item">1</div>
                                                                                                Product Quantity 
                                                                                            </th>
                                                                                            <th style="text-align: -webkit-center;">Shipping Address </th>
                                                                                            <th style="text-align: -webkit-center;">Shipping</th>
                                                                                            <th style="text-align: -webkit-center;">Shipping Charge</th>
                                                                                            <th style="text-align: -webkit-center;">Tax</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="width:38%">
                                                                                                <table class="size-quantity-table">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th style="text-align: -webkit-center;">COLOR</th>
                                                                                                            <th style="text-align: -webkit-center;">QUANTITY</th>
                                                                                                            <th style="text-align: -webkit-center;">TOTAL</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr v-for="(item,inx) in item.color">
                                                                                                          <!--  <div v-for="(item,inx) in item.color"> -->
                                                                                                                <td>{{inx}}
                                                                                                                </td>
                                                                                                                <td>{{item}}
                                                                                                                </td>
                                                                                                                <td>{{item}}
                                                                                                                </td>
                                                                                                          <!--  </div> -->
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td v-for="(i, j) in item.shipping_method.shipping_detail">
                                                                                                <span style="float: left">{{row.user_billing_info.name}}</span><br>
                                                                                                <span style="float: left">{{i.shipping_address.street1}}</span><br>
                                                                                                <span style="float: left" v-if="i.shipping_address.street2"> {{i.shipping_address.street2}} <br></span>
                                                                                                <span style="float: left"> {{i.shipping_address.city}} - {{i.shipping_address.postalcode}}</span> <br>
                                                                                                <span style="float: left"> {{i.shipping_address.state}} </span> <br>
                                                                                                <span style="float: left"> {{i.shipping_address.country}} </span>                                                                                                          
                                                                                            </td>
                                                                                            <td style="width:18%" v-for="(i, j) in item.shipping_method.shipping_detail">
                                                                                                <span style="float: left">Shipping Type: </span> {{item.shipping_method.shipping_type}} <br>
                                                                                                <span style="float: left">Shipping Carrier: </span> <span v-if="i.shipping_detail.shipping_carrier">{{i.shipping_detail.shipping_carrier}}</span> <span v-else> - </span><br>
                                                                                                <span style="float: left">Method: </span> <span  v-if="i.shipping_detail.shipping_method"> {{i.shipping_detail.shipping_method}}</span> <span v-else> -  </span> <br>
                                                                                                <span style="float: left">In Hand Date : </span> -
                                                                                            </td>
                                                                                            <td style="width:16%">
                                                                                                <span style="color:#C11E19">**Please Note:</span>  We will call you for the Shipping Charges.
                                                                                            </td>
                                                                                            <td style="width:10%"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr class="item_total" v-for="(i, j) in item.shipping_method.shipping_detail">
                                            <th>Total:  {{ getMulti(item.total_qty, item.unit_price) }}</th>
                                            <th colspan="2">Additional Charges:  <span v-if="item.charges">{{accounting(item.charges.setup_charge)}}</span>
                                                                                <span v-else> $00.00 </span> 
                                            </th>
                                            <th>Shipping Charge : <span v-if="i.shipping_detail.shipping_charge"> {{ getShippingCharge(i.shipping_detail.shipping_charge)}}</span> <span v-else> $00.00 </span> </th>
                                            <th>Tax : $00.00 </th>
                                            <th>Sub Total:<span style="color:#C11E19" v-if="i.shipping_detail.shipping_charge">  {{ getSubTotal(item.total_qty, item.unit_price, item, i.shipping_detail.shipping_charge) }}</span> <span v-else> {{ getSubTotal(item.total_qty, item.unit_price, item, 0) }} </span> </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </span>
                    </p>
                </Panel>
                <Panel name="3">
                    Payment Information
                    <p slot="content">
                        <label class="col-sm-6"> 
                                Transaction ID  : <label class="data"> {{row.transaction_id}} </label>
                        </label> 
                        <label class="col-sm-3"> 
                                Payment Via  : <label class="data"> {{row.payment_via}} </label>
                        </label>
                        <label class="col-sm-3"> 
                                Total  : <label class="data"> $ {{row.total}} </label>
                        </label>
                    </p>
                </Panel>
                <Panel name="4">
                    Billing Information
                    <p slot="content">
                        <label class="col-sm-6"> 
                                Invoice ID  : <label class="data"> {{this.invoice.InvoiceNumber}} </label>
                        </label> 
                        <label class="col-sm-6"> 
                                Customer Name  : <label class="data"> {{this.invoice.Contact.Name}} </label>
                        </label>
                        <label class="col-sm-6"> 
                                Due Date  : <label class="data"> {{moment(this.invoice.DueDate).format('DD-MMM-YYYY')}} </label>
                        </label> 
                        <label class="col-sm-6"> 
                                Paid Amount  : <label class="data"> {{accounting(this.invoice.AmountPaid)}} </label>
                        </label>
                        <label class="col-sm-6"> 
                                Due Amount  : <label class="data"> {{accounting(this.invoice.AmountDue)}} </label>
                        </label>
                        <label class="col-sm-6"> 
                                Total Amount : <label class="data"> {{accounting(this.invoice.Total)}} </label>
                        </label>
                        <label class="col-sm-6"> 
                                Status : <label class="data"> {{this.invoice.Status}} </label>
                        </label>
                        <label class="col-sm-6"> 
                            Download Billing Information: <Button type="ghost" shape="circle" icon="android-download" @click="downloadBill"></Button>
                        </label>
                    </p>
                </Panel>
            </Collapse>
        </Card>
        <Modal
            v-model="modal1"
            title="Preview Billing Details"
            width="59%"
            ok-text= "Download PDF"
            @on-ok="download"
            @on-cancel="cancel">
            <downloadBillingInfo id="InvoiceBill" :row="billData" :invoice="invoice"></downloadBillingInfo>
        </Modal>
    </div>
</template>
<script>
    import moment from 'moment';
    import 'owl.carousel/dist/assets/owl.carousel.css';
    import config from '../../config/customConfig.js'
    import jQuery from 'jquery';
    import downloadBillingInfo from './download-billinginfo.vue';
    import owlCarousel from 'owl.carousel';
    const accounting = require('accounting-js');
    let axios = require('axios'); 
    import Cookies from 'js-cookie';
    export default {
        props: {
            row: Object
        },
        components: {downloadBillingInfo},
        data() {
            return {
                value1: '1',
                modal1: false,
                orderDate: '',
                moment: moment,
                billData: {},
                imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
                invoice: {}
            }
        },
        methods: {
            async invoiceData() {
                var self = this
                self.$Loading.start()
                await axios({
                    method: 'get',
                    url: config.default.serviceUrl + 'invoice/' + self.row.billing_details.data.InvoiceID,
                    params: {
                        settingId : self.row.setting_id
                    },
                    headers:{
                        Authorization : Cookies.get('auth_token')
                    }, 
                    }).then(function (response) {
                        self.$Loading.finish()
                        console.log('response-Invoice---------------!!!!!!!!!!1',response.data[0].data)
                        self.invoice = response.data[0].data
                })    
                console.log('invoice', self.invoice)
            },
            getMulti(a, b) {
                return accounting.formatMoney(a * b);
            },
            getShippingCharge(item){
                var sum = 0;
                sum = sum + item;
                return accounting.formatMoney(sum)
            },
            getImgUrl (url) {
                return this.imgurl + url
            },
            getSubTotal (a, b, c, d) {
                var sum = 0;
                sum = sum + d;
                var res = c.hasOwnProperty('charges')
                if ( res == false) {
                    return accounting.formatMoney((a*b) + parseFloat(sum))
                }
                else {
                    return accounting.formatMoney((a*b + parseFloat(c.charges.setup_charge) + parseFloat(sum)))
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
                this.modal1 = true
            },
            async cancel() {
                self.modal1 = false
            },
            async download() {
                var self = this
		        self.$Loading.start()
                console.log("billData-------------->>>",$('#InvoiceBill').html())
                document.querySelector('#myfooter').style.position = 'fixed'
                await axios({
                    method: 'post',
                    url: config.default.serviceUrl + 'exporttopdf',
                    data: {
                    
                        "html" : $('#InvoiceBill').html()
                    },
                    
                    }).then(function (response) {
		            self.$Loading.finish()
                    document.querySelector('#myfooter').style.position = 'initial'
                    console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                    console.log("uuuuuuuuuuuuuuuuuuuuuuQQQQQQQQQQQQQQQQQQ",self.billData.billing_details.data.InvoiceNumber);
                    var arrayBufferView = new Uint8Array( response.data.data );
                    var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                    var link=document.createElement('a');
                    link.href=window.URL.createObjectURL(blob);
                    link.download=self.billData.billing_details.data.InvoiceNumber == undefined ? "custom_Invoice" : self.billData.billing_details.data.InvoiceNumber;
                    link.click();
                })    
            }
        },
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
        mounted() {
            this.billData = this.row
            this.invoiceData()
        }
    };
</script>