<template>
    <div>
        <div class="po">
            <Card>
                <h2 style="margin-top: 0px;text-align:center;"> PURCHASE ORDER </h2>
                <Card :id="inx" class="mainClass" v-for="(item, inx) in this.poBillAddress" style="margin-bottom:20px">
                    <!--<ButtonGroup slot="extra">
                        <Tooltip placement="top" content="Delete" style="padding-left:3px;">
                            <Button class="ButtonGroup" @click="deleteSupplierProduct(item)"   type="ghost" icon="trash-b"></Button>
                        </Tooltip>
                    </ButtonGroup>-->
                    <div class="dweep" style="padding: 40px 10px 10px 10px;">
                        <div class="row well">
                            <table class="invoice-head col-md-8">
                                <tbody>
                                    <tr>
                                        <td><strong>VENDOR :</strong></td>                                            
                                        <td>{{item.product[0].product_description.supplier_info.supplier_name}}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><Icon type="ios-email" size="15"></Icon>   {{item.product[0].product_description.supplier_info.email}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- <table class="invoice-head col-md-4">
                                <tbody>
                                    <tr>
                                        <td><strong>SHIP TO :</strong></td>
                                        <td>{{item.shipping_address.name}}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <span>{{item.shipping_address.street1}}</span>
                                            <span v-if="item.shipping_address.street2">,{{item.shipping_address.street2}}</span>
                                            <span v-else></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>{{item.shipping_address.city}},{{item.shipping_address.state}}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>{{item.shipping_address.country}} {{item.shipping_address.postalcode}}</td>
                                    </tr>
                                    <!-- <tr>
                                        <td></td>
                                        <td><Icon type="ios-telephone" size="15"></Icon>  {{i.shipping_address.phone}} </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><Icon type="ios-email" size="15"></Icon>  <span>{{i.shipping_address.email}} </span></td>
                                    </tr> 
                                </tbody>
                            </table> -->
                        </div>
                        <!-- <div class="row">
                            <table class="col-md-12 table table-bordered" style="text-align:center">
                                <thead>
                                    <tr>
                                        <td> <strong> METHOD </strong></td>
                                        <td> <strong>SHIPPING CARRIER </strong></td>
                                        <td> <strong>DELIVERY DATE </strong></td>
                                        <td> <strong>SHIPPING CHARGE </strong></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{item.shipping_detail.shipping_method}}</td>
                                        <td>{{item.shipping_detail.shipping_carrier}}</td>
                                        <td>{{item.shipping_detail.on_hand_date}}</td>
                                        <td>{{accounting(item.shipping_detail.shipping_charge)}}</td> 
                                    </tr>
                                </tbody>
                            </table>
                        </div> -->
                        <div class="row">
                            <div class="span8 well invoice-body" style="padding: 0px;border: none;">
                                <Table stripe border :columns="columns1" :data="item.product" class="js_shipping"></Table>
                                <!-- <modal v-model="modal2" width="40%">
                                    <p slot="header">
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
                                        <i-button type="primary" @click="onOk(productData,formValidate.value)">OK</i-button>
                                    </div>
                                </modal> -->
                            </div>
                        </div>
                    </div>
                </Card>
                <div style="padding: 35px;padding-top:10px;" v-if="!poRefreshed">
                <Button type="primary" style="float:right;" :loading="loading" @click="generatePO">
                    Generate Purchase Order
                </Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import config from '../../config/customConfig.js'
    import moment from 'moment';
    const accounting = require('accounting-js');
    let axios = require('axios');
    import Cookies from 'js-cookie';
    import psl from 'psl';
    import expandRow from '../view-purchase-order-received.vue';
    let _ = require('lodash');
    export default {
        props: {
            row: Object,
            params: Object
        },
        data() {
            return {
                poRefreshed: false,
                orderDetail: {},
                date: '',
                poBillAddress: [],
                modal2: false,
                productData: [],
                columns1: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            if($('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id') != undefined){
                                let cardIndex = $('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id');
                                let addressId = this.poBillAddress[cardIndex].selected_address_id
								return h(expandRow, {
									props: {
										row: params.row,
                                        total: cardIndex,
                                        editIcon: true,
                                        selected_address_id:addressId
									},
                                    on: {
                                        myemitter: (item) => {
                                            // alert(item);
                                            // console.log("item************",item, this.poBillAddress)
                                            // this.EditBanner(item)
                                            // this.poBillAddress[cardIndex].product[params.index].shipping_method.shipping_detail[cardIndex]["edited_color_quantity"]=item.color_quantity
                                            this.poBillAddress[cardIndex].product[params.index].total_qty = item.total_qty
                                            this.poBillAddress[cardIndex].product[params.index].unit_price = item.unit_price
                                            this.poBillAddress[cardIndex].product[params.index].edited_color_quantity = item.edited_color_quantity
                                            this.poBillAddress[cardIndex].product[params.index]._expanded = true
                                            // params.row.color_quantity = item.color_quantity
                                            // console.log("item************",this.poBillAddress)

                                        }    
                                    }
								})
							}
                            // return h(expandRow, {
                            //     props: {
                            //         row: params.row
                            //     }
                            // })
                        }
                    },
                    {
                        title: 'Item#',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.product_description.sku)
                            ]);
                        }
                    },
                    {
                        title: 'Product Name',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.product_description.product_name)
                            ]);
                        }
                    },
                    {
                        title: 'Quantity',
                        align:  'center',
                        render : (h , params) => {
                            // let total = 0
                            // // console.log("Quantity ------------", this.poBillAddress)
                            // this.poBillAddress.forEach(element => {
                            //     element.product.forEach((item,inx) => {
                            //         total = 0
                            //         item.totalColorQuantity.forEach((key,val) => {
                            //             if(inx == val) {
                            //                 // console.log("val",key, val)
                            //                 for (let k in key ){
                            //                     total = total + parseInt(key[k])
                            //                 } 
                            //                 // console.log("total",total)
                            //             }
                            //         })
                                    

                            //     })
                            //     // if (inx == params.index) {
                            //     //     // console.log("inside if", Object.values(element.totalColorQuantity))
                            //     //     Object.values(element.totalColorQuantity).forEach(item => {
                            //     //         total = total + parseInt(item)
                            //     //         // console.log("total", item)
                            //     //     })
                            //     // }
                            // })
                            // let t = 0;
                            // // console.log('parmas', params.row)
                            // for (let [inx, item] of params.row.totalColorQuantity.entries()) {
                            //     // console.log('', inx)
                            //     if (params.index === inx) {
                            //         // console.log('MATCH')
                            //         for (let k in item) {
                            //             t += parseInt(item[k]);
                            //         }
                            //     }
                            // } 
                            return h('div', [   
                                h('span', params.row.total_qty),
                            ]);
                        }
                    },
                    {
                        title: 'Unit Price',
                        align:  'center',
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', accounting.formatMoney(row.unit_price))
                            ]);
                        }
                    },
                    {
                        title: 'Total Amount',
                        align:  'center',
                        render : (h , {row}) => {
                            let total = accounting.formatMoney(row.total_qty * row.unit_price);
                            return h('div', [
                                
                                h('span',  total)
                            ]);
                        }
                    },
                    // {
                    //     title: 'Action',
                    //     align: 'center',
                    //     render: (h, {row}) => {
                    //         return h('div', [
                    //             h('Tooltip', {
                    //                 props: {
                    //                 placement: 'top',
                    //                     content: 'Delete'
                    //                 },
                    //                 style:{
                    //                     float:'center',
                    //                     cursor:'pointer'
                    //                 }
                    //             }, [
                    //                 h('Button', {
                    //                     on: {
                    //                         click: () => {
                    //                             // alert('delete',row)
                    //                             // console.log("row",row);
                    //                             this.removeSingleProduct(row)
                    //                         }
                    //                     }
                    //                 },[
                    //                     h('icon', {
                    //                         props: {
                    //                             type: "trash-b"
                    //                         }
                    //                     }, '')
                    //                 ])
                    //             ])
                    //         ])
                    //     }
                    // }
                ],
                loading: false
                // formValidate: {
                // 	value: ''
                // },
                // ruleInline: {
                //     value: [
                //         { required: true, message:  "Please Enter Quantity", trigger: 'blur' }
                //     ]
                // },
                // spinShow : true, 
            }
        },
        methods: {
            EditBanner (item) {
                // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', item)
            },
            splitProductAddress(orderData){
                let tempPOAddressBill=[];
                let products = orderData.products;
                let shippingIds = [];
                let productColor = [];
                for (let index = 0; index < products.length; index++) {
                    const product = products[index];
                    let shipping_detail = product.shipping_method.shipping_detail
                    // for (let sDIndex = 0; sDIndex < shipping_detail.length; sDIndex++) {
                        const shipingDetail = shipping_detail;
                        let shipAddId = shipingDetail.selected_address_id
                        productColor.push(shipingDetail.color_quantity)
                        // let tempProdut = product;
                        // tempProdut.totalColorQuantity = productColor
                        let tempObj= {
                            product:[product],
                            shipping_address:shipingDetail.shipping_address,
                            shipping_detail:shipingDetail.shipping_detail
                        };
                        tempPOAddressBill.push(tempObj)
                        // if(shippingIds.indexOf(shipAddId)<0){
                        // }else{
                        //     let billIndex= _.findIndex(tempPOAddressBill, function(o) { return o.selected_address_id == shipAddId; });
                        //     tempPOAddressBill[billIndex].product.push(tempProdut)
                        // }
                        // shippingIds.push(shipAddId);
                    // }
                }
                // console.log("Temp",tempPOAddressBill)
                return tempPOAddressBill;
            },                            
            accounting(item){
                return accounting.formatMoney(item)
            },
            removeSingleProduct(product) {
                // console.log("before delete data2",this.data2)                
                this.data2 = this.data2.filter( (item) => item.id !== product.id)
                // console.log("after delete data2",this.data2)
                // this.poBillAddress.product = this.data2;
                this.orderDetail.products = this.data2
                // console.log("this.poBillAddress",this.orderDetail)
            },
            deleteSupplierProduct(supplier) {
                // console.log("supplier------------=============",supplier);
                // console.log("this.data2-------",this.data2);
                if (supplier.product) {
                    supplier.product.forEach((product) => {
                        this.data2 = this.data2.filter( (item) => item.id !== product.id)
                    })
                }
                this.orderDetail.products = this.data2
                // console.log("final order object",this.orderDetail)
            },
            async generatePO(value) {
                let self = this;
                this.loading = true;
                this.orderDetail.subscription_id = Cookies.get("subscriptionId");
                this.orderDetail.isManual = true;
                // this.orderDetail.products = this.poBillAddress[0].product
                for(let i=0; i<this.poBillAddress.length; i++){
                    this.orderDetail.products[i] = this.poBillAddress[i].product[0]
                    delete this.orderDetail.products[i]._expanded;
                }
                let quantity = 0
                let total = 0
                this.orderDetail.products.forEach((item) => {
                    quantity = quantity + item.total_qty
                    total = total + (item.total_qty * item.unit_price)
                })

                this.orderDetail.quantity = quantity
                this.orderDetail.total = total
                this.orderDetail.distributor_email = Cookies.get("user");

                await axios ({
                    method: 'get',
                    url: config.default.serviceUrl + 'settings/' + this.orderDetail.setting_id,
                })
                .then(function(response){
                    // console.log("setting response",response)
                    self.orderDetail.distributor_info = {
                        address : response.data.address,
                        logo : response.data.logo
                    };
                })
                // console.log("purchase order post object",this.orderDetail, this.poBillAddress)
                if (this.orderDetail.products.length > 0) {
                    axios({
                        method: 'post',
                        url: config.default.serviceUrl + 'purchase-order',
                        data: this.orderDetail
                    })
                    .then(function(response) {
                        self.loading = false
                        // console.log("purchase order post response------------------",response)
                        self.$Message.success("Purchase Order Generated Successfully");
                        self.$router.push({
                            name: 'Sent PO'
                        });
                    })
                    .catch(function(error) {
                        self.loading = false
                    })
                }
                else {

                }
            }
           
        },
        filters: {
            
        },
        mounted() {
            let self = this;
            this.orderDetail = this.$route.params;
            if(!(_.isEmpty(this.orderDetail))) {
                self.poRefreshed = false;
                // console.log("********************///////////////////////",this.orderDetail);
                // let poDetail=poData[0]
                self.date = moment().format('DD-MMM-YYYY')  
                self.poBillAddress = self.splitProductAddress(this.orderDetail);
                self.data1 = this.orderDetail;
                self.data2 = this.orderDetail.products;
                // console.log("poBillAddress poBillAddress", self.poBillAddress)
            }else{
                // console.log("inside else")
                self.poRefreshed = true;
            }
        }
    }
</script>

<style lang="less">
    .invoice-head td {
        padding: 0 8px;
    }
    .invoice-body{
        background-color:transparent;
    }
    .invoice-thank{
        margin-top: 60px;
        padding: 5px;
    }
    address{
        float: right;
        margin-top: -75px;
    }
    .invoice-head {
        display: inline-block;
    }
</style>