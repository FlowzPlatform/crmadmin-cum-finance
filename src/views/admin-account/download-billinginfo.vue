<template>
    <div style="position: relative; margin: 0 auto; color: #555555;background: #FFFFFF; 'Roboto Condensed', sans-serif;font-size:10px">
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
                <div id="client" style="padding-left: 6px;border-left: 6px solid #0087C3;float: left;">
                    <div  style="color: #777777;">INVOICE TO:</div>
                    <h2  style="font-size: 16px;font-weight: normal;margin: 0;">{{row.user_billing_info.name}}</h2>
                    <div >{{row.user_billing_info.street1}}, <span v-if="row.user_billing_info.street2"> {{row.user_billing_info.street2}},</span> {{row.user_billing_info.city}}-{{row.user_billing_info.postalcode}}, </div>
                    <div >{{row.user_billing_info.state}}, {{row.user_billing_info.country}}</div>
                    <div >
                        <a href="mailto:john@example.com" style="color: #0087C3;text-decoration: none;">{{row.user_billing_info.email}} </a>
                    </div>
                </div>
                <div id="invoice" style="float: right;text-align: right;">
                    <h1 style="color: #0087C3;font-size: 18px;line-height: 1em;font-weight: normal;margin: 0 0 10px 0;">{{row.billing_details.data.InvoiceNumber}}</h1>
                    <div  style="font-size: 12px;color: #777777;">Date of Invoice: {{moment(row.billing_details.data.Date).format('DD-MMM-YYYY')}}</div>
                    <!--<div  style="font-size: 12px;color: #777777;">Due Date: {{moment(row.billing_details.data.DueDate).format('DD-MMM-YYYY')}}</div>-->
                </div>
            </div>
            <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;border-collapse: collapse;border-spacing: 0;font-size:12px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;margin-bottom:20px;">
                <thead>
                    <tr>
                        <th  style="background: #EEEEEE;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;width:10%">#</th>
                        <th  style="text-align: left;white-space: nowrap;font-weight: normal;padding: 15px;background: #DDDDDD;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;width:35%">PRODUCT NAME</th>
                        <th  style="text-align: left;white-space: nowrap;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;width:10%">SKU</th>
                        <th  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;width:15%">UNIT PRICE</th>
                        <th  style="text-align: left;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;width:15%">QUANTITY</th>
                        <th  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;width:15%">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, inx) in row.products">
                        <td  style="background: #EEEEEE;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{inx+1}}</td>
                        <td  style="text-align: left;font-weight: normal;padding: 5px;background: #DDDDDD;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">
                            {{item.product_description.product_name}}</td>
                        <td  style="text-align: left;font-weight: normal;padding: 5px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">
                            {{item.product_description.sku}}</td>
                        <td  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: right;border-bottom: 1px solid #FFFFFF;color: #555555;">{{ accounting(item.unit_price)}}</td>
                        <td  style="text-align: right;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">{{item.total_qty}}</td>
                        <td  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{ getMulti(item.total_qty, item.unit_price) }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"></td>
                        <td colspan="2" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;border-top: 1px solid #AAAAAA;">SUBTOTAL</td>
                        <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{ getAdd(row.products) }}</td>
                    </tr>
                    <tr>
                        <td colspan="3"></td>
                        <td colspan="2" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;border-top: 1px solid #AAAAAA;">ADDITIONAL CHARGES</td>
                        <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{getCharges(row.total, row.products)}}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="border: none;"></td>
                        <td colspan="2" style="border-top: 1px solid #AAAAAA;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">GRAND TOTAL</td>
                        <td style="border-top: 1px solid #AAAAAA;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(row.total)}}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="border: none;"></td>
                        <td colspan="2" style="border-top: 1px solid #AAAAAA;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">AMOUNT PAID </td>
                        <td style="border-top: 1px solid #AAAAAA;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(invoice.AmountPaid)}}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="border: none;"></td>
                        <td colspan="2" style="border-top: 1px solid #AAAAAA;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">AMOUNT DUE </td>
                        <td style="border-top: 1px solid #AAAAAA;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(invoice.AmountDue)}}</td>
                    </tr>
                </tfoot>
            </table>
            <div id="thanks" style="font-size: 16px;margin-bottom: 10px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;color: #555555;">Thank you!</div>
        </main>
        <footer style="font-size:12px; font-family: 'Open Sans',Helvetica,Arial,sans-serif;">
            Invoice was created on a computer and is valid without the signature and seal.
            <!--<div id="myfooter" style="text-align:center;bottom:0px;width: 100%;">
                Powered by : FLOWZ DIGITAL, LLC © 2018. All Rights Reserved.
            </div>-->
        </footer>
    </div>
</template>

<script>
    import moment from 'moment';
    import 'owl.carousel/dist/assets/owl.carousel.css';
    import jQuery from 'jquery';
    import owlCarousel from 'owl.carousel';
     import config from '../../config/customConfig.js'
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
            accounting(item){
              return accounting.formatMoney(item)
            },
            getShippingCharge(item){
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
            getCharges(charge, products){
                let sum = 0
                for (let item of products) {
                    sum += item.total_qty * item.unit_price
                }
                let res = charge - sum
                return accounting.formatMoney(res)
            },
            invoiceData(){
                let self = this;
                axios.get(config.default.serviceUrl + 'settings/' + self.row.setting_id, {
                    headers:{
                        Authorization : Cookies.get('auth_token'),
                        subscriptionId : Cookies.get('subscriptionId')
                    },
                })
                .then(function (response) {
                    // // console.log("response------>iuy",response.data);
                    self.emailDataCompany = response.data
                })
                .catch(function (error) {
                    // // console.log("error",error);
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
                // // console.log("Row Data Invoice",this.row)
                  this.invoiceData()
            }
        }
    };
</script>
