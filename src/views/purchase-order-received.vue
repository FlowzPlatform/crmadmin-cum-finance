<template>
	<div>
		<div v-if="!showError" class="mainBody">
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
						<div style="padding:10px">
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
										<p>You can configure payment gateway <br/>here which will be used  while pay <br/> the invoices from the distributor. <br/> In case of multiple accounts, the <br/> default selected one will be used. <br/></p>
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
										<td><strong>Due Date of Invoice :</strong></td>
										<td><DatePicker v-model="dueDate" type="date" placeholder="Select date" placement="right" style="width: 215px;margin-top: 10px;margin-left: 25px;"></DatePicker></td>
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
									<tr>
										<td></td>
										<td><Button type="success" @click="generateInvoice()" style="float:right;margin-top:10px;">Generate Invoice</Button></td>
									</tr>
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
	const accounting = require('accounting-js');
	let _ = require('lodash');

	export default {
		name: 'purchase-order',
		components: {errorpage},
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
			calculateAmount () {
				console.log('this.shippingCharge',this.shippingCharge,typeof this.shippingCharge)
				if (this.shippingCharge > 0) {
					this.total = parseInt(this.data1.total) + parseInt(this.shippingCharge);
					// this.total = parseInt(this.total);
				}
				else {
					this.total = parseInt(this.data1.total);
				}
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
							self.total = parseInt(poDetail.total);
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
					for (let sDIndex = 0; sDIndex < shipping_detail.length; sDIndex++) {
						const shipingDetail = shipping_detail[sDIndex];
						let shipAddId=shipingDetail.selected_address_id
						let productColor = shipingDetail.color_quantity
						let tempProdut=product;
						// tempProdut.color_quantity=productColor
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
						console.log("invoiceData", invoiceData)
					
					axios({
							method: 'post',
							url: config.default.serviceUrl +  'po-invoice',
							data: invoiceData
							
						}).then(function(response){
							console.log('Generate PO...........', response)
							self.$Message.success("Purchase Order Invoice Generated Successfully");
							// self.data2 = response.data.data
							// console.log('data2 data2 data2', self.data2)
							
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
						desc: 'Please Select Due Date of Invoice',
						duration: 4.5
					})
				}

			}
		},
		mounted() {
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