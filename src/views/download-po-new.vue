<template>
    <div>
    <div style="size: 7in 9.25in;
    margin: 10mm 10mm 10mm 10mm;">
        <h1 style="text-align: right;">
            <img v-if="row.distributor_info" :src="row.distributor_info.logo" style="font-size: 14px; float: left;"  alt="" width="auto"
                height="53" />PURCHASE ORDER</h1>
        <table style="float: right; height: 45px;">
            <tbody>
                <tr>
                    <td style="width: 45px;">Date</td>
                    <td style="width: 11px;">:</td>
                    <td style="width: 280px;">{{getDate(row.PO_generate_date)}}</td>
                </tr>
                <tr>
                    <td style="width: 45px;">PO#</td>
                    <td style="width: 11px;">:</td>
                    <td style="text-align: left; width: 280px;">{{row.PO_id}}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="distributorAddress" style="padding-top: 10px;">
        <p style="margin: 0;">{{distributorAddress.name}}</p>
        <p style="margin: 0;" v-show="distributorAddress.AddressLine1">{{distributorAddress.AddressLine1}}</p>
        <p style="margin: 0;" v-show="distributorAddress.AddressLine2">{{distributorAddress.AddressLine2}}</p>
        <p style="margin: 0;" v-show="distributorAddress.city">{{distributorAddress.city}}</p>
        <p style="margin: 0;" v-show="distributorAddress.state">{{distributorAddress.state}}</p>
        <p style="margin: 0;" v-show="distributorAddress.country">{{distributorAddress.country}}</p>
        <p style="margin: 0;" v-show="distributorAddress.PostalCode">{{distributorAddress.PostalCode}}</p>
        <p style="margin: 0;" v-show="distributorAddress.mobile">{{distributorAddress.mobile}}</p>
            
        <p style="margin-top: 5px;"><b>WebSite :</b> {{row.websiteName}}</p>
        </div>
        <hr />
        <table style="width: 100%; height: auto; margin-left: auto; margin-right: auto;">
            <tbody v-if="row.supplier_info">
                <tr>
                    <td style="width: 90px;"><b>SUPPLIER</b></td>
                    <td style="width: 10px;"><b>:</b></td>
                    <td>{{row.supplier_info.supplier_name}} ({{row.supplier_info.email}})</td>
                </tr>
            </tbody>
        </table>
        <p style="margin: 0;">&nbsp;</p>
        <table style="width: 100%; height: auto; margin-left: auto; margin-right: auto; border-collapse: collapse;">
                <thead>    
            <tr style="border: 1pt solid black;">
                    <th style="width: 73px; border: 1pt solid black;padding: 5px;"  rowspan="2">
                        <strong>SKU#</strong>
                    </th>
                    <th style="width: 240px; border: 1pt solid black;padding: 5px;"  rowspan="2">
                        <strong>Product Name</strong>
                    </th>
                    <th style="width: 135px; border: 1pt solid black;padding: 5px;" colspan="2">
                            <strong>Product Order</strong>
                        </th>
