<template>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px">
        <tr>
            <td align="center" valign="top">
                <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:#f0f0f0;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif">
                    <tr>
                        <td align="left" valign="top" width="20"></td>
                        <td align="left" valign="top">
                            <table border="0" cellspacing="0" cellpadding="0" width="100%" style="font-size:10px">
                                <tr>
                                    <td align="left" valign="top" height="10"></td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top" style="color: #ec008c; font-size:15px;">Order Details</td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top" height="10"></td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top" style="border-bottom: 1px dotted #cccccc;"></td>
                                </tr>
                                <tr v-for="(item, inx) in row.products">
                                    <td align="left" valign="top">
                                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                            <tr>
                                                <td align="left" valign="top" height="10"></td>
                                            </tr>
                                            <tr>
                                                <td align="left" valign="top" style="color: #ec008c; font-size:11px;background:#FFF;border-top:2px solid #EC008C;border-right:1px solid #ddd;border-left:1px solid #ddd;">
                                                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                                        <tr>
                                                            <td rowspan="3" align="left" valign="middle" width="20"></td>
                                                            <td align="left" valign="middle" height="10"></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" style="background: #FFF;font-weight: 600;font-size: 12px;color: #404040">PRODUCT SUMMARY </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="middle" height="10"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" valign="top" style="color: #ec008c; font-size:11px;background:#FFF;border-top:1px solid #ccc;border-right:1px solid #ddd;border-left:1px solid #ddd;">
                                                    <table border="0" cellspacing="0" cellpadding="0" width="100%" style="background: #FFF;font-size: 10px;color: #404040;">
                                                        <tr>
                                                            <td colspan="5" align="left" valign="middle" height="15"></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="middle" width="10"></td>
                                                            <td align="left" valign="top" style="width: 50%;">ORDER ID :
                                                                <br>{{row.order_id}}</td>
                                                            <td align="left" valign="top">ORDER TYPE :
                                                                <br>{{item.order_type | upper}}</td>
                                                            <td align="left" valign="top">SHIPPING :
                                                                <br>{{item.shipping_method.shipping_type | upper}}</td>
                                                            <td align="left" valign="middle" width="10"></td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="5" align="left" valign="middle" height="15"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="4" style="color:#404040;font-size:10px;border-top:1px solid #ddd;border-left:1px solid #ddd;border-right:1px solid #ddd;background-color:#fff;">
                                                    <table width="100%" border="1" style="border-collapse:collapse; border-color:#ccc;">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" valign="" style="height: 30px;width: 70px;font-size:12px;">PRODUCT IMAGE</td>
                                                                <td align="center" valign="" style="font-size:12px">ITEM NUMBER</td>
                                                                <td align="center" valign="" style="font-size:12px">PRODUCT NAME</td>
                                                                <td align="center" valign="" style="font-size:12px">QUANTITY</td>
                                                                <td align="center" valign="" style="font-size:12px">UNIT PRICE</td>
                                                                <td align="center" valign="" style="font-size:12px">TOTAL</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" valign="" style="height: 70px;width: 105px">
                                                                    <img :src="getImgUrl(row.product_image_url , item.product_description.default_image)" style="max-width:75px;max-height:75px"/>
                                                                </td>
                                                                <td align="center" valign="" style="font-size:10px">{{item.product_description.sku}}</td>
                                                                <td align="center" valign="" style="font-size:10px">{{item.product_description.product_name}}</td>
                                                                <td align="center" valign="" style="font-size:10px">{{item.total_qty}}</td>
                                                                <td align="center" valign="" style="font-size:10px">{{ accounting(item.unit_price)}}</td>
                                                                <td align="center" valign="" style="font-size:10px">{{ getMulti(item.total_qty, item.unit_price) }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" valign="top" style="color: #ec008c; font-size:11px;background:#FFF;border-top: 1px dotted #DDD;border-left: 1px solid #DDD;border-right: 1px solid #DDD;border-bottom: 1px dotted #DDD;border-letf: 1px solid #DDD; border-right: 1px solid #DDD">
                                                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                                        <tr>
                                                            <td rowspan="3" align="left" valign="middle" width="20"></td>
                                                            <td align="left" valign="middle" height="10"></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" style="background: #FFF;font-weight: 600;font-size: 12px;color: #404040">PRODUCT DESCRIPTION</td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="middle" height="10"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr v-for="(element, index) in item.imprint">
                                                <td style="border-left:  1px solid #ddd;border-right:  1px solid #ddd;font-size:10px;background: #FFF" align="left" valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td colspan="3" height="10"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" valign="top" width="20"></td>
                                                                <td style="font-size: 10px;font-weight: 600;line-height: 23px;color: #404040" align="left" height="10" valign="top">Print Position: {{element.imprint_position_name}}
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="200">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="font-weight: normal;font-size: 10px;color: #666" align="left" valign="top">Imprint Method : <span style="color: #404040"> {{element.imprint_method_name}}</span>
                                                                                    <br><span v-if="element.no_of_color">How Many Colors : <span style="color: #404040">{{element.no_of_color}} Color</span></span><span v-else></span>
                                                                                    <br><span v-if="element.selected_colors">
                                                                                            <span v-for="(item) in element.selected_colors"> Color : 
                                                                                                <span style="color: #404040">{{item}} </span>
                                                                                            </span>
                                                                                        </span>
                                                                                        <span v-else></span>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td style="background: #FFF;" align="left" valign="top">
                                                                    <table width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="height: 7" align="left" valign="top"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="left" valign="top" width="15"></td>
                                                                                <td style="background: #FFF;font-weight: 600;font-size: 10px;color: #404040" align="left" valign="top">SPECIAL INSTRUCTIONS</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td valign="top" height="5" align="left"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="left" valign="top" width="15"></td>
                                                                                <td style="text-align: justify;background: #FFF;font-size: 10px;color: #404040;color: #666;font-style: italic" align="left" valign="top">{{item.special_instruction}}</td>
                                                                                <td align="right" valign="top" width="15"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="height: 7" align="left" valign="top"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td valign="top" height="10" align="left"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                <td align="left" valign="top" width="20"></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="4" align="left" height="20" valign="top"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <!-- <tr>
                                            </tr> -->
                                            <tr v-for="(i, j) in item.shipping_method.shipping_detail">
                                                <td>
                                                    <table width="100%">
                                                        <tr>
                                                            <td align="left" valign="top" style="background: #FFF;color: #404040; font-size:10px;border-bottom:1px dotted #ddd;border-top:1px solid #ddd;border-right:1px solid #ddd;border-left:1px solid #ddd;">
                                                                <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                                                    <tr>
                                                                        <td align="left" valign="middle" height="5" style="background: #868686"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td rowspan="3" align="left" valign="middle" width="35" style="background:#868686;text-align: center;color: #FFF ">{{j+1}}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" valign="middle" width="10"></td>
                                                                        <td align="left" valign="top" style="background: #FFF;font-size: 12px;font-weight: 600">PRODUCT QUANTITY</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" valign="middle" height="5"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" style="color:#404040;font-size:10px;border-left:1px solid #ddd;border-right:1px solid #ddd;background-color:#fff;text-align: center;width:100%">
                                                                <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                                                    <tr>
                                                                        <td width="20"></td>
                                                                        <td align="left" valign="top" style="text-align: center;line-height: 25px">
                                                                            <table border="0" cellspacing="0" cellpadding="" style="width:50%">
                                                                                <tr>
                                                                                    <td valign="top" height="10" align="left"></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th style="border-bottom: 1px solid #404040; font-size:12px;text-align:left;">Color</th>
                                                                                    <th style="border-bottom: 1px solid #404040; font-size:12px;text-align:left;" width="50">QUANTITY</th>
                                                                                    <th style="border-bottom: 1px solid #404040; font-size:12px;text-align:left;" width="50">TOTAL</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td valign="top" height="5" align="left"></td>
                                                                                </tr>
                                                                                <tr v-for="(item,inx) in i.color_quantity">
                                                                                    <td style="border-bottom: 1px solid #DDD;text-align:left; font-size:10px;" width="50">{{inx}}</td>
                                                                                    <td style="border-bottom: 1px solid #DDD;text-align:left; font-size:10px;color: #666">{{item}}</td>
                                                                                    <td style="border-bottom: 1px solid #DDD; font-size:10px;text-align:left;color: #666">{{item}}</td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" valign="top" height="10"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="4" style="color:#404040;font-size:10px;border-top:  1px solid #ddd;border-left:  1px solid #ddd;border-right:  1px solid #ddd;background-color:#fff;font-weight: 600">
                                                                <table width="100%">
                                                                    <tr height="10"></tr>
                                                                    <tr>
                                                                        <td width="16" align="left" valign="top"></td>
                                                                        <td align="left" valign="top" style="font-size:12px">SHIPPING ADDRESS</td>
                                                                        <td align="left" valign="top" style="font-size:12px">SHIPPING</td>
                                                                        <td align="left" valign="top" style="font-size:12px">SHIPPING CHARGE</td>
                                                                        <!--<td align="left" valign="top" style="font-size:12px">TAX</td>-->
                                                                        <td width="20" align="left" valign="top"></td>
                                                                    </tr>
                                                                    <tr >
                                                                        <td width="20" align="left" valign="top"></td>
                                                                        <td style="font-weight: normal;font-size: 10px;color: #404040" align="left" valign="top">{{i.shipping_address.name}} -
                                                                            <br>{{i.shipping_address.street1}},
                                                                            <br>{{i.shipping_address.city}} - {{i.shipping_address.postalcode}},
                                                                            <br>{{i.shipping_address.state}}, {{i.shipping_address.country}}.
                                                                            <br>T: {{i.shipping_address.phone}} </td>
                                                                        <td style="font-weight: normal;font-size: 10px;color: #666" align="left" valign="top ">Shipping Type : <span style="color: #404040">{{item.shipping_method.shipping_type}}</span>
                                                                            <br>Shipping Carrier :<span style="color: #404040" v-if="i.shipping_detail.shipping_carrier"> {{i.shipping_detail.shipping_carrier}}</span> <span v-else> -  </span>
                                                                            <br>Method : <span style="color: #404040" v-if="i.shipping_detail.shipping_method"> {{i.shipping_detail.shipping_method}}</span> <span v-else> -  </span>
                                                                            <br>In hand Date :<span style="color: #404040" v-if="i.shipping_detail.on_hand_date"> {{i.shipping_detail.on_hand_date}} </span> <span v-else> -  </span>
                                                                        </td>
                                                                        <td style="font-weight: normal;font-size: 10px;color: #666" align="left" valign="top ">Charge : <span style="color: #404040">{{accounting(i.shipping_detail.shipping_charge)}}</span></td>
                                                                        <!--<td align="left" valign="top"> </td>-->
                                                                        <td width="20" align="left" valign="top"></td>
                                                                    </tr>
                                                                    <tr height="10"></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" height="10" align="left"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="4" style="color:#404040;font-size:12px;border:1px solid #ddd;background-color:#fff;text-align: center;font-weight: 600;background: #F0F0F0">
                                                    <table width="100%">
                                                        <tr>
                                                            <td width="20" align="left" valign="top"></td>
                                                            <td align="left" valign="top" style="border-right: 1px solid #DDD;line-height: 30px; font-size:12px">TOTAL : {{ getMulti(item.total_qty, item.unit_price) }}</td>
                                                            <td width="20" align="left" valign="top"></td>
                                                            <td align="left" valign="top" style="border-right: 1px solid #DDD;line-height: 30px; font-size:12px">ADDITIONAL CHARGES :  <span v-if="item.charges">{{accounting(item.charges.setup_charge)}}</span>
                                                                                <span v-else> $00.00 </span> 
                                                            </td>
                                                            <td width="20" align="left" valign="top"></td>
                                                            <td align="left" valign="top" style="border-right: 1px solid #DDD;line-height: 30px; font-size:12px">SHIPPING CHARGES: <span v-if="item.shipping_method.shipping_detail[0].shipping_detail.shipping_charge"> {{ getShippingCharge(item.shipping_method.shipping_detail)}}</span> 
                                                                <span v-else> $00.00 </span>
                                                            </td>
                                                            <td width="20" align="left" valign="top"></td>
                                                            <td align="left" valign="top" style="line-height: 30px; font-size:12px">TAX : $00.00</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" valign="top" style="color:#fff;font-size:15px;background-color:#ec008c;">
                                                    <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                                        <tr>
                                                            <td height="8" colspan="4"></td>
                                                        </tr>
                                                        <tr>
                                                            <td width="20" align="left" valign="top"></td>
                                                            <td align="left" valign="top"></td>
                                                            <td align="right" valign="top" style="font-size:15px">SUB TOTAL : <span v-if="item.shipping_method.shipping_detail[0].shipping_detail.shipping_charge">  {{ getSubTotal(item.total_qty, item.unit_price, item, item.shipping_method.shipping_detail) }}</span> 
                                                        <span v-else> {{ getSubTotal(item.total_qty, item.unit_price, item, 0) }} </span></td>
                                                            <td width="20" align="left" valign="top"></td>
                                                        </tr>
                                                        <tr>
                                                            <td height="8" colspan="4"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" height="10" valign="top"></td>
                                            </tr>
                                            <tr v-if="row.products.length > 1 && row.products.length !== inx+1">
                                                <td align="left" height="100" valign="top"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top" style="color:#fff;font-size:15px;background-color:#ec008c;">
                                        <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                            <tr>
                                                <td height="8" colspan="4"></td>
                                            </tr>
                                            <tr>
                                                <td width="20" align="left" valign="top"></td>
                                                <td align="left" valign="top"></td>
                                                <td align="right" valign="top" style="font-size:15px">GRAND TOTAL : {{accounting(row.total)}}</td>
                                                <td width="20" align="left" valign="top"></td>
                                            </tr>
                                            <tr>
                                                <td height="8" colspan="4"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" height="10" align="left"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="font-size:10px;text-align:center;bottom:0px;width: 100%;padding-bottom:5px">
                                            Powered by : FLOWZ DIGITAL, LLC © 2018. All Rights Reserved.
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td align="left" valign="top" width="20"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</template>
<script>
    import moment from 'moment';
    import 'owl.carousel/dist/assets/owl.carousel.css';
    import jQuery from 'jquery';
    import owlCarousel from 'owl.carousel';
    import config from '../../config/customConfig.js'
    const accounting = require('accounting-js');
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                imgurl: this.row.product_image_url
            }
        },
        methods: {
            getMulti(a, b) {
                return accounting.formatMoney(a * b) ;
            },
            getImgUrl (url, img) {
                // if(this.imgurl == undefined) {
                //     return config.default.productImageUrl + url        
                // }
                console.log(url+img)
                return url + img
            },
            getSubTotal (a, b, c, d) {
                let sum = 0;
                for (let i of d) {
                    let Charge = i.shipping_detail.shipping_charge
                    if (typeof Charge === 'string') {
                        Charge = parseFloat(Charge)
                    }
                    sum = sum + Charge
                }
                let res = c.hasOwnProperty('charges')
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
            getShippingCharge(arr){
                let sum = 0;
                for (let i of arr) {
                    let Charge = i.shipping_detail.shipping_charge
                    if (typeof Charge === 'string') {
                        Charge = parseFloat(Charge)
                    }
                    sum = sum + Charge
                }
                return accounting.formatMoney(sum)
            },
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
<style>
</style>