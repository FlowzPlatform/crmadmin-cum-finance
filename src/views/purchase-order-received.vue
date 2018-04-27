<template>
    <div>
        <div class="mainBody">
            <!-- <vue-particles color="#dedede"></vue-particles> -->
            <div class="po">
                <Card class="container">
                    <h1 style="margin-top: 0px;text-align:center;"> PURCHASE ORDER </h1>
                    <div class="row">
                        <div class="container-fluid">
                            <img src="../images/flowz-logo1.png" class="img-rounded logo" style="height:70px">
                            <table style="position: relative;float: right;width: 20%;">
                                <tbody>
                                    <tr>
                                        <td style="font-size: 20px;font-weight: 700;">Flowz Digital, LLC  </td>
                                    </tr>
                                    <tr>
                                        <td>409 N. Pacific Coast Hwy, Ste. 583</td>
                                    </tr>
                                    <tr>
                                        <td>Redondo Beach, California</td>
                                    </tr>
                                    <tr>
                                        <td>USA 90277</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-12" style="margin-bottom: 20px;    margin-top: 20px;">
                            <div style="osition: relative;width: 80%;float: left;">
                                <label> Date : </label> {{this.date}}<br>
                                <label> PO : </label> {{this.data1.PO_id}} <br>
                            </div>
                            
                        </div>
                    </div>
                    <Card :id="inx" class="mainClass" v-for="(item, inx) in this.poBillAddress" style="margin-bottom:20px">
                        <div class="dweep" style="padding:10px">
                            <div class="row well">
                                <table class="invoice-head col-md-8">
                                    <tbody>
                                        <tr>
                                            <td><strong>VENDOR</strong></td>                                            
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
                                            <td><strong>SHIP TO</strong></td>
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
                                    <!-- <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Item#</th>
                                                <th>Description</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Lime Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Service request</td>
                                                <td>$2.05</td>
                                                <td>12</td>
                                                <td>$24.60</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Service</td>
                                                <td>$5.00</td>
                                                <td>10</td>
                                                <td>$50.00</td>
                                            </tr>
                                            <tr>
                                                <td colspan=3 rowspan=3 class="table12">&nbsp;</td>
                                                <td><strong>SUBTOTAL</strong></td>
                                                <td><strong>$74.60</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>SALETAX</strong></td>
                                                <td><strong>$25.40</strong></td>
                                            </tr><tr>
                                                <td><strong>TOTAL</strong></td>
                                                <td><strong>$100.00</strong></td>
                                            </tr>
                                        </tbody>
                                    </table> -->
                                </div>
                            </div>
                        </div>
                    </Card>
                    <div class="row">
                        <div class="span8 well invoice-thank">
                            <h5 style="text-align:center;">Thank You!</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <strong>Phone:</strong> <a href="tel:555-555-5555">310-294-9901</a>
                        </div>
                        <div class="col-md-4">
                            <strong>Email:</strong> <a href="mailto:hello@5marks.co">support@flowz.com</a>
                        </div>
                        <div class="col-md-4">
                            <strong>Website:</strong> <a href="http://5marks.co">https://www.flowz.com/</a>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config/customConfig'
import Cookies from 'js-cookie';
import moment from 'moment';
import expandRow from './view-purchase-order-received.vue';
const accounting = require('accounting-js');
    let _ = require('lodash');



export default {
  name: 'purchase-order',
  data () {
  return {
        columns1: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
							// console.log('rowwwwwwwwwwwwww-------Expand', $(this).attr("class"))
							//console.log("++++",$('.dweep').parent('div').parent(".mainClass"))
							// console.log("&&&&&&&&&&&",$(this).parent("div").parent('table').attr("style"))
							// let card =  $(this).closest('.mainClass').attr('id'); 
							if($('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id') != undefined){
								console.log("***",$('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id'))
								let cardIndex = $('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id');
								return h(expandRow, {
									props: {
										row: params.row,
										total: cardIndex
									}
								})
							}
							//console.log('...........')
							// if (this.poBillAddress[params.index].product) {
								// total = this.poBillAddress[params.index].product.length
								// for (let i = 0; i < total; i++ ) {
								// 	$('#description'+i).css('display', 'none');
								// }
							// }
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
                    }
                ],
                data2: [],                
                data1: {},
                moment: moment,
                date: '',
                poBillAddress:[]
    }
  },
  methods: {			
		init (){
			var self = this
			// console.log("config.default.orderapi", config.default.orderapi)
			axios({
				method: 'get',
				url: 'http://172.16.230.61:3037/purchase-order',
				params: {
					"PO_id[$eq]" : self.$route.query.PO_id
					// user : Cookies.get('user')
				},
				headers: {
				'Authorization': Cookies.get('auth_token'),
				'subscriptionId': Cookies.get('subscriptionId')
				} 
			}).then(function (response){
				console.log("------------------------response",response.data);

				let poData=response.data.data;
					if(poData && poData.length>0){
						let poDetail=poData[0]
						self.date = moment(poDetail.PO_generate_date).format('DD-MMM-YYYY')  
						self.poBillAddress  =self.splitProductAddress(poDetail);
						self.data1 = poDetail                   
						self.data2 = poDetail.products
						console.log("data2", self.data2)
					}else{
							
					}
			}).catch(error => {
				console.log("-------",error);
				if(error.message == 'Network Error') {
					self.$Notice.error({
						title: "Error",
						desc: 'API service unavailable',
						duration: 10
					})
				}else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
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
		},
		splitProductAddress(orderData){
			let tempPOAddressBill=[];
			let products=orderData.products;
			let shippingIds=[];
			for (let index = 0; index < products.length; index++) {
				const product = products[index];
				let shipping_detail=product.shipping_method.shipping_detail
				for (let sDIndex = 0; sDIndex < shipping_detail.length; sDIndex++) {


					const shipingDetail = shipping_detail[sDIndex];
					let shipAddId=shipingDetail.selected_address_id
					let productColor = shipingDetail.color_quantity
					let tempProdut=product;
					tempProdut.color_quantity=productColor
					if(shippingIds.indexOf(shipAddId)<0){
						let tempObj={
							product:[tempProdut],
							selected_address_id:shipAddId,
							shipping_address:shipingDetail.shipping_address,shipping_detail:shipingDetail.shipping_detail}
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
      	// viewDetails(params,status){
		// 	if (!status) return
		// 	$('.ivu-table-cell-expand-expanded').click()
		// },
        accounting(item){
            return accounting.formatMoney(item)
        },
  },
  mounted(){
      console.log("this.$route.params.id", this.$route.query.PO_id)
      this.init()
      
  }
}
</script>


<style lang="less">
    .mainBody {
        margin: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: #364150;
        overflow: auto;
    }
    .po {
        position: absolute;
        top: 0%;
        left: 12%;
    }
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