<!--                         
                    <td style="width: 75px; border: 1pt solid black;padding: 5px;">
                        <strong>Color</strong>
                    </td>
                    <td style="width: 60px; border: 1pt solid black;padding: 5px;">
                        <strong>Quntity</strong>
                    </td> -->
                    <th style="width: 80px; border: 1pt solid black;padding: 5px;"  rowspan="2">
                        <strong>Total Quntity * Unit Price in $</strong>
                    </th>
                    <th style="width: 90px; border: 1pt solid black;padding: 5px;text-align: center;"  rowspan="2">
                        <strong>Total (in $)</strong>
                    </th>
                </tr>
                <tr>        
                        <th style="width: 60px; border: 1pt solid black;padding: 5px;">
                            <strong>Color</strong>
                        </th>
                        <th style="width: 60px; border: 1pt solid black;padding: 5px;">
                            <strong>Quntity</strong>
                        </th></tr>

                        </thead>
                <!-- <my-row v-for="(product,inx) in row.products" :key="'product-'+product.id" :product="product" :color="product.color"> </my-row> -->

               <!-- <tr style="border: 1pt solid black;" v-if="products" v-for="(item,inx) in products" :key="'product-'+inx">
                    <td style="width: 73px; border: 1pt solid black; padding: 5px;" v-if="item.product" :rowspan=item.product.total_color>{{item.product.sku}}</td>
                    <td style="width: 240px; border: 1pt solid black; padding: 5px;"  v-if="item.product" :rowspan=item.product.total_color>{{item.product.product_name}}</td>

                         
                        <td style="width: 75px; border: 1pt solid black; padding: 5px;">{{item.color.key}}</td>
                        <td style="width: 60px; border: 1pt solid black; padding: 5px;">{{item.color.value}}</td>
                        <td style="width: 80px; border: 1pt solid black; padding: 5px;" v-if="item.product" :rowspan=item.product.total_color>{{item.product.unit_price}}</td>
                        <td style="width: 90px; border: 1pt solid black; padding: 5px;text-align: -webkit-right;" v-if="item.product" :rowspan=item.product.total_color>2000</td>
                </tr> -->
                <tbody>
                <!-- <template v-for="inx in 6"> -->
               <tr style="border: 1pt solid black;" v-if="row.products" v-for="(product,inx) in row.products" :key="'product-'+product.id">
                    <td style="width: 73px; border: 1pt solid black; padding: 5px;" >{{product.product_description.sku}}</td>
                    <td style="width: 240px; border: 1pt solid black; padding: 5px;" >{{product.product_description.product_name}}</td>

                         
                        <td style="width: 75px;" colspan=2>  
                            <table style="width: -webkit-fill-available;margin:  0px;border: 0pt solid black;border-spacing: 0px;">
                                <tr v-for="(value,key,inx) in product.color">
                                    <td style="width: 60px;border-bottom: 1pt solid black;padding: 5px;border-right: 1px solid black;" v-if="inx+1<Object.keys(product.color).length">{{key}}</td>
                                    <td style="width: 60px;padding: 5px;border-right: 1px solid black;" v-else>{{key}}</td>
                                    <td style="width: 60px;border-bottom: 1pt solid black;padding: 5px;" v-if="inx+1<Object.keys(product.color).length">{{value}}</td>
                                    <td style="width: 60px;padding: 5px;" v-else>{{value}}</td>
                                </tr> 
                            </table>
                        </td>
                        
                        <td style="width: 80px; border: 1pt solid black; padding: 5px;" >{{product.total_qty}} * {{product.unit_price}}</td>
                        <td style="width: 90px; border: 1pt solid black; padding: 5px;text-align: -webkit-right;">{{calPrice(product.total_qty , product.unit_price)}}</td>
                </tr>
            <!-- </template>     -->
           
                      <!--      <tr style="border: 1pt solid black;">
                    <td style="width: 75px; border: 1pt solid black; padding: 5px;">Black</td>
                    <td style="width: 60px; border: 1pt solid black; padding: 5px;">10</td>
                </tr> -->
              <!--  <tr style="border: 1pt solid black;">
                    <td style="width: 75px; border: 1pt solid black; padding: 5px;">Yellow</td>
                    <td style="width: 60px; border: 1pt solid black; padding: 5px;">20</td>
                    <td style="width: 80px; border: 1pt solid black; padding: 5px;">20</td>
                    <td style="width: 90px; border: 1pt solid black; padding: 5px;text-align: -webkit-right;">400</td>
                </tr>
                <tr style="border: 1pt solid black;">
                    <td style="width: 73px; border: 1pt solid black; padding: 5px;">5369</td>
                    <td style="width: 240px; border: 1pt solid black; padding: 5px;">Glass Cover</td>
                    <td style="width: 75px; border: 1pt solid black; padding: 5px;">Black</td>
                    <td style="width: 60px; border: 1pt solid black; padding: 5px;">5</td>
                    <td style="width: 80px; border: 1pt solid black; padding: 5px;">20</td>
                    <td style="width: 90px; border: 1pt solid black; padding: 5px;text-align: -webkit-right;">100</td>
                </tr> -->
                 <tr>
                    <td style="width: 135px;" colspan="4" >&nbsp;</td>
                    <td style="width: 80px; border-bottom: 1pt solid black;padding: 5px;">Net Total</td>
                    <td style="width: 90px; border-bottom: 1pt solid black;padding: 5px;text-align: -webkit-right;">{{subTotal}}</td>
                </tr>
               <!-- <tr>
                    <td style="width: 135px;" colspan="4" >&nbsp;</td>
                    <td style="width: 80px; border-bottom: 1pt solid black;padding: 5px;">Tax</td>
                    <td style="width: 90px; border-bottom: 1pt solid black;padding: 5px;text-align: -webkit-right;">100</td>
                </tr>
                <tr>
                        <td style="width: 135px;" colspan="4" >&nbsp;</td>
                    <td style="width: 80px; border-bottom: 1pt solid black;padding: 5px;">Shiping</td>
                    <td style="width: 90px; border-bottom: 1pt solid black;padding: 5px;text-align: -webkit-right;">10</td>
                </tr>
                <tr>
                        <td style="width: 135px;" colspan="4" >&nbsp;</td>
                    <td style="width: 80px; border-bottom: 1pt solid black;padding: 5px;">Total</td>
                    <td style="width: 90px; border-bottom: 1pt solid black;padding: 5px;text-align: -webkit-right;">2710</td>
                </tr> -->
            </tbody>
        </table>
    </div>
