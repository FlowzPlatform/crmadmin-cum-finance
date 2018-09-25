 <template>
      <div>
          <!-- <Card>      -->
                <div class="row">
                    <table class="table1">
                         <tbody>
                            <tr class="description" :id="'description'+row._index">
                                <td colspan="6">
                                    <table class="details" style="width:100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table class="info" style="width:100%;table-layout: auto;margin-top: -1px;">
                                                        <thead>
                                                            <tr>
                                                                <th>Quantity &amp; Price</th>
                                                                <th>Imprint Information</th>
                                                                <th style="text-align:center">Additional Charges</th>
                                                                <th style="text-align:center">Charges</th>
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
                                                                        <div  v-for="(element, inx) in row.product_description.pricing">
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
                                                                <td class="estimate-detail">
                                                                    <div class="estimate-tag-block" v-for="(element, index) in row.imprint" style="text-align: left;">
                                                                        <div class="estimate-row heading">
                                                                            <span>Print Position: {{element.imprint_position_name}}</span>
                                                                            <div class="estimate-row">
                                                                                <span>Imprint Method: {{element.imprint_method_name}}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="estimate-row" v-if="element.no_of_color">
                                                                                How many colours : <span>{{element.no_of_color}} Colour </span>
                                                                        </div>
                                                                        <div v-else><br></div>
                                                                        <div class="estimate-row" v-if="element.selected_colors">
                                                                            <div v-for="(item) in element.selected_colors">
                                                                                Colour : <span>{{item}}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div v-else></div>
                                                                        <div v-if="element.hasOwnProperty('artwork_type') && element.hasOwnProperty('artwork')">
                                                                            <div v-if="element.artwork_type == 'upload_artwork_typeset'">
                                                                                <div v-if="element.artwork.hasOwnProperty('artwork_text_email')">
                                                                                    Art Work Via Email: <span>artwork@flowz.com</span>
                                                                                </div>
                                                                            </div>
                                                                            <div v-else-if="element.artwork_type == 'upload_artwork'">
                                                                                <div v-if="element.artwork.hasOwnProperty('artwork_email')">
                                                                                    Art Work Via Email: <span>artwork@flowz.com</span>
                                                                                </div>
                                                                            </div>
                                                                            <div v-else></div>
                                                                            <div v-if="element.artwork.hasOwnProperty('artwork_thumb')">
                                                                                <div v-for="(i,j) in element.artwork.artwork_thumb">
                                                                                    Uploaded Artwork {{j+1}} : <img :src="i" style="max-width:50px;max-height:50px;"/>
                                                                                </div>
                                                                            </div>
                                                                            <div v-else></div>
                                                                            <div v-if="element.artwork.hasOwnProperty('artwork_text')">
                                                                                <div v-for="(i,j) in element.artwork.artwork_text">
                                                                                    Text {{j+1}} : <span> {{i}}</span><br>
                                                                                </div>
                                                                            </div>
                                                                            <div v-else></div>
                                                                            <div v-if="element.artwork.hasOwnProperty('artwork_instruction')">
                                                                                    Instructions : <span> {{element.artwork.artwork_instruction}} </span><br>                                                                                           </div>
                                                                            <div v-else></div>
                                                                        </div>
                                                                    </div> 
                                                                </td>   
                                                                <td style="width:15%">
                                                                    <span v-if="row.charges">{{Object.keys(row.charges)[0]}}-{{row.charges.setup_charge | upper}}</span>
                                                                    <span v-else> N/A </span>
                                                                </td>
                                                                <td style="width:8%"> <span v-if="row.charges">{{ accounting(row.charges.setup_charge)}}</span>
                                                                    <span v-else> N/A </span>
                                                                </td>
                                                            </tr>
                                                            <tr v-for="(i, j) in row.shipping_method.shipping_detail">
                                                                <td colspan="4">
                                                                    <table class="product-quantity-list">
                                                                        <thead>
                                                                            <tr>
                                                                                <th class="item-list-number">
                                                                                    <div class="quantity-item">{{j+1}}</div>
                                                                                    Product Quantity 
                                                                                </th>
                                                                                
                                                                                
                                                                                <th style="text-align: center">Shipping Address </th>
                                                                                <th style="text-align: center">Shipping</th> 
                                                                                <th style="text-align: center;">Shipping Charge</th>
                                                                                
                                                                                <!--<th style="text-align: center;">Tax</th>-->
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="width:40%">
                                                                                    <table class="size-quantity-table">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th style="text-align: center;">COLOR</th>
                                                                                                <th style="text-align: center;">QUANTITY</th>
                                                                                                <!-- <th style="text-align: center;">TOTAL</th> -->
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr v-for="(item,inx) in i.color_quantity">
                                                                                                <!-- <div > -->
                                                                                                    <td>{{inx}}
                                                                                                    </td>
                                                                                                    <td>{{item}}
                                                                                                    </td>
                                                                                                    <!-- <td>{{item}}
                                                                                                    </td> -->
                                                                                                <!-- </div> -->
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td>
                                                                                    <span style="float: left">{{i.shipping_address.name}}</span><br>
                                                                                    <span style="float: left">{{i.shipping_address.street1}}</span><br>
                                                                                    <span style="float: left" v-if="i.shipping_address.street2"> {{i.shipping_address.street2}} <br></span>
                                                                                    <span style="float: left"> {{i.shipping_address.city}} - {{i.shipping_address.postalcode}}</span> <br>
                                                                                    <span style="float: left"> {{i.shipping_address.state}} </span> <br>
                                                                                    <span style="float: left"> {{i.shipping_address.country}} </span>                                                                                                          
                                                                                </td>
                                                                                <td style="width:20%">
                                                                                    <span style="float: left">Shipping Type: </span> <span style="float: left">{{row.shipping_method.shipping_type}}</span> <br>
                                                                                    <span style="float: left">Shipping Carrier: </span> <span style="float: left" v-if="i.shipping_detail.shipping_carrier">{{i.shipping_detail.shipping_carrier}}</span> <span v-else> - </span><br>
                                                                                    <span style="float: left">Method: </span> <span style="float: left" v-if="i.shipping_detail.shipping_method"> {{i.shipping_detail.shipping_method}}</span> <span v-else> -  </span> <br>
                                                                                    <span style="float: left">In Hand Date : </span> <span style="float: left;color: #404040" v-if="i.shipping_detail.on_hand_date"> {{i.shipping_detail.on_hand_date}} </span> <span v-else> -  </span>
                                                                                </td>
                                                                                <td style="width:16%">
                                                                                    Charge : <span style="color: #404040">{{accounting(i.shipping_detail.shipping_charge)}}</span>
                                                                                </td>
                                                                                <!--<td style="width:10%"></td>-->
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
                            
                        </tbody>
                    </table>
                </div> 
            <!-- </Card> -->
        </div>
