<template>
  <div>
      <Table stripe border :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
const accounting = require('accounting-js');
import purchaseOrder from '../purchase-order-received.vue';
import expandRow from './view-purchaseOrder-list-Product.vue';
import Cookies from 'js-cookie';
import config from '../../config/customConfig.js'
import axios from 'axios';
import psl from 'psl';

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
                    title: 'Product Image',
                    align:  'center',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: this.getImgUrl(params.row.product_description)
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
                        // let total = accounting.formatMoney(row.total_qty * row.unit_price);
                        return h('div', [
                            
                            h('span',  this.row.total_amount)
                        ]);
                    }
                }
            ],
        }
    },
    methods:{
        getImgUrl (product) {
            let ProductImage = config.default.productImageUrl;
            if (product.images != undefined) {
                ProductImage = product.images[0].images[0].secure_url;
            }
            return ProductImage;
        }
    },
    mounted(){
        console.log("@@@@@@@@@@@@@@@@@@@@@-------->",this.row)
        this.data1 = this.row.products
    } 
}
</script>