</div>
</template>
<script>
    
    import moment from 'moment';
    import 'owl.carousel/dist/assets/owl.carousel.css';
    import owlCarousel from 'owl.carousel';
    import config from '../config/customConfig.js'
    const accounting = require('accounting-js');
 
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                imgurl: this.row.product_image_url,
                baseImageUrl: "http://image.promoworld.ca/migration-api-hidden-new/web/images/",
                distributorAddress:this.distributorAddressMtd(),
                products:[]
            }
        },
        watch:{
            row:function(val)
            {
                this.calProduct(val)
            }   
        },
        methods: {
            rowSpanValue(product){
                return Object.keys(product.color).length
            },
            calPrice(total_qty,unit_price)
            {
                let tPrice=(total_qty*unit_price).toFixed(2)
                // this.subTotal+=Number(tPrice)
                return tPrice
            },
           
            calProduct(val){
            if(!val.products)
                return

                for (let index = 0; index < val.products.length; index++) {
                    const product = val.products[index];
                    
                    let colorKeys=Object.keys(product.color);
                    let colorObj={"key":colorKeys[0],"value":product.color[colorKeys[0]]}
                    let productObj={"sku":product.product_description.sku,"product_name":product.product_description.product_name,"unit_price":product.unit_price,"total_color":colorKeys.length}
                    
                    this.products.push({"product":productObj,"color":colorObj})
                    
                for (let index = 1; index < colorKeys.length; index++) {
                    const colorKey = colorKeys[index];
                    let colorObj={"key":colorKey,"value":product.color[colorKey]}
                    this.products.push({"color":colorObj})

                }
                
                }

                // console.log("KEys Product-->",this.products)
            },
            distributorAddressMtd(){
                return  this.row.distributor_info.address || {}
            },
            colorQuery(product, color) {
                let editedColor = product.edited_color_quantity && product.edited_color_quantity[color]
                return editedColor ? editedColor : product.color[color]
            },
            getDate(date) {
                return moment(date).format('DD-MMM-YYYY')
            },
            getMulti(a, b) {
                return accounting.formatMoney(a * b,'');
            },
            getImgUrl(url, img) {
                // if(this.imgurl == undefined) {
                //     return config.default.productImageUrl + url        
                // }
                // console.log(url + img)
                return url + img
            },
            getSubTotal(a, b, c, d) {
                let sum = 0;
                for (let i of d) {
                    let Charge = i.shipping_detail.shipping_charge
                    if (typeof Charge === 'string') {
                        Charge = parseFloat(Charge)
                    }
                    sum = sum + Charge
                }
                let res = c.hasOwnProperty('charges')
                if (res == false) {
                    return accounting.formatMoney((a * b) + parseFloat(sum))
                }
                else {
                    return accounting.formatMoney((a * b + parseFloat(c.charges.setup_charge) + parseFloat(sum)))
                }
            },
            accounting(item) {
                return accounting.formatMoney(item)
            },
            getShippingCharge(arr) {
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
        computed:{
            subTotal:function(){
                
                let total=0
                if(this.row.products){
                this.row.products.forEach(element => {
                    total+=Number(this.calPrice(element.total_qty,element.unit_price))
                });
            }
                return accounting.formatMoney(total.toFixed(2))
            },
        },
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
        mounted() {
            // console.log("This row===>",this.row)
            this.calProduct(this.row)
            // this.quntityFun(this.row)
        }
    };
</script>
<style>
</style>