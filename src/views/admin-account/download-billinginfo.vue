<template>
    <div style="position: relative;width: 21cm; margin: 0 auto; color: #555555;background: #FFFFFF; 'Roboto Condensed', sans-serif;font-size:10px">
        <header  style="padding: 10px 0;margin-bottom: 20px;border-bottom: 1px solid #AAAAAA;display: inline-block;width: 100%;">
            <div id="logo" style="float: left;margin-top: 8px;">
                <img src="https://s3-eu-west-1.amazonaws.com/htmlpdfapi.production/free_html5_invoice_templates/example2/logo.png" style="height: 70px;">
            </div>
            <div id="company" style="float: right;text-align: right;font-size: 14px;font-family: Verdana;">
                <h2  style="font-size: 18px;font-weight: normal;margin: 0;">Company Name</h2>
                <div>455 Foggy Heights, AZ 85004, US</div>
                <div>(602) 519-0450</div>
                <div>
                        <a href="mailto:company@example.com" style="color: #0087C3;text-decoration: none;">company@example.com</a>
                </div>
            </div>

        </header>
        <main>
            <div id="details" style="display: inline-block;width: 100%;margin-bottom: 20px;font-size:12px;font-family: Verdana;">
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
                    <div  style="font-size: 12px;color: #777777;">Due Date: {{moment(row.billing_details.data.DueDate).format('DD-MMM-YYYY')}}</div>
                </div>
            </div>
            <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;border-collapse: collapse;border-spacing: 0;font-size:12px;font-family: Verdana;margin-bottom:20px;">
                <thead>
                    <tr>
                        <th  style="color: #FFFFFF;font-size: 1.6em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;
                        ">#</th>
                        <th  style="text-align: left;white-space: nowrap;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">DESCRIPTION</th>
                        <th  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;color: #555555;">UNIT PRICE</th>
                        <th  style="text-align: left;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">QUANTITY</th>
                        <th  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, inx) in row.products">
                        <td  style="color: #FFFFFF;font-size: 1.6em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{inx+1}}</td>
                        <td  style="text-align: left;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;">
                            <h3 style="color: #57B223;font-size: 1.2em;font-weight: normal;margin: 0 0 0.2em 0;">{{item.product_description.product_name}}</h3>
                            {{text(item.product_description.description)}}</td>
                        <td  style="background: #DDDDDD;white-space: nowrap;font-weight: normal;padding: 15px;text-align: right;border-bottom: 1px solid #FFFFFF;color: #555555;font-size: 1em;">{{ accounting(item.unit_price)}}</td>
                        <td  style="text-align: right;font-weight: normal;padding: 15px;background: #EEEEEE;border-bottom: 1px solid #FFFFFF;border-collapse: collapse;font-size: 1em;">{{item.total_qty}}</td>
                        <td  style="color: #FFFFFF;font-size: 1em;background: #57B223;white-space: nowrap;font-weight: normal;padding: 15px;text-align: center;border-bottom: 1px solid #FFFFFF;">{{ getMulti(item.total_qty, item.unit_price) }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2"></td>
                        <td colspan="2" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">SUBTOTAL</td>
                        <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{ getAdd(row.products) }}</td>
                    </tr>
                    <tr>
                        <td colspan="2"></td>
                        <td colspan="2" style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">ADDITIONAL CHARGES</td>
                        <td style="border-collapse: collapse;text-align: right;padding: 10px 20px;background: #FFFFFF;border-bottom: none;font-size: 1.2em;white-space: nowrap;border-top: 1px solid #AAAAAA;">{{getCharges(row.total, row.products)}}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="border: none;"></td>
                        <td colspan="2" style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;text-align: right;white-space: nowrap;">GRAND TOTAL</td>
                        <td style="color: #57B223;font-size: 1.4em;border-top: 1px solid #57B223;padding: 10px 20px;background: #FFFFFF;border-bottom: none;white-space: nowrap;text-align: right;">{{accounting(row.total)}}</td>
                    </tr>
                </tfoot>
            </table>
            <div id="thanks" style="font-size: 16px;margin-bottom: 10px;font-family: Verdana;color: #555555;">Thank you!</div>
        </main>
        <footer style="font-size:12px;font-family: Verdana;">
            Invoice was created on a computer and is valid without the signature and seal.
        </footer>
    </div>
</template>

<script>
    import moment from 'moment';
    import 'owl.carousel/dist/assets/owl.carousel.css';
    import jQuery from 'jquery';
    import owlCarousel from 'owl.carousel';
    const accounting = require('accounting-js');
    let result;
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
                moment: moment
            }
        },
        methods: {
            getMulti(a, b) {
                return accounting.formatMoney(a * b) ;
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
            }
            
        },
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
        mounted() {
        }
    };
</script>