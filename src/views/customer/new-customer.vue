<style>
   .form{
       width: 70%
   }
</style>

<template>

    <Widget>
      <WidgetHeading :id="1" :Title="'Add New Customer'" :TextColor="true" :DeleteButton="false" :ColorBox="true" :Expand="true" :Collapse="true"></WidgetHeading>
      <WidgetBody>
            
      <Form class="form" label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
        <FormItem label="Configuration Name" prop="configuration">
           <Select v-model="formValidate.configuration" style="width:100%" @on-change="configChange">
             <Option  v-for="item in configs" :value="item.id" :key="item">{{ item.configName }} ({{item.domain}})</Option>
          </Select>
        </FormItem>
        <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="Address">
        <Row>
        <Col span="12">
          <FormItem prop="AddressLine1">
              <Input v-model="formValidate.AddressLine1" placeholder="AddressLine1"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  prop="AddressLine2">
            <Input v-model="formValidate.AddressLine2" placeholder="AddressLine2"></Input>
          </FormItem>
        </Col>
        </Row>
        </FormItem>
        <FormItem label="City" prop="city">
            <Input v-model="formValidate.city" placeholder="Enter city"></Input>
        </FormItem>
         <FormItem label="Country" prop="country">
            <Input v-model="formValidate.country" placeholder="Enter country"></Input>
        </FormItem>
         <FormItem label="Postal code" prop="PostalCode">
            <Input v-model="formValidate.PostalCode" placeholder="Enter PostalCode"></Input>
        </FormItem>
        <FormItem label="Mobile" prop="mobile">
            <Input v-model="formValidate.mobile" placeholder="Enter your Mobile No"></Input>
        </FormItem>
         <!-- <FormItem label="Phone" prop="phone">
            <Input v-model="formValidate.phone" placeholder="Enter your Phone No"></Input>
        </FormItem>
         <FormItem label="Fax" prop="fax">
            <Input v-model="formValidate.fax" placeholder="Enter your fax"></Input>
        </FormItem> -->
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
        </WidgetBody>
    </Widget>
    
</template>

<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import Cookies from 'js-cookie';
import Vue from 'vue'
import VueWidgets from 'vue-widgets'
import 'vue-widgets/dist/styles/vue-widgets.css'
var settingId
Vue.use(VueWidgets);
  export default {
        name: 'new-customer',
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
              formValidate: {
                  configuration: '',
                  name: '',
                  mail: '',
                  mobile : '',
                  AddressLine1: '',
                  AddressLine2 : '',
                  city: '',
                  country: '',
                  PostalCode: ''
              },
              configs:[],
              ruleValidate: {
                  name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                  ],
                  configuration: [
                    { required: true, message: 'Please choose configuration name', trigger: 'chahnge' }
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
                  country:[
                    { required: true, message: 'The country cannot be empty', trigger: 'blur' }
                  ],
                  PostalCode:[
                    { required: true, message: 'The PostalCode cannot be empty', trigger: 'blur' },
                    { validator: validateNum, trigger: 'blur' }
                  ],
                  mail: [
                      { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                      { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                  ],
                  mobile: [
                      { required: true, message: 'Mobile no cannot be empty', trigger: 'blur' },
                      { validator: validateNum, trigger: 'blur' }
                  ],
                  phone: [
                      { required: true, message: 'Phone no cannot be empty', trigger: 'blur' },
                      { validator: validateNum, trigger: 'blur' }
                  ],
                  fax: [
                      { required: true, message: 'Mobile no cannot be empty', trigger: 'blur' },
                      { validator: validateNum, trigger: 'blur' }
                  ]
              }
          }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        this.createCustomer();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            async settingData () {
              let self = this
              await axios.get(config.default.serviceUrl + 'settings?isActive=true', {
                headers:{
                  Authorization : Cookies.get('auth_token')
                }
              })
              .then(function (response) {
                console.log("response >>>>>>>>>>>>>>>>",response)
                //resp = response.data
                
                if (response.data.data.length != 0)
                {
                  self.configs = response.data.data
                }else
                {
                    self.$Modal.warning({
                    title: 'No Configuration available',
                    okText : "Go to Settings",
                    content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
                    onOk: () => {
                          self.$router.push({
                              name: 'settings'
                          })
                      }
                    });
                }
              })
              .catch(function (error) {
                console.log("error",error);
              });
              
            },
            configChange(data){
              console.log("data--------------->",data)
              settingId = data
            },
          async createCustomer () {
            var self = this
            console.log("settingId-------->",settingId)
            var params = {
              settingId : settingId,
              Name: this.formValidate.name,
              ContactStatus: 'ACTIVE',
              EmailAddress:this.formValidate.mail,
              AddressLine1:this.formValidate.AddressLine1,
              AddressLine2:this.formValidate.AddressLine2,
              City:this.formValidate.city,
              Country:this.formValidate.country,
              PostalCode:this.formValidate.PostalCode,
              PhoneNumber:this.formValidate.mobile
            }
            console.log("params",params)
            await axios({
            method: 'post',
            url: config.default.serviceUrl + 'contacts',
            data: params,
            headers:{
              Authorization : Cookies.get('auth_token')
            }
            })
            .then(function (response) {
              console.log("response >>>>>>>>>>>>>>>>",response)
              self.$Message.success('created customer successfully');
            })
            .catch(function (error) {
              console.log("error",error);
              self.$Message.error('error in create customer')
            });
          }
        },
        mounted(){
            this.settingData ();
        }
    }
</script>