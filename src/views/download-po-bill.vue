<template>
    <div style="position: relative;width: auto; margin: 0 auto; color: #555555;background: #FFFFFF; 'Roboto Condensed', sans-serif;font-size:10px">
        <header  style="padding: 10px 0;margin-bottom: 20px;border-bottom: 1px solid #AAAAAA;display: inline-block;width: 100%;">
            <div id="logo" style="float: left;margin-top: 8px;">
                <img :src="emailDataCompany.logo" style="height: 70px;">
            </div>
            <div v-if = "emailDataCompany.address != undefined" id="company" style="float: right;text-align: right;font-size: 14px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;">
                <h2  style="font-size: 18px;font-weight: normal;margin: 0;">{{emailDataCompany.address.name}}</h2>
                <div>{{emailDataCompany.address.AddressLine1}}<br> {{emailDataCompany.address.AddressLine2}}<br> {{emailDataCompany.address.city}}  {{emailDataCompany.address.PostalCode}}</div>
                <div>{{emailDataCompany.address.country}}</div>
                <!--<div>
                        <a href="mailto:company@example.com" style="color: #0087C3;text-decoration: none;">company@example.com</a>
                </div>-->
            </div>

        </header>
        <main>
            <div id="details" style="display: inline-block;width: 100%;margin-bottom: 20px;font-size:12px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;">
                <div id="client" style="padding-left: 6px;border-left: 6px solid rgb(114, 114, 114);float: left;">
                    <div  style="color: #777777;">INVOICE TO:</div>
                    <!-- <h2  style="font-size: 16px;font-weight: normal;margin: 0;">{{row.distributor_name ? row.distributor_name :row.distributor_email}}</h2> -->
                    <!-- <div >{{row.user_billing_info.street1}}, <span v-if="row.user_billing_info.street2"> {{row.user_billing_info.street2}},</span> {{row.user_billing_info.city}}-{{row.user_billing_info.postalcode}}, </div>
                    <div >{{row.user_billing_info.state}}, {{row.user_billing_info.country}}</div>                     -->
                    <!-- <div >
                        <a href="mailto:john@example.com" style="color: #0087C3;text-decoration: none;">{{row.user_billing_info.email}} </a>
                    </div> -->
                </div>
                <div id="invoice" style="float: right;text-align: right;">
                    <h1 style="color: rgb(92, 92, 92);font-size: 18px;line-height: 1em;font-weight: normal;margin: 0 0 10px 0;">{{row.invoiceId}}</h1>
                    <div  style="font-size: 12px;color: #777777;">Date of Invoice: {{moment(row.createdAt).format('DD-MMM-YYYY')}}</div>
                    <div  style="font-size: 12px;color: #777777;">Due of Invoice: {{moment(row.dueDate).format('DD-MMM-YYYY')}}</div>
                    <!--<div  style="font-size: 12px;color: #777777;">Due Date: {{moment(row.billing_details.data.DueDate).format('DD-MMM-YYYY')}}</div>-->
                </div>
            </div>
            <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;border-collapse: collapse;border-spacing: 0;font-size:12px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;margin-bottom:20px;">
                <thead>
                    <tr style="border:1pt solid rgb(148, 146, 146);">
                        <th  style="border: 1pt solid rgb(148, 146, 146);color: #555555;font-size: 1.6em;background: rgb(248, 248, 248);white-space: nowrap;font-weight: normal;padding: 10px;text-align: center;">#</th>
                        <th  style="border: 1pt solid rgb(148, 146, 146);text-align: left;white-space: nowrap;font-weight: normal;padding: 10px;background: rgb(251, 251, 251);">DESCRIPTION</th>
                        <th  style="border: 1pt solid rgb(148, 146, 146);background: rgb(248, 248, 248);white-space: nowrap;font-weight: normal;padding: 10px;text-align: center;color: #555555;">UNIT PRICE</th>
                        <th  style="border: 1pt solid rgb(148, 146, 146);text-align: left;font-weight: normal;padding: 10px;background: rgb(251, 251, 251);">QUANTITY</th>
                        <th  style="border: 1pt solid rgb(148, 146, 146);color: #555555;font-size: 1em;background: rgb(248, 248, 248);white-space: nowrap;font-weight: normal;padding: 10px;text-align: center;">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, inx) in row.products" style="border:1pt solid rgb(148, 146, 146);">
                        <td  style="border: 1pt solid rgb(148, 146, 146);color: #555555;font-size: 1.6em;background: rgb(248, 248, 248);white-space: nowrap;font-weight: normal;padding: 10px;text-align: center;">{{inx+1}}</td>
                        <td  style="border: 1pt solid rgb(148, 146, 146);text-align: left;font-weight: normal;padding: 10px;background: rgb(251, 251, 251);">
                            <h3 style="color: rgb(109,109,109);font-size: 1.2em;font-weight: normal;margin: 0 0 0.2em 0;">{{item.product_description.product_name}}</h3>
                            <span style="color: rgb(142,142,142);font-size: 1em;font-weight: normal;margin: 0 0 0.2em 0;">{{text(item.product_description.description)}}</span></td>
                        <td  style="border: 1pt solid rgb(148, 146, 146);background: rgb(248, 248, 248);white-space: nowrap;font-weight: normal;padding: 15px;text-align: right;;color: #555555;font-size: 1em;">{{ accounting(item.unit_price)}}</td>
                        <td  style="border: 1pt solid rgb(148, 146, 146);text-align: right;font-weight: normal;padding: 15px;background: rgb(251, 251, 251);font-size: 1em;">{{item.total_qty}}</td>
                        <td  style="border: 1pt solid rgb(148, 146, 146);color: #555555;font-size: 1em;background: rgb(248, 248, 248);white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;">{{ getMulti(item.total_qty, item.unit_price) }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr v-show="row.products && row.products.length>0">
                        <td colspan="2" style="border: none;"> <span v-show="row.shippingMethod && row.shippingMethod.length>0"><b>Shipping Method :</b> {{row.shippingMethod}}</span></td>
                        <td colspan="2" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">SUBTOTAL</td>
                        <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{ getAdd(row.products) }}</td>
                    </tr>
                    <tr >
                        <td colspan="2" rowspan="3" style="border: none;vertical-align:  baseline;"> <span v-show="row.specialInstruction && row.specialInstruction.length>0"><b>Special Instruction :</b> {{row.specialInstruction}}</span></td>
                        <td colspan="2" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">SHIPPING CHARGES</td>
                        <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{accounting(row.shippingCharges)}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="color: #555555;font-size: 1.2em;border-top: 1px solid #AAAAAA;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">GRAND TOTAL</td>
                        <td style="color: #555555;font-size: 1.2em;border-top: 1px solid #AAAAAA;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{getGrandTotal(row.products,row.shippingCharges)}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="color: #313131;font-size: 1.2em;border-top: 1px solid rgb(92, 92, 92);padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;"><b>NET AMOUNT</b></td>
                        <td style="color: #313131;font-size: 1.2em;border-top: 1px solid rgb(92, 92, 92);padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;"><b>{{accounting(row.total_amount)}}</b></td>
                    </tr>
                    <!-- <tr>
                        <td colspan="2" style="border: none;"></td>
                        <td colspan="2" style="color: #57B223;font-size: 1.2em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">AMOUNT DUE </td>
                        <td style="color: #57B223;font-size: 1.2em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(invoice.AmountDue)}}</td>
                    </tr> -->
                </tfoot>
            </table>
            <div id="thanks" style="font-size: 16px;margin-bottom: 10px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;color: #555555;">Thank you!</div>
        </main>
        <footer style="font-size:12px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;">
            Invoice was created on a computer and is valid without the signature and seal.

        </footer>
    </div>
