<template>
	<div class="container-fluid">
		<div class="form-group row">
			<div class="panel col-sm-12" id="c16894">
				<label>New CRM case</label>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="col-sm-12">
						<div class="panel" id="c16913">
							<p id="c16917">
								<i class="fa fa-file-text-o" id="c16921" aria-hidden="true"></i>
								<label
                          id="c16925">Basic attributes:</label>
							</p>
							<p>
								<Input v-model="finaldata.name" placeholder="Enter Name..." style="width: 100%"></Input>
								<!-- <input class="form-control" type="text" id="name" placeholder="Name" /> -->
							</p>
							<textarea v-model="description" placeholder="Wright description" name="editor1"></textarea>
							<!-- <p id="c16943"> -->
							<upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/"
                      	style="padding-top:15px">
								<div style="padding: 20px 0">
									<icon type="ios-cloud-upload" size="52" style="color: #3399ff"></icon>
									<p>Click or drag files here to upload</p>
								</div>
							</upload>
							<!-- <input id="c16947" name="myFile" type="file" /> -->
							<!-- </p> -->
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="col-sm-12">
						<div class="panel" id="c16961">
							<div>
								<p id="c16969">
									<i class="fa fa-users" id="c16973" aria-hidden="true"></i>
									<label id="c16977">Add Related Contact:</label>
								</p>
							</div>
							<div id="c16980">
								<p>
									<Select v-model="finaldata.config" style="width:86% !important;margin-bottom:10px" placeholder="Select Config" @on-change="configChange">
							          <Option v-for="item in mData" :value="item.id" :key="item.id" >{{ item.configName }}</Option>
							        </Select>
									<label class="col-xs-3 autoCompleteDropdown" id="c16988" style="display:none;">Customer</label>
							        <!-- <div id="CustomerName"> -->
										<auto-complete :data="customerData" :filter-method="filterMethod" placeholder="Select Customer..." v-model="finaldata.cname" style="display:none;" clearable></auto-complete>
									<!-- </div> -->
									<!-- <i-select v-model="finaldata.cname" style="width:100px"><i-option v-for="item in data" :value="item.cname" :key="item.cname">{{ item.cname }}</i-option></i-select> -->
								</p>
							</div>
						</div>
						<div class="panel" id="c17000">
							<div>
								<p id="c17008">
									<i class="fa fa-file-text-o" id="c17012" aria-hidden="true"></i>
									<label
                              id="c17016">Additional attributes:</label>
								</p>
							</div>
							<div id="c17019">
								<p>
									<label class="col-xs-3" id="c17027">Project</label>
									<Select v-model="finaldata.project" style="width:100px" filterable>
										<Option v-for="(t, inx) in momdata" :value="t.value" :key="inx">{{ t.label }}</Option>
									</Select>
								</p>
								<p>
									<label class="col-xs-3" id="c17043">Status</label>
									<Select v-model="finaldata.status" style="width:100px">
										<Option v-for="item in crmdata.crmStatus" :value="item.name" :key="item.name">{{ item.name }}</Option>
									</Select>
								</p>
								<p>
									<label class="col-xs-3" id="c17059">Assignee</label>
									<Select v-model="finaldata.assignee" style="width:100px"  filterable multiple>
										<Option v-for="(t, inx) in assigneedata" :value="t.value" :key="inx">{{ t.label }}</Option>
									</Select>
								</p>
								<!-- <p><label class="col-xs-3" id="c17075">Product line</label><Select v-model="finaldata.product_line" style="width:100px"><Option v-for="item in crmdata" :value="item.product_line" :key="item.product_line">{{ item.product_line }}</Option></Select></p> -->
								<p>
									<label class="col-xs-3" id="c17091">Contract date</label>
									<!-- <el-date-picker v-model="finaldata.contractdate" type="date" placeholder="Select date" style="width:60% !important"></el-date-picker> -->
									<!-- <form-item prop="date"> -->
									<date-picker type="date" placeholder="Select date" v-model="finaldata.contractdate" style="width:60% !important"></date-picker>
									<!-- </form-item> -->
									<!-- <input class="form-control" type="date" id="contractdate"
                              /> -->
								</p>
								<p>
									<label class="col-xs-3" id="c17104">Next Action</label>
									<!-- <el-date-picker v-model="finaldata.nextdate" type="date" placeholder="Select date" style="width:60% !important"></el-date-picker> -->
									<date-picker type="date" placeholder="Select date" v-model="finaldata.nextdate" style="width:60% !important"></date-picker>
									<!-- <input class="form-control" type="date" id="nextdate"
                              /> -->
								</p>
								<p>
									<label class="col-xs-3" id="c17117">Price</label>
									<Input v-model="finaldata.priceinput" placeholder="Enter Price..." style="width: 30%"></Input>
									<Input v-model="finaldata.price" readonly style="width: 30%"></Input>
									<!-- <i-select v-model="finaldata.price" style="width:30% !important"><i-option v-for="item in crmdata.currency" :value="item.name" :key="item.name">{{ item.name }}</i-option></i-select>                                     -->
								</p>
								<p>
									<label class="col-xs-3" id="c17139">Email</label>
									<Input v-model="finaldata.email" placeholder="Enter Email..." style="width: 60%" type="email"></Input>
									<!-- <input class="form-control" type="text" id="email" /> -->
								</p>
								<p>
									<label class="col-xs-3" id="c17152">Phone</label>
									<Input v-model="finaldata.phone" placeholder="Enter Phone..." style="width: 60%"></Input>
									<!-- <input class="form-control" type="text" id="phone" /> -->
								</p>
							</div>
						</div>
					</div>
				</div>
				<span class="panel" id="c17165">
					<Button class="form-control" id="create" :loading="loading" @click="postdata()">Create</Button>
					<!-- <button class="form-control" id="createandcontinue">Create and Continue</button> -->
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import config from '../../config/customConfig.js'
	import Cookies from 'js-cookie';
	import axios from 'axios';
	let _ = require('lodash')
	var nextdate;
	var priceinput;
	var price;
	var email;
	var phone;
	var serviceUrl = config.default.serviceUrl;

	var apiurl = config.default.serviceUrl + "contacts/";
	var databaseurl = config.default.serviceUrl + "crm-service/";
	var result;
	var result1;
	var name;
	var cname;
	var project;
	var status;
	var assignee;
	var product_line;
	var contractdate;
	var momapi = config.default.projecturl + "project"
	var databasepost = config.default.serviceUrl + "crm-case/";
	var assigneeapi = config.default.assigneeapi;

	export default {
    name: 'newcrm',
    data() {
      return {
        customerData:[],
        crmdata: [],
        loading: false,
        finaldata: {
        	name: '',
			cname: '',
      		project: '',
			status: '',
			assignee: [],
			product_line: '',
			contractdate: '',
			nextdate: '',
			priceinput: '',
			price: '',
			email: '',
			phone: '',
			config: '', 
        },
				momdata: [],
				mData: [],
				// config1: '',
				description:'',
		    assigneedata: []
     	}
    },
    methods: {
    	async calldata() {
				let self=this;
				self.customerData = [];
	    	await $.ajax({
					type: 'GET',
					url: serviceUrl +"contacts",
					data: {
                    settingId : self.finaldata.config,   
                },
					success: function (data) {
						// console.log("data>>>>>>>>>>>>>> Contacts" , data)
						data.forEach(function(contacts) {
							var cnt = contacts.data
							for (var i=0; i<cnt.length; i++) {
								// console.log("%%%%%%%%%%",cnt[i].Name)
								self.customerData.push(cnt[i].Name)
							}
						})

						// console.log(data)
					},error: function(err) {
						console.log("Error",err)
					}
				});
	        // console.log("resp data",result);
	    //     result.forEach(item => {
					// 	var customer = item.Name;
					// 	this.data.push(customer)
					// })
    	},
			init() {
				let self = this;
				axios.get(serviceUrl+"settings", {
					params: {
						isActive : true,
						user : Cookies.get('user')
					},
					headers: {
						Authorization : Cookies.get('auth_token')
					}
				})
				.then(function (response) {
					// console.log("config data list",response)
					self.mData = response.data.data;
					// self.config1 = self.mData[0].id;
					// self.calldata()    
				})
				.catch(function (error) {
					console.log(error)
					self.disabled = false;
					//Cookies.remove('auth_token') 
					self.$Message.error('Auth Error!');
					//self.$store.commit('logout', self); 
					// self.$router.push({
					//     name: 'login'
					// })
				});
			},
		configChange(data){
			console.log(data)
			$('.ivu-select-single').css("display","inline-block")
			$('.autoCompleteDropdown').css("display","inline-block")
			this.calldata(data);
		},
    	async dbdata() {
    		var self = this
    		console.log("databaseurl.....url", databaseurl)
    		await $.ajax({
    			type: 'GET',
			    url: databaseurl,
			    success: function (data) {
					result1 = data.data[0];
					console.log("databaseurl data.............." ,data)
			        self.crmdata = result1
			    },error: function(err){
			       console.log("error",err);
			    }
				});
	    },
    	async postdata() {
				let desc = CKEDITOR.instances.editor1.getData()
				this.finaldata.description = desc
				
				let self = this
				var re = /\S+@\S+\.\S+/;
				var phone_re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
				var phone = phone_re.test(self.finaldata.phone);
    		var mail = re.test(self.finaldata.email);

    		if (mail != false && phone != false) {
    			this.loading = true
					console.log("json data******123this.finaldata",this.finaldata);
    			await $.ajax({
						type: 'POST',
					    headers: {
		  					'Authorization': Cookies.get('auth_token')
		  				},
					    url: databasepost,
					    data: this.finaldata,
					    success: function (data1) {
					        result = data1;
							console.log("json data******123",result);
							self.loading = false,
							self.$Notice.success({
            					title: 'Sucess',
            					desc: 'New CRM case is Saved. ',
								duration: 4.5
          					});
							self.$router.push( "list-relationship")
					    },error: function(err){
					    	self.loading = false,
					       console.log("error",err);
					    }
					});
    		} else {
    			// alert("Enter Valid Email Address OR Phone Number")
					this.$Notice.error({
            title: 'Error',
            desc: 'Enter Valid Email Address OR Phone Number. ',
						duration: 4.5
          });
    		}

				
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
  	},
  	async projectlist() {
  		var self = this
  		await $.ajax({
  				type: 'GET',
			    url: momapi,
			    success: function (data) {
					console.log(">>>>>>>>>>>>>>> " , data)
			        result1 = data;
			        self.momdata = _.map(result1, (d) => {
			        	return {label: d.project_name, value: d.project_name}
			        })
			    },error: function(err){
			       console.log("error",err);
			    }
			});
  	},
  	async assigneelist() {
  		var self = this
  		await $.ajax({
  				type: 'GET',
  				headers: {
  					'Authorization': Cookies.get('auth_token')
  				},
			    url: assigneeapi,
			    success: function (data) {
			        result1 = data.data;
			        console.log(data)
					var myarr = []
			        _.forEach(result1, (d) => {
								if (d.hasOwnProperty('fullname')) {
									if (d.fullname !== undefined) {
										if (d.fullname !== null) {
											if (d.fullname.trim() !== '') {
												myarr.push({label: d.fullname, value: d.fullname})
											}
										}
									}
								}
			        })
							self.assigneedata = myarr
							// console.log('self.assigneedata', JSON.stringify(self.assigneedata))
			    },error: function(err){
			       console.log("error",err);
			    }
			});
  	}
    },
    mounted() {
		this.finaldata.price = "$";
    	CKEDITOR.replace("editor1"),
    	this.init(),
    	this.dbdata()
    	this.projectlist()
    	this.assigneelist()
	}
}

	</script>
	<style scoped>
	* {
	    box-sizing: border-box;
	}
	body {
	    margin: 0;
	}
	.ivu-date-picker-header {
		height: 32px;
	    line-height: 32px;
	    text-align: center;
	    border-bottom: 1px solid #e9eaec;
	    width: 120% !important;
	}
	.ivu-picker-panel-content {
		width: 120% !important;
	}
	.row {
	    display: table;
	    padding-top: 10px;
	    padding-right: 10px;
	    padding-bottom: 10px;
	    padding-left: 10px;
	    width: 100%;
	}
	.ivu-select {
		width: 60% !important;
	}
	.crm{
		margin-bottom: 10px;
	}
	div {
		border-radius: 4px !important;
	}
	p {
	    margin: 20px 0 !important
	}
	label{
		font-weight: 700 !important;
	}
	.row {
	    display: table;
	    padding-top: 10px;
	    padding-right: 10px;
	    padding-bottom: 10px;
	    padding-left: 10px;
	    width: 100%;
	}
	.gjs-am-file-uploader > form {
	    min-height: 325px !important;
	}
	* {
	    box-sizing: border-box;
	}
	body {
	    margin-top: 0px;
	    margin-right: 0px;
	    margin-bottom: 0px;
	    margin-left: 0px;
	}
	#c16878 {
	    display: block;
	    width: 100%;
	    vertical-align: middle;
	    padding-top: 10px;
	    padding-right: 10px;
	    padding-bottom: 10px;
	    padding-left: 10px;
	    margin-top: 5px;
	    margin-right: 5px;
	    margin-bottom: 5px;
	    margin-left: 5px;
	}
	#c16894 {
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	}
	#c16913 {
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	}
	#c16917 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}
	#c16921 {
	    margin-right: 10px;
	}
	#c16925 {
	    color: rgb(115, 135, 156);
	}
	#name {
	    width: 100%;
	}
	#c16943 {
	    margin-top: 10px;
	    border-top-width: 2px;
	    border-right-width: 2px;
	    border-bottom-width: 2px;
	    border-left-width: 2px;
	    border-top-style: dashed;
	    border-right-style: dashed;
	    border-bottom-style: dashed;
	    border-left-style: dashed;
	    border-top-color: rgb(199, 199, 199);
	    border-right-color: rgb(199, 199, 199);
	    border-bottom-color: rgb(199, 199, 199);
	    border-left-color: rgb(199, 199, 199);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	    height: 50px;
	}
	#c16947 {
	    margin-top: 10px;
	    margin-left: 20px;
	}
	#c16961 {
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	}
	#c16969 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}
	#c16973 {
	    margin-right: 10px;
	}
	#c16977 {
	    color: rgb(115, 135, 156);
	}
	#c16980 {
	    margin-left: 40px;
	}
	#c16988 {
	    color: rgb(115, 135, 156);
	}
	#customer {
	    width: 60%;
	}
	#c17000 {
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	}
	#c17008 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}
	#c17012 {
	    margin-right: 10px;
	}
	#c17016 {
	    color: rgb(115, 135, 156);
	}
	#c17019 {
	    margin-left: 40px;
	}
	#c17027 {
	    color: rgb(115, 135, 156);
	}
	#project {
	    width: 60%;
	}
	#c17043 {
	    color: rgb(115, 135, 156);
	}
	#status {
	    width: 60%;
	}
	#c17059 {
	    color: rgb(115, 135, 156);
	}
	#assignee {
	    width: 60%;
	}
	#c17075 {
	    color: rgb(115, 135, 156);
	}
	#product_line {
	    width: 60%;
	}
	#c17091 {
	    color: rgb(115, 135, 156);
	}
	#contractdate {
	    width: 60%;
	}
	#c17104 {
	    color: rgb(115, 135, 156);
	}
	#nextdate {
	    width: 60%;
	}
	#c17117 {
	    color: rgb(115, 135, 156);
	}
	#priceinput {
	    width: 30%;
	}
	#price {
	    width: 30%;
	}
	#c17139 {
	    color: rgb(115, 135, 156);
	}
	#email {
	    width: 60%;
	}
	#c17152 {
	    color: rgb(115, 135, 156);
	}
	#phone {
	    width: 60%;
	}
	#c17165 {
	    width: -webkit-fill-available;
	    text-align: -webkit-center;
	    display: -webkit-inline-box;
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	    margin-left: 15px;
	    margin-right: 15px;
	}
	#create {
	    font-weight: bold;
	    margin-top: 10px;
	    margin-right: 10px;
	    margin-bottom: 10px;
	    margin-left: 10px;
	    background-color: rgb(0, 200, 169);
	    color: white;
	    width: auto;
	}
	#createandcontinue {
	    font-weight: bold;
	    background-color: rgb(237, 237, 237);
	    color: rgb(83, 90, 115);
	    width: auto;
	}
	#c22229 {
	    display: block;
	    width: 100%;
	    vertical-align: middle;
	    padding-top: 10px;
	    padding-right: 10px;
	    padding-bottom: 10px;
	    padding-left: 10px;
	    margin-top: 5px;
	    margin-right: 5px;
	    margin-bottom: 5px;
	    margin-left: 5px;
	}
	#c22245 {
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	}
	#c22264 {
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	}
	#c22268 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}
	#c22272 {
	    margin-right: 10px;
	}
	#c22276 {
	    color: rgb(115, 135, 156);
	}
	#c22294 {
	    margin-top: 10px;
	    border-top-width: 2px;
	    border-right-width: 2px;
	    border-bottom-width: 2px;
	    border-left-width: 2px;
	    border-top-style: dashed;
	    border-right-style: dashed;
	    border-bottom-style: dashed;
	    border-left-style: dashed;
	    border-top-color: rgb(199, 199, 199);
	    border-right-color: rgb(199, 199, 199);
	    border-bottom-color: rgb(199, 199, 199);
	    border-left-color: rgb(199, 199, 199);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	    height: 50px;
	}
	#c22298 {
	    margin-top: 10px;
	    margin-left: 20px;
	}
	#c22312 {
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	}
	#c22320 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}
	#c22324 {
	    margin-right: 10px;
	}
	#c22328 {
	    color: rgb(115, 135, 156);
	}
	#c22331 {
	    margin-left: 40px;
	}
	#c22339 {
	    color: rgb(115, 135, 156);
	}
	#c22351 {
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	}
	#c22359 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}
	#c22363 {
	    margin-right: 10px;
	}
	#c22367 {
	    color: rgb(115, 135, 156);
	}
	#c22370 {
	    margin-left: 40px;
	}
	#c22378 {
	    color: rgb(115, 135, 156);
	}
	#c22394 {
	    color: rgb(115, 135, 156);
	}
	#c22410 {
	    color: rgb(115, 135, 156);
	}
	#c22426 {
	    color: rgb(115, 135, 156);
	}
	#c22442 {
	    color: rgb(115, 135, 156);
	}
	#c22455 {
	    color: rgb(115, 135, 156);
	}
	#c22468 {
	    color: rgb(115, 135, 156);
	}
	#c22490 {
	    color: rgb(115, 135, 156);
	}
	#c22503 {
	    color: rgb(115, 135, 156);
	}
	#c22516 {
	    width: -webkit-fill-available;
	    text-align: -webkit-center;
	    display: -webkit-inline-box;
	    padding-top: 10px;
	    padding-right: 17px;
	    padding-bottom: 10px;
	    padding-left: 17px;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: rgb(241, 241, 241);
	    border-top-width: 1px;
	    border-right-width: 1px;
	    border-bottom-width: 1px;
	    border-left-width: 1px;
	    border-top-style: solid;
	    border-right-style: solid;
	    border-bottom-style: solid;
	    border-left-style: solid;
	    border-top-color: rgb(230, 233, 237);
	    border-right-color: rgb(230, 233, 237);
	    border-bottom-color: rgb(230, 233, 237);
	    border-left-color: rgb(230, 233, 237);
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	    margin-left: 15px;
	    margin-right: 15px;
	}
	.form-control {
	    display: unset !important;
	}
	.col-xs-3 {
	    float: none;
	}
</style>
