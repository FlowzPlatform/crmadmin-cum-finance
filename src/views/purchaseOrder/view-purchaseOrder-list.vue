<template>
    <div>
        <Card>
            <Collapse  accordion>
                <Panel name="1">
                    User Information
                    <p slot="content">
                        <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12"> 
                            <h4>{{row.user_billing_info.name}}</h4> 
                            <p>
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
                            <ul class="ulList">
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
                        <Table stripe border :columns="columns1" :data="data1"></Table>
                    </p>
                </Panel>
            </Collapse>
        </Card>
    </div>
</template>
<script>
const accounting = require('accounting-js');
import purchaseOrder from '../purchase-order-received.vue';
import expandRow from './view-purchaseOrder-list-Product.vue';
export default {
    name: 'view-purchaseOrder-list',
    props: {
        row: Object
    },
    components:{
        purchaseOrder
    },
    data() {
        return {
            // value1: '1',
            imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
            data1: [],
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
                    title: 'Product Image',
                    align:  'center',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: this.getImgUrl(params.row.product_description.default_image)
                                },
                                style: {
                                    width:'75px',
                                    margin: '2px'
                                }
                                }, '')
                        ]);
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
                    title: 'Supplier Name',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            
                            h('span', row.product_description.supplier_info.supplier_name)
                        ]);
                    }
                },
                {
                    title: 'Supplier Email',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            h('span',  row.product_description.supplier_info.email)
                        ]);
                    }
                },
                {

                    title: 'Supplier Company',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            h('span',  row.product_description.supplier_info.company)
                        ]);
                    }
                },
                {
                    title: 'Action',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                placement: 'top',
                                content: 'Resend Email'
                                },
                                style:{
                                // float:'left',
                                cursor:'pointer'
                                }
                            },[
                                h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'large',
                                    icon: 'android-send'
                                },
                                style: {
                                    marginRight: '3px',
                                    padding: '0px',
                                    fontSize: '20px',
                                    color: '#2d8cf0'
                                },
                                on: {
                                    click: () => {
                                        this.resendEmail(params.row)
                                    }
                                }
                            }, '')
                            ])
                        ]);
                    }
				}
            ],
        }
    },
    methods:{
        resendEmail (data) {
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",data)
            },
        getImgUrl (url) {
                return this.imgurl + url
            }
    },
    mounted(){
        console.log("@@@@@@@@@@@@@@@@@@@@@-------->",this.row)
        this.data1 = this.row.products
    } 
}
</script>
<style>
.ivu-table-cell{
    word-break: break-word;
}
</style>