</template>

<script>
    import moment from 'moment';
    import 'owl.carousel/dist/assets/owl.carousel.css';
    import jQuery from 'jquery';
    import owlCarousel from 'owl.carousel';
     import config from '../config/customConfig.js'    
    import Cookies from 'js-cookie'; 
    const accounting = require('accounting-js');
    let axios = require('axios');
    let result;
    export default {
        props: {
            row: Object,
            invoice: Object
        },
        data() {
            return {
                moment: moment,
                emailDataCompany: ''
            }
        },
        methods: {
            getMulti(a, b) {
                return accounting.formatMoney(a * b) ;
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
            accounting(item=0){
              return accounting.formatMoney(item)
            },
            getShippingCharge(item=0){
                var sum = 0;
                sum = sum + item;
                return accounting.formatMoney(sum)
            },
            text(item) {
                return $(item).text();
            },
            getAdd(products) {
                let sum = 0
                for (let item of products) {
                    sum += item.total_qty * item.unit_price
                }
                return accounting.formatMoney(sum)
            },
            getGrandTotal(products,shippingCharge=0) {
                let sum = 0
                for (let item of products) {
                    sum += item.total_qty * item.unit_price
                }
                let shiC
                return accounting.formatMoney( sum + Number(shippingCharge) )
            },
            getCharges(charge, products){
                let sum = 0
                for (let item of products) {
                    sum += item.total_qty * item.unit_price
                }
                let res = charge - sum
                return accounting.formatMoney(res)                
            }
            
        },
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
        mounted() {
            
        },
        watch: {
            'row': async function(id) {
                //  this.invoiceData()
            }
        }
    };
</script>