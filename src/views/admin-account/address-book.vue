<style scoped>
	h1.main-title {
		font-family: 'Roboto Condensed', sans-serif;
		font-weight: bold;
		font-size: 18px;
		padding-bottom: 12px;
		color: #404040;
		text-transform: uppercase;
	}

	.ob-main-address-block a.btn-search {
		text-transform: uppercase;
		margin: 15px 0;
		font-family: 'Roboto Condensed', sans-serif;
		font-weight: 400;
		font-size: 14px;
		text-decoration: none;
	}

	a.btn-search:hover {
		background: #c51327;
		color: #fff;
	}

	.btn-search {
		background: #5d5c5c;
		border: 1px #757575 solid;
		color: #fff;
		padding: 8px 10px;
		border-radius: 3px;
		display: inline-block;
		font-size: 14px;
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
	}

	.account-address-block {
		border: 1px solid #d2d2d2;
		margin-bottom: 20px;
	}

	.account-address-block .address-inner-block {
		border: 1px solid #fff;
	}

	.account-address-block .address-title-block {
		padding: 7px 15px;
		border-bottom: 1px solid #c51327;
		background: linear-gradient(to bottom, #f5f5f5 0, #fff 100%);
	}

	.account-address-block .address-title-block h4 {
		color: #000;
		text-transform: capitalize;
		display: inline-block;
		font-family: 'Roboto Condensed', sans-serif;
		font-weight: 400;
		font-size: 18px;
		width: 85%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.account-address-block .address-edit-del-block ul li {
		display: inline;
	}

	.account-address-block .address-info-block {
		padding: 5px 15px;
	}

	.address-info-block .scrollbar {
		max-height: 200px;
		min-height: 150px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.account-address-block .address-info-block p {
		overflow: inherit;
	}

	.account-address-block .address-info-block p {
		color: #404040;
		font-family: 'Roboto Condensed', sans-serif;
		font-weight: 400;
		font-size: 13px;
		text-transform: capitalize;
		border-bottom: 1px solid #e4e4e4;
		padding-bottom: 10px;
		overflow-x: auto;
		max-height: 180px;
		min-height: 150px;
		line-height: 20px;
	}

	.account-address-block .address-contact-info-block {
		min-height: inherit;
	}

	.account-address-block .address-contact-info-block {
		padding: 5px 0 5px 15px;
		min-height: 40px;
	}

	.account-address-block .address-contact-info-block li {
		display: inline-block;
		margin-right: 35px;
		color: #404040;
		font-family: 'Roboto Condensed', sans-serif;
		font-weight: 400;
		font-size: 14px;
	}

	.account-address-block .address-contact-info-block li i {
		margin-right: 5px;
	}

	.account-address-block .address-shipping-block {
		background: #e8e8e8;
		padding: 2px 15px;
		border-left: 1px solid #fff;
		border-bottom: 1px solid #fff;
		border-right: 1px solid #fff;
	}

	.account-address-block .address-shipping-block a.address-active {
		color: #c51327;
	}

	.row {
		margin-right: 0px !important;
		margin-left: 0px !important;
	}

	.address-edit-del-block {
		margin-top: 10px;
		font-size: 16px
	}

	.account-address-block .address-edit-del-block ul li i {
		color: #404040;
	}

	.address-contact-info-block a {
		color: #404040;
	}

	.address-contact-info-block a:hover {
		color: #c10d22;
		text-decoration: none;
	}

	.account-address-block .address-shipping-block a:hover {
		color: #c51327;
		text-decoration: none;
	}

	.account-address-block .address-shipping-block a {
		color: #afa4a6;
		text-transform: capitalize
	}
</style>
<template>
	<div style="background:white">
		<div class="ob-main-address-block">
			<div class="row">
				<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					<h1 class="main-title">
						<i class="fa fa-edit"></i>
						Address Book

					</h1>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					<div class="pull-right">
						<a class="btn-search pull-right ui-link" v-on:click='addNewAddressBook()'>Add New Address</a>
					</div>
				</div>
			</div>
			<div class="row" id="js_search_list">
				<div class="col-sm-6 col-md-6 col-lg-6 col-xs-12" v-for="(item, index) in addressbook">
					<div class="account-address-block">
						<div class="address-inner-block">
							<div class="address-title-block">
								<h4>
									Billing Address
								</h4>
								<div class="pull-right address-edit-del-block">
									<ul>
										<li>
											<a data-original-title="Edit" class="ui-link" title="" data-placement="top" data-toggle="tooltip" v-on:click='saveTheThing(item.id)'>
												<i class="fa fa-pencil-square-o"></i>
											</a>
										</li>
										<li>
											<a data-original-title="Delete" class="ui-link js-btn-delete-contact-book" title="" data-placement="top" data-toggle="tooltip" href="javascript:void(0)" data-id="22">
												<i class="fa fa fa-trash-o"></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="address-info-block">
								<div class="scrollbar" id="style-1">
									<i class="address-icon"></i>
									<p>
										<span>{{item.name}} </span>
										<br>
										<br>
										<span>{{item.street1}} </span>
										<br>
										<span v-if="item.street2">{{ item.street2 }}</span>
										<span v-else></span>
										<br>
										<span> {{ typedata[index].type3 }} , {{item.postalcode}} </span>
										<br>
										<span> {{ typedata[index].type2 }} </span>
										<br>
										<br>
										<span> {{ typedata[index].type1 }} </span>

									</p>
								</div>
							</div>
							<div class="address-contact-info-block">
								<ul>
									<li class="phone">
										<i class="fa fa-phone"></i> {{item.phone}}

									</li>
									<li class="email">
										<i class="fa fa-envelope"></i>
										<a href="mailto:bryson@keypromo.com"> {{item.email}}</a>
									</li>
								</ul>
							</div>
							<div class="address-shipping-block">
								<div class="checkbox">
									<a href="javascript:void(0)" class=" is-default  checked_2" data-id="22" data-url="/en_ca/my-account/address-book/is-default">
										<i class="fa fa-check-circle"></i> {{item.address_type}}

									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import config from '../../config/customConfig.js'
	import Cookies from 'js-cookie';
	let axios = require('axios');
	let _ = require('lodash');
	var api = "http://172.16.61.160:3032/address-book";
	var apiurl = "http://172.16.61.160:3032/change-city-state-country";
	export default {
		name: 'addressbook',
		data() {
			return {
				addressbook: [],
				typedata: [],
				userid: ''
			}
		},
		methods: {
			async init() {
				var self = this
				let abc = await axios.get(api, {
					params: {
						user_id: self.userid
					}
				})
					.then(function (response) {
						// console.log("response", response.data.data)
						return response.data.data
					}).catch(err => {
						return []
					})
				//  = adata
				self.typedata = []
				for (let [inx, obj] of abc.entries()) {
					var mObj = {}
					for (let type = 1; type < 4; type++) {
						let mid = ''
						if (type == 1) {
							mid = obj.country
						} else if (type == 2) {
							mid = obj.state
						}
						else if (type == 3) {
							mid = obj.city
						}
						var resp = await axios({
							method: 'GET',
							url: apiurl,
							params: {
								'id': mid,
								'type': type
							}
						})
							.then(function (response) {
								let abc = ''
								if (response.data != '') {
									if (type == 1)
										abc = response.data.country_name;
									else if (type == 2)
										abc = response.data.state_name;
									else if (type == 3)
										abc = response.data.city_name;
								}
								// console.log("++++++++",abc)
								// return abc;
								return abc
							})
						mObj['type' + type] = resp
						console.log('mObj.......', mObj)
					}
					self.typedata.push(mObj)
				}

				console.log('typedata', self.typedata)
				self.addressbook = abc
			},
			saveTheThing(id) {
				console.log("124ahjhdkjs", id)
				// this.$router.push('/address-book/'+id)
			},
			addNewAddressBook() {
				// this.$router.push('/new-address-book/')
			}
		},
		async mounted() {
			var self = this
			await axios({
				method: 'get',
				url: config.default.userDetail,
				headers: { 'Authorization': Cookies.get('auth_token') }
			}).then(async function (response) {
				self.userid = response.data.data._id
				console.log('user detail response------>', self.userid)
			})
				.catch(function (error) {
					console.log("-------", error);
					self.$Message.error(error)
				});
			this.init()
		}
	}
</script>