<template>
<div class="container-fluid">
  <div class="row" style="padding-top: 10px;">
    <div class="col-sm-12">
      <div class="panel" id="panel">
        <label>New Invoice</label>
      </div>
    </div>
    <div class="col-sm-12">      
    <Form :model="formItem" label-position="left" :label-width="100"  :rules="rulesValidation" ref="formItem">
         <!-- <FormItem label="configure" prop="config">
             <Select v-model="formItem.config" style="width:100%">
               <Option v-for="item in data4" :value="item.value" :key="item.label">{{ item.label }} </Option>
            </Select>
        </FormItem> -->
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
        <FormItem label="Project">
            <AutoComplete v-model="formItem.selectProject" :data="data3" :filter-method="filterMethod" placeholder="input here" clearable>
            </AutoComplete>
        </FormItem>
        <FormItem label="Description" prop="description">
            <Input v-model="formItem.description" type="textarea"  placeholder="Enter Description"></Input>
        </FormItem>
        <FormItem label="Due Date" prop="duedate">
            <DatePicker type="date" placeholder="Select date" v-model="formItem.duedate"></DatePicker>
        </FormItem>
        <FormItem label="Quantity" prop="qty">
            <Input v-model="formItem.qty" placeholder="Enter Quantity" style="width:100%"></Input>
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
      <div  class="col-sm-12 mainform panel" id="panel" style="text-align: -webkit-center;">
        <FormItem style="text-align: -webkit-center;margin-top: 10px;">
            <Button type="primary" @click="formData('formItem')">Submit</Button>
            <Button type="ghost" style="margin-left: 8px" @click="Cancel('formItem')">Cancel</Button>
        </FormItem>
      </div>
      </Form>
    </div>
    </div>
</div>
</template>

<script>
import config from '@/config/customConfig.js'
import axios from 'axios'
import Cookies from 'js-cookie';
export default {
  name: 'newinvoice',
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
      customCustomerUrl:"",
      customInvoiceUrl:"",
      formItem: {
        domain: 'Xero',
        name: '',
        duedate: '',
        config: '',
        description: '',
        qty: '',
        amount:'',
        amount1: '',
        selectamount: '',
        selectProject: ''
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
          description: [
              { required: true, message: 'Description cannot be empty', trigger: 'blur' }
          ],
          duedate: [
              { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
          ],
          qty: [
              { required: true, message: 'Quantity cannot be empty', trigger: 'blur' },
              { validator: validateNum, trigger: 'blur' }
          ],
          amount1: [
              { required: true, message: 'Amount cannot be empty', trigger: 'blur' },
              { validator: validateNum, trigger: 'blur' }
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
    // async configData () {
    //   console.log("config data call")
    //   let resp
    //    await axios({
    //         method: 'get',
    //         url: config.default.settingsUrl + 'settings',
    //         params: {},
    //         headers: {
    //           'authorization':  Cookies.get('auth_token')
    //         }
    //         }).then(function (response) {
    //           console.log(response);
    //           resp = response.data.data
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //         resp.forEach(obj => {
    //           this.data4.push('value:' + obj.id, +'label:' + obj.configName)
    //           console.log("this.data4", this.data4)
    //         })
    // },
    async projectData () {
      let resp
      let self = this
      await axios.get(config.default.projecturl + 'project', {
        params: {
        }
      })
      .then(function (response) {
        console.log("response",response)
        resp = response.data
      })
      .catch(function (error) {
        console.log("error",error);
      });
      resp.forEach(obj =>{
        self.data3.push(obj.project_name)
      })
    },
    configChange(data){
      console.log(data)
      $('#CustomerName').css("display","block")
      this.customerData(data);
    },
    async settingData () {
      
      let self = this
      await axios.get(config.default.serviceUrl + 'settings?isActive=true', {
        headers:{
                   Authorization : Cookies.get('auth_token')
                 },
      })
      .then(function (response) {
        console.log("response >>>>>>>>>>>>>>>>",response)
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
                      name: 'New-settings'
                  })
              }
            });
        }
        
      })
      .catch(function (error) {
        console.log("error",error);
      });
      
    },
    async customerData (settingId) {

      let resp
      let self = this

      await axios({
                    method:'get',
                    url: config.default.serviceUrl + 'settings/'+settingId
                  })
                    .then(async function(response) {
                      console.log(response)
                      if(response.data.domain == 'custom'){

                            self.customCustomerUrl = response.data.customer_url;
                            self.customInvoiceUrl = response.data.invoice_url;
                            
                           await axios({
                              method: 'get',
                              url: self.customCustomerUrl,
                              headers:{
                                Authorization : Cookies.get('auth_token')
                              }
                            })
                            .then(function (response) {
                              console.log(response)
                              resp = response.data.data
                              self.data2 = resp
                            })
                            .catch(function (error) {
                              
                              self.$Message.error('error in finding customer')
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
                                  }).then(function (response) {
                                  
                                    resp = response.data
                                    self.data2 = resp[0].data
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                  });
                      }
                  });
      
      
      
      console.log("response------>iuy",resp);
      // resp.forEach(obj =>{
      //   console.log(obj[0].data)
     // alert(self.formItem.configuration)
        
      //})
    },
    async formData (name) {
      console.log(name)
      this.$refs[name].validate((valid) => {
        //if (valid) {
          this.newInvoice();
        // } else {
         
        //   this.$Message.error('Data not valid!!!');
        // }
      })
    },
    async newInvoice () {

      let self = this;
      let settingIdForInvoice = this.formItem.configuration
      await axios({
                    method:'get',
                    url: config.default.serviceUrl + 'settings/'+settingIdForInvoice
                  })
                    .then(async function(response) {
                      console.log(response)
                      if(response.data.domain == 'custom'){

                        let postData1 = {
                            // domain: this.formItem.domain,
                            settingId : self.formItem.configuration,
                            Name: self.formItem.name,
                            products:[
                                {
                                  description: self.formItem.description,
                                  qty: self.formItem.qty,
                                  amount: self.formItem.amount
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
                              self.Cancel();
                            })
                            .catch(function (error) {
                              console.log("error",error);
                              self.$Message.error('invoice creation error');
                            });

                      }else{
                        
                          self.formItem.amount = parseInt(self.formItem.amount1)
                          let postData = {
                            // domain: self.formItem.domain,
                            settingId : self.formItem.configuration,
                            Name: self.formItem.name,
                            products:[
                                {
                                  description: self.formItem.description,
                                  qty: self.formItem.qty,
                                  amount: self.formItem.amount
                                }
                            ]
                            
                          }
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
                              self.$Message.success('invoice created successfully');
                              self.Cancel();
                            })
                            .catch(function (err) {
                              console.log("errerrerrerrerrerrerrerrerrerrerrerrerr",err)
                              self.$Message.error('invoice creation error')
                            });

                      }
                  });



      
    },




    Cancel(name){
      this.$refs['formItem'].resetFields();
    } 
  },
  mounted() {
   this.projectData();
   
   this.settingData ();
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