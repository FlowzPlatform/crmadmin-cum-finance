<template>
    <div>

        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <!--<th> ORDER ID : {{row.order_id}} </th>-->
                        <th> ORDER TYPE : {{row.order_type | upper}} </th>
                        <th> SHIPPING : {{row.shipping_method.shipping_type | upper}} </th>
                        <th> <a @click="clicked(row._index)">
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
                        <td><img :src="getImgUrl(row.product_description.default_image)" style="max-width:75px;max-height:75px"/></td>
                        <td> {{row.product_description.sku}}</td>
                        <td> {{row.product_description.product_name}}</td>
                        <td> {{row.total_qty}}</td>
                        <td> {{ accounting(row.unit_price)}} </td>
                        <td> {{ getMulti(row.total_qty, row.unit_price) }}</td>
                    </tr>
                    <tr class="description" :id="'description'+row._index+this.total" style="display: none;">
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style="width:62%">
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
                                                            <div class="estimate-tag-block" v-for="(element, index) in row.imprint" style="text-align: -webkit-left;">
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
                                                            </div> 
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
                                                                        <!-- <th style="text-align: -webkit-center;">Shipping Address </th>
                                                                        <th style="text-align: -webkit-center;">Shipping</th> -->
                                                                        <!-- <th style="text-align: -webkit-center;">Shipping Charge</th> -->
                                                                        <th style="text-align:center">Additional Charges</th>
                                                                        <th style="text-align:center">Charges</th>
                                                                        <!--<th style="text-align: -webkit-center;">Tax</th>-->
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="width:60%">
                                                                            <table class="size-quantity-table">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th style="text-align: -webkit-center;">COLOR</th>
                                                                                        <th style="text-align: -webkit-center;">QUANTITY</th>
                                                                                        <!-- <th style="text-align: -webkit-center;">TOTAL</th> -->
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr v-for="(item,inx) in productitem">
                                                                                        <!-- <div > -->
                                                                                            <td>{{inx}}
                                                                                            </td>
                                                                                            <td>{{item}}
                                                                                                <div v-if="editIcon" style="display:inline-block;margin-left:20px"><Button class="editIcon" type="text" icon="edit"  @click="show(row,item,inx)"></Button></div>
                                                                                            </td>
                                                                                            <!-- <td>{{item}}
                                                                                            </td> -->
                                                                                        <!-- </div> -->
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                        <!-- <td v-for="(i, j) in row.shipping_method.shipping_detail">
                                                                            <span style="float: left">{{i.shipping_address.name}}</span><br>
                                                                            <span style="float: left">{{i.shipping_address.street1}}</span><br>
                                                                            <span style="float: left" v-if="i.shipping_address.street2"> {{i.shipping_address.street2}} <br></span>
                                                                            <span style="float: left"> {{i.shipping_address.city}} - {{i.shipping_address.postalcode}}</span> <br>
                                                                            <span style="float: left"> {{i.shipping_address.state}} </span> <br>
                                                                            <span style="float: left"> {{i.shipping_address.country}} </span>                                                                                                          
                                                                        </td> -->
                                                                        <!-- <td style="width:20%" v-for="(i, j) in row.shipping_method.shipping_detail">
                                                                            <span style="float: left">Shipping Type: </span> <span style="float: left">{{row.shipping_method.shipping_type}}</span> <br>
                                                                            <span style="float: left">Shipping Carrier: </span> <span style="float: left" v-if="i.shipping_detail.shipping_carrier">{{i.shipping_detail.shipping_carrier}}</span> <span v-else> - </span><br>
                                                                            <span style="float: left">Method: </span> <span style="float: left" v-if="i.shipping_detail.shipping_method"> {{i.shipping_detail.shipping_method}}</span> <span v-else> -  </span> <br>
                                                                            <span style="float: left">In Hand Date : </span> <span style="float: left;color: #404040" v-if="i.shipping_detail.on_hand_date"> {{i.shipping_detail.on_hand_date}} </span> <span v-else> -  </span>
                                                                        </td> -->
                                                                        <!-- <td style="width:16%" v-for="(i, j) in row.shipping_method.shipping_detail">
                                                                            Charge : <span style="color: #404040">{{accounting(i.shipping_detail.shipping_charge)}}</span>
                                                                        </td> -->
                                                                        <td style="width:21%">
                                                                            <span v-if="row.charges">{{Object.keys(row.charges)[0]}}-{{row.charges.setup_charge | upper}}</span>
                                                                            <span v-else> N/A </span>
                                                                        </td>
                                                                        <td> <span v-if="row.charges">{{ accounting(row.charges.setup_charge)}}</span>
                                                                            <span v-else> N/A </span>
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
                    <!-- <tr class="item_total">
                        <th>Total:  {{ getMulti(row.total_qty, row.unit_price) }}</th>
                        <th colspan="2">Additional Charges:  <span v-if="row.charges">{{accounting(row.charges.setup_charge)}}</span>
                                                            <span v-else> $00.00 </span> 
                        </th>
                        <th>Shipping Charge : <span v-if="row.shipping_method.shipping_detail.shipping_detail.shipping_charge"> {{ getShippingCharge(row.shipping_method.shipping_detail.shipping_detail.shipping_charge)}}</span> <span v-else> $00.00 </span> </th>
                        <th>Tax : $00.00 </th>
                        <th>Sub Total:<span style="color:#C11E19" v-if="row.shipping_method.shipping_detail.shipping_detail.shipping_charge">  {{ getSubTotal(row.total_qty, row.unit_price, row, row.shipping_method.shipping_detail.shipping_detail.shipping_charge) }}</span> <span v-else> {{ getSubTotal(item.total_qty, item.unit_price, item, 0) }} </span> </th>
                    </tr> -->
                </tbody>
            </table>
        </div>
                    
        <modal v-model="modal2" width="40%">
            <p slot="header">
                    <!-- <icon type="information-circled"></icon> -->
                    <span>Change Quantity</span>
                </p>
            <div style="text-align:center">
                <i-form ref="formValidate" :model="formValidate" :rules="ruleInline">
                <form-item label="Quantity" prop="value">
                    <i-input v-model="formValidate.value" placeholder="Enter Quantity"></i-input>
                </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <i-button @click="cancel">Cancel</i-button>
                <i-button type="primary" @click="onOk(productData,formValidate.value,index)">OK</i-button>
            </div>
        </modal>
    </div>
