<template>
	<Row>
		<Col span="12" offset="6">
			<Card style="padding:10px;">
				<p slot="title">Add New Invoice</p>
				<Form :model="formItem" label-position="left" :label-width="140"  :rules="rulesValidation" ref="formItem">
					<FormItem label="Configuration Name" prop="configuration">
						<Select v-model="formItem.configuration" style="width:100%" @on-change="configChange">
						<Option  v-for="item in configs" :value="item.id" :key="item">{{ item.configName }} ({{item.domain}})</Option>
						</Select>
					</FormItem>
					<FormItem label="Contact Name" prop="name" id="CustomerName" style="display:none;">
						<Select v-model="formItem.name" style="width:100%">
						<Option v-for="item in data2" :value="item.Name" :key="item">{{ item.Name }}</Option>
						</Select>
					</FormItem>
					<!--<FormItem label="Project">
						<AutoComplete v-model="formItem.selectProject" :data="data3" :filter-method="filterMethod" placeholder="input here" clearable>
						</AutoComplete>
					</FormItem>-->
          <FormItem label="Product Name" prop="title">
						<Input v-model="formItem.title" placeholder="Enter Product Name" style="width:100%"></Input>
					</FormItem>
          <FormItem label="Product sku" prop="sku">
						<Input v-model="formItem.sku" placeholder="Enter Product sku" style="width:100%"></Input>
					</FormItem>
					<FormItem label="Description" prop="description">
						<Input v-model="formItem.description" type="textarea"  placeholder="Enter Description"></Input>
					</FormItem>
					<FormItem label="Due Date" prop="duedate">
						<DatePicker type="date" :options="options3" placeholder="Select date" v-model="formItem.duedate"></DatePicker>
					</FormItem>
					<!--<FormItem label="Quantity" prop="qty">
						<Input v-model="formItem.qty" placeholder="Enter Quantity" style="width:100%"></Input>
					</FormItem>-->
          <FormItem label="Quantity" prop="qty">
            <Input v-model="formItem.qty" placeholder="Enter Quantity" style="width:100%" number></Input>
          </FormItem>
					<FormItem label="Unit Amount" :input-width="40">
						<Row>
						<Col span="12">
							<FormItem prop="amount1">
							<Input v-model="formItem.amount1" placeholder="Enter Amount"></Input>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem prop="selectamount">
							<Select v-model="formItem.selectamount">
							<Option v-for="item in currency" :value="item.value" :key="item.value">{{ item.label}}</Option>
							</Select>
							</FormItem>
						</Col>
						</Row>        
					</FormItem>
          <FormItem>
            <div style="text-align:center;">
              <Button type="primary" @click="InvoiceSubmit('formItem')" :loading="loading">Submit</Button>
              <Button type="ghost" style="margin-left: 8px" @click="Cancel('formItem')">Reset</Button>
            </div>
          </FormItem>
				</Form>
			</Card>
		</Col>
	</Row>
</template>

