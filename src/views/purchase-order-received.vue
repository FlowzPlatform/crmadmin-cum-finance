<template>
	<div>
		<div v-if="!showError" class="mainBody1">
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
								<Button type="primary" @click="clicked()" style="float:right" :disabled="invoiceGenerated">Add New Payment Configuration</Button>
								<div style="float:left; width:100%;">
									<div class="online_payment" style="display:none">
										<div class="" style="margin-top: 20px;">
											<Form class="form" label-position="left" ref="formValidatePayment" :model="formValidatePayment" :rules="ruleValidate" :label-width="140">
												<FormItem label="Account Name" prop="Account_Name">
													<Input v-model="formValidatePayment.Account_Name" placeholder="Enter Account Name"></Input>
												</FormItem>
												<FormItem label="Gateway" prop="gateway">
													<Select v-model="formValidatePayment.gateway" style="width:100%;text-align:left">
													<Option  value='auth'>Authrize.Net</Option>
													<Option  value='paypal'>PayPal</Option>
													<Option value='stripe'>Stripe</Option>
													</Select>
												</FormItem>
												<FormItem label="Secret key" v-if="formValidatePayment.gateway == 'stripe'" prop="Secret_Key">
													<Input v-model="formValidatePayment.Secret_Key" placeholder="Enter Secret key"></Input>
												</FormItem>
												
												<FormItem label="Transaction Key" v-if="formValidatePayment.gateway == 'auth'" prop="Transaction_Key">
													<Input v-model="formValidatePayment.Transaction_Key" placeholder="Enter Transaction Key"></Input>
												</FormItem>
												<FormItem label="Signature Key" v-if="formValidatePayment.gateway == 'auth'" prop="Signature_Key">
													<Input v-model="formValidatePayment.Signature_Key" placeholder="Enter Signature Key"></Input>
												</FormItem>
												<FormItem label="Client Id" v-if="formValidatePayment.gateway == 'paypal'" prop="Client_Id">
													<Input v-model="formValidatePayment.Client_Id" placeholder="Enter Client Id"></Input>
												</FormItem>
												<FormItem label="Secret" v-if="formValidatePayment.gateway == 'paypal'" prop="Secret">
													<Input v-model="formValidatePayment.Secret" placeholder="Enter Secret"></Input>
												</FormItem>
												
												<div style="text-align:center;">
													<Button type="primary" @click="handleSubmitPayment('formValidatePayment')" :loading="loading">Submit</Button>
													<Button type="ghost" @click="handleResetPayment('formValidatePayment')" style="margin-left: 8px;">Reset</Button>
												</div>
											</Form>
										</div>
									</div>
								</div>
								<div v-if="this.data2.length>0" class="payment_table" style="margin-top: 20px; float:left;">
									<Tabs :value="tabIndex"  @on-click="setTabValue">
										<TabPane v-for="(v, k) in this.data2[0].online_payment" v-if="v.length > 0" :label="keyName(k)" :disabled="invoiceGenerated">
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
																			<Button class="ButtonGroup" @click="handleEdit(k, i)" type="ghost" icon="edit" :disabled="invoiceGenerated"></Button>
																			
																		</Tooltip>
																		<Tooltip content="Remove" placement="top">
																			<Button class="ButtonGroup" @click="handleDelete(k, i)" type="ghost" icon="android-delete" :disabled="invoiceGenerated"></Button>
																			
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
					<!-- Profile config-->
					<!--<div class="row">
						<div class=" col-md-12">
							<div class="well" style="background-color:#fff">
								<label> Profile Configuration : </label>
								<Tooltip style="float:right;margin-left: 15px;" placement="top">
									<Icon  type="ios-help-outline" size=28></Icon>
									<div slot="content">
										<p>You can configure your profile <br/>here which will be used  while <br/> generate the bills. <br/> In case of multiple accounts, the <br/> default selected one will be used. <br/></p>
									</div>
								</Tooltip>
								<Button type="primary" @click="clickedProfile()" style="float:right">Add New Profile Configuration</Button>
								<div style="float:left; width:100%;">
									<div class="profileConfig" style="display:none">
										<div class="" style="margin-top: 20px;">
											<div class="col-md-12">
												<Form class="form" label-position="left" ref="formValidateProfile" :model="formValidateProfile" :rules="ruleValidate" :label-width="140">
													<FormItem label="Name" prop="name" id="CustomerName">
														<Input v-model="formValidateProfile.name" placeholder="Enter comapny name"></Input>
													</FormItem>
													<FormItem label="Address" class="ivu-form-item-required">
														<Row>
															<Col span="12">
																<FormItem prop="AddressLine1">
																	<Input v-model="formValidateProfile.AddressLine1" placeholder="AddressLine1"></Input>
																</FormItem>
															</Col>
															<Col span="12">
																<FormItem>
																	<Input v-model="formValidateProfile.AddressLine2" placeholder="AddressLine2"></Input>
																</FormItem>
															</Col>
														</Row>
													</FormItem>
													<FormItem label="Country" prop="country">
														<Select v-model="formValidateProfile.country" style="width:100%;text-align:left" @on-change="countryChange">
															<Option  v-for="item in this.allCountry" :value="item.id" :key="item.name">{{ item.name }}</Option>
														</Select>
													</FormItem>
													<FormItem label="State" prop="state" class="state1" style="display:none">
														<Select v-model="formValidateProfile.state" style="width:100%;text-align:left" name ="state" id ="state" @on-change="stateChange">
															<Option  v-for="item in this.allState" :value="item.id" :key="item.name">{{ item.name }}</Option>
														</Select>
													</FormItem>
													<FormItem label="City" prop="city" class="city1" style="display:none">
														<Select v-model="formValidateProfile.city" style="width:100%;text-align:left" name ="city" id ="city">
															<Option  v-for="item in this.allCity" :value="item.id" :key="item.name">{{ item.name }}</Option>
														</Select>
													</FormItem>
													<FormItem label="Postal code" prop="PostalCode">
														<Input v-model="formValidateProfile.PostalCode" placeholder="Enter PostalCode"></Input>
													</FormItem>
													<FormItem label="Mobile" prop="mobile">
														<Input v-model="formValidateProfile.mobile" placeholder="Enter your Mobile No"></Input>
													</FormItem>
													<FormItem label="Upload Logo" prop="uploadLogo">
														<Upload id="fileUpload" v-model="formValidateProfile.logo" :before-upload="handleUpload" :show-upload-list="uploadlist" action=''> 
															<Button type="ghost" icon="ios-cloud-upload-outline">Select the file </Button>
														</Upload>
														<div v-if="file !== ''">Uploaded file: {{ file.name }} 
															<Button @click="removefile()" type="ghost" shape="circle" icon="android-close" style="margin-left: 10px;"></Button>
														</div>
													</FormItem>
													<div style="text-align:center;">
														<Button type="primary" @click="handleSubmitProfile('formValidateProfile')" :loading="loading">Submit</Button>
														<Button type="ghost" @click="handleResetProfile('formValidateProfile')" style="margin-left: 8px;">Reset</Button>
													</div>
													<div style="color:blue;font-size: smaller;">**You will see this address in your bill</div>
												</Form>
											</div>
										</div>
									</div>
								</div>
								<div v-if="this.data2.length>0" class="payment_table" style="margin-top: 20px; float:left;">
								</div>
								<div class="clearfix"></div>
							</div>
							
						</div>        
					</div>-->
					<!-- Generate Invoice -->
					<div style="padding-left:15px;padding-right:15px;">
						<div class="row well" style="background-color:#fff">
							<table class="col-md-6">
								<tbody>
									<tr>
										<td><strong>Shipping Charges : </strong></td>                                            
										<td><Input v-model="shippingCharge" placeholder="Enter Shipping Charges..." style="width: 215px;margin-left: 25px;" @on-blur="calculateAmount()" @on-change="calculateAddAmount()"  @on-focus="calculateFocusAmount()" :disabled="invoiceGenerated"></Input></td>
									</tr>
									<tr>
										<td><strong>Due Date of Bill :</strong></td>
										<td><DatePicker v-model="dueDate" :options="options3" type="date" placeholder="Select date" placement="right" style="width: 215px;margin-top: 10px;margin-left: 25px;" :disabled="invoiceGenerated"></DatePicker></td>
									</tr>
									<tr>
										<td><strong>Total Amount :</strong></td>
										<td><Input v-model="total" placeholder="Total Amount" style="width: 215px;margin-top: 10px;margin-left: 25px;" :disabled="invoiceGenerated" readonly></Input></td>
									</tr>
								</tbody>
							</table>
							<table class="col-md-6">
								<tbody style="float:right;">
									<tr>
										<td><strong>Shipping Method : </strong></td>
										<td><Input v-model="shippingMethod" placeholder="Enter Shipping Method..." style="width: 215px;margin-left: 25px;" :disabled="invoiceGenerated"></Input></td>
									</tr>
									<tr>
										<td><strong>Special Instruction :</strong></td>
										<td><Input v-model="note" type="textarea" placeholder="Enter Special Instructions..." style="width: 215px;margin-left: 25px;margin-top:10px;" :disabled="invoiceGenerated"></Input></td>
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
										<Button type="success" v-else @click="generateBillPDF()" style="float:right;margin-top:10px;">Print Bill</Button>
									</td>
									<td><Button type="success" @click="generatePDF()" style="float:right;margin-top:10px; margin-left:10px;">Print Purchase Order</Button></td>
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
            <downloadOrderNew id="orderList" :row="data1"></downloadOrderNew>
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
	import Vue from 'vue'	
	import axios from 'axios'
	import psl from 'psl';
	import config from '../config/customConfig'
	import Cookies from 'js-cookie';
	import moment from 'moment';
	import expandRow from './view-purchase-order-received.vue';
	import errorpage from './error-page/404.vue'
	import downloadOrderList from './download-po.vue';
	import downloadOrderNew from './download-po-new.vue';

	import downloadPoBillList from './download-po-bill.vue';
	const accounting = require('accounting-js');
	import countryStateCity from 'country-state-city'	
	let _ = require('lodash');

	export default {
		name: 'purchase-order',
		components: {errorpage,downloadOrderList,downloadPoBillList,downloadOrderNew},
		data () {
			const validateNum = async(rule, value, callback) => {
				let patt = /^[0-9]{1,6}$/
				let _res = patt.test(value)
				if (!_res) {
				callback(new Error('Not Allowed Special Character'))
				} else {
				callback();
				}
			};
			return {
				columns1: [
					{
						type: 'expand',
						width: 50,
						render: (h, params) => {
							if($('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id') != undefined){
								// console.log("***",$('.ivu-table-cell-expand-expanded').parents('.mainClass').attr('id'))
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
				allCountry: [],
				uploadlist : false,
				allState: [],
				allCity: [],
				file:'',
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
				formValidatePayment: {
					Account_Name: '',
					gateway:'',
					Secret_Key: '',
					Transaction_Key: '',
					Signature_Key: '',
					Client_Id: '',
					Secret: ''
				},
				formValidateProfile : {
					name: '',
					mobile : '',
					AddressLine1: '',
					AddressLine2 : '',
					city: '',
					state: '',
					country: '',
					PostalCode: '',
					logo: [],
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
					],
					name:[
						{ required: true, message: 'The name cannot be empty', trigger: 'blur' }
					],
					AddressLine1:[
						{ required: true, message: 'The addressline1 cannot be empty', trigger: 'blur' }
					],
					AddressLine2:[
						{ required: true, message: 'The addressline2 cannot be empty', trigger: 'blur' }
					],
					city:[
						{ required: true, message: 'The city cannot be empty', trigger: 'blur' }
					],
					state: [
						{ required: true, message: 'Please select state', trigger: 'blur' }
					],
					country:[
						{ required: true, message: 'Please select Country', trigger: 'blur' }
					],
					PostalCode:[
						{ required: true, message: 'The PostalCode cannot be empty', trigger: 'blur' },
						{ validator: validateNum, trigger: 'blur' }
					]
				},
				invoiceGenerated:false
			}
		},
		methods: {
			removefile(){
				this.file = ''
			},
			async handleUpload (file) {
				var self = this
				// console.log('file',file)
				if(file.size >= 1e+8){
					this.$Notice.error({
						title: 'File Limit',
						desc: 'File size should be less than or equal to 50Kb. ',
						duration: 4.5
					});
					self.removefile()
					return true
				}
				self.file = file
				return false;
			},
			calculateFocusAmount(){
				if (this.shippingCharge && this.shippingCharge.length > 0 && this.shippingCharge == 0) {
					this.shippingCharge =''
				}
			},
			calculateAmount () {
				// console.log('this.shippingCharge',this.shippingCharge,typeof this.shippingCharge)
				if (!this.shippingCharge || isNaN(this.shippingCharge)){
					this.shippingCharge='0.00'
				}

					this.total = (parseFloat(this.data1.total) + parseFloat(this.shippingCharge)).toFixed(2);
					this.shippingCharge = parseFloat(this.shippingCharge).toFixed(2)
				// if (this.shippingCharge && this.shippingCharge.length > 0) {
				// 	if (this.shippingCharge > 0) {
				// 		this.total = (parseFloat(this.data1.total) + parseFloat(this.shippingCharge)).toFixed(2);
				// 		// this.total = parseFloat(this.total);
				// 	}
				// 	else {
				// 		this.total = parseFloat(this.data1.total).toFixed(2);
				// 	}
				// 	this.shippingCharge = parseFloat(this.shippingCharge).toFixed(2)
				// } else {
				// 	this.shippingCharge = '0.00'
				// }
			},
			calculateAddAmount(){
				let charge=0.0
				if (this.shippingCharge && !isNaN(this.shippingCharge))	
					charge=this.shippingCharge
				
					this.total = (parseFloat(this.data1.total) + parseFloat(charge)).toFixed(2);
			},
			handleEdit (tabname, rowinx) {
				// console.log('handleEdit............', tabname, rowinx)
				let self = this;
                this.exData = this.data2[0].online_payment[tabname][rowinx];
				let oldData = _.cloneDeep(this.data2[0].online_payment[tabname][rowinx])
                oldData = _.omit(oldData, ['_index', '_rowKey'])
                // console.log('exData...',  this.exData )
				// console.log('.oldData..',  oldData )
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
                                            value: oldData[k]
                                        },
                                        on: {
                                            'on-change': (value) => {
                                                // console.log(value)
                                                oldData[k] = value
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
                                            value: oldData[k]
                                        },
                                        on: {
                                            'on-change': (value) => {
                                                // console.log(value)
                                                oldData[k] = value
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
                                            value:oldData[k]
										},
										attrs: {
											disabled: true
										},
                                        on: {
                                            'on-change': (value) => {
                                                // console.log(value)
                                                oldData[k] = value
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
                                                value: oldData[k]
                                            },
                                            on: {
                                                'input': (value) => {
                                                    // console.log('Input:: ', value)
                                                    oldData[k] = value
                                                }
                                            }
                                        })
                                    ])
                                )
                            }
                        } 
                        // // console.log('myFormItem', myFormItem)
                        return h('div', {},  
                        [
                            h('Form', {}, myFormItem)
                        ])
					},
                    onOk() {
                        // console.log("edited data", oldData);
						self.exData=oldData
						// console.log("edited  exData data", self.exData);
                        let rowIndex = rowinx;
						// self.exData = _.omit(self.exData, ['_index', '_rowKey'])
						let configId = self.data2[0].id;
                        // console.log("rowIndex",rowIndex);
                        let patchData = {
							id : configId,
                            rowIndex : rowIndex,
                            online_payment : {
                                [tabname] : self.exData
                            }
                        };
                        // console.log("patchData",patchData)
                        axios({
                            method:'patch',
							url: config.default.serviceUrl + 'supplier-payment-config/' + configId,
                            data: patchData,
                        }).then(response => {
                            // console.log("++++++++++++------------response",response);
                            if(response.status == 200){
								Vue.set(self.data2[0].online_payment[tabname],rowinx,self.exData)
                                this.$Message.success("Configuaration updated successfully")
                            }
                            
                        })
                        .catch(error => {
                                // console.log(error)
                                
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
                        // console.log('CANCEL!!')
                    }
                })
			},
			handleDelete (tabname, rowinx) {
                // console.log("in handleDelete-------------->",tabname, rowinx)
				// console.log("delet data", this.data2[0].online_payment[tabname][rowinx])
				let self = this;
				let configId = self.data2[0].id;
                this.$Modal.confirm({ 
                    title: 'Confirm Delete',
                    okText : "Delete",
                    cancelText: 'Cancel',
                    content: '',
                    onOk: () => {
                        self.exData = self.data2[0].online_payment[tabname][rowinx];
                        // console.log("self.exData",self.exData);
                        self.exData.isDeleted = true;
                        let patchData = {
                            id : configId,							
                            rowIndex : rowinx,
                            online_payment : {
                                [tabname] : self.exData
                            }
                        };
                        // console.log("patchData",patchData)
                        axios({
							method:'patch',
							url: config.default.serviceUrl + 'supplier-payment-config/' + configId,
                            data: patchData,
                        }).then(response => {
                            if(response.status == 200){
                                this.$Message.success("Configuaration deleated successfully")
                            }
                            // console.log("YYYYYYYYYYYYy",self.exData);
                            // console.log("EEEEEEEEEEEEe",self.data2[0].online_payment[tabname][rowinx])
                        })
                        .catch(error => {
                                // console.log(error)
                                
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
				// // console.log("config.default.orderapi", config.default.orderapi)
				axios({
					method: 'get',
					url: config.default.serviceUrl +'purchase-order',
					params: {
						"PO_id[$eq]" : self.$route.query.PO_id
						// user : Cookies.get('user')
					}
				}).then(function (response){
					// console.log("------------------------response",response.data.data[0]);
					
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
					// console.log("-------",error);
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

				// console.log("Temp",tempPOAddressBill)
				return tempPOAddressBill;

			},
			// viewDetails(params,status){
			// 	if (!status) return
			// 	$('.ivu-table-cell-expand-expanded').click()
			// },
			accounting(item){
				return accounting.formatMoney(item)
			},
			handleResetPayment (name) {
				this.loading = false;
				this.formValidatePayment.gateway = '',
				this.formValidatePayment.Secret_Key = '',
				this.formValidatePayment.Transaction_Key = '',
				this.formValidatePayment.Signature_Key = '',
				this.formValidatePayment.Client_Id = '',
				this.formValidatePayment.Secret = '',
				this.formValidatePayment.Account_Name = ''
			},
			handleResetProfile (valid) {
				this.loading = false;
				this.formValidateProfile.name = '',
				this.formValidateProfile.mobile = '',
				this.formValidateProfile.AddressLine1 = '',
				this.formValidateProfile.AddressLine2 = '',
				this.formValidateProfile.city = '',
				this.formValidateProfile.state = '',
				this.formValidateProfile.country = '',
				this.formValidateProfile.PostalCode = '',
				this.formValidateProfile.logo = '',
				this.file = ''																
			},
			handleSubmitProfile (name) {
				var self = this;
				var file = this.file
				// console.log("HandleSubmitProfile call")
				this.$refs[name].validate((valid) => {
					if (valid) {
						// console.log("Inside Valid If")
						if(file != ''){
							// console.log("inside file If")
							var reader = new FileReader();
							// console.log('uuuuuu',file)
							reader.readAsDataURL(file);
						  	reader.addEventListener("load", function () {
								// console.log('uuuuuu',file.name)
								var fileupObj = {
									"filename":file.name,
									"url":reader.result
								}
								// console.log('fileupObj fileupObj',fileupObj)								
								self.formValidateProfile.logo.push(fileupObj);
							})
						}
						// console.log("address", this.formValidateProfile)
					} 
					else {
						this.$Message.error('Please fill up all the fields correctly');
					}
				})
			},
			handleSubmitPayment (name) {
				var self = this;
				this.$refs[name].validate((valid) => {
					if (valid) {
						// console.log('formValidate----------------------------->',this.formValidatePayment, this.poBillAddress)
						let patchData = _.cloneDeep(this.formValidatePayment)
						if (this.formValidatePayment.gateway == 'stripe') {
							delete patchData.Transaction_Key
							delete patchData.Signature_Key
							delete patchData.Client_Id
							delete patchData.Secret
						}
						if (this.formValidatePayment.gateway == 'auth') {
							delete patchData.Secret_Key
							delete patchData.Client_Id
							delete patchData.Secret
						}
						if (this.formValidatePayment.gateway == 'paypal') {
							delete patchData.Secret_Key
							delete patchData.Transaction_Key
							delete patchData.Signature_Key
						}
						var params = {'supplier_id': self.poBillAddress[0].product[0].product_description.supplier_id , 'supplier_email': self.poBillAddress[0].product[0].product_description.supplier_info.email, 'online_payment': {}}
						delete patchData.gateway;
						patchData['isDefault'] = true;
						patchData['isDeleted'] = false;
						// console.log('patchData----------------------------->',patchData)						
						params.online_payment[this.formValidatePayment.gateway] = [patchData];
						// console.log("---------------------params online payment",params);

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
							self.handleResetPayment();
							$('.online_payment').slideToggle(700);
							// console.log('??????????????', response)
						}).catch(function (error){
							// console.log("error", error)
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
                // console.log("Clickeddddd...............");
                $('.online_payment').slideToggle(700);
			},
			clickedProfile () {
				// console.log("Clickeddddd...............");
                $('.profileConfig').slideToggle(700);
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
					// console.log('supplierPayment...........', response.data.data)
					self.data2 = response.data.data
					// console.log('data2 data2 data2', self.data2)
					
				}).catch(function (error){
					// console.log("error", error)
					self.$Notice.error({
						title: error.response.data.name,
						desc: error.response.data.message,
						duration: 10
					})
				})

			},
			keyName(k) {
				// console.log("kkkkkkkkkkkkkkkkkkkk", k)
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
				this.print(this.data1.id,$('#orderList').html());
				// this.modal1=true;
			},
			generateBillPDF(){
				
				this.print(this.invoiceBillObject.id,$('#invoiceBillList').html());
				// this.invoiceModel=true;
			},
			generateInvoice () {
				let self = this;
				let paymentInfo = {}

				if(this.dueDate != "" ) {

					if (this.data2.length > 0) {
						// console.log("poData data1", this.data2[0].online_payment)
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
						// console.log("po bill data", invoiceData)
					
					axios({
							method: 'post',
							url: config.default.serviceUrl +  'po-invoice',
							data: invoiceData
							
						}).then(function(response){
							// console.log('Generate PO...........', response)
							self.invoiceBillObject=response.data
							self.$Message.success("Purchase Order Invoice Generated Successfully");
							self.invoiceGenerated=true;
							// self.invoiceBillGenerated=true;
							// self.data2 = response.data.data
							// // console.log('data2 data2 data2', self.data2)
							self.invoiceBillGenerated=true;
						}).catch(function (error){
							// console.log("error", error)
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
			countryChange (val) {
				this.allState = countryStateCity.getStatesOfCountry(val)
				// console.log("countryChange countryChange", this.allState)
				$('.state1').css("display","block")
			},
			stateChange (val) {
				this.allCity = countryStateCity.getCitiesOfState(val)
				// console.log("countryChange countryChange", this.allCity)
				$('.city1').css("display","block")
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
                    // console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
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
                    // console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
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
			},
			print:function(name,html){
				var mywindow = window.open('', 'PRINT', 'height=600,width=800');
				mywindow.document.getElementsByTagName('body')[0].innerHTML = '';
				let script = `<script>function printDiv(divName) {
								var printContents = document.getElementById(divName).innerHTML;
								// console.log("PrintContent:-->",printContents)
								var originalContents = document.body.innerHTML;

								document.body.innerHTML = printContents;

								window.print();

								document.body.innerHTML = originalContents;
							}<\/script>`



				mywindow.document.write(`<html><head><title>${name}</title>`);
				mywindow.document.write('</head><body');
				mywindow.document.write(`<div id="printdiv">${html}</div>`);
				// mywindow.document.write(`<button onclick="printDiv('printdiv')">Print</button>`);
				mywindow.document.write(`</body></html>`)

				mywindow.document.close(); // necessary for IE >= 10
				mywindow.focus(); // necessary for IE >= 10*/

				mywindow.print();
				mywindow.close();

				return true;
			}
            
		},
		mounted() {
			// // console.log("this.$route.params.id", this.$route.query.PO_id)
			this.init()
			this.shippingCharge = parseFloat(this.shippingCharge).toFixed(2)
			this.allCountry = countryStateCity.getAllCountries()
			// // console.log("allCountry allCountry", this.allCountry)			
		}
		
	}
</script>


<style lang="less">
	.mainBody1 {
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
	#state{
    width: 100%;
    background: white;
    height: 32px;
    border-color: #e2e2e2;
    border-radius: 4px;
   }
   #country{
    width: 100%;
    background: white;
    height: 32px;
    border-color: #e2e2e2;
    border-radius: 4px;
   }
</style>