</template>
<script>
    import moment from 'moment';
    import 'owl.carousel/dist/assets/owl.carousel.css';
    const accounting = require('accounting-js');  
    import owlCarousel from 'owl.carousel';
    import psl from 'psl';
    
    export default {
        props: {
            row: Object
        },
        data () {
            return {
                spinShow : true,
                moment: moment,
                imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
                
            }
        },
        methods: {
            getMulti(a, b) {
                return accounting.formatMoney(a * b);
            },
            getShippingCharge(item){
                var sum = 0;
                sum = sum + item;
                return accounting.formatMoney(sum)
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
            }
        },
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
        mounted() {
                // console.log("this 00000------------->", this.row)   
                this.spinShow = false;  
                $('.owl-carousel').owlCarousel({
                        stopOnHover : true,
                        navigation:true,
                        items : 4,
                        itemsDesktop: [1199, 4],
                        itemsDesktopSmall: [979, 4],
                        itemsTablet: [767, 2],
                        itemsMobile: [479, 2]
                    });   
            },
        watch: {
            'row': async function(id) {
                // console.log("this.row 11111", this.row)
            }
        }
    }
</script>
<style scoped>
    .demo-spin-container{
    	display: inline-block;
        width: 100%;
        height: 100px;
        position: relative;
    }
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
	    width: 80%;
    	margin-left: 30px;
    }
    
    
</style>
<style>
    .ivu-collapse-content {
        overflow: hidden !important;
    }
    .ulList {
        list-style-type: none ;
    }
    .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
        height: auto;
    }
</style>