<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import Cookies from 'js-cookie';
import _ from 'lodash'
import psl from 'psl';
export default {
  name: 'newinvoice',
  data () {
    const validateQty = (rule, value, callback) => {
        console.log("----------------value",value, typeof value)
        if (value === '') {
          callback(new Error('Quantity is required'));
        } else {
          if (!Number.isInteger(value)) {
            callback(new Error('Please enter a Numeric value'));
          } else {
            if (value < this.qtyrule.min) {
              callback(new Error('Quantity must be greater than or equal to ' + this.qtyrule.min));
            } else if (value > this.qtyrule.max){
              callback(new Error('Max allowed ' + this.qtyrule.max));
            } else {
              callback();
            }
          }
        }
    };
    const validateNum = async(rule, value, callback) => {
      let patt = new RegExp('^[1-9]+$')
      let _res = patt.test(value)
      if (!_res) {
        callback(new Error('Not Allowed Special Character'))
      } else {
        callback();
      }
    };
    const validateAmount = async(rule, value, callback) => {

      let patt = new RegExp('^(-?0[.]\\d+)$|^(-?[1-9]+\\d*([.]\\d+)?)$|^0$')
      let _res = patt.test(value)
      if (!_res) {
        callback(new Error('Not Allowed Special Character'))
      } else {
        callback();
      }
    };
    // const validateBlank = async(rule, value, callback) => {
          //   let blankPatt = /^\S*$/g
          //   console.log("------------value", typeof value)
          //   let blankTest = value.match(blankPatt)
          //   console.log("======================_res",blankTest);
          //   if (!blankTest) {
          //     callback(new Error('Password Does not Allow Spaces'))
          //   } else {
          //     callback();
          //   }
          // };
    const validateBlank = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Space is not allowed'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      customCustomerUrl:"",
      customInvoiceUrl:"",
      qtyrule: {
        min: 1,
        max: 99999
      },
      formItem: {
        domain: 'Xero',
        name: '',
        duedate: '',
        config: '',
        title:'',
        sku:'',
        description: '',
        qty: '',
        // amount:'',
        amount1: '',
        selectamount: '',
        selectProject: ''
      },
      options3: {
          disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;
          }
      },
      data3: [],
      data2: [],
      data4: [],
      configs:[],
      currency: [{
        value: '$',
        label: '$'
      }],
      rulesValidation: {
          configuration : [
              {required: true, message: 'Please select the Configuration account', trigger: 'change'}
          ],
          name: [
             { required: true, message: 'Please select the customer name', trigger: 'change' }
          ],
          title: [
              { required: true, message: 'Title cannot be empty', validator: validateBlank, trigger: 'blur' }
          ],
          sku: [
              { required: true, message: 'sku cannot be empty', validator: validateBlank, trigger: 'blur' }
          ],
          description: [
              { required: true, message: 'Description cannot be empty', validator: validateBlank, trigger: 'blur' }
          ],
          duedate: [
              { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
          ],
          qty: [
              { required: true, validator: validateQty, trigger: 'blur' }
          ],
          amount1: [
              { required: true, message: 'Amount cannot be empty', trigger: 'blur' },
              { validator: validateAmount, trigger: 'blur' }
          ],
          selectamount: [
              { required: true, message: 'Amount cannot be empty', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {  
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    // async projectData () {
    //   let resp
    //   let self = this
    //   await axios.get(config.default.projecturl + 'project', {
    //     params: {
    //     }
    //   })
    //   .then(function (response) {
    //     console.log("response",response)
    //     resp = response.data
    //   })
    //   .catch(function (error) {
    //     console.log("error",error);
    //     if(error.response.status == 401){
              
    //           let location = psl.parse(window.location.hostname)
    //           location = location.domain === null ? location.input : location.domain
              
    //           Cookies.remove('auth_token' ,{domain: location}) 
    //           self.$store.commit('logout', self);
              
    //           self.$router.push({
    //               name: 'login'
    //           });
    //           self.$Notice.error({
    //               title: error.response.data.name,
    //               desc: error.response.data.message,
    //               duration: 10
    //           })
    //       }else if(error.response.status == 403){
    //         self.$Notice.error({
    //           duration:0, 
    //           title: error.response.statusText,
    //           desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
    //           });
    //       }else {
    //           self.$Notice.error({
    //               title: error.response.data.name,
    //               desc: error.response.data.message,
    //               duration: 10
    //           })
    //       }
    //   });
    //   resp.forEach(obj =>{
    //     self.data3.push(obj.project_name)
    //     self.data3.sort();
    //   })
    // },
    configChange(data){
      console.log("-------------------configChange data",data)
      $('#CustomerName').css("display","block")
      this.formItem.name = ''
      this.data2 = []
      if (data != '') {
        this.customerData(data);
      }
    },
    async settingData () {
      
      let self = this
      await axios.get(config.default.serviceUrl + 'settings?isActive=true', {
        headers:{
          Authorization : Cookies.get('auth_token'),
          subscriptionId : Cookies.get('subscriptionId')
        },
      })
      .then(function (response) {
        console.log("response >>>>>>>>>>>>>>>>",response)
        if (response.data.data.length != 0)
        {
          var newConf = response.data.data
          console.log("self.configs---------------->before",newConf)
          self.configs = _.sortBy(newConf, ['configName']);
          console.log("self.configs---------------->after",self.configs)
        }else {
            self.$Modal.warning({
              title: 'No Configuration available',
              okText : "Go to Settings",
              content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
              onOk: () => {
                    self.$router.push({
                        name: 'Settings'
                    })
                }
            });
        }
        
      })
      .catch(function (error) {
        console.log("error",error);
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
          }else if(error.response.status == 403){
            self.$Notice.error({
              duration:0, 
              title: error.response.statusText,
              desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
              });
          }else {
              self.$Notice.error({
                  title: error.response.data.name,
                  desc: error.response.data.message,
                  duration: 10
              })
          }
      });
      
    },
    async customerData (settingId) {
      let resp
      let self = this

      await axios({
          method:'get',
          url: config.default.serviceUrl + 'settings/'+settingId,
          headers:{
              Authorization : Cookies.get('auth_token'),
              subscriptionId : Cookies.get('subscriptionId')
          },
      })
      .then(async function(response) {
          console.log("-----------============",response)
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
                console.log("resp",resp)
                self.data2 = _.sortBy(resp, ['Name']);
                console.log("self.data2---------------->after",self.data2)
              })

              .catch(function (error) {
                console.log(error.response)
                self.$Message.error(error.response.data.data[0].message)
              });

          }else{
              await axios({
                  method: 'get',
                  url: config.default.serviceUrl + 'contacts',
                  params: {
                    settingId : settingId
                  },
                  headers:{
                      Authorization : Cookies.get('auth_token')
                  },
              })
              .then(function (response) {
                  resp = response.data
                  console.log("resp",resp[0].data)
                  self.data2 = _.sortBy(resp[0].data, ['Name']);
                  console.log("self.data2---------------->after",self.data2)
              })
              .catch(function (error) {
                  console.log(error);
                  if (error.response.data.message === 'invalid_grant') {
                    self.$Notice.error({
                      duration:0, 
                      title: "QB : Credential Expired",
                      desc: "Token is expired for "+response.data.configName
                    });
                  }
              });
          }
      })
      .catch(function (error) {
        console.log("error----------",error);
        self.loading = false;
        // self.spinShow = false;
          if(error.response.status == 401){
              
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
          }else if(error.response.status == 403){
            self.$Notice.error({
              duration:0, 
              title: error.response.statusText,
              desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
              });
          }else {
              self.$Notice.error({
                  title: error.response.data.name,
                  desc: error.response.data.message,
                  duration: 10
              })
          }
      });

      console.log("response------>iuy",resp);
    },

    async InvoiceSubmit (name) {
      // console.log(name)
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.newInvoice();
        } else {
          this.$Message.error('Please Enter valid Input');
        }
      })
    },
    async newInvoice () {
      this.loading = true;
      let self = this;
      let settingIdForInvoice = this.formItem.configuration
     
      await axios({
        method:'get',
        url: config.default.serviceUrl + 'settings/'+settingIdForInvoice,
        headers:{
            Authorization : Cookies.get('auth_token'),
            subscriptionId : Cookies.get('subscriptionId')
        },
      })
      .then(async function(response) {
        console.log(response)
        if(response.data.domain == 'custom'){
          // alert(self.formItem.configuration)
            let postData1 = {
              // domain: this.formItem.domain,
              settingId : self.formItem.configuration,
              Name: self.formItem.name,
              DueDate:self.formItem.duedate,
              products:[
                  {
                    description: self.formItem.description,
                    title: self.formItem.title,
                    sku: self.formItem.sku,
                    qty: parseFloat(self.formItem.qty),
                    amount: parseFloat(self.formItem.amount1),
                    tax: 0
                  }
              ]
              
            }

            self.customCustomerUrl = response.data.customer_url;
            self.customInvoiceUrl = response.data.invoice_url;
              
            axios({
              method: 'post',
              url: self.customInvoiceUrl,
              data: postData1,
              headers:{
                Authorization : Cookies.get('auth_token')
              }
            })
            .then(function (response) {
              self.$Message.success('invoice created successfully');
              self.loading = false;
              self.$router.push({
                name:'Invoice List'
              })
              // self.Cancel();
            })
            .catch(function (error) {
              console.log("error",error);
              self.loading = false;
              self.$Message.error('invoice creation error');
            });

        }else{
            let postData = {
              // domain: self.formItem.domain,
              settingId : self.formItem.configuration,
              Name: self.formItem.name,
              DueDate: self.formItem.duedate,
              products:[
                  {
                    description: self.formItem.description,
                    title: self.formItem.title,
                    sku: self.formItem.sku,
                    qty: self.formItem.qty,
                    amount: parseFloat(self.formItem.amount1),
                    tax: 0
                  }
              ]
            };
            await axios({
                method: 'post',
                url: config.default.serviceUrl + 'invoice',
                data: postData,
                headers:{
                        Authorization : Cookies.get('auth_token')
                      },
            })
            .then(function (res) {
                console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",res)
                if (res.data.data.Elements) {
                  self.loading = false;
                  self.$Notice.error({
                      title: 'Validation Error',
                      desc: res.data.data.Elements[0].ValidationErrors[0].Message,
                      duration: 10
                  });
                }else {
                  self.$Message.success('invoice created successfully');
                  self.loading = false;
                  self.$router.push({
                    name:'Invoice List'
                  });
                }
                // self.Cancel();
            })
            .catch(function (err) {
                console.log("errerrerrerrerrerrerrerrerrerrerrerrerr",err)
                self.$Message.error('invoice creation error')
                self.loading = false;
            });

        }
      })
      .catch(function (error) {
        console.log("error",error);
        self.loading = false;
        // self.spinShow = false;
          if(error.response.status == 401){
              
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
          }else if(error.response.status == 403){
            self.$Notice.error({
              duration:0, 
              title: error.response.statusText,
              desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
              });
          }else {
              self.$Notice.error({
                  title: error.response.data.name,
                  desc: error.response.data.message,
                  duration: 10
              })
          }
      });
    },

    Cancel(name){
      this.$refs['formItem'].resetFields();
    } 
  },
  mounted() {
    // this.projectData();
    this.settingData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mainform{
    background-color: #eee;
    padding: 24px;
  }
  .ivu-date-picker {
    width: 100% !important;
  }
  .panel {
      margin-bottom: 20px;
      background-color: #fff;
      border: 1px solid transparent;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
      box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }
  #panel {
    padding-top: 10px;
        padding-right: 17px;
        padding-bottom: 10px;
        padding-left: 17px;
        background-color: rgb(241, 241, 241);
        border-color: rgb(230, 233, 237);
        margin-right: 10px;
  }
  .col-sm-6 {
    width: 49%;
  }
</style>