<template>
  <div class="container" style="background: white;">
    <div class="row">
      <div class="col-md-12" style="margin-top: 20px;">
        <Form class="form" label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
        <FormItem label="Configuration Name">
           <Select v-model="formValidate.configuration" style="width:100%;text-align:left">
            <Option  value='all'>All</Option>
            <Option  v-for="item in configs" :value="item.id" :key="item">{{ item.configName }} ({{item.domain}})</Option>
          </Select>
        </FormItem>
         <FormItem label="Gateway" prop="gateway">
            <Select v-model="formValidate.gateway" style="width:100%;text-align:left">
              <Option  value='stripe'>Stripe</Option>
              <Option  value='authdotnet'>AuthrizedDotNet</Option>
            </Select>
        </FormItem>
         <FormItem label="Transaction Key" prop="transaction" v-if="formValidate.gateway == 'authdotnet'">
            <Input v-model="formValidate.transaction" placeholder="Enter Transaction Key"></Input>
        </FormItem>
        <FormItem label="Signature Key" prop="signature" v-if="formValidate.gateway == 'authdotnet'">
            <Input v-model="formValidate.signature" placeholder="Enter Signature Key"></Input>
        </FormItem>
        <FormItem label="Secret Key" prop="secret" v-if="formValidate.gateway == 'stripe'">
            <Input v-model="formValidate.secret" placeholder="Enter Secret Key"></Input>
        </FormItem>
        <div style="text-align:center;">
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px;">Reset</Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>

let feathersUrl =  config.default.serviceUrl;
import Cookies from 'js-cookie';
import config from '@/config/customConfig.js'
import _ from 'lodash'
import Vue from 'vue'
import axios from "axios"
export default {
  data () {
    return {
      formValidate:{
        configuration:'all',
        gateway:'',
        transaction:'',
        signature:'',
        secret:''
      },
      configs: [],
      ruleValidate: {
        name:[
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        gateway:[
          { required: true, message: 'Please select gateway', trigger: 'blur' }
        ],
        transaction:[
          { required: true, message: 'The transaction cannot be empty', trigger: 'blur' }
        ],
        signature:[
          { required: true, message: 'The signature cannot be empty', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: 'The secret cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      var self = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('formValidate----------------------------->',this.formValidate)
          if(this.formValidate.configuration === 'all'){ 
            this.$Modal.confirm({
              title: '',
              content: '<h4>This address will be configured for all of your Configuration</h4>',
              width: 500,
              okText: 'Agree',
              cancelText: 'Disagree',
              onOk: () => {
                if(this.formValidate.secret == ''){
                    delete this.formValidate.secret
                  }else if (this.formValidate.transaction == ''){
                    delete this.formValidate.transaction
                    delete this.formValidate.signature
                  }
                console.log('formValidate----------------------------->',this.formValidate)

                var params = {'online_payment':this.formValidate}
                this.configs.forEach(item => {
                    console.log('iiiiiiiiiiiiiiiiiiiiii',item.id)
                    axios({
                      method: 'PATCH',
                      url: feathersUrl +'settings/'+item.id,
                      headers:{
                          Authorization : Cookies.get('auth_token')
                      },
                      data: params
                    })  
                    .then(function (response) {
                      console.log('response------------------------>',response)
                      self.handleReset();
                    })
                    .catch(function (error) {
                      console.log('error',error)
                    })
              })
              },
              onCancel: () => {
              }
            })                        
          }
          else{
            console.log('this.configs',this.configs)
            console.log('this.formValidate.configuration',this.formValidate.configuration)
            var data000 = _.filter(this.configs, {'id': this.formValidate.configuration })
            console.log("data000----------------------------->",data000)
            var checkConfig;
            this.$Modal.confirm({
                  title: '',
                  content: '',
                  width: 500,
                  okText: 'Agree',
                  cancelText: 'Disagree',
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
                        },'This address will be configured for ' + data000[0].configName),
                         h('div', {
                          style:{
                              height:'50px'
                            }
                      }),
                        h('Checkbox', {
                          props: {
                            value: this.value
                          },
                          on: {
                            input: (val) => {
                              checkConfig = val
                              console.log("val",checkConfig)

                            }
                          }
                        },'Do you want this address for all configartion?')
                      ])
                  },
                  onOk: () => {
                    var configartionId = this.formValidate.configuration
                    delete this.formValidate.configuration;
                    if(this.formValidate.secret == ''){
                      delete this.formValidate.secret
                    }else if (this.formValidate.transaction == ''){
                      delete this.formValidate.transaction
                      delete this.formValidate.signature
                    }
                    var params = {'online_payment':this.formValidate}

                    console.log("one configuration",this.formValidate)

                      if(checkConfig == true){
                        this.configs.forEach(item => {
                          axios({
                            method: 'PATCH',
                            url: feathersUrl +'settings/'+item.id,
                            headers:{
                                Authorization : Cookies.get('auth_token')
                            },
                            data: params
                          })  
                          .then(function (response) {
                            console.log('response------------------------>',response)
                            self.handleReset();
                          })
                          .catch(function (error) {
                            console.log('error',error)
                          })
                        })
                      }
                      else{ 
                        console.log('this.formValidate',this.formValidate)        
                        axios({
                          method: 'PATCH',
                          url: feathersUrl +'settings/'+configartionId,
                          headers:{
                              Authorization : Cookies.get('auth_token')
                          },
                          data: params
                        })  
                        .then(function (response) {
                          console.log('response------------------------>',response)
                          self.handleReset();
                        })
                        .catch(function (error) {
                          console.log('error',error)
                        })
                      }
                },
                onCancel: () => {
                }
              })
            }
          } 
        else {
          this.$Message.error('Please fill up all the fields correctly');
        }
      })
    },
    handleReset (name) {
        this.formValidate.gateway = '',
        this.formValidate.transaction = '',
        this.formValidate.signature = '',
        this.formValidate.secret = ''
        // this.$refs[name].resetFields();
        // this.formValidate.configuration = 'all'
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
        if (response.data.data.length != 0)
        {
          var newConf = [];
          console.log("self.configs---------------->before",newConf)
          response.data.data.forEach(item => {
            newConf.push(item);
          })
          self.configs = _.sortBy(newConf, ['configName']);
          console.log("self.configs---------------->after",self.configs)
        }else
        {
          self.$Modal.warning({
          title: 'No Configuration available',
          okText : "Go to Settings",
          content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
          onOk: () => {
            self.$router.push({
              name: 'newsettings'
            })
            }
          });
        }
      })
      .catch(function (error) {
        console.log("error",error);
      });
      
    },
  },
  computed: {
  },
  mounted() {
    this.settingData();
  }
}
</script>

<style scoped>
</style>