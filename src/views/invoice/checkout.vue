<template>
  <div class="checkout">
    <div class="container">
      <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8" id="detail">
          <Card style="text-align: left;">
          <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              Invoice Details
          </p>
          
          <ul>
              <li class="liList">
                  <span style="color:  rgb(40, 125, 201);text-decoration: none;">Invoice ID :</span>
                  <span>
                      {{ invoiceid }} 
                  </span>
              </li>
              <li class="liList">
                  <span style="color:  rgb(40, 125, 201);text-decoration: none;">Name :</span>
                  <span>
                      
                      {{ name }}
                  </span>
              </li>
              <li class="liList">
                  <span style="color:  rgb(40, 125, 201);text-decoration: none;">Paid Amount :</span>
                  <span>
                      
                      ${{ amountpaid }}
                  </span>
              </li>
              <li class="liList">
                  <span style="color:  rgb(40, 125, 201);text-decoration: none;">Due Amount :</span>
                  <span>
                      
                      ${{ amountDue }}
                  </span>
              </li>
              <li class="liList">
                  <span style="color:  rgb(40, 125, 201);text-decoration: none;">Total :</span>
                  <span>
                      
                      ${{ total }} 
                  </span>
              </li>
          </ul>
        </Card>
          </div>
         <div class="col-md-2"></div> 
      </div>
       
      <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
              <div class="panel panel-custom" style="">
                  <div class="panel-heading">
                      <h3 class="text-center">Payment Details</h3></div>
                  <div class="panel-body" style="text-allign:left">
                      <Form :model="payDetail" :rules="rulesValidation" ref="payDetail">
                        <div class="form-group" style="text-align:left"> PAYMENT GATEWAY
                            <div>
                              <FormItem prop="gateway">
                                <Select class="" v-model="payDetail.gateway" autofocus>
                                  <Option value="stripe">Stripe</Option>
                                  <Option value="auth">Authorize.Net</Option>
                                  <Option value="paypal">PayPal</Option>
                                </Select> 
                            </FormItem>
                            </div>
                        </div>
                        <div class="form-group" style="text-align:left"> CARDTYPE
                            <div>
                              <FormItem prop="cardtype">
                                <Select class="" v-model="payDetail.cardtype">
                                  <Option value="Visa">Visa</Option>
                                  <Option value="MasterCard">MasterCard</Option>
                                  <Option value="Discover">Discover</Option>
                                </Select> 
                              </FormItem>
                            </div>
                        </div>
                        <div class="form-group" style="text-align:left"> CARD NUMBER
                            <div>
                              <FormItem prop="cardNumber">
                                <Input v-model="payDetail.cardNumber" type="text" class="" placeholder="Valid Card Number" /> 
                              </FormItem>
                            </div>
                        </div>
                        <div class="form-group" style="text-align:left"> AMOUNT
                            <div>
                              <FormItem prop="amount">
                                <Input v-model="payDetail.amount" type="text" class=""/> 
                                </FormItem>
                                </div>
                            </div>
                        <div class="row">
                            <div class="col-xs-7 col-md-7">
                                <div class="form-group" style="text-align:left">
                                  <div class="row">
                                    <div class="col-xs-6 col-lg-6 col-md-6">EXPIRY MONTH
                                      <FormItem prop="expiryMM">
                                        <Select class="" v-model="payDetail.expiryMM" placeholder="Please select month">
                                          <Option value="01">Jan</Option>
                                          <Option value="02">Feb</Option>
                                          <Option value="03">March</Option>
                                          <Option value="04">April</Option>
                                          <Option value="05">May</Option>
                                          <Option value="06">June</Option>
                                          <Option value="07">July</Option>
                                          <Option value="08">Aug</Option>
                                          <Option value="09">Sept</Option>
                                          <Option value="10">Oct</Option>
                                          <Option value="11">Nov</Option>
                                          <Option value="12">Dec</Option>
                                        </Select> 
                                      </FormItem>
                                    </div>
                                    <div class="col-xs-6 col-lg-6 col-md-6">EXPIRY YEAR
                                      <FormItem prop="expiryYY">  
                                        <date-picker type="year" :options="options3" v-model="payDetail.expiryYY" placeholder="Select year" style="width: 200px"></date-picker>
                                      </FormItem>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div class="col-xs-5 col-md-5 pull-right">
                                <div class="form-group"  style="text-align:left"> CVV
                                  <FormItem prop="cvCode">
                                    <Input type="text" v-model="payDetail.cvCode" class="" placeholder="CVV" required/> 
                                  </FormItem>
                                </div>
                            </div>
                            
                        </div>
                    </Form>
                  </div>
                  <div class="panel-footer">
                      <div class="row" style="padding:10px">
                        <div class="col-xs-6 col-md-6">
                            <Button class="btn btn-lg btn-block btn-default" @click="backFunction()">Back</Button>
                        </div>
                        <div class="col-xs-6 col-md-6">
                            <Button class="btn btn-lg btn-block btn-success" :loading="loading" @click="payFunction('payDetail')">PAY</Button>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <!-- {{payDetail}}{{sub_id}} -->
  </div>
