<template>
  <div class="checkout">
    <div class="container">
      <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8" id="detail">
                <Card>
          <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              Invoice Details
          </p>
          
          <ul>
              <li>
                  <a href="" target="_blank">Invoice ID :</a>
                  <span>
                      
                      {{ invoiceid }} 
                  </span>
              </li>
              <li>
                  <a href="" target="_blank">Name :</a>
                  <span>
                      
                      {{ name }}
                  </span>
              </li>
              <li>
                  <a href="" target="_blank">Paid Amount :</a>
                  <span>
                      
                      ${{ amountpaid }}
                  </span>
              </li>
              <li>
                  <a href="" target="_blank">Due Amount :</a>
                  <span>
                      
                      ${{ amountDue }}
                  </span>
              </li>
              <li>
                  <a href="" target="_blank">Total :</a>
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
                                  <Option value="stripe">stripe</Option>
                                  <Option value="auth">authdotnet</Option>
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
                                <Input v-model="payDetail.amount" type="text" class="" readonly/> 
                                </FormItem>
                                </div>
                            </div>
                        <div class="row">
                            <div class="col-xs-7 col-md-7">
                                <div class="form-group" style="text-align:left">EXPIRY DATE
                                  <div class="row">
                                    <div class="col-xs-6 col-lg-6 col-md-6">
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
                                    <div class="col-xs-6 col-lg-6 col-md-6">
                                      <FormItem prop="expiryYY">  
                                        <date-picker type="year" v-model="payDetail.expiryYY"placeholder="Select year" style="width: 200px"></date-picker>
                                      </FormItem>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div class="col-xs-5 col-md-5 pull-right">
                                <div class="form-group"  style="text-align:left"> CV CODE
                                  <FormItem prop="cvCode">
                                    <Input type="text" v-model="payDetail.cvCode" class="" placeholder="CV" required/> 
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
      payDetail : {
        cardtype: '',
        cardNumber : '',
        expiryMM : '',
        expiryYY: '',
        cvCode: '',
        gateway: '',
        amount: '',
      },
      rulesValidation: {
        cardtype: [
          { required: true, message: 'choose cardtype', trigger: 'change' }
        ],
        gateway: [
          { required: true, message: 'choose gateway', trigger: 'blur' }
        ],
        cardNumber: [
          { required: true, max: 16, min:16, message: 'Please Enter 16-digit cardNumber', trigger: 'blur' }, {
            validator: validateNum, trigger: 'blur'
          }
        ],
        expiryMM: [
          { required: true, message: 'Please select expiry month', trigger: 'blur' }
        ],
        expiryYY: [
          { required: true, type:'date', message: 'Please select expiry year', trigger: 'change' }
        ],
        cvCode: [
          { required: true, max: 3, min:3, message: 'Please Enter 3-digit cv code', trigger: 'blur' }, {
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
    async getData () {
      let settingID = this.$store.state.settingId
      
      responseData = this.$store.state.invoiceData;
      console.log("responseData.Id",responseData.Id)
      console.log("responseData.TotalAmt",responseData.TotalAmt) 
      if(responseData.TotalAmt != undefined){
        paymentAmount = responseData.TotalAmt;
        this.payDetail.amount = paymentAmount
      }
      else{
        paymentAmount = responseData.Total
        this.payDetail.amount = paymentAmount
      }

      let paymentInvoiceId;
      if(responseData.Id != undefined){
        paymentInvoiceId = responseData.Id
      }else {
        paymentInvoiceId = responseData.InvoiceID
      }

      
            this.payDetail.amount = responseData.AmountDue;
            this.invoiceid = paymentInvoiceId
            this.name = responseData.Contact.Name
            this.amountpaid = responseData.AmountPaid
            this.amountDue = responseData.AmountDue
            this.total = paymentAmount
            this.settingId = settingID
    },
    async payNow () {
      let self = this
      this.loading = true
      // alert(this.$route.params.id)
            console.log("responseData", responseData)
            let paymentInvoiceId;
            console.log("responseData.Id",responseData.Id)

            if(responseData.Id != undefined){
              paymentInvoiceId = responseData.Id
            }else {
              paymentInvoiceId = responseData.InvoiceID
            }

            let exYear = this.payDetail.expiryYY.getFullYear().toString().slice(-2)
            console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",this.settingId)

            let param1 = {
            settingId:this.settingId,
            gateway:this.payDetail.gateway,
            id: paymentInvoiceId,
            amount:this.payDetail.amount,
            cname:responseData.Contact.Name,
            value:"59",
            type:this.payDetail.cardtype,
            cardNumber:this.payDetail.cardNumber,
            expMonth:this.payDetail.expiryMM,
            expYear:exYear,
            cvc:this.payDetail.cvCode
          }
          console.log("params1", param1)

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
            })
            .catch(function (err) {
              self.loading = false
              self.$Message.error('payment error')
            });
      this.backFunction()
    },
    async payFunction (name) {
      console.log(name)
      this.$refs[name].validate(valid => {
        if(valid) {
          this.payNow();
        } else {
          alert('Error')
        }
      })
    }
  },
  mounted() {
    this.invoiceid = this.$route.params.id
    this.getData ();
    
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
</style>