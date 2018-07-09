<template>
	<div class="container" id="c2185">
		<div class="panel col-sm-12" id="c22272">
			<label>Edit CRM Case</label>
		</div>
		<div class="col-sm-12">
			<div class="col-sm-12" id="c22272">
				<div class="panel" id="c22351">
					<div>
						<i class="fa fa-file-text-o"  aria-hidden="true"></i>
						<label>Basic attributes:</label>
					</div>
					<div class="col-sm-6" id="c22370">
						<div class="form-group">
							<div class="row" id="c2246">
								<div class="col-xs-4 text-right">
									<label id="c22378">Name</label>
								</div>
								<div class="col-xs-8">
									<Input v-model="finaldata.name" readonly style="background-color: white;"></Input>
									<!--    <input class="form-control" type="text" id="name" style="background-color: white;"/> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-12" id="c22272">
				<div class="panel" id="c22351">
					<div>
						<i class="fa fa-file-text-o" id="c22363" aria-hidden="true"></i>
						<label id="c22367">Additional attributes:</label>
					</div>
					<div class="col-sm-6" id="c22370">
						<div class="form-group">
							<div class="row" id="c2304">
								<div class="col-xs-4 text-right">
									<label id="c22378">Project</label>
								</div>
								<div class="col-xs-8">
									<Select v-model="finaldata.project" filterable>
										<Option v-for="(t, inx) in momdata" :value="t.value" :key="inx">{{ t.label }}</Option>
									</Select>
									<!-- <i-select v-model="finaldata.project" filterable><i-option v-for="item in momdata" :value="item.project_name" :key="item.project_name">{{ item.project_name }}</i-option></i-select> -->
									<!-- <select class="form-control" id="project"><option>Select</option></select> -->
								</div>
							</div>
						</div>
            <div class="form-group">
              <div class="row">
                <div class="col-xs-4 text-right">
                  <label id="c22339">Customer Config</label>
                </div>
                <div class="col-xs-8">
                  <Select v-model="finaldata.config" placeholder="Select Config" @on-change="configChange">
                    <Option v-for="item in mData" :value="item.id" :key="item.id" >{{ item.configName }}</Option>
                  </Select>
                  <!-- <auto-complete :data="customerData" :filter-method="filterMethod" placeholder="Select Customer..." v-model="finaldata.cname" clearable></auto-complete> -->
                  <!-- <select class="form-control" id="customer"><option>Select</option></select> -->
                </div>
              </div>
            </div>
						<div class="form-group">
							<div class="row">
								<div class="col-xs-4 text-right">
									<label id="c22339">Customer</label>
								</div>
								<div class="col-xs-8">
                  <Select v-model="finaldata.cname" class="customer">
										<!-- <div v-if="domainConfig=='Xero'"> -->
											<Option v-for="item in customerData" :value="item.Name" :key="item.id">{{ item.Name }}</Option>
										<!-- </div> -->
										<!-- <div v-if="domainConfig=='custom'">
											<Option v-for="item in customerData" :value="item.Name" :key="item.id">{{ item.Name }}</Option>
										</div>
										<div v-if="domainConfig=='QB'">
											<Option v-for="item in customerData" :value="item.DisplayName" :key="item.id">{{ item.DisplayName }}</Option>											
										</div> -->
									</Select>
								<!--	<auto-complete :data="customerData" :filter-method="filterMethod" placeholder="Select Customer..." v-model="finaldata.cname" clearable></auto-complete>
									 <select class="form-control" id="customer"><option>Select</option></select> -->
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-xs-4 text-right">
									<label id="c22394">Status</label>
								</div>
								<div class="col-xs-8">
									<Select v-model="finaldata.status">
										<Option v-for="item in crmdata.crmStatus" :value="item.name" :key="item.name">{{ item.name }}</Option>
									</Select>
									<!-- <i-select v-model="finaldata.status" ><i-option v-for="item in crmdata.crmStatus" :value="item.name" :key="item.name">{{ item.name }}</i-option></i-select> -->
									<!-- <select class="form-control" id="status"><option>Select</option></select> -->
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-xs-4 text-right">
									<label id="c22410">Assignee</label>
								</div>
								<div class="col-xs-8">
									<Select v-model="finaldata.assignee" filterable multiple>
										<Option v-for="(t, inx) in assigneedata" :value="t.value" :key="inx">{{ t.label }}</Option>
									</Select>
								</div>
							</div>
						</div>
						<!--  <div class="form-group"><div class="row"><div class="col-xs-4 text-right"><label id="c22426">Product line</label></div><div class="col-xs-8"><Select v-model="finaldata.product_line"><Option v-for="item in crmdata" :value="item.product_line" :key="item.product_line">{{ item.product_line }}</Option></Select><i-select v-model="finaldata.product_line"><i-option v-for="item in crmdata" :value="item.product_line" :key="item.product_line">{{ item.product_line }}</i-option></i-select><select class="form-control" id="product_line"><option>Select</option></select></div></div></div> -->
					</div>
					<div class="col-sm-6">
						<div class="form-group">
							<div class="row" id="c2448">
								<div class="col-xs-4 text-right">
									<label id="c22442">Contract date</label>
								</div>
								<div class="col-xs-8">
									<date-picker type="date" placeholder="Select date" v-model="finaldata.contractdate" style="width:100% !important"></date-picker>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-xs-4 text-right">
									<label id="c22455">Next Action</label>
								</div>
								<div class="col-xs-8">
									<date-picker type="date" placeholder="Select date" v-model="finaldata.nextdate" style="width:100% !important"></date-picker>
									<!-- <el-date-picker v-model="finaldata.nextdate" type="date" placeholder="Select date" style="width:60% !important"></el-date-picker> -->
									<!-- <input class="form-control" type="date" id="nextdate" /> -->
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-xs-4 text-right">
									<label id="c22468">Price</label>
								</div>
								<div class="col-xs-8">
									<Input v-model="finaldata.priceinput" placeholder="Enter Price..." style="width: 58%"></Input>
									<Input v-model="finaldata.price" readonly style="width: 40%"></Input>
									<!-- <Input v-model="value10" style="background-color: white;"></Input> -->
									<!-- <select class="form-control" id="price"><option>Select</option></select> -->
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-xs-4 text-right">
									<label id="c22490">Email</label>
								</div>
								<div class="col-xs-8">
									<Input v-model="finaldata.email" placeholder="Enter Email..." type="email"></Input>
									<!-- <Input v-model="value10" style="background-color: white;"></Input> -->
									<!-- <input class="form-control" type="email" id="email" /> -->
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-xs-4 text-right">
									<label id="c22503">Phone</label>
								</div>
								<div class="col-xs-8">
									<Input v-model="finaldata.phone" placeholder="Enter Phone..." ></Input>
									<!-- <Input v-model="value10" style="background-color: white;"></Input> -->
									<!-- <input class="form-control" type="text" id="phone" /> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-12" id="c22272">
				<Tabs>
					<TabPane label="Notes:" icon="edit">
						<textarea name="editor1"></textarea>
						<div id="c2597">
              <div v-if="finaldata.fileupload" style="padding:10px"> 
                <Table border stripe :columns="columns1" :data="data1"></Table>             
                <!-- <div v-for="item in finaldata.fileupload" style="margin-top: 10px;margin-left: 20px;"><a :href="item.url">{{item.filename}}</a></div> -->
              </div>
              <div v-else>    
              </div>
  							<Upload id="fileUpload":before-upload="handleUpload" action='' :show-upload-list="uploadlist" style="padding:10px"> 
                <Button type="ghost" icon="ios-cloud-upload-outline">Select new file </Button>
              </Upload> 
                <div v-if="file !== ''" style="padding:10px">Selected file: {{ file.name }} 
                  <Button @click="removefile()" type="ghost" shape="circle" icon="android-close"></Button>
                </div>
                <!--<div v-if="file !== ''"><Button type="ghost" @click="removefile()">Remove</Button></div>-->
						</div>
					</TabPane>
					<TabPane label="Comments:" icon="ios-information-outline">
						<!-- <div><button class="form-control" id="c2611" style="float: right;margin-top:0px !important">New Comment</button></div> -->
						<comment></comment>
						<!-- <span>You Don't have any Comments</span> -->
					</TabPane>
					<!-- <TabPane label="History:" icon="ios-list">456</TabPane> -->
				</Tabs>
				<!-- <div class="panel" id="c22351"><div class="panel"><i class="fa fa-pencil" aria-hidden="true"></i><label id="c22367">Notes:</label></div><textarea name="editor1"></textarea><div id="c2597"><input id="c2601" type="file" name="myFile" /></div></div> -->
			</div>
			<div id="c2607">
				<Button class="form-control" id="c2611" @click="postdata()" :loading="loading">Save</Button>
			</div>
		</div>
	</div>
