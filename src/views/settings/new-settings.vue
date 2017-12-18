<template>
    <div>
        <div class="settings_header">
            <Button @click="goToSettingsList">All Settings</Button>
        </div>
        <Tabs type="card">
            <TabPane label="Xero">
                <Form ref="XeroformValidate" :model="XeroformValidate" :rules="XeroruleValidate" :label-width="100">
                    <FormItem label="User Agent" prop="useragent">
                        <Input v-model="XeroformValidate.useragent" placeholder="Enter your useragent"></Input>
                    </FormItem>
                    <FormItem label="Consumer Key" prop="consumerKey">
                        <Input v-model="XeroformValidate.consumerKey" placeholder="Enter your consumerKey"></Input>
                    </FormItem>
                    <FormItem label="Consumer Secret" prop="consumerSecret">
                        <Input v-model="XeroformValidate.consumerSecret" placeholder="Enter your consumerSecret"></Input>
                    </FormItem>
                    <FormItem label="Private Key" prop="privateKey">
                        <!-- <Input v-model="XeroformValidate.privateKey" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                         -->
                         <Upload v-model="XeroformValidate.privateKey"
                            :before-upload="handleUpload"
                            action="">
                            <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                        </Upload>
                        <div v-if="file !== null">Uploaded file: {{ file.name }} </div>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="XerohandleSubmit('XeroformValidate')">Submit</Button>
                        <Button type="ghost" @click="handleReset('XeroformValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>
            </TabPane>
            <TabPane label="Quickbook">
                <Form ref="QBformValidate" :model="QBformValidate" :rules="QBruleValidate" :label-width="100">
                    <FormItem label="Refresh Token" prop="refresh_token">
                        <Input v-model="QBformValidate.refresh_token" placeholder="Enter your refresh_token"></Input>
                    </FormItem>
                    <FormItem label="Client Id" prop="client_id">
                        <Input v-model="QBformValidate.client_id" placeholder="Enter your client_id"></Input>
                    </FormItem>
                    <FormItem label="Client Secret" prop="client_secret">
                        <Input v-model="QBformValidate.client_secret" placeholder="Enter your client_secret"></Input>
                    </FormItem>
                    <FormItem label="RealmId" prop="realmId">
                        <Input v-model="QBformValidate.realmId" placeholder="Enter your realmId"></Input>
                    </FormItem>
                    
                    <FormItem>
                        <Button type="primary" @click="QBhandleSubmit('QBformValidate')">Submit</Button>
                        <Button type="ghost" @click="handleReset('QBformValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>
            </TabPane>
        </Tabs>
    

    </div>
</template>

<script>
let config = require("@/config/customConfig.js")
let feathersUrl =  config.default.serviceUrl;
import _ from 'lodash'
import Vue from 'vue'
import VueWidgets from 'vue-widgets'
import 'vue-widgets/dist/styles/vue-widgets.css'
import axios from "axios"
const reader  = new FileReader();
Vue.use(VueWidgets);


    export default {
        data () {
            return {
               tabs: 1 ,
               file: null,
                loadingStatus: false,
               XeroformValidate: {
                    useragent: '',
                    consumerKey:'',
                    consumerSecret:'',
                    privateKey: ''
                },
                XeroruleValidate: {
                    useragent: [
                        { required: true, message: 'User agent cannot be empty', trigger: 'blur' }
                    ],
                    consumerKey: [
                        { required: true, message: 'Consumer Key cannot be empty', trigger: 'blur' }
                    ],
                    consumerSecret: [
                        { required: true, message: "Consumer Secret cannot be empty", trigger: 'blur' }
                    ],
                    // privateKey: [
                    //     { required: true, message: "Private Key cannot be empty", trigger: 'blur' }
                    // ]
                },
                QBformValidate: {
                    refresh_token: '',
                    client_id:'',
                    client_secret:'',
                    realmId: ''
                },
                QBruleValidate: {
                    refresh_token: [
                        { required: true, message: 'Refresh token cannot be empty', trigger: 'blur' }
                    ],
                    client_id: [
                        { required: true, message: 'Client_id cannot be empty', trigger: 'blur' }
                    ],
                    client_secret: [
                        { required: true, message: "Client_Secret cannot be empty", trigger: 'blur' }
                    ],
                    realmId: [
                        { required: true, message: "RealmId cannot be empty", trigger: 'blur' }
                    ]
                }
                
            }
        },
        methods: {
            
            goToSettingsList(){
                this.$router.push({
                        name: 'settings'
                    });
            },
            async handleUpload (file) {
                
                this.file = file
                return false;
            },
            async createImage(file) {
            //return new Promise((resolve, reject) => {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                console.log(reader)
                 reader.onload = (e) => {
                     console.log(reader)
                    //vm.image = e.target.result;
                };
                // resolve(new1)
                
           // })
            },
            
            async XerohandleSubmit (name) {
                let self = this;
                this.$refs[name].validate(async  (valid)   => {
                    if (valid) {
                        console.log(this.file)
                        if(self.file == null || self.file.type !== "application/x-x509-ca-cert"){
                            self.$Message.error(' Please, attach a .pem file!');
                        }else{
                            self.$Message.success('Success!');
                             
                            let res = await this.createImage(self.file)
                            alert(res)
                            // let lastModified = this.file.lastModified +"-"+this.file.name+".pem";
                            // console.log(lastModified)
                            // axios.post(feathersUrl +'upload', {
                            //     "uri" : res  ,
                            //     "id" :  lastModified

                            // })
                            // .then(function (response) {
                            //     console.log(response)
                            // })
                            // .catch(function (error) {
                            //     console.log(error);
                            // });
                            // console.log(this.$refs)
                        }
                    } else {
                        self.$Message.error('Fail!');
                        
                    }
                })
            },

            async QBhandleSubmit (name) {
                let self = this;
                this.$refs[name].validate(async  (valid)   => {
                    if (valid) {
                        self.$Message.success('Success!');
                        alert(self.QBformValidate.refresh_token + self.QBformValidate.client_id + self.QBformValidate.client_secret + self.QBformValidate.realmId)
                        self.handleReset('QBformValidate')
                    }
                    else {
                        self.$Message.error('Fail!');
                    }
                })
            },

            handleReset (name) {
                this.$refs[name].resetFields();
                this.file = null
            }
        },
        computed: {
        productChunks(){
            return _.chunk(this.data6, 2);
        }
        }
    }
</script>

<style scoped>
.settings_header{
    padding : 10px;
    text-align:right;
    background: #cacaca;
    width:100%;
    margin:14px 2px;
}
</style>