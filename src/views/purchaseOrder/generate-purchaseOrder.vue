
<template>
    <div>
        <div class="mainBody">
            <div class="po">
                <Card>
                    <h2 style="margin-top: 0px;text-align:center;"> PURCHASE ORDER </h2>
                    <Card :id="inx" class="mainClass" v-for="(item, inx) in this.poBillAddress" style="margin-bottom:20px">
                        <ButtonGroup slot="extra">
                            <Tooltip placement="top" content="Delete" style="padding-left:3px;">
                                <Button class="ButtonGroup" @click="deleteSupplierProduct(item)"   type="ghost" icon="trash-b"></Button>
                            </Tooltip>
                        </ButtonGroup>
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
                                <table class="invoice-head col-md-4">
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
                                        </tr> -->
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
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
                            </div>
                            <div class="row">
                                <div class="span8 well invoice-body" style="padding: 0px;border: none;">
                                    <Table stripe border :columns="columns1" :data="item.product" class="js_shipping"></Table>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <div style="padding: 35px;padding-top:10px;">
                    <Button type="primary" style="float:right;" :loading="loading" @click="generatePO">
                        Generate Purchase Order
                    </Button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../config/customConfig.js'
    import moment from 'moment';
    const accounting = require('accounting-js');
    let axios = require('axios');
    import Cookies from 'js-cookie';
    import expandRow from '../view-purchase-order-received.vue';
    export default {
        props: {
            row: Object,
            params: Object
        },
        data() {
            return {
                orderDetail: {},
                date: '',
                poBillAddress: {},
                columns1: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
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
                        render : (h , {row}) => {
                            return h('div', [
                                h('span', row.total_qty)
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
                    {
                        title: 'Action',
                        align: 'center',
                        render: (h, {row}) => {
                            return h('div', [
                                h('Tooltip', {
                                    props: {
                                    placement: 'top',
                                        content: 'Delete'
                                    },
                                    style:{
                                        float:'center',
                                        cursor:'pointer'
                                    }
                                }, [
                                    h('Button', {
                                        on: {
                                            click: () => {
                                                // alert('delete',row)
                                                console.log("row",row);
                                                this.removeSingleProduct(row)
                                            }
                                        }
                                    },[
                                        h('icon', {
                                            props: {
                                                type: "trash-b"
                                            }
                                        }, '')
                                    ])
                                ])
                            ])
                        }
                    }
                ],
                loading: false
                // spinShow : true, 
            }
        },
        methods: {
            splitProductAddress(orderData){
                let tempPOAddressBill=[];
                let products = orderData.products;
                let shippingIds = [];
                for (let index = 0; index < products.length; index++) {
                    const product = products[index];
                    let shipping_detail = product.shipping_method.shipping_detail
                    for (let sDIndex = 0; sDIndex < shipping_detail.length; sDIndex++) {
                        const shipingDetail = shipping_detail[sDIndex];
                        let shipAddId = shipingDetail.selected_address_id
                        let productColor = shipingDetail.color_quantity
                        let tempProdut = product;
                        tempProdut.color_quantity = productColor
                        if(shippingIds.indexOf(shipAddId)<0){
                            let tempObj= {
                                product:[tempProdut],
                                selected_address_id:shipAddId,
                                shipping_address:shipingDetail.shipping_address,shipping_detail:shipingDetail.shipping_detail
                            };
                            tempPOAddressBill.push(tempObj)
                        }else{
                            let billIndex= _.findIndex(tempPOAddressBill, function(o) { return o.selected_address_id == shipAddId; });
                            tempPOAddressBill[billIndex].product.push(tempProdut)
                        }
                        shippingIds.push(shipAddId);
                    }
                }
                console.log("Temp",tempPOAddressBill)
                return tempPOAddressBill;
            },
            accounting(item){
                return accounting.formatMoney(item)
            },
            removeSingleProduct(product) {
                console.log("before delete data2",this.data2)                
                this.data2 = this.data2.filter( (item) => item.id !== product.id)
                console.log("after delete data2",this.data2)
                // this.poBillAddress.product = this.data2;
                this.orderDetail.products = this.data2
                console.log("this.poBillAddress",this.orderDetail)
            },
            deleteSupplierProduct(supplier) {
                console.log("supplier------------=============",supplier);
                console.log("this.data2-------",this.data2);
                if (supplier.product) {
                    supplier.product.forEach((product) => {
                        this.data2 = this.data2.filter( (item) => item.id !== product.id)
                    })
                }
                this.orderDetail.products = this.data2
                console.log("final order object",this.orderDetail)
            },
            generatePO() {
                let self = this;
                this.loading = true;
                this.orderDetail.subscription_id = Cookies.get("subscriptionId");
                this.orderDetail.isManual = true;
                console.log("purchase order post object",this.orderDetail)
                if (this.orderDetail.products.length > 0) {
                    axios({
                        method: 'post',
                        url: config.default.serviceUrl + 'purchase-order',
                        data: this.orderDetail
                    })
                    .then(function(response) {
                        self.loading = false
                        console.log("purchase order post response------------------",response)
                        self.$Message.success("Purchase Order Generated Successfully");
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
            console.log("********************///////////////////////",this.orderDetail);
            if(this.orderDetail) {
                // let poDetail=poData[0]
                self.date = moment().format('DD-MMM-YYYY')  
                self.poBillAddress = self.splitProductAddress(this.orderDetail);
                self.data1 = this.orderDetail;
                self.data2 = this.orderDetail.products;
                // console.log("data2", self.data2)
            }else{
                
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