</template>
<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import Cookies from 'js-cookie';
let responseData
let settingID
let paymentAmount
export default {
  name: 'checkout',
  components: {
  },
  data () {
     const validateNum = async(rule, value, callback) => {
      let patt = new RegExp('^[0-9]+$')
      let _res = patt.test(value)
      if (!_res) {
        callback(new Error('Not Allowed Special Character'))
      } else {
        callback();
      }
    };
    return {
      loading: false,
      settingId:'',
      invoiceid: '',
      name: '',
      date: '',
      amountpaid: '',
      amountDue: '',
      total: '',
      responseDataForPayment :'', 
      payDetail : {
        cardtype: '',
        cardNumber : '',
        expiryMM : '',
        expiryYY: '',
        cvCode: '',
        gateway: '',
        amount: '',
      },
      options3: {
        disabledDate (date) {
            return (date.getYear() <= new Date().getYear() - 1);
        }
      },
      rulesValidation: {
        cardtype: [
          { required: true, message: 'Please Select Card Type', trigger: 'change' }
        ],
        gateway: [
          { required: true, message: 'Please Select Payment Gateway', trigger: 'blur' }
        ],
        cardNumber: [
          { required: true, max: 16, min:16, message: 'Please Enter 16-digit Card Number', trigger: 'blur' }, {
            validator: validateNum, trigger: 'blur'
          }
        ],
        expiryMM: [
          { required: true, message: 'Please select Expiry Month', trigger: 'blur' }
        ],
        expiryYY: [
          { required: true, type:'date', message: 'Please select Expiry Year', trigger: 'change' }
        ],
        cvCode: [
          { required: true, max: 3, min:3, message: 'Please Enter 3-digit Cvv Code', trigger: 'blur' }, {
            validator: validateNum, trigger: 'blur'
          }
        ]
      }
    }
  },
  
  methods: {
    backFunction () {
      this.$refs['payDetail'].resetFields()
      this.$router.go(-1)
    }, 
    async getData (settingID) {
      let self = this;
      console.log(settingID)
      console.log(settingID.query.domain)
      let getInvoiceUrl ;
      if(settingID.query.domain == undefined){
        getInvoiceUrl = 'invoice/'
        }else{
        getInvoiceUrl = 'custominvoice/'
      }
      
        if(settingID.params.id != undefined){
        this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 18
                                }
                            }),
                            h('div', 'Loading Payment Information...')
                        ])
                    }
                });
                setTimeout(() => {
                    this.$Spin.hide();
                }, 10000);
        axios({
            method: 'get',
            url: config.default.serviceUrl + getInvoiceUrl +settingID.params.id,
            params: {
              settingId : settingID.query.settingId
            },
            headers:{
                Authorization : Cookies.get('auth_token')
            },
            }).then(function (response) {
                console.log(">>>>>>>>>>>>>> response ", response)
                if(Array.isArray(response.data)){

                  responseData = response.data[0];
                  if(Array.isArray(responseData.data)) {
                    responseData = responseData.data[0]
                    console.log("!!!!!!!!!!!",responseData)

                    self.responseDataForPayment = responseData;
                    self.payDetail.amount = responseData.Balance;
                    self.invoiceid = responseData.Id
                    self.name = responseData.CustomerRef.name
                    self.amountpaid = (responseData.TotalAmt - responseData.Balance)
                    self.amountDue = responseData.Balance
                    self.total = responseData.TotalAmt
                    self.settingId = settingID
                    self.$Spin.hide();
                  }
                  else {
                    responseData = responseData.data;
                    console.log("response data!!!!!!!!!!",responseData);
                    self.responseDataForPayment = responseData;
                    self.payDetail.amount = responseData.AmountDue;
                    self.invoiceid = responseData.InvoiceID;
                    self.name = responseData.Contact.Name
                    self.amountpaid = responseData.AmountPaid
                    self.amountDue = responseData.AmountDue
                    self.total = responseData.Total
                    self.settingId = settingID
                    self.$Spin.hide();
                  }
                  // if(responseData.TotalAmt != undefined){
                  //   console.log("@@@@@@@@",responseData.TotalAmt)
                  //   paymentAmount = responseData.TotalAmt;
                  //   self.payDetail.amount = paymentAmount
                  // }
                  // else{
                  //   paymentAmount = responseData.data.Total
                  //   self.payDetail.amount = paymentAmount
                  // }
                  // let paymentInvoiceId;
                  // if(responseData.Id != undefined){
                  //   paymentInvoiceId = responseData.Id
                  // }else {
                  //   paymentInvoiceId = responseData.InvoiceID
                  // }
                  // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%",responseData)
                  // console.log("^^^^^^^^^^^^^^^^^^^",responseData.AmountDue,paymentInvoiceId,responseData.Contact.Name,responseData.AmountPaid,responseData.AmountDue,paymentAmount)
                  // responseData = responseData.data;
                  // self.responseDataForPayment = responseData;
                  // self.payDetail.amount = responseData.AmountDue;
                  // self.invoiceid = paymentInvoiceId
                  // self.name = responseData.Contact.Name
                  // self.amountpaid = responseData.AmountPaid
                  // self.amountDue = responseData.AmountDue
                  // self.total = paymentAmount
                  // self.settingId = settingID
                  // self.$Spin.hide();

                }else{
                  responseData = response.data;
                  self.responseDataForPayment = responseData;
                  self.payDetail.amount = responseData.Due;
                  self.invoiceid = responseData.Invoice_No
                  self.name = responseData.Name
                  self.amountpaid = responseData.Paid
                  self.amountDue = responseData.Due
                  self.total = responseData.Total
                  self.settingId = responseData.settingId
                  self.$Spin.hide();
                }
                
                
                
            })
            .catch(function (error) {
              self.$Spin.hide();
              console.log(error);
              if(error.message == 'Network Error'){
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
      }
      
      
      
      
    },
    async payNow (domain) {
      let self = this
      this.loading = true
      if(domain == undefined){

        console.log("responseData", self.responseDataForPayment)
        
            let paymentInvoiceId;
            let contactName;
            
            if(self.responseDataForPayment.Id != undefined){
              paymentInvoiceId = self.responseDataForPayment.Id
              contactName = self.responseDataForPayment.CustomerRef.name
            }else {
              paymentInvoiceId = self.responseDataForPayment.InvoiceID
              contactName = self.responseDataForPayment.Contact.Name
            }
            let exYear = self.payDetail.expiryYY.getFullYear().toString().slice(-2)
            // console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",self.settingId)
            // console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuu",Cookies.get('user'))
            // self.payDetail.amount = parseFloat(self.payDetail.amount);
            let param1 = {
              settingId:self.settingId.query.settingId,
              gateway:self.payDetail.gateway,
              id: paymentInvoiceId,
              amount:parseFloat(self.payDetail.amount),
              Name:contactName,
              type:self.payDetail.cardtype,
              cardNumber:self.payDetail.cardNumber,
              expMonth:self.payDetail.expiryMM,
              expYear:exYear,
              cvc:self.payDetail.cvCode
            }
          
          await axios({
              method: 'post',
              url: config.default.serviceUrl + 'payment',
              data: param1,
              headers:{
                Authorization : Cookies.get('auth_token')
              }
            })
            .then(function (res) {
              
              self.$Message.success('Payment Done Successfully');
              self.loading = false
              self.backFunction()
            })
            .catch(function (error) {
              self.loading = false
              console.log("errror in payment",error.response);
              if (error.response.data.code === '404') {
                self.$Notice.error({
                      duration:0, 
                      title: "Payment Credential Not Available",
                      desc: error.response.data.message
                  });
              }
              else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
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
            
      }else {
            let exYear = self.payDetail.expiryYY.getFullYear().toString().slice(-2)
            
            let param1 = {
              settingId:self.responseDataForPayment.settingId,
              gateway:self.payDetail.gateway,
              id: self.responseDataForPayment.Invoice_No,
              amount:parseFloat(self.payDetail.amount),
              Name:self.responseDataForPayment.Name,
              type:self.payDetail.cardtype,
              cardNumber:self.payDetail.cardNumber,
              expMonth:self.payDetail.expiryMM,
              expYear:exYear,
              cvc:self.payDetail.cvCode
            }
         
          await axios({
              method: 'post',
              url: config.default.serviceUrl + 'payment',
              data: param1,
              headers:{
                Authorization : Cookies.get('auth_token')
              }
            })
            .then(function (res) {
              console.log("payment done success", res)
              self.$Message.success('payment done successfully');
              self.loading = false
              self.backFunction()
            })
            .catch(function (error) {
              self.loading = false
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
              // self.$Message.error(err.response.data.message)
            });
            
      }
      // alert(this.$route.params.id)
            
    },


    async payFunction (name) {
      
      
      let self = this
      this.$refs[name].validate(valid => {
        if(valid) {
          console.log("self.payDetail.amount ", self.payDetail.amount);
          console.log("self.responseDataForPayment.Due " , self.responseDataForPayment)
          let DueAmount ;
          if(self.responseDataForPayment.Due != undefined){
            DueAmount = self.responseDataForPayment.Due
          }
          if(self.responseDataForPayment.AmountDue != undefined){
            DueAmount = self.responseDataForPayment.AmountDue
          }
          if(self.responseDataForPayment.Balance != undefined){
            DueAmount = self.responseDataForPayment.Balance
          }
          if(self.payDetail.amount > 0)
          {

            if(self.payDetail.amount <= DueAmount ){             
              if(self.responseDataForPayment.settingId != undefined){
                self.payNow('custom');
              }else{
                self.payNow();
              }
            }
            else{  
              self.$Message.error('Please Enter Amount less than Due Amount');
            }
          }else{
            self.$Message.error('Please Enter Valid Amount');
          }
        } else {
          self.$Message.error('Enter Valid Input');
        }
      })
    },
    
  },
  mounted() {
    
    this.invoiceid = this.$route.params.id
    
    this.getData (this.$route);
    
    //this.getCustomData()
  },
    watch: {
    '$route': function (id) {
      
      this.getData (id);
    }
  }
}
</script>
<style scoped>
  .panel-custom {
    border-color: #000044;
  }
  .panel-custom > .panel-heading {
    color: #fff;
    background-color: #000044;
    border-color: #000044;
  }
  #detail {
    background:#eee;
    padding: 20px
  }
  .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
  .liList {
    list-style-type: none;
  }
</style>