<template>
	<div>
		<Card>
			<div class="row">
				<div class="col-md-6" id="product_list">
				<div style="text-align:center">
					<div class="row">
					<div class="col-sm-12">
						<div class="order-title">
						<div class="border-white col-lg-6 col-md-6 col-sm-6">
							ID : {{row.id}}
						</div>
						<div class="border-white col-lg-3 col-md-3 col-sm-3">
							Requested On : {{createdAt}}
						</div>
						<div class="border-white col-lg-3 col-md-3 col-sm-3">
							Total Items : {{row.total_qty}}
						</div>
						</div>
					</div>
					</div>
				</div>
				<Collapse accordion>
					<Panel name="1" id="paneladd">
					PRODUCT
					<p slot="content">
						<label style="width: -webkit-fill-available;">
					<div class="">
						<div class="row">
						<div class="col-lg-2 col-md-3 col-sm-12 col-xs-12 padding-right-0">
							<div class="detail-image">
							<img alt="" :src="getImgUrl(row.product_description)" id="order_product_image_0" class="img-responsive">
							</div>
							</div>
							<div class="col-lg-10 col-md-9 col-sm-12 col-xs-12" style="text-align: -webkit-center;">
							<h2 class="heading-2" style="font-size:20px !important;">{{row.product_description.product_name}}</h2>
							<div class="skuprice">
								<div style="text-align: -webkit-center;background: #f5f5f5;padding: 7px 0;">Item Number :
								<span>{{row.product_description.sku}}</span>
								</div>
							</div>
							</div>
						</div>
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
						<h3 class="product-summary">Product Summary</h3>
						<div class="estimate-detail product-section-box">
							<div class="estimate-tag-block border-bottom">
							<div class="row"  v-for="(item,index) in row.shipping_method.shipping_detail">
								<div class="col-sm-12">
								<div class="estimate-row heading">
									<span>Quantity {{index+1}}</span>
								</div>
								<table class="product-color-price-table">
									<tbody v-for="(element,inx) in item.color_quantity">

									<tr>
										<td>
										<i class="white-color-box" :style="{ backgroundColor: inx }" >
											<img src="">
										</i>
										</td>
										<td>{{inx}}</td>
										<td>
										<strong>Total : {{element}}</strong>
										</td>
									</tr>

									</tbody>
								</table>
								</div>
							</div>
							<div class="estimate-tag-block" v-for="item in row.shipping_method.shipping_detail">
								<h3 class="">Shipping Method</h3>
								<div class="row">
									<div class="col-lg-6 col-md-6 col-sm-6">
									<div class="estimate-row"><strong>Shipping Charge : </strong><span v-if="item.shipping_detail.shipping_charge == ''">&nbsp;&nbsp;&nbsp;-</span><span v-else>{{item.shipping_detail.shipping_charge}}</span></div>
										<div class="estimate-row">
										<div><strong>Shipping Address :</strong>
											<br>{{item.shipping_address.name}},
											<br>{{item.shipping_address.city}} - {{item.shipping_address.postalcode}},
											<br>{{item.shipping_address.state}},
											<br>{{item.shipping_address.country}}
										</div>
										</div>
									</div>
									<div class="col-lg-6 col-md-6 col-sm-6">
									<div class="estimate-row">
										<div><strong>Shipping Type : </strong><span style="text-transform:capitalize">{{row.shipping_method.shipping_type}}</span></div>
									</div>
									<div class="estimate-row">
										<div><strong>Shipping Carrier : </strong><span v-if="item.shipping_detail.shipping_carrier == ''" style="text-transform:capitalize">&nbsp;&nbsp;&nbsp;-</span><span v-else style="text-transform:uppercase">{{item.shipping_detail.shipping_carrier}}</span></div>
									</div>
									<div class="estimate-row">
										<div><strong>Method : </strong><span v-if="item.shipping_detail.shipping_method == ''">&nbsp;&nbsp;&nbsp;-</span><span v-else>{{item.shipping_detail.shipping_method}}</span></div>
									</div>
									</div>
									<div class="col-lg-6 col-md-6 col-sm-6">
									<div class="estimate-row">
										<div><strong>In Hand Date :</strong> <span v-if="item.shipping_detail.on_hand_date == ''">&nbsp;&nbsp;&nbsp;-</span>
										<span v-else>{{item.shipping_detail.on_hand_date}}</span></div>
									</div>
									</div>
								</div>
								</div>
							</div>
							<div class="estimate-tag-block" v-for="item in row.imprint">
							<div class="row">
								<div class="col-lg-12 col-md-6 col-sm-6">
								<h3>Print Position: {{item.imprint_position_name}}</h3>
								<div class="estimate-row">
									<strong>Imprint Method :</strong>
									<span>{{item.imprint_method_name}}</span>
								</div>
								<div v-if="item.no_of_color">
								<div class="estimate-row">
									How many colours :
									<span> {{item.no_of_color}} Colour</span>
								</div>
								<div class="estimate-row" v-for="(i,index) in item.selected_colors">
									<div>
									Colour {{index+1}} :<span>{{i}}</span>
									</div>
								</div>
								</div>
								<div v-else></div>
								<div v-if="item.hasOwnProperty('artwork_type') && item.hasOwnProperty('artwork')">
									<div v-if="item.artwork_type == 'upload_artwork_typeset'">
										<div v-if="item.artwork.hasOwnProperty('artwork_text_email')">
											Art Work Via Email: <span>artwork@flowz.com</span>
										</div>
									</div>
									<div v-else-if="item.artwork_type == 'upload_artwork'">
										<div v-if="item.artwork.hasOwnProperty('artwork_email')">
											Art Work Via Email: <span>artwork@flowz.com</span>
										</div>
									</div>
									<div v-else></div>
									<div v-if="item.artwork.hasOwnProperty('artwork_thumb')">
										<div v-for="(i,j) in item.artwork.artwork_thumb">
											Uploaded Artwork {{j+1}} : <img :src="i" style="max-width:50px;max-height:50px;"/>
										</div>
									</div>
									<div v-else></div>
									<div v-if="item.artwork.hasOwnProperty('artwork_text')">
										<div v-for="(i,j) in item.artwork.artwork_text">
											Text {{j+1}} : <span> {{i}}</span><br>
										</div>
									</div>
									<div v-else></div>
									<div v-if="item.artwork.hasOwnProperty('artwork_instruction')">
											Instructions : <span> {{item.artwork.artwork_instruction}} </span><br>                                                                                           </div>
									<div v-else></div>
								</div>
								</div>
							</div>
							</div>
						<div v-if="row.special_instruction != ''">
						<h3>Special Instructions</h3>
						<div class="estimate-tag-block">
							<div>
							{{row.special_instruction}}
							</div>
						</div>
						</div>
						</div>
						</div>
						</label>
					</p>
					</Panel>
					<Panel name="2">
					MY INFORMATION
						<p slot="content">
						<label class="container">
						<h4 style="padding-right:15px;padding-left:15px;text-transform:capitalize">{{row.user_info.fullname}}</h4>
							<div class="col-md-6">
								<span style="font-weight:500">
									NA
								</span>
							</div>
							<div class="col-md-6">
							<ul class="ulList">
								<li style="width:max-content">
								<Icon type="ios-telephone" size="15"></Icon>
								<span style="font-weight:500;">&nbsp;&nbsp;&nbsp;NA</span>
								</li>
								<li style="width:max-content">
								<Icon type="ios-email" size="15"></Icon>
								<span style="font-weight:500;">{{row.user_info.email}}</span>
								</li>
							</ul>
							</div>
						</label>
						</p>
					</Panel>
					<!-- <Panel name="2">
					MY INFORMATION
						<p slot="content">
						<label class="col-sm-12 col-md-6 col-lg-3 col-xs-12">
							<h4>{{row.user_info.fullname}}</h4>
							<p>
							<span class="address">Office Address</span>
							<br>
								<span style="font-weight:500">
								C-112 Girdharpark Soc.
								<br>
								Near New Era School
								<br>
								Opp. Novino Bettery
								<br>
								Makarpura, Vadodara
								</span>
							</p>
						</label>
						<label class="col-sm-12 col-md-6 col-lg-3 col-xs-12">
							<ul class="ulList">
							<li>
								<Icon type="ios-telephone" size="15"></Icon>
								<label style="font-weight:500">9978532084</label>
							</li>
							<li>
								<Icon type="ios-email" size="15"></Icon>
								<label style="font-weight:500">{{row.user_info.email}}</label>
							</li>
							</ul>
						</label>
						</p>
					</Panel> -->
				</Collapse>
				</div>
				<div class="col-md-6">
				<!-- <div> -->
						<div class="chat">
						<!--  <div id="block" style="text-align:right;width:100%;display:inline-block">

						</div> -->
						<!-- <textarea class="form-control" id="editor2" name="editor2" ></textarea> -->
						<div v-for="(item, index) in messageData" style="margin-bottom: 10px;margin-right: 10px;">
							<div class="message"  v-if="item.created_by != userid">
							<Row>
								<Col span="24" >
								<div >
									<!-- <img src="http://mangalayatan.in/wp-content/uploads/2016/01/member1.jpg" /> -->
									<p class="emailText" v-html="item.message"></p>
									<span class="receivedDate">
									<!-- <span v-if="item.isEdited">{{getDate(item.edited_at)}}</span> -->
									<!--<span>{{getDate(item.created_at)}}</span>-->
									<time class="timeago" :datetime="item.created_at">{{item.created_at}}</time>
									<!-- <span v-if="item.isEdited">{{item.edited_by}}</span> -->
									<span>{{item.created_by}}</span>
									</span>
								</div>
								</Col>
							</Row>
							</div>
							<div v-else-if="item.created_by == userid" class="message me" >
							<Row>
								<Col span="24" >
								<div  >
									<!-- <img :src="src" /> -->
									<p class="emailText" v-html="item.message"></p>
									<span class="sentDate">
									<!-- <span style="color:blue;cursor:pointer" v-on:click="clicked(item, index)">Edit</span> ||

									<span style="color:red;cursor:pointer" v-on:click="deleteItem(item)">Delete</span> -->
									<!-- <span v-if="item.isEdited">Edited {{getDate(item.edited_at)}}</span> -->
									<!--<span>{{getDate(item.created_at)}}</span>-->
									<time class="timeago" :datetime="item.created_at">{{item.created_at}}</time>
									<!-- <span v-if="item.isEdited">{{item.edited_by}}</span> -->
									<span style="font-style: italic;"><strong>{{item.created_by}}</strong></span>
									</span>
								</div>
								</Col>
							</Row>
							</div>
							<div v-else></div>
						</div>

						</div>
						<div class="product-section-box">
							<div class="request-comment-info">
								<div id="js-comment-list-ajaxresponse">
									<div id="style-1 js-comment-list-container" class="scrollbar">
										<div class="force-overflow">
										<ul class="request-comment-box"></ul>
										</div>
									</div>
								</div>
								<div class="request-post-comment">
									<div class="post-comment-text-box form-group">
										<Input type="text" v-model="commentMessage" id="commentrequestinfo_comment"  placeholder="Type a message" :rows="1" @on-keyup ="myFunction()"></Input>
											<Tooltip content="Send(Enter)" placement="top">
												<Button class="btn btn-default btn-sm" icon="android-send" @click= "sendcomment()"></Button>
											</Tooltip>
										</div>
									</div>
								</div>
							</div>
					<!-- </div> -->
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
	import axios from 'axios'
	import Cookies from 'js-cookie';
	import moment from 'moment';
	const accounting = require('accounting-js');
	// import eye from '../../images/Eye.png'
	import 'owl.carousel/dist/assets/owl.carousel.css';
	import owlCarousel from 'owl.carousel';
	import feathers from 'feathers/client';
	import socketio from 'feathers-socketio/client';
	import config from '@/config/customConfig'
	import io from 'socket.io-client';

	export default {
		props: {
			row: Object
		},
		name: 'list-billing',
		data () {
		return {
			imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
			createdAt: '',
			commentMessage: '',
			resetData: '',
			userid: '',
			requestUser: '',
			requestUserEmail: '',
			messageData: []

			}
		},
		methods: {
			async timeAgo() {
				let self = this;

				var elements = await document.getElementsByClassName('timeago');
				for (var i in elements) {
					let $this = elements[i];
					// console.log('$this',elements[i], typeof $this);
					if (typeof $this === 'object') {
						$this.innerHTML = moment($this.getAttribute('title') || $this.getAttribute('datetime')).fromNow();
					}
				}
			},
			getImgUrl (product) {
				let ProductImage = config.default.productImageUrl;
				if (product.images != undefined) {
					ProductImage = product.images[0].images[0].secure_url;
				}
				return ProductImage;
			},
			accounting(item) {
				return accounting.formatMoney(item)
			},
			getDate (date) {
				return moment(date).fromNow()
			},
			myFunction(){

				// if(event.key == "Enter" && event.ctrlKey == true){
				if(event.key == "Enter"){
				this.sendcomment();
				}
			},
			sendcomment() {
				var self = this
				let date = new Date()
				// // console.log("this.commentMessage----------> before",this.commentMessage)
				let msg = this.commentMessage.trim();
				// // console.log("this.commentMessage---------->",msg)
				if(msg != ''){
					this.resetData = this.commentMessage
					axios({
					method: 'post',
					url: config.default.commentrequestapi,
					headers: {
						'Authorization': Cookies.get('auth_token')
					},
					data: {
						'subscriptionId': Cookies.get('subscriptionId'),
						"Module":"request-quote",
						"RequestId":this.row.id,
						"websiteid":this.row.website_id,
						"message": self.resetData
					}
					}).then(function (response) {
					// self.messageData.push(response.data.message)
					// self.messageData.push({message: self.resetData, created_at: date, created_by: self.userid})
					self.commentMessage = '';
					let height
					// setTimeout(function(){
						height = document.getElementsByClassName("chat")[0].scrollHeight;
						$('.chat').animate({scrollTop: height },0);
					// },1000)
					})
				}
			}
		},
		mounted(){
			let callTimer = setInterval(this.timeAgo, 60000);
			this.requestUser = this.row.user_info.fullname
			this.requestUserEmail = this.row.user_info.email
			
			let socketurl = io(config.default.socketUrlapi,{reconnection: true})
			const app = feathers().configure(socketio(socketurl))
			// const app = feathers().configure(socketio(io('http://localhost:4032')))
			
			app.service("comment-request").on("created" , (message) =>{				if (message.Module == "request-quote") {
				self.messageData = message.message
				self.timeAgo();
				// setTimeout(function(){
					let height = document.getElementsByClassName("chat")[0].scrollHeight;
					$('.chat').animate({scrollTop: height });
				// },1000)
				}
				//this.messages.push(message);
			})

			app.service("comment-request").on("updated" , (message) =>{				if (message.Module == "request-quote") {
				self.messageData = message.message 
				self.timeAgo();
				// setTimeout(function(){
					let height = document.getElementsByClassName("chat")[0].scrollHeight;
					$('.chat').animate({scrollTop: height });
				// },1000)
				}
				//this.messages.push(message);
			})

			var self = this
			self.createdAt = moment(self.row.created_at).format('DD-MMM-YYYY')
			axios({
			method: 'get',
			url: config.default.commentrequestapi,
			headers: {
				'Authorization': Cookies.get('auth_token')
				},
			params:{
				RequestId: self.row.id
			}
			}).then(function (response) {
				self.userid = Cookies.get('user')
				if(response.data.data.length != 0){
				self.messageData = response.data.data[0].message
				self.timeAgo();
				let height
				// setTimeout(function(){
					height = document.getElementsByClassName("chat")[0].scrollHeight;
					$('.chat').animate({scrollTop: height },0);
				// },1000)


				}
			})

			$('.owl-carousel').owlCarousel({
				stopOnHover : true,
				navigation:true,
				items : 4,
				itemsDesktop: [1199, 4],
				itemsDesktopSmall: [979, 4],
				itemsTablet: [767, 2],
				itemsMobile: [479, 2]
			});
		}
	}
	</script>

	<style scoped>
		.expand-row{
			margin-bottom: 16px;
		}
		.border-white{
			border-right: 3px #fff solid;
			padding: 10px;
			font-size: 14px;
		}
		.right-border {
		border-right: 1px #EEE solid;
		}
		.order-title {
			background: #f5f5f5;
			margin: 0 0 10px;
			margin-top: 10px;
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
			/*border-top: 3px solid #C11E19*/
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
	.col-mn-pt {display: flex;}
	.quantity-price,.product-summary {
		background: #f3f2f2;
		/*border-left: 5px solid #c51327;*/
		color: #7e7e7e;
		display: block;
		font-family: 'Roboto',sans-serif;
		font-weight: 500;
		font-size: 17px;
		margin: 8px 0;
		padding: 5px 0 5px 10px;
		width: 100%;
	}
	.quantity-table {
		margin-top: 15px;
		overflow: hidden;
	}
	.quantity-table-title {
			float: left;
		width: 23%;
	}
	.quantity-table-title .table-heading {
		font-size: 16px;
		color: #fff;
		font-family: 'Roboto Condensed',sans-serif;
		font-weight: 700;
		text-align: center;
		padding: 4px 10px;
	}
	.quantity-table .table-heading {
		background: #999 none repeat scroll 0 0;
		/*border-right: 1px solid #fff;
		border-top: 0 none;*/
		color: #fff;
		font-family: 'Roboto Condensed',sans-serif;
		font-weight: 300;
		font-size: 16px;
		padding: 6px;
		text-align: center;
		text-transform: uppercase;
	}
	.quantity-table-title .table-content, .quantity-table .table-content {
		font-size: 16px;
		color: #404040;
		font-family: 'Roboto Condensed',sans-serif;
		font-weight: 700;
		text-align: center;
		padding: 4px 10px;
	}
	.quantity-table .table-content {
		background: #e6e6e6 none repeat scroll 0 0;
		/*border: 1px solid #fff;*/
		color: #444;
		font-size: 16px;
		padding: 6px;
		text-align: center;
		font-family: 'Roboto Condensed',sans-serif;
		font-weight: 400;
		margin-left: -1px;
	}
	.quote-product-summary .estimate-detail {
		background: 0;
		padding: 0;
	}
	.product-section-box {
		font-family: 'Roboto Condensed',sans-serif;
		font-weight: 400;
	}
	.estimate-tag-block {
		margin-bottom: 5px;
		background: #fff;
		padding: 0px;
		font-size: 14px;
		font-family: 'Roboto Condensed',sans-serif;
		font-weight: 300;
	}
	.border-bottom {
		/*border-bottom: 1px #ebebeb solid;*/
	}
	.estimate-row {
		margin-bottom: 8px;
		padding-bottom: 2px;
		font-size: 13px;
		font-family: 'Roboto',sans-serif;
		font-weight: 500;
		color: #7f7f7f;
	}

	.estimate-tag-block .heading span {
		font-size: 15px;
		font-family: 'Roboto',sans-serif;
		font-weight: 500;
		color: #404040;
	}
	.row {
		margin-right: -15px;
		margin-left: -15px;
	}
	.product-color-price-table {
		margin-bottom: 20px;
		/*width: 100%;*/
		border-top: solid 1px #e9eaec;
		border-left: solid 1px #e9eaec;
		/*border-color: white;*/
	}
	.product-color-price-table td {
		padding-right: 20px;
		display: inline-block;
		min-width: 60px;
		text-align: left;
	}
	.product-color-price-table td:last-child {
		float: right;
		min-width: 130px;
	}
	.product-color-price-table td {
		padding-right: 20px;
		display: inline-block;
		text-align: left;
	}

	i.white-color-box {
		border: solid 1px #ccc;
		height: 30px;
		margin-bottom: 2px;
		background: #fff;
		display: block;
		width: 30px;
		margin-left: 10px;
		margin-top: 5px;
	}
	h3 {
		background: #f3f2f2;
		/*border-left: 5px solid #c51327;*/
		color: #7e7e7e;
		display: block;
		font-family: 'Roboto',sans-serif;
		font-weight: 500;
		font-size: 17px;
		margin: 8px 0;
		padding: 5px 0 5px 10px;
		width: 100%;
		line-height: 1.1;
	}

	.panel-body{
	width: 100%;
	}

	.product-section-box h2 {
		background: #f9f9f9;
		font-family: 'Roboto',sans-serif;
		font-weight: bold;
		font-size: 16px;
		margin-bottom: 10px;
		padding: 8px 30px 8px 46px;
		border-bottom: #EEE 3px solid;
		color: #404040;
		position: relative;
	}
	.request-comment-info {
		padding-left: 0px;
	}
	.post-comment-text-box {
		background: #eee;
		border: solid 1px #e3e3e3;
	}
	.model-popup-black .form-group textarea {
		margin-bottom: 0;
	}

	.form-group textarea {
		font-family: 'Roboto Condensed',sans-serif;
		font-weight: 400;
		font-size: 13px;
		color: #7f7f7f;
		padding: 5px;
		resize: none;
		border-radius: 0;
	}
	.post-comment-text-box textarea {
		width: 100%;
		border: 1px solid #e3e3e3;
		box-shadow: none;
	}
	.request-post-comment input[type="button"] {
		box-shadow: none;
		border: 0;
		border-radius: 3px;
	}
	.request-post-comment .post-pink-btn {
		background: #c51327;
		min-width: 150px;
	}
	html input[type=button] {
		-webkit-appearance: button;
		cursor: pointer;
		margin: 0 10px 10px 0;
		font-family: 'Roboto Condensed',sans-serif;
		font-weight: 700;
		color: #fff;
		font-size: 14px;
	}
	.request-post-comment .post-cancel-btn {
		background: gray;
		min-width: 120px;
	}
	.request-post-comment .post-comment-btn {
		text-align: right;
	}
	.btn-box-main.pointerst-comment-btn {
		width: 35px;
		display: inline-block;
		vertical-align: top;
	}
	#commentrequestinfo_comment {width: calc(100% - 40px); display: inline-block; vertical-align: top; }
	.col-md-8 .chat .composeView {
		width: 96%;
		margin-left: 2%;
		margin-bottom: 1%;
	}
	.chat {
		display: block;
		width: 100%;
		height: calc(100% - 50px);
		overflow: auto;
		max-height: 350px;
		background: #eee;
	}
	.chat .message {
		display: flex;
		margin: 10px 0 0 10px;
		min-height: 30px;
		height: auto;
		text-align: left;
	}
	.chat .message.me img {
		order: 2;
		margin: 0 0 0 2px;
		float: right;
	}
	.chat .message.me div {
		order: 1;
		padding: 0 8px 0 0;
	}
	.chat .message.me div p {
		float: right;
		margin-right: 15px;
	}
	.chat .message.me div:before {
		position: relative;
		float: right;
		content: '';
		margin: 7px -8px 0 0;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 8px 0 8px 8px;
		border-color: transparent transparent transparent #fff;
		display: none;
	}
	.chat .message img {
		order: 1;
		margin: 0 10px 0 0;
		height: 30px;
		width: 30px;
		border-radius: 50%;
		box-sizing: border-box;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
	}
	.chat .message span img {
		order: 1;
		margin: 0 2px 0 0;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		box-sizing: border-box;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
	}
	.chat .message div {
		display: block;
		flex: 1;
		order: 2;
		width: 100%;
	}
	.chat .message div p {
		display: inline-block;
		margin: 0;
		max-width: 80%;
		padding: 8px 10px 8px 10px;
		background: #fff;
		word-wrap: break-word;
		border-radius: 3px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}
	.chat .message div .emailText {
		min-height: 33px;
	}
	.chat .message.me div .emailText:before {    position: relative;
		float: right;
		content: "";
		width: 0px;
		height: 0px;
		margin: 7px -8px 0px 0px;
		border-style: solid;
		border-width: 8px 0px 8px 8px;
		border-color: transparent transparent transparent rgb(255, 255, 255);
		left: 9px;
	}
	.chat .message div .emailText:before {
		position: relative;
		float: left;
		content: '';
		margin: 7px 0 0 -8px;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 8px 8px 8px 0;
		border-color: transparent #fff transparent transparent;
		right:10px;
		top: -5px;
	}
	.chat {
		border-radius: 5px;
	}
	#device {
		margin: -50px auto 0 auto;
		padding: 20px 20px 40px 20px;
		width: 350px;
		height: 100%;
		border-radius: 10px;
		border-bottom: 5px solid #222f3d;
		background: #34495e;
	}
	#device #size {
		-webkit-appearance: none;
		margin: 15px 0 0 0;
		width: 100%;
		height: 10px;
		vertical-align: middle;
		border-radius: 5px;
		background-color: #46627f;
		outline: none;
	}
	#device #size::-moz-range-track {
		margin: 15px 0 0 0;
		width: 100%;
		height: 10px;
		vertical-align: middle;
		border-radius: 5px;
		background-color: #46627f;
		outline: none;
	}
	#device #size::-webkit-slider-thumb {
		-webkit-appearance: none !important;
		height: 20px;
		width: 20px;
		background-color: #4f6f8f;
		border-radius: 50%;
	}
	#device #size::-moz-range-thumb {
		-moz-appearance: none;
		height: 20px;
		width: 20px;
		background-color: #4f6f8f;
		border-radius: 50%;
	}
	.track {
		margin: 15px 0 0 0;
		width: 100%;
		height: 10px;
		vertical-align: middle;
		border-radius: 5px;
		background-color: #46627f;
		outline: none;
	}
	.thumb {
		height: 20px;
		width: 20px;
		background-color: #4f6f8f;
		border-radius: 50%;
	}
	#drag {
		position: absolute;
		margin: 50px 0 0 -10px;
		padding: 5px 10px;
		line-height: 20px;
		text-align: center;
		font-size: 14px;
		color: #fff;
		border-radius: 5px;
		border-bottom: 2px solid #217dbb;
		background: #3498db;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
	}
	#drag:after {
		content: '';
		position: absolute;
		top: -20px;
		left: 10px;
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color: transparent transparent #3498db transparent;
	}
	#preview {
		display: none;
		margin: -100px auto 0 auto;
		padding: 0;
		width: 350px;
		height: 500px;
	}
	#preview .chat {
		background: transparent;
		overflow: hidden;
		overflow-y: hidden;
	}
	#preview .chat #text {
		color: #fff;
		font-size: 12px;
	}
	@media (max-height: 400px) {
		#device {
		display: none;
		}
		#preview {
		display: block;
		}
	}
	.giveReply{
		position: relative;
		margin-top: 10px;
		border: 1px solid #36c6d3;
		height: 28px;
		margin-left: 5%;
		display: inline-block;
	}
	.giveReply:hover{
		cursor: pointer;
	}
	.sentDate{
		display: inline-block;
		/*float: right;*/
		width: 65%;
		text-align: right;
		margin-left: 30%;
		font-size: 11px;
	}
	.sentDate i{
		color: green;
	}
	.receivedDate{
		display: block;
		margin-left: 5%;
		font-size: 11px;
	}
	.modalCloseButton{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 41px;
		text-align: center;
		background: white;
		border: none;
		border-top: 1px solid #eee;
	}
	.modalCloseButton:focus{
		outline: none;
	}
	.emailText:hover{
		cursor: pointer;
	}
	#c2611 {
		background-color: rgb(0, 200, 169);
		font-weight: bold;
		margin-top: 10px;
		margin-right: 10px;
		margin-bottom: 10px;
		margin-left: 10px;
		color: rgb(255, 255, 255);
		width: auto !important;
	}
	.ivu-collapse-content {
				overflow: auto;
				height: 250px;
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

	</style>

	<style >
	.ivu-collapse-content {
				overflow: hidden !important;
				padding: 0px;
			}
	.ulList {
				list-style-type: none ;
			}
	.ivu-collapse-content>.ivu-collapse-content-box {
		padding: 16px;
		overflow-y: auto;
	max-height: 260px;
		overflow-x: hidden;
	}
	#commentrequestinfo_comment textarea {resize: none;}
	</style>