</template>

<script>
  import comment from './comment.vue'
  import config from '../../config/customConfig.js'
  import Cookies from 'js-cookie';
  import moment from 'moment';
  import psl from 'psl';
  let axios = require('axios'); 
  let _ = require('lodash');
  var nextdate;
  var priceinput;
  var price;
  var email;
  var phone;
  var serviceUrl = config.default.serviceUrl;

  // var apiurl = config.default.serviceUrl + "contacts/";
  // var databaseurl = config.default.serviceUrl + "crm-service/";
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
    name: 'editcrm',
    components: {
        comment
    },
    data() {
      return {
        domainConfig: '',
        customerData:[],
        loading: false,
        crmdata: {},
	uploadlist:false,
        file:'',
        finaldata: {
          name: '',
          cname: '',
          project: '',
          status: '',
          assignee: [],
          product_line: '',
          fileupload: [],
          contractdate: '',
          nextdate: '',
          priceinput: '',
          price: '',
          email: '',
          phone: '', 
        },
        columns1: [
          {
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: 'Uploaded File',
            key: 'filename'
          },
          {
              title: 'Action',
              key: 'Status',
              align: 'center',
              width: 150,
              render: (h, params) => {   
              console.log('params--------->',params)            
                  return h('div', [
                    h('Tooltip', {
                        props: {
                          placement: 'top',
                          content: 'Download'
                        },
                        style:{
                          cursor:'pointer'
                        }
                      }, [
                          h('Button', {
                            props: {
                              type: 'text',
                              size: 'large',
                              icon: 'ios-cloud-download-outline'
                            },
                            style: {
                              color: '#2d8cf0',
                              fontSize:'20px'
                            },
                            on: {
                              click: () => {
                                // console.log(params)
                                // window.location.href = params.row.url;
                                this.DownloadFile(params.row.url);
                              }
                          }
                        })
                      ]),               
                    h('Tooltip', {
                        props: {
                          placement: 'top',
                          content: 'Delete Your File'
                        },
                        style:{
                          cursor:'pointer'
                        }
                      }, [
                          h('Button', {
                            props: {
                              type: 'text',
                              size: 'large',
                              icon: 'android-delete'
                            },
                            style: {
                              color: 'red',
                              fontSize:'20px'
                            },
                            on: {
                              click: () => {
                                // this.flag = true
                                this.DeleteFile(params,this.finaldata.id)
                              }
                          }
                        })
                      ])             
                  ])
              }
            }
        ],
        data1:[],
        momdata: [],
        mData: [],
        description:'',
        assigneedata: [],
        question: ''
      }
    },
    methods: {
      DownloadFile(url) {
        // Get file name from url.
        var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0]
        var xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = function() {
          var a = document.createElement('a')
          a.href = window.URL.createObjectURL(xhr.response) // xhr.response is a blob
          a.download = filename // Set the file name.
          a.style.display = 'none'
          document.body.appendChild(a)
          a.click()
        }
        xhr.open('GET', url)
        xhr.send()
      },
      removefile(){
				this.file = ''
			},
      async handleUpload (file) {
        var self = this
        console.log('file',file)
        if(file.size >= 1e+8){
					this.$Notice.error({
            title: 'File Limit',
            desc: 'File size should be less than or equal to 100mb. ',
						duration: 4.5
				  });
          self.removefile()
					return true
				}
        self.file = file
        return false;
      },
      async showdata() {
        var self = this;
        self.$Loading.start()
        // var result = await (
          await axios.get(databasepost  + this.$route.params.id).then(res => {
            console.log('Response >>>>>>>>>>>>>>> ', JSON.stringify(res.data))
            console.log("==========-----------subscriptionId",res.data.subscriptionId,Cookies.get('subscriptionId'))
            if (res.data.subscriptionId !== Cookies.get('subscriptionId')) {
                self.$router.push("/relationship/list-relationship")
            }
            else {
              self.finaldata = res.data
              // self.finaldata.cname = ''
              self.finaldata.contractdate = moment(self.finaldata.contractdate).format('YYYY-MM-DD')
              self.finaldata.nextdate = moment(self.finaldata.nextdate).format('YYYY-MM-DD')
              if(self.finaldata.fileupload != undefined){
                self.data1 = self.finaldata.fileupload;
              }
              CKEDITOR.instances.editor1.setData(self.finaldata.description)
              self.calldata()
            }
           // return res.data
          }).catch(error => {
            console.log('Error >>>>>>>>>>>>>>', error)
            if(error.message == 'Network Error'){
                self.$Notice.error({
                    title: "Error",
                    desc: 'API service unavailable',
                    duration: 10
                })
            }else if(error.response.status == 401){
              
                let location = psl.parse(window.location.hostname)
                location = location.domain === null ? location.input : location.domain
                
                Cookies.remove('auth_token' ,{domain: location}) 
                self.$store.commit('logout', self);
                
                self.$router.push({
                    name: 'login'
                });
                self.$Notice.error({
                    title: error.response.data.name,
                    desc: error.response.data.message,
                    duration: 10
                })
            }
            else if(error.response.status == 403){
                self.$Notice.error({
                    duration:0, 
                    title: error.response.statusText,
                    desc:error.response.data.message+'. Please <a href="'+configService.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                });
            }else {
                self.$Notice.error({
                    title: error.response.data.name,
                    desc: error.response.data.message,
                    duration: 10
                })
            }
          })
          //)
        console.log('RESULT ..................', self.finaldata)
        
      },
      configChange (data) {
        this.customerData = []
        this.calldata(data);
      },
      async calldata(id) {
        let resp
        let self = this
        if(id){
          var settingId = id
        } else {
          var settingId = self.finaldata.config
        }
        await axios({
          method:'get',
          url: config.default.serviceUrl + 'settings/'+settingId,
          headers:{
            Authorization : Cookies.get('auth_token'),
            subscriptionId : Cookies.get('subscriptionId')
          }
        })
        .then(async function(response) {
          console.log("%%%%%%%%%%%%%%%%%%%response",response)
          self.domainConfig=response.data.domain 
          if(response.data.domain == 'custom'){
            self.customCustomerUrl = response.data.customer_url;
            self.customInvoiceUrl = response.data.invoice_url;
            
            await axios({
              method: 'get',
              url: self.customCustomerUrl,
              params : {settingId : response.data.id},
              headers:{
                Authorization : Cookies.get('auth_token')
              }
            })
            .then(function (response) {
              console.log(response)
              resp = response.data.data
              self.customerData = resp
              console.log("self.customerData", self.customerData)
            })
            .catch(function (error) {
              console.log(error.response)
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
              // self.$Message.error(error.response.data.data[0].message)
            });

          }else{
            await axios({
              method: 'get',
              url: config.default.serviceUrl + 'contacts',
              params: {
                settingId : settingId
              },
              headers:{
                  Authorization : Cookies.get('auth_token'),
              },
            })
            .then(function (response) {
              console.log("contact response",response);
							// resp = response.data
							// self.customerData = _.sortBy(resp[0].data,['Name']);
							if (response.data[0].data.hasOwnProperty('data')) {
								if (response.data[0].data.data.oauth_problem) {
									self.$Notice.error({
										title: 'Xero: Account Credential Incorrect',
										desc: 'Invalid key for <b>'+configName+'</b>',
										duration: 10
									})
								}
							}
							else {
								let cnt;
								let contacts = response.data[0];
								for (let i=0; i<contacts.data.length; i++) {
									if (contacts.data[i].DisplayName) {
										cnt = {
											id : contacts.data[i].Id,
											Name : contacts.data[i].DisplayName
										}
									}
									else {
										cnt = {
											id : contacts.data[i].ContactID,
											Name : contacts.data[i].Name
										}
									}
									self.customerData.push(cnt)
								}
							}
              // resp = response.data
              // self.customerData = resp[0].data
              console.log('---------self.customerData',self.customerData)
            })
            .catch(function (error) {
              console.log(error);
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
            });
          }
        })
        .catch(function (error) {
          console.log("error",error);
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
        });
        console.log("response------>iuy",self.customerData);
      },
      async dbdata() {
        var self = this
        await $.ajax({
          url: serviceUrl + "crm-service/",
          success: function (data) {
              result1 = data.data[0];
              self.crmdata = result1
          },error: function(error){
            console.log("error",error);
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
          }
        });
        console.log("json data databaseurl",result1);
      },
      async projectlist() {
        var self = this
        await $.ajax({
            url: momapi,
            success: function (data) {
            console.log(">>>>>>>>>>>>>>> " , data)
                result1 = data;
                self.momdata = _.map(result1, (d) => {
                  return {label: d.project_name, value: d.project_name}
                })
            },error: function(error){
              console.log("error",error);
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
            }
        });
      },
      async assigneelist() {
        var self = this
        await $.ajax({
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
                        let checkname = _.findIndex(myarr,{value: d.fullname})
                        if (checkname === -1) {
                          myarr.push({label: d.fullname, value: d.fullname})
                        }
                      }
                    }
                  }
                }
              })
              self.assigneedata = _.sortBy(myarr,['value']);
              self.$Loading.finish();
          },error: function(error){
            console.log("error",error);
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
          }
        });
      },  
      async postdata() {
        let self = this
        let desc = CKEDITOR.instances.editor1.getData()
        self.finaldata.description = desc
        var re = /\S+@\S+\.\S+/;
        var phone_re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
        var phone = phone_re.test(self.finaldata.phone);
        var mail = re.test(self.finaldata.email);
        if(self.finaldata.assignee != "" && self.finaldata.cname != ""){
          if (mail != false && phone != false) {
            this.loading = true
              var file = this.file
              console.log('uuuuuu',file)
              if(file != ''){
                if(this.finaldata.fileupload != undefined){
                  var noOfFiles = this.finaldata.fileupload.length
                  console.log('&&&&&&&&&&&&',noOfFiles)
                }else{
                  var noOfFiles = 0
                }
                if(noOfFiles < 5){
                  var reader = new FileReader();
                  reader.readAsDataURL(file);
                  // console.log('reader',reader);
                  reader.addEventListener("load", async function () {
                    console.log('uuuuuu',file.name)
                    var fileupObj = {
                      "filename":file.name,
                      "url":reader.result
                    }
                    if(self.finaldata.fileupload == undefined){
                      self.finaldata['fileupload'] = []
                      
                    }
                    console.log('**************************************',self.finaldata)
                    self.finaldata.fileupload.push(fileupObj);
                    await $.ajax({
                      type: 'PATCH',
                      url: databasepost + self.$route.params.id,
                      headers:{
                        Authorization : Cookies.get('auth_token')
                      },
                      data: self.finaldata,
                      success: function (data1) {
                        result = data1;
                        self.loading = false
                        self.$Notice.success({
                                title: 'Sucess',
                                desc: 'Edit CRM case is Saved. ',
                          duration: 4.5
                              });
                        console.log("json data******123",result);
                        self.$router.push("/relationship/list-relationship")
                      },error: function(error){
                        self.loading = false,
                          console.log("error",error);
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
                              title: error.responseJSON.name,
                              desc: error.responseJSON.message,
                              duration: 10
                            })
                          }
                        }
                    });
                });
                }
                else{
                  this.$Message.error('You can not add more than 5 files');
                  this.loading = false
                }
              }else{

                console.log("running else condition")
                console.log("**********************",self.finaldata);
                await $.ajax({
                      type: 'PATCH',
                      url: databasepost + self.$route.params.id,
                      headers:{
                        Authorization : Cookies.get('auth_token')
                      },
                      data: self.finaldata,
                      success: function (data1) {
                        result = data1;
                        self.loading = false
                        self.$Notice.success({
                                title: 'Sucess',
                                desc: 'Edit CRM case is Saved. ',
                          duration: 4.5
                              });
                        console.log("json data******123",result);
                        self.$router.push("/relationship/list-relationship")
                      },error: function(error){
                        self.loading = false,
                          console.log("error",error);
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
                              title: error.responseJSON.name,
                              desc: error.responseJSON.message,
                              duration: 10
                            })
                          }
                        }
                    });
              }
          } else {
            self.$Notice.error({
              title: "Error",
              desc: "Enter Valid Email Address OR Phone Number",
              duration:4.5
            })
          }
        }else{
					this.$Notice.error({
							title: 'Error',
							desc: 'Please Select Customer OR Assignee. ',
							duration: 4.5
						});
				}		
      },
      init() {
        let self = this;
        axios.get(serviceUrl+"settings", {
          // params: {
          //   isActive : true
          //   // user : Cookies.get('user')
          // },
          headers: {
            Authorization : Cookies.get('auth_token'),
            subscriptionId : Cookies.get('subscriptionId')
          }
        })
        .then(function (response) {
          self.mData = response.data.data;
          console.log("config data list................self.mData",self.mData)
          // self.config1 = self.mData[0].id;
          // self.calldata()    
        }).catch(error => {
            console.log("-------",error);
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
                    duration: 4.5
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
      async DeleteFile(params,id){
        let self = this
        console.log('params',params)
        console.log('id------->',id)
        // console.log(this.data1)
        // let arr = _.filter(this.data1, function(num){ return num.filename = params.filename });
        // console.log(arr)
        this.$Modal.confirm({
          okText: 'OK',
          cancelText: 'Cancel',
          title: 'Title',
          content: '<p>Are you sure to delete?<p>',
          onOk: () => {
            $.ajax({
              type: 'patch',
              url: databasepost+id,
              headers: {
                Authorization : Cookies.get('auth_token')
              },
              data: params.row,
              success: function (data11) {
                console.log("json data******123",data11);
                self.$Notice.success({
                  title: 'Sucess',
                  desc: 'File successfully deleted ',
                  duration: 4.5
                });
               
                  self.data1 = data11.fileupload
                  self.finaldata.fileupload = data11.fileupload
                
                //self.data1.splice()
              },error: function(error){
                  console.log("error",error);
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
                          duration: 4.5
                      })
                  }else {
                      self.$Notice.error({
                          title: error.response.data.name,
                          desc: error.response.data.message,
                          duration: 10
                      })
                  }
                }
            });
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        })
      }
  },
    mounted() {
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^', databasepost)
      CKEDITOR.replace("editor1");
      console.log("this.$route.params.id", this.$route.params.id)
      this.showdata()
      this.init()
      this.dbdata()
      this.projectlist()
      this.assigneelist()
    },
     watch: {
        '$route': {
            // alert('route change');
        }
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
  .panel {
    background-color: #f6f6f6 !important;
  }
  .row {
      display: table;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      width: 100%;
  }
  .row {
      display: table;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      width: 100%;
  }
  div {
      border-radius: 4px !important;
    }
  label{
      font-weight: 700 !important;
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
  #c22272{
    background-color: #f6f6f6 !important;
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
    border-image-repeat: initial
  }
  #c2185 {
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
  #c2246 {
      margin-top: 15px !important;
  }
  #c2304 {
      margin-top: 15px !important;
  }
  #c2448 {
      margin-top: 15px !important;
  }
  #c2597 {
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
  }
  #c2601 {
      margin-top: 10px;
      margin-left: 20px;
  }
  #c2607 {
      text-align: -webkit-center;
  }
  #c2611 {
      background-color: rgb(0, 200, 169);
      font-weight: bold;
      margin-top: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      margin-left: 10px;
      color: rgb(255, 255, 255);
      width: auto;
  }
  .form-control {
      display: unset !important;
  }
  .ivu-upload-list{
		display: none;
	}
</style>