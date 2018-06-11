<template>
  <div class="checkout">
    <div class="container">    
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
                                <select class="form-control"  v-model="payDetail.gateway" id="selectGateway">
                                <option value="">select</option>
                                </select>
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
                                <Input v-model="payDetail.amount" type="text" class="" disabled/> 
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
                                        <date-picker type="year" :options="options3" v-model="payDetail.expiryYY"placeholder="Select year" style="width: 200px"></date-picker>
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
      data: '',
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
    async payFunction (name) {
        let self = this
        this.$refs[name].validate(valid => {
        if(valid) {
            self.loading = true
            let body
            let header
            let status
            console.log("self.payDetail ", self.payDetail);
            let exYear = self.payDetail.expiryYY.getFullYear().toString().slice(-2)
            if(self.payDetail.gateway === 'stripe'){
                body = {
                    "gateway":"stripe",
                    "amount" : parseInt(self.payDetail.amount),
                    "currency":"usd",
                    "cardNumber": self.payDetail.cardNumber,
                    "expMonth":self.payDetail.expiryMM,
                    "expYear":exYear,
                    "cvc": self.payDetail.cvCode,
                    "description":"this is desc",
                    "isCustomer":false
                }
                header = {
                    "content-type": "application/json",
                    "x-api-token": this.data.paymentInfo[this.payDetail.gateway].Secret_Key,
                    "cache-control": "no-cache"
                }
            }else if(self.payDetail.gateway === 'auth'){
                body = {
                    "gateway":"authdotnet",
                    "amount": parseInt(self.payDetail.amount),
                    "cardNumber": self.payDetail.cardNumber,
                    "expMonth":self.payDetail.expiryMM,
                    "expYear":exYear,
                    "cvc": self.payDetail.cvCode,
                    "isCustomer":false
                }
                header = {
                    "content-type": "application/json",
                    "X-api-token" : this.data.paymentInfo[this.payDetail.gateway].Transaction_Key,
                    "x-api-login" :  this.data.paymentInfo[this.payDetail.gateway].Signature_Key,
                    "cache-control": "no-cache"
                }
            }else{
                body ={
                    "gateway":"paypal",
                    "intent": "sale",
                    "payer": {
                    "payment_method": "credit_card",
                    "funding_instruments": [{
                        "payment_card": {
                            "type": self.payDetail.cardtype,
                            "number": self.payDetail.cardNumber,
                            "expire_month":self.payDetail.expiryMM,
                            "expire_year": exYear,
                            "cvv2": "",
                            "billing_country": "US"
                        }
                        }]
                    },
                    "transactions": [{
                        "amount": {
                        "total": parseInt(self.payDetail.amount),
                        "currency": "USD",
                        "details": {
                            "subtotal": parseInt(self.payDetail.amount),
                            "tax": "0",
                            "shipping": "0"
                        }
                        },
                        "description": "This is the payment transaction description"
                        }]
                }

                header = {
                    "content-type" : "application/json",
                    "X-api-token" : self.payDetail.Client_Id,
                    "x-api-login" :  self.payDetail.Secret,
                    "cache-control" : "no-cache"
                }
            }


            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",header)

            axios({
                method: 'POST',
                url: config.default.baseUrl + '/payment/payment',
                data: body,
                headers:header,
            }).then(async function (response) {

                console.log(">>>>>>>>>>>>>> response ",response.data.status)

                if (response.status == 401) {
                    if(response.data.messages != undefined){
                        self.$Message.error({
                            duration: 5,
                            content: response.data.messages.message[0].text
                        });
                    }else{
                        self.$Message.error({
                            duration: 5,
                            content: response.data.message
                        });
                    }
                    self.loading = false
                }
                else {
                    status = response.data.status || response.data.state || response.data.messages.resultCode
                    self.loading = false
                }
                console.log("================status",status);
                if (status == "Error") {
                    self.$Message.error({
                        duration: 5,
                        content:response.data.messages.message[0].text
                    });
                    self.loading = false
                }else if(status == 'succeeded' || status == 'Ok' || status == 'created') {
                    self.$Message.success('Payment Done Successfully');
                    self.loading = false
                    await axios({
                        method: 'patch',
                        url: config.default.serviceUrl +  'po-invoice/'+self.data.id,
                        data:{
                            "status":"paid"
                        }
                    })
                    .then(async function(res){
                        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@",res)
                    })
                    .catch(function(error){
                        console.log("$$$$$$$$$$$$$$$$$",error)
                    })
                    self.$router.push({
                        name:'PO Bill'
                    })
                }
            })
            .catch(function (error) {
                self.loading = false
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
        } else {
            self.$Message.error('Enter Valid Input');
        }
      })
    },
  },
  mounted() {
    this.data = this.$route.params.data
    this.payDetail.amount = this.data.total_amount;
    let paymentInfo = Object.keys(this.data.paymentInfo)
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",paymentInfo)
    paymentInfo.forEach(item => {
        var x = document.getElementById("selectGateway");
        var option = document.createElement("option");
        option.text = item;
        console.log()
        x.add(option);
    })
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