</template>
<script>
    import moment from 'moment';
    import psl from 'psl';
    const accounting = require('accounting-js');  
    import owlCarousel from 'owl.carousel';
    import config from '../config/customConfig.js';
    let axios = require('axios');
    export default {
        props: {
            row: Object,
            total: String,
            editIcon: Boolean,
            selected_address_id: String
        },
        data () {
            return {
                price: '',
                spinShow : true,
                moment: moment,
                productData: {},
                index: '',
                imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
                modal2: false,
                productitem:{},
                formValidate: {
                	value: ''
                },
                ruleInline: {
                    value: [
                        { required: true, message:  "Please Enter Quantity", trigger: 'blur' }
                    ]
                },                
                
            }
        },
        methods: {

            quntityFun(row){    
                let self=this
                var shipDetail=row.shipping_method.shipping_detail
                shipDetail.forEach((element) => {
                    if(self.selected_address_id == element.selected_address_id){
                     if(element.edited_color_quantity)
                        self.productitem= element.edited_color_quantity
                     else
                        self.productitem= element.color_quantity
                    }
                })
            console.log("---Quntiity----end",this.productitem)

                // return {} 
            },
            getImgUrl (url) {
                return this.imgurl + url
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
                console.log("Clickeddddd...............",inx);
                $('#description'+inx+this.total).slideToggle(700);
                // if($('#description'+inx).css('display') === 'none') {
                //     $('#description'+inx).css('display', 'table-row');
                // } else {
                //     $('#description'+inx).css('display', 'none');
                // }
                // $(document).ready(function(){
                    $('.owl-carousel').owlCarousel({
                        stopOnHover : true,
                        navigation:true,
                        items : 4,
                        itemsDesktop: [1199, 4],
                        itemsDesktopSmall: [979, 4],
                        itemsTablet: [767, 2],
                        itemsMobile: [479, 2]
                    });
                    
                // });
                // $(".description").css("display", "table-row");
            },
            show (data,val,inx) {
                let self = this
                this.modal2 = true
                console.log("show show ", data)
                this.productData = data
                this.formValidate.value = val
                this.index = inx
            },
            onOk (data,value,name){
                console.log('ok',data,value,name)
                
                let totalValue = parseInt(value)
                for(let key in this.productitem){
                    console.log('&&&&&&', key)
                    if(key !== name){
                        totalValue = totalValue + parseInt(this.productitem[key])
                    }
                }
               
                console.log('&&&&&&&& totalvalue', totalValue )
                // this.modal2 = false;
                this.price = ''

                data.product_description.pricing.forEach((item) => {
                    if(item.price_type == 'regular' && item.type == 'decorative' && item.global_price_type == 'global') {
                        item.price_range.forEach((element) => {
                            if(element.qty.lte) {
                                    console.log("if first",element.qty, this.price)                                
                                if(totalValue >= element.qty.gte && totalValue <= element.qty.lte){
                                    this.price = element.price                                    
                                    console.log("if",this.price,totalValue)
                                } 
                            }else {
                                if(totalValue >= element.qty.gte){
                                     this.price = element.price                                    
                                    console.log("else",this.price,totalValue)
                                }
                            }
                        })
                    }
                })

                data.total_qty = totalValue
                data.unit_price = this.price
                data.color_quantity = this.productitem               
                data.color_quantity[name] = value
                console.log("this.productitem",data)
                // this.productitem = data.color_quantity

                if(this.price == ''){
                    this.$Notice.error({
                        title: 'Error',
                        desc: 'Please Enter Minimum Quantity of product.',
                        duration: 4.5
                    })
                }
                else{
                    this.modal2 = false;
                    // console.log(this.productData)
                    this.$emit('myemitter',data)
                    
                }                    
            },
            cancel () {
                this.modal2 = false
            },
        },
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
        mounted() {
                console.log("this 00000", this.row)   
                this.spinShow = false;     
                this.quntityFun(this.row)
            },
        watch: {
            'row': async function(id) {
                console.log("this.row 11111", this.row)
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
	    width: 83%;
	    margin-top: 15px;
    	margin-left: 30px;
    	table-layout: auto;
    	margin-bottom: 15px;
    }
    .editIcon:focus {
        box-shadow: none;
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