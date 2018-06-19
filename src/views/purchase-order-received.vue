<template>
	<div>
		<div v-if="!showError" class="mainBody">
			<!-- <vue-particles color="#dedede"></vue-particles> -->
			<div class="po">
				
				<Card class="container">
					<h1 style="margin-top: 0px;text-align:center;" ref="purchaseOrderLable"> PURCHASE ORDER </h1>
					<div class="row"  ref="distributorDetail">
						<div class="container-fluid" v-if="data1.distributor_info">
							<img :src="data1.distributor_info.logo" class="img-rounded logo" style="height:70px">
							<table style="position: relative;float: right;width: 20%;" v-if="data1.distributor_info.address">
								<tbody>
									<tr>
										<td style="font-size: 20px;font-weight: 700;">{{data1.distributor_info.address.name}}  </td>
									</tr>
									<tr>
										<td>{{data1.distributor_info.address.AddressLine1}} , {{data1.distributor_info.address.AddressLine2}}</td>
									</tr>
									<tr>
										<td>{{data1.distributor_info.address.city}}, {{data1.distributor_info.address.state}}</td>
									</tr>
									<tr>
										<td>{{data1.distributor_info.address.country}} {{data1.distributor_info.address.PostalCode}}</td>
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
					<div class="row well" style="margin-right: 0px;margin-left: 0px; border:0px;"> 
						<table class="invoice-head col-md-8" >
							<tbody>
								<tr>
									<td><strong>VENDOR</strong></td>                                            
									<td>{{this.poBillAddress[0].product[0].product_description.supplier_info.supplier_name}}</td>
								</tr>
								<tr>
									<td></td>
									<td><Icon type="ios-email" size="15"></Icon>   {{this.poBillAddress[0].product[0].product_description.supplier_info.email}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<Card  :id="inx" class="mainClass" v-for="(item, inx) in this.poBillAddress" style="margin-bottom:20px">
						<div style="padding:10px">
							<!-- <div class="row well" v-show="inx==0">
								<table class="invoice-head col-md-8" >
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
								</table> -->
								<!-- <table class="invoice-head col-md-4">
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
										<tr>
											<td></td>
											<td><Icon type="ios-telephone" size="15"></Icon>  {{i.shipping_address.phone}} </td>
										</tr>
										<tr>
											<td></td>
											<td><Icon type="ios-email" size="15"></Icon>  <span>{{i.shipping_address.email}} </span></td>
										</tr> 
									</tbody>
								</table> -->
							<!-- </div> -->
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
								</div>
							</div>
						</div>
					</Card>
					<!-- Payment config -->
					<div class="row">
						<div class=" col-md-12">
							<div class="well" style="background-color:#fff">
								<label> Payment Options : </label>
								<Tooltip style="float:right;margin-left: 15px;" placement="top">
									<Icon  type="ios-help-outline" size=28></Icon>
									<div slot="content">
										<p>You can configure payment gateway <br/>here which will be used  while pay <br/> the Bill from the distributor. <br/> In case of multiple accounts, the <br/> default selected one will be used. <br/></p>
									</div>
								</Tooltip>
								<Button type="primary" @click="clicked()" style="float:right">Add New Payment Configuration</Button>
								<div style="float:left; width:100%;">
									<div class="online_payment" style="display:none">
										<div class="" style="margin-top: 20px;">
											<Form class="form" label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
												<FormItem label="Account Name" prop="Account_Name">
													<Input v-model="formValidate.Account_Name" placeholder="Enter Account Name"></Input>
												</FormItem>
												<FormItem label="Gateway" prop="gateway">
													<Select v-model="formValidate.gateway" style="width:100%;text-align:left">
													<Option  value='auth'>Authrize.Net</Option>
													<Option  value='paypal'>PayPal</Option>
													<Option value='stripe'>Stripe</Option>
													</Select>
												</FormItem>
												<FormItem label="Secret key" v-if="formValidate.gateway == 'stripe'" prop="Secret_Key">
													<Input v-model="formValidate.Secret_Key" placeholder="Enter Secret key"></Input>
												</FormItem>
												
												<FormItem label="Transaction Key" v-if="formValidate.gateway == 'auth'" prop="Transaction_Key">
													<Input v-model="formValidate.Transaction_Key" placeholder="Enter Transaction Key"></Input>
												</FormItem>
												<FormItem label="Signature Key" v-if="formValidate.gateway == 'auth'" prop="Signature_Key">
													<Input v-model="formValidate.Signature_Key" placeholder="Enter Signature Key"></Input>
												</FormItem>
												<FormItem label="Client Id" v-if="formValidate.gateway == 'paypal'" prop="Client_Id">
													<Input v-model="formValidate.Client_Id" placeholder="Enter Client Id"></Input>
												</FormItem>
												<FormItem label="Secret" v-if="formValidate.gateway == 'paypal'" prop="Secret">
													<Input v-model="formValidate.Secret" placeholder="Enter Secret"></Input>
												</FormItem>
												
												<div style="text-align:center;">
													<Button type="primary" @click="handleSubmit('formValidate')" :loading="loading">Submit</Button>
													<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px;">Reset</Button>
												</div>
											</Form>
										</div>
									</div>
								</div>
								<div v-if="this.data2.length>0" class="payment_table" style="margin-top: 20px; float:left;">
									<Tabs :value="tabIndex"  @on-click="setTabValue">
										<TabPane v-for="(v, k) in this.data2[0].online_payment" v-if="v.length > 0" :label="keyName(k)" >
											<div class="schema-form ivu-table-wrapper">
												<div class="ivu-table ivu-table-border">
													<div v-if="v.length > 0" class="ivu-table-body">
														<table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
															<thead>
																<tr>
																	<th class="" v-for="(value, key) in v[0]" v-if="key !== 'isDeleted'">
																		<div class="ivu-table-cell">
																			<span>{{key}}</span>
																		</div>
																	</th>
																	<th class="ivu-table-column-center">
																		<div class="ivu-table-cell"><span>Action</span>
																		</div>
																	</th>
																</tr>
															</thead>
															<tbody class="ivu-table-tbody">
																<tr class="ivu-table-row" v-for="(row, i) in v" v-if="row.isDeleted == false">
																	<td class="" v-for="(val, key) in row" v-if="key !== 'isDeleted'">
																			<div class="ivu-table-cell" v-if="key === 'isDefault' && val === true" style="text-align:left">
																				<Checkbox label="" v-model="checked" disabled></Checkbox>
																			</div>
																			<div class="ivu-table-cell" v-else-if="key === 'isDefault' && val === false"  style="text-align:left">
																				<Checkbox label="" v-model="unchecked" disabled></Checkbox>
																			</div>
																			<div class="ivu-table-cell" v-else>
																				{{row[key]}}
																			</div>
																	</td>
																	<td class="ivu-table-column-center" style="padding:3px;">
																		<div class="ivu-table-cell">
																		<Tooltip content="Edit" placement="top">
																			<Button class="ButtonGroup" @click="handleEdit(k, i)" type="ghost" icon="edit"></Button>
																			
																		</Tooltip>
																		<Tooltip content="Remove" placement="top">
																			<Button class="ButtonGroup" @click="handleDelete(k, i)" type="ghost" icon="android-delete"></Button>
																			
																		</Tooltip>
																		</div>
																	</td>
																</tr>
																
															</tbody>
														</table>
													</div>
													<div v-else class="ivu-table-tip" style="display: none;">
														<table cellspacing="0" cellpadding="0" border="0">
															<tbody>
																<tr>
																	<td><span>No Data</span></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</TabPane>
									</Tabs>
								</div>
								<div class="clearfix"></div>
							</div>
							
						</div>        
					</div>
					<!-- Generate Invoice -->
					<div style="padding-left:15px;padding-right:15px;">
						<div class="row well" style="background-color:#fff">
							<table class="col-md-6">
								<tbody>
									<tr>
										<td><strong>Shipping Charges : </strong></td>                                            
										<td><Input v-model="shippingCharge" placeholder="Enter Shipping Charges..." style="width: 215px;margin-left: 25px;" @on-change="calculateAmount"></Input></td>
									</tr>
									<tr>
										<td><strong>Due Date of Bill :</strong></td>
										<td><DatePicker v-model="dueDate" :options="options3" type="date" placeholder="Select date" placement="right" style="width: 215px;margin-top: 10px;margin-left: 25px;"></DatePicker></td>
									</tr>
									<tr>
										<td><strong>Total Amount :</strong></td>
										<td><Input v-model="total" placeholder="Total Amount" style="width: 215px;margin-top: 10px;margin-left: 25px;"></Input></td>
									</tr>
								</tbody>
							</table>
							<table class="col-md-6">
								<tbody style="float:right;">
									<tr>
										<td><strong>Shipping Method : </strong></td>
										<td><Input v-model="shippingMethod" placeholder="Enter Shipping Method..." style="width: 215px;margin-left: 25px;"></Input></td>
									</tr>
									<tr>
										<td><strong>Special Instruction :</strong></td>
										<td><Input v-model="note" type="textarea" placeholder="Enter Special Instructions..." style="width: 215px;margin-left: 25px;margin-top:10px;"></Input></td>
									</tr>
									<!-- <tr>
										<td></td>
										<td><Button type="success" v-if="!invoiceBillGenerated" @click="generateInvoice()" style="float:right;margin-top:10px;">Generate Invoice</Button>
											<Button type="success"v-else @click="generateInvoicePDF()" style="float:right;margin-top:10px;">Download Bill PDF</Button>
										</td>
										<td><Button type="success" @click="generatePDF()" style="float:right;margin-top:10px; margin-left:10px;">Show PDF</Button></td>
									</tr> -->
								</tbody>
							</table>
							<!--<label>Shipping Charges : </label>
							<Input v-model="shippingCharge" placeholder="Enter Shipping Charges..." style="width: 215px;margin-top: 10px;margin-left: 25px;"></Input>
							<div style="float:right;">
								<label>Shipping Method : </label>
								<Input v-model="shippingMethod" placeholder="Enter Shipping Method..." style="width: 215px;"></Input>
							</div>
							<br/>
							<label> Due Date of Invoice : </label>
							<DatePicker v-model="dueDate" type="date" placeholder="Select date" placement="right" style="width: 215px;margin-top: 10px;margin-left: 25px;"></DatePicker>
							<div style="float:right;">
								<label>Special Instruction : </label>
								<Input v-model="note" type="textarea" placeholder="Enter Special Instructions..." style="width: 215px;"></Input>
							</div>
							<br/>
							<label>Total Amount : </label>
							<Input v-model="total" placeholder="Total Amount" style="width: 215px;margin-top: 10px;margin-left: 25px;"></Input>
							<Button type="success" @click="generateInvoice()" style="float:right;margin-right: 0px;">Generate Invoice</Button>
							<div class="clearfix"></div>-->							
						</div>
					</div>
					<div class="row well" style="background-color:#fff;border: 0px;box-shadow: none;padding:0px; padding-right:19px;">
						<table style="float:right;">
							<tbody>
								<tr>
									<td><Button type="success"  v-if="!invoiceBillGenerated" @click="generateInvoice()" style="float:right;margin-top:10px;">Generate Bill</Button>
										<Button type="success" v-else @click="generateBillPDF()" style="float:right;margin-top:10px;">Download Bill PDF</Button>
									</td>
									<td><Button type="success" @click="generatePDF()" style="float:right;margin-top:10px; margin-left:10px;">Download Purchase Order</Button></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="row">
						<div class="span8 well invoice-thank" style="margin-bottom:0px;margin-top:15px">
							<h5 style="text-align:center;">Thank You!</h5>
						</div>
					</div>
					<!-- <div class="row">
						<div class="col-md-4">
							<strong>Phone:</strong> <a href="tel:555-555-5555">310-294-9901</a>
						</div>
						<div class="col-md-4">
							<strong>Email:</strong> <a href="mailto:hello@5marks.co">support@flowz.com</a>
						</div>
						<div class="col-md-4">
							<strong>Website:</strong> <a href="http://5marks.co">https://www.flowz.com/</a>
						</div>
					</div> -->
				</Card>
			</div>
		</div>
		<errorpage v-else></errorpage>
		
        <Modal
            v-model="modal1"
            width="59%"
			:closable=false
            ok-text= "Download PDF"
            @on-ok="download"
            @on-cancel="cancel">
            <downloadOrderList id="orderList" :row="data1"></downloadOrderList>
		</Modal>
		
		<Modal
			v-show="invoiceModel"
			v-model="invoiceModel"
			title="Purchase Order Bill"
			width="59%"
			ok-text= "Download PDF"
			@on-ok="downloadBillInvoice"
			@on-cancel="cancelBillInvoice">
			<downloadPoBillList id="invoiceBillList" :row="invoiceBillObject"></downloadPoBillList>
		</Modal>
	</div>
</template>

<script>
	import axios from 'axios'
	import psl from 'psl';
	import config from '../config/customConfig'
	import Cookies from 'js-cookie';
	import moment from 'moment';
	import expandRow from './view-purchase-order-received.vue';
	import errorpage from './error-page/404.vue'
	import downloadOrderList from './download-po.vue';
	import downloadPoBillList from './download-po-bill.vue';
	const accounting = require('accounting-js');
	let _ = require('lodash');

	export default {
		name: 'purchase-order',
		components: {errorpage,downloadOrderList,downloadPoBillList},
		data () {
			return {
				columns1: [
					{
						type: 'expand',
						width: 50,
						render: (h, params) => {
							if($('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id') != undefined){
								console.log("***",$('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id'))
								let cardIndex = $('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id');
								let addressId = this.poBillAddress[cardIndex].selected_address_id
								return h(expandRow, {
									props: {
										row: params.row,
										total: cardIndex,
										editIcon: false,
										selected_address_id: addressId
									}
								})
							}
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
				 options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
				data2: [], 
				showError: false,               
				data1: {},
				moment: moment,
				date: '',
				poBillAddress:[],
				loading: false,
				checked: true,
				tabIndex : 0,
				dueDate: '',
				shippingCharge: 0,
				shippingMethod: '',
				note: '',
				total: 0,
				unchecked: false,
				modal1:false,
				invoiceModel:false,
				invoiceBillObject:{},
				invoiceBillGenerated:false,
				formValidate: {
					Account_Name: '',
					gateway:'',
					Secret_Key: '',
					Transaction_Key: '',
					Signature_Key: '',
					Client_Id: '',
					Secret: ''
				},
				ruleValidate: {
					Account_Name: [
						{ required: true, message: 'Please Enter Account Name', trigger: 'blur' }
					],
					gateway: [
						{ required: true, message: 'Please select gateway', trigger: 'blur' }
					],
					Secret_Key: [
						{ required: true, message: 'The Secret_Key cannot be empty', trigger: 'blur' }
					],
					Transaction_Key: [
						{ required: true, message: 'The Transaction_Key cannot be empty', trigger: 'blur' }
					],
					Signature_Key: [
						{ required: true, message: 'The Signature_Key cannot be empty', trigger: 'blur' }
					],
					Client_Id: [
						{ required: true, message: 'The Client_Id cannot be empty', trigger: 'blur' }
					],
					Secret: [
						{ required: true, message: 'The Secret cannot be empty', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			dummyData(){
				return {"PO_id":"PO_36e76_7a053_457c0_1","shippingCharges":"50","shippingMethod":"UPS","specialInstruction":"Special Instruction for shipping methods and facility","createdAt":"Wed May 23 2018 11:22:48 GMT+00:00","distributorId":"5a8592331b23f5001257a039","distributor_email":"dweepp@officebrain.com","dueDate":"2018-05-14T18:30:00.000Z","id":"09f7f6be-10cb-42ac-8576-5e86b7ba7e6e","invoiceId":"INV_PO_36e76_18-14","orderId":"Hir-2018-14","paymentInfo":{"stripe":{"Account_Name":"One","Secret_Key":"sk_test_V8ZICJodc73pjyGVBBzA0Dkb","isDefault":true,"isDeleted":false}},"products":[{"charges":{"setup_charge":"45"},"color":{"Translucent Clear":"200"},"color_quantity":{"Translucent Clear":"200"},"createdAt":"2018-05-02T07:06:05.178Z","id":"fe50b196-a226-4e63-9449-98f7efcf592a","imprint":[{"artwork":{"artwork_instruction":"test","artwork_text":["test"]},"artwork_type":"typeset","imprint_method_name":"4 Color Process","imprint_position_name":"Side 1"}],"order_type":"decorative","product_description":{"activeSummary":"Translucent Clear,Translucent Red,Translucent Blue,Translucent Green,Translucent Purple,2,Pricing Includes,Full color printing using four-color process colors (cyan, magenta, yellow and black) on one side. Images and type should be in CMYK. Additional art charges will apply to convert colors. Exact PMS matches are not possible. Neon and metallics are not available.,Setup Charge,Add $45.00 (G) for new orders. No initial set-up charge on exact reorders.,Change Copy,$35.00 (G) per change. Must be at least 1/2 of the lowest quantity offered.,Multi Color,Full color digital printing included in price.,Less Than Minimum,Not available.,Proof,E-Proof $10.00 (G) each, Fax Proof $12.50 (G) each, Product Proof $35.00 (G) each (suggested when color matching is critical). Artwork charges are additional if required.,Additional Artwork,The first 1/2 hour is FREE! Additional time will be charged $35.00 (G) per hour.,Second Side Print,Not Available,Variable Data,Add $.05(G)per item, per location.,Imprint Colors,Full Color Digital printing using four-color process colors (CMYK). On colored products, there may be a slight variation in the imprint.,FOB,NY,Imprint Area,5-1/2\" Diameter,Shipping Weight,Approx. 18 lbs. per 100 pcs.,Packaging,250 per box.,Flyer Inserts,Full Color Digital Flyer Inserts (that fit in back of flyers) are available with custom or stock designs. See item #45950.,Size,9\" Diameter","attr_imprint_color":"","attr_shape":"","attributes":{"colors":["Translucent Clear","Translucent Red","Translucent Blue","Translucent Green","Translucent Purple"],"decimal":["2"]},"available_currencies":["USD","CAD","AUD"],"available_regions":["US","AU"],"categories":["FLYERS","COASTERS"],"company":"","country":"US","currency":"USD","default_color":"Translucent Clear","default_image":"5/80-45905-translucent-clear.jpg","default_image_color_code":"","description":"<ul class=\"productFeature\" style=\"border: 0px; list-style: none; text-decoration: none; margin: 6px 0px 0px 6px; padding: 0px; color: #2c302f; font-size: 12px; font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant: normal; font-weight: bold; letter-spacing: normal; line-height: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff;\">\n<li style=\"border: 0px; list-style: disc inside; text-decoration: none; margin: 0px; padding: 0px 0px 3px 3px;\">9\" Translucent Flyer, Full Color Digital</li>\n<li style=\"border: 0px; list-style: disc inside; text-decoration: none; margin: 0px; padding: 0px 0px 3px 3px;\">9\" Diameter</li>\n<li style=\"border: 0px; list-style: disc inside; text-decoration: none; margin: 0px; padding: 0px 0px 3px 3px;\">High quality translucent plastic</li>\n</ul>","distributor_central_url":"http://www.distributorcentral.com/resources/templates/freight_estimate.cfm?SupplierItemGUID=22DDF7E0-A059-4E0E-BB17-51F3EE91D097","features":[{"key":"Pricing Includes","value":"Full color printing using four-color process colors (cyan, magenta, yellow and black) on one side. Images and type should be in CMYK. Additional art charges will apply to convert colors. Exact PMS matches are not possible. Neon and metallics are not available."},{"key":"Setup Charge","value":"Add $45.00 (G) for new orders. No initial set-up charge on exact reorders."},{"key":"Change Copy","value":"$35.00 (G) per change. Must be at least 1/2 of the lowest quantity offered."},{"key":"Multi Color","value":"Full color digital printing included in price."},{"key":"Less Than Minimum","value":"Not available."},{"key":"Proof","value":"E-Proof $10.00 (G) each, Fax Proof $12.50 (G) each, Product Proof $35.00 (G) each (suggested when color matching is critical). Artwork charges are additional if required."},{"key":"Additional Artwork","value":"The first 1/2 hour is FREE! Additional time will be charged $35.00 (G) per hour."},{"key":"Second Side Print","value":"Not Available"},{"key":"Variable Data","value":"Add $.05(G)per item, per location."},{"key":"Imprint Colors","value":"Full Color Digital printing using four-color process colors (CMYK). On colored products, there may be a slight variation in the imprint."},{"key":"FOB","value":"NY"},{"key":"Imprint Area","value":"5-1/2\" Diameter"},{"key":"Shipping Weight","value":"Approx. 18 lbs. per 100 pcs."},{"key":"Packaging","value":"250 per box."},{"key":"Flyer Inserts","value":"Full Color Digital Flyer Inserts (that fit in back of flyers) are available with custom or stock designs. See item #45950."},{"key":"Size","value":"9\" Diameter"}],"images":[{"Web_image_3":"","_id":"934a7ce2-17d7-11e8-bc23-2ddb89254a62","images":[{"color":"Translucent Clear","image_color_code":"","web_image":"80-45905-translucent-clear_1.jpg"},{"color":"Translucent Red","image_color_code":"","web_image":"80-45905-translucent-red.jpg"},{"color":"Translucent Green","image_color_code":"","web_image":"80-45905-translucent-green.jpg"},{"color":"Translucent Purple","image_color_code":"","web_image":"80-45905-translucent-purple.jpg"}],"import-tracker_id":"cbbd94f8-48df-4561-837b-e41ff53385b4","product_id":"418","sku":"80-45905"}],"import-tracker_id":"cbbd94f8-48df-4561-837b-e41ff53385b4","imprint_data":[{"_id":"6e347821-17d7-11e8-bc23-2ddb89254a62","additional_color_charge":"","additional_location_charge":"","full_color":"1","import-tracker_id":"cbbd94f8-48df-4561-837b-e41ff53385b4","imprint_area":"","imprint_data_range":[],"imprint_method":"4 Color Process","imprint_position":"Side 1","is_pms_color_allow":"1","location_price_included":1,"ltm_charge":"","matrix":"","max_imprint_color_allowed":0,"max_location_allowed":0,"pms_charge":"","price_included":0,"product_id":"418","production_days":"0","production_unit":"days","rush_charge":"","setup_charge":"45(G)","sku":"80-45905","type_of_charge":""}],"language":"en","linename":"AAkron Line","matrix_frieght":"","matrix_price":"","max_price":2.95,"min_price":3.35,"non-available_regions":[],"nonavailable_regions":"CA","packaging_charges":"","packaging_code":"","packaging_type":"","price_1":18.39,"pricing":[{"_id":"0e82f0f1-17d7-11e8-bc23-2ddb89254a62","currency":"USD","global_price_type":"above_catalog","import-tracker_id":"cbbd94f8-48df-4561-837b-e41ff53385b4","price_range":[{"code":"C","price":2.833,"qty":{"gte":5000,"lte":9999}},{"code":"C","price":2.75,"qty":{"gte":10000}}],"price_type":"regular","price_unit":"each","product_id":"418","sku":"80-45905","type":"decorative"},{"_id":"0e82f0f2-17d7-11e8-bc23-2ddb89254a62","currency":"USD","global_price_type":"global","import-tracker_id":"cbbd94f8-48df-4561-837b-e41ff53385b4","price_range":[{"code":"C","price":3.35,"qty":{"gte":200,"lte":499}},{"code":"C","price":3.15,"qty":{"gte":500,"lte":999}},{"code":"C","price":3.05,"qty":{"gte":1000,"lte":2499}},{"code":"C","price":2.95,"qty":{"gte":2500}}],"price_type":"regular","price_unit":"each","product_id":"418","sku":"80-45905","type":"decorative"}],"private":"","product_id":"418","product_name":"9\" Translucent Flyer, Full Color Digital","search_keyword":["9\"","Translucent","Flyer","Full","Color","Digital","Full Color Digital","Fun","9\" Translucent Flyer","Fitness & Safety","Flyers","8045905"],"shipping":[{"_id":"f9833db0-17d9-11e8-911f-3f76566caa00","carton_height":"","carton_length":"","carton_size_unit":"inches","carton_weight":"18","carton_weight_unit":"LBS","carton_width":"","fob_city":"Akron","fob_country_code":"US","fob_state_code":"NY","fob_zip_code":"14001","free_on_board":"NY 14001 US","import-tracker_id":"cbbd94f8-48df-4561-837b-e41ff53385b4","product_height":"","product_id":"","product_length":"9","product_size_unit":"inches","product_weight":"0.21","product_weight_unit":"LBS","product_width":"","shipping_qty_per_carton":250,"shipping_range":[{"qty":{"gte":1000,"lte":2000}}],"sku":"80-45905"}],"sku":"80-45905","special_price_valid_up_to":"2019-11-30","supplier":"","supplier_id":"5a8eaf141b23f5001257a053","supplier_info":{"company":"","email":"aakron@flowz.com","supplier_name":"Aakron","username":"5a8eaf141b23f5001257a053"},"username":"aakron@flowz.com","valid_up_to":"2019-11-30","vat":"","vat_unit":"","vid":["sup5a8eaf141b23f5001257a053-1","sup5a8eaf141b23f5001257a053-2","distad94a6fd-2014-4f9c-a1e8-673e8cc8cdb6-1","distad94a6fd-2014-4f9c-a1e8-673e8cc8cdb6-1","dist054364d4-3a0b-436a-8144-04cbffb0587d-1","dist054364d4-3a0b-436a-8144-04cbffb0587d-1","dist6f2157f7-52bd-4949-945e-19c35e1ddfd4-1","dist6f2157f7-52bd-4949-945e-19c35e1ddfd4-1",null,null,null,null,null,null,null,"distd8d7221c-7797-4abc-bdd3-4eadf5f17ae8-1","distec9363f2-4b81-4559-b27d-f125991d4c69-1","dist5bb39293-0ab0-40ff-9ee6-e06a702ad044-1",null,"dist1b4335fd-9478-468e-a733-f18c2821ccf2-1","distd7148887-74e9-4216-ac69-8c8c2c7bd298-1","distfade9061-6c43-4918-8a34-edbdfbe46e30-1","distfade9061-6c43-4918-8a34-edbdfbe46e30-1","distb7c68ae2-d0fa-4867-9623-14255c7aef9c-1","diste0825e50-bd9b-41d8-9da3-e649d1783400-1","distfade9061-6c43-4918-8a34-edbdfbe46e30-1","dist2fdb391a-9cd5-4d40-b647-3cf4d3ddc3b2-1","dist27a283f9-9140-434c-8b75-820a6bcfead0-1","distdd2e1dd3-9aa6-4f05-96d3-1970f8f9589f-1","dist5e2460e5-95ef-4ff2-9ae4-fbd3a9399032-1","dist9177e799-64a0-444d-919e-a5bf186dad1a-1","distbca1661d-087e-4050-ba69-b5137ab3a195-1","dista69b4724-a670-4ffe-869e-ab5aa3b16471-1","dist0acc50ae-91f0-4467-b72b-a9344768aede-1","dist4c97ee2d-6e42-4299-b8a6-d362d6e9ca58-1","dist4607f7df-0f77-4493-97f3-595a1a85cb95-1","dist02823715-2401-44a5-866c-1550394bec33-1","distd68bac81-7bd2-4dfa-9a4f-f02239524501-1","dist0c503695-437b-4052-b744-a86faaef863f-1","dist10c3c3ac-c5fb-45b2-84d6-13c7ae94be12-1","dist6f383830-1e25-48f0-b99b-8b48c65d695a-1"],"video_url":""},"product_id":"9f57a230-17da-11e8-a1bc-f349bccc39a5","shipping_method":{"shipping_detail":[{"color_quantity":{"Translucent Clear":"200"},"selected_address_id":"cf44202e-0bba-405a-9684-fce988251f4a","shipping_address":{"address_type":["shipping","billing"],"city":"Zavalla","country":"United States","culture":"en_us","email":"neelpatel@officebrain.com","name":"Neel Patel","phone":"545-655-9898","postalcode":"75980","state":"Texas","street1":"ABC"},"shipping_detail":{"on_hand_date":"05/08/2018","ship_date":"","ship_transittime":"4","shipping_carrier":"ups","shipping_charge":"42.17","shipping_method":"Ground"},"shipping_from":"shipping_book"}],"shipping_type":"standard"},"special_instruction":"test","total_qty":"200","type":"2","unit_price":"3.35","user_id":"59a9427ce4900900285ac278","website_id":"93219617816448cb812e0170fcab089a"}],"status":"pending","supplierId":"5a8eaf141b23f5001257a053","supplier_email":"aakron@flowz.com","total_amount":"757.17","websiteId":"93219617816448cb812e0170fcab089a","websiteName":"Hiral"}
			},
			calculateAmount () {
				console.log('this.shippingCharge',this.shippingCharge,typeof this.shippingCharge)
				if (this.shippingCharge > 0) {
					this.total = (parseFloat(this.data1.total) + parseFloat(this.shippingCharge)).toFixed(2);
					// this.total = parseFloat(this.total);
				}
				else {
					this.total = parseFloat(this.data1.total).toFixed(2);
				}
				this.shippingCharge = parseFloat(this.shippingCharge).toFixed(2)
			},
			handleEdit (tabname, rowinx) {
				console.log('handleEdit............', tabname, rowinx)
				let self = this;
                this.exData = this.data2[0].online_payment[tabname][rowinx];
				let oldData = _.cloneDeep(this.data2[0].online_payment[tabname][rowinx])
                oldData = _.omit(oldData, ['_index', '_rowKey'])
                console.log('...',  this.exData )
				this.$Modal.confirm({
                    title: 'Edit',
                    closable: true,
                    render: (h, params) => {
                        let myFormItem = []
                        for(let k in oldData) {
                            if ((k === 'isDefault')) {
                                myFormItem.push(
                                h('FormItem', {
                                    props: {
                                        label: k
                                    }
                                }, [
                                    h('Checkbox', {
                                        props: {
                                            value: self.exData[k]
                                        },
                                        on: {
                                            'on-change': (value) => {
                                                console.log(value)
                                                self.exData[k] = value
                                            }
                                        }
                                    })
                                ])
                            )    
                            } else if ((k === 'isDeleted')) {
                                myFormItem.push(
                                h('FormItem', {
                                    props: {
                                        label: k
                                    }
                                }, [
                                    h('Checkbox', {
                                        props: {
                                            value: self.exData[k]
                                        },
                                        on: {
                                            'on-change': (value) => {
                                                console.log(value)
                                                self.exData[k] = value
                                            }
                                        }
                                    })
                                ])
                            )    
                            } else if ((k === 'Account_Name')) {
                                myFormItem.push(
                                h('FormItem', {
                                    props: {
                                        label: k
                                    }
                                }, [
                                    h('Input', {
                                        props: {
                                            value: self.exData[k]
										},
										attrs: {
											disabled: true
										},
                                        on: {
                                            'on-change': (value) => {
                                                console.log(value)
                                                self.exData[k] = value
                                            }
                                        }
                                    })
                                ])
                            )    
                            } else {
                                myFormItem.push(
                                    h('FormItem', {
                                        props: {
                                            label: k
                                        }
									}, 
									[
                                        h('Input', {
                                            props: {
                                                value: self.exData[k]
                                            },
                                            on: {
                                                'input': (value) => {
                                                    console.log('Input:: ', value)
                                                    self.exData[k] = value
                                                }
                                            }
                                        })
                                    ])
                                )
                            }
                        } 
                        // console.log('myFormItem', myFormItem)
                        return h('div', {},  
                        [
                            h('Form', {}, myFormItem)
                        ])
					},
                    onOk() {
                        console.log("edited data", self.exData);
                        let rowIndex = rowinx;
						// self.exData = _.omit(self.exData, ['_index', '_rowKey'])
						let configId = self.data2[0].id;
                        console.log("rowIndex",rowIndex);
                        let patchData = {
							id : configId,
                            rowIndex : rowIndex,
                            online_payment : {
                                [tabname] : self.exData
                            }
                        };
                        console.log("patchData",patchData)
                        axios({
                            method:'patch',
							url: config.default.serviceUrl + 'supplier-payment-config/' + configId,
                            data: patchData,
                        }).then(response => {
                            console.log("++++++++++++------------response",response);
                            if(response.status == 200){
                                this.$Message.success("Configuaration updated successfully")
                            }
                            
                        })
                        .catch(error => {
                                console.log(error)
                                
                                if(error.response.status == 401){
                                    let location = psl.parse(window.location.hostname)
                                    location = location.domain === null ? location.input : location.domain
                                    
                                    Cookies.remove('auth_token' ,{domain: location}) 
                                    Cookies.remove('subscriptionId' ,{domain: location}) 
                                    this.$store.commit('logout', this);
                                    
                                    this.$router.push({
                                        name: 'login'
                                    });
                                }
                        });
                    },
                    onCancel() {
                        console.log('CANCEL!!')
                    }
                })
			},
			handleDelete (tabname, rowinx) {
                console.log("in handleDelete-------------->",tabname, rowinx)
				console.log("delet data", this.data2[0].online_payment[tabname][rowinx])
				let self = this;
				let configId = self.data2[0].id;
                this.$Modal.confirm({ 
                    title: 'Confirm Delete',
                    okText : "Delete",
                    cancelText: 'Cancel',
                    content: '',
                    onOk: () => {
                        self.exData = self.data2[0].online_payment[tabname][rowinx];
                        console.log("self.exData",self.exData);
                        self.exData.isDeleted = true;
                        let patchData = {
                            id : configId,							
                            rowIndex : rowinx,
                            online_payment : {
                                [tabname] : self.exData
                            }
                        };
                        console.log("patchData",patchData)
                        axios({
							method:'patch',
							url: config.default.serviceUrl + 'supplier-payment-config/' + configId,
                            data: patchData,
                        }).then(response => {
                            if(response.status == 200){
                                this.$Message.success("Configuaration deleated successfully")
                            }
                            console.log("YYYYYYYYYYYYy",self.exData);
                            console.log("EEEEEEEEEEEEe",self.data2[0].online_payment[tabname][rowinx])
                        })
                        .catch(error => {
                                console.log(error)
                                
                                if(error.response.status == 401){
                                    let location = psl.parse(window.location.hostname)
                                    location = location.domain === null ? location.input : location.domain
                                    
                                    Cookies.remove('auth_token' ,{domain: location})
                                    Cookies.remove('subscriptionId' ,{domain: location})  
                                    this.$store.commit('logout', this);
                                    
                                    this.$router.push({
                                        name: 'login'
                                    });
                                }
                        });
                    },
                    render: (h) => {
                        return h('div', {
                        }, [
                            h('span', {
                                style:{
                                    fontSize:'25px'
                                },
                                props: {
                                },
                                on: {
                                    input: (val) => {
                                    }
                                }
                            },'This Payment Configuration Will Be Deleted.'),
                        ])
                    }
                })

            },
			setTabValue (value) {
				this.tabIndex = value;
			},		
			async init (){
				var self = this
				// console.log("config.default.orderapi", config.default.orderapi)
				axios({
					method: 'get',
					url: config.default.serviceUrl +'purchase-order',
					params: {
						"PO_id[$eq]" : self.$route.query.PO_id
						// user : Cookies.get('user')
					}
				}).then(function (response){
					console.log("------------------------response",response.data.data[0]);
					
					 	let poData=response.data.data;
						if(poData && poData.length>0){
							let poDetail=poData[0]
							self.date = moment(poDetail.PO_generate_date).format('DD-MMM-YYYY')  
							self.poBillAddress  =  self.splitProductAddress(poDetail);
							self.supplierPayment()
							self.data1 = poDetail
							// self.total = accounting.formatMoney(parseFloat(poDetail.total));
							self.total = parseFloat(poDetail.total).toFixed(2)
						}else{
								self.showError = true
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
					// for (let sDIndex = 0; sDIndex < shipping_detail.length; sDIndex++) {
						const shipingDetail = shipping_detail;
						let shipAddId=shipingDetail.selected_address_id
						let productColor = shipingDetail.color_quantity
						let tempProdut=product;
						// tempProdut.color_quantity=productColor
							let tempObj={
								product:[tempProdut],
								selected_address_id:shipAddId,
								shipping_address:shipingDetail.shipping_address,shipping_detail:shipingDetail.shipping_detail
							}
							tempPOAddressBill.push(tempObj)
						// if(shippingIds.indexOf(shipAddId)<0){
						// }else{
						// 	let billIndex= _.findIndex(tempPOAddressBill, function(o) { return o.selected_address_id == shipAddId; });
						// 	tempPOAddressBill[billIndex].product.push(tempProdut)
						// }
						// shippingIds.push(shipAddId);
					// }
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
			handleReset (name) {
				this.loading = false;
				this.formValidate.gateway = '',
				this.formValidate.Secret_Key = '',
				this.formValidate.Transaction_Key = '',
				this.formValidate.Signature_Key = '',
				this.formValidate.Client_Id = '',
				this.formValidate.Secret = '',
				this.formValidate.Account_Name = ''
				// this.formValidate.x_api_login = '',
				// this.formValidate.x_api_token = ''
				// this.$refs[name].resetFields();
			},
			handleSubmit (name) {
				var self = this;
				this.$refs[name].validate((valid) => {
					if (valid) {
						console.log('formValidate----------------------------->',this.formValidate, this.poBillAddress)
						let patchData = _.cloneDeep(this.formValidate)
						if (this.formValidate.gateway == 'stripe') {
							delete patchData.Transaction_Key
							delete patchData.Signature_Key
							delete patchData.Client_Id
							delete patchData.Secret
						}
						if (this.formValidate.gateway == 'auth') {
							delete patchData.Secret_Key
							delete patchData.Client_Id
							delete patchData.Secret
						}
						if (this.formValidate.gateway == 'paypal') {
							delete patchData.Secret_Key
							delete patchData.Transaction_Key
							delete patchData.Signature_Key
						}
						var params = {'supplier_id': self.poBillAddress[0].product[0].product_description.supplier_id , 'supplier_email': self.poBillAddress[0].product[0].product_description.supplier_info.email, 'online_payment': {}}
						delete patchData.gateway;
						patchData['isDefault'] = true;
						patchData['isDeleted'] = false;
						console.log('patchData----------------------------->',patchData)						
						params.online_payment[this.formValidate.gateway] = [patchData];
						console.log("---------------------params online payment",params);

						axios({
							method: 'post',
							url: config.default.serviceUrl + 'supplier-payment-config',							
							data: params
						}).then(function(response){
							self.$Notice.success({
								title: 'Sucess',
								desc: 'Payment Configuration Added Sucessfully',
								duration: 4.5
							})
							self.init()
							self.handleReset();
							$('.online_payment').slideToggle(700);
							console.log('??????????????', response)
						}).catch(function (error){
							console.log("error", error)
							self.$Notice.error({
								title: error.response.data.name,
								desc: error.response.data.message,
								duration: 10
							})
						})
						// self.loading = true;
					} 
					else {
						this.$Message.error('Please fill up all the fields correctly');
					}
				})
			},
			clicked () {
                console.log("Clickeddddd...............");
                $('.online_payment').slideToggle(700);
			},
			supplierPayment () {
				var self = this
				axios({
					method: 'get',
					url: config.default.serviceUrl + 'supplier-payment-config',
					params: {
						supplier_id : self.poBillAddress[0].product[0].product_description.supplier_id
					},
					
				}).then(function(response){
					console.log('supplierPayment...........', response.data.data)
					self.data2 = response.data.data
					console.log('data2 data2 data2', self.data2)
					
				}).catch(function (error){
					console.log("error", error)
					self.$Notice.error({
						title: error.response.data.name,
						desc: error.response.data.message,
						duration: 10
					})
				})

			},
			keyName(k) {
				console.log("kkkkkkkkkkkkkkkkkkkk", k)
                if (k === 'auth') {
                    return 'Authorize.Net'
                }
                else if (k === 'paypal') {
                    return 'PayPal'
                }
                else if (k === 'stripe'){
                    return 'Stripe'
                }
			},
			generatePDF()
			{
				this.modal1=true;
			},
			generateBillPDF(){
				this.invoiceModel=true;	
			},
			generateInvoice () {
				let self = this;
				let paymentInfo = {}

				if(this.dueDate != "" ) {

					if (this.data2.length > 0) {
						console.log("poData data1", this.data2[0].online_payment)
						let payment =  this.data2[0].online_payment
						for(let item in payment) {
							for(let val in payment[item]) {
								if((payment[item][val].isDefault == true) && (payment[item][val].isDeleted == false) ) {
									paymentInfo[item] = payment[item][val]
								}
							}
						}
					}
					let invoiceData = {
							'PO_id': this.data1.PO_id,
							'orderId': this.data1.orderId,
							'distributorId': this.data1.distributorId,
							'distributor_email': this.data1.distributor_email,
							'products': this.data1.products,
							'websiteName': this.data1.websiteName,
							'websiteId': this.data1.websiteId,
							'shippingCharges': this.shippingCharge,
							'shippingMethod' : this.shippingMethod,
							'specialInstruction' : this.note, 
							'total_amount': this.total,
							'supplierId': this.data1.products[0].product_description.supplier_id,
							'supplier_email': this.data1.products[0].product_description.supplier_info.email,
							'dueDate': this.dueDate,
							'paymentInfo': paymentInfo
						}
						console.log("po bill data", invoiceData)
					
					axios({
							method: 'post',
							url: config.default.serviceUrl +  'po-invoice',
							data: invoiceData
							
						}).then(function(response){
							console.log('Generate PO...........', response)
							self.invoiceBillObject=response.data
							self.$Message.success("Purchase Order Invoice Generated Successfully");
							// self.invoiceBillGenerated=true;
							// self.data2 = response.data.data
							// console.log('data2 data2 data2', self.data2)
							self.invoiceBillGenerated=true;
						}).catch(function (error){
							console.log("error", error)
							self.$Notice.error({
								title: error.response.data.name,
								desc: error.response.data.message,
								duration: 10
							})
						})
				} else { 
					this.$Notice.error({
						title: 'Error',
						desc: 'Please Select Due Date of Bill',
						duration: 4.5
					})
				}

			},
			async cancel() {
                self.modal1 = false
            },
            async download() {
                var self = this
		        self.$Loading.start()

                await axios({
                    method: 'post',
                    url: config.default.serviceUrl + 'exporttopdf',
                    data: {
                        "html" : $('#orderList').html()
                    },  
                }).then(function (response) {
                    console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                    self.$Loading.finish()
                    var arrayBufferView = new Uint8Array( response.data.data );
                    var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                    var link=document.createElement('a');
                    link.href=window.URL.createObjectURL(blob);
                    link.download=self.data1.id == undefined ? "custom_po" : self.data1.id;
                    link.click();
                }).catch(function (error){
                    if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
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
                })    
            },
			async cancelBillInvoice() {
                this.invoiceModel = false
            },
            async downloadBillInvoice() {
                var self = this
		        self.$Loading.start()

                await axios({
                    method: 'post',
                    url: config.default.serviceUrl + 'exporttopdf',
                    data: {
                        "html" : $('#invoiceBillList').html()
                    },  
                }).then(function (response) {
                    console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                    self.$Loading.finish()
                    var arrayBufferView = new Uint8Array( response.data.data );
                    var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                    var link=document.createElement('a');
                    link.href=window.URL.createObjectURL(blob);
                    link.download=self.invoiceBillObject.id == undefined ? "custom_po" : self.invoiceBillObject.id;
                    link.click();
                }).catch(function (error){
                    if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
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
                })    
            }
            
		},
		mounted() {
			console.log("this.$route.params.id", this.$route.query.PO_id)
			this.init()	
			this.shippingCharge = parseFloat(this.shippingCharge).toFixed(2)
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
	.invoice-head td {
		padding: 0 8px;
	}
	.invoice-body{
		background-color:transparent;
	}
	.invoice-thank{
		padding: 5px;
	}
	address{
		float: right;
		margin-top: -75px;
	}
	.invoice-head {
		display: inline-block;
	}
	.ivu-table-cell {
		word-break: break-word;
	}
</style>