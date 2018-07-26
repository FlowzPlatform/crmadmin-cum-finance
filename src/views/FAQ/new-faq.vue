<template>
	<div>
        <Row>
            <Col span="12" offset="6">
                <Card style="padding:10px;">
                    <p slot="title">Add New FAQ</p>
                    <Form class="form" :model="formItem" label-position="left" :label-width="140"  :rules="rulesValidation" ref="formItem1">
                        <FormItem label="Website">
                            <Select v-model="formItem.website" clearable filterable placeholder="Select Website" style="width: 100%;text-align: left;">
                                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="Question" prop="que">
                            <Input v-model="formItem.que" placeholder="Enter your question..."/>
                        </FormItem>
                        <FormItem label="Answer" prop="ans">
                            <span style="color:red;">*</span>
                            <textarea v-model="formItem.ans" placeholder="Write answer" id="editor1" name="editor1"></textarea>
                        </FormItem>
                        <FormItem>
                            <div style="text-align:center;">
                                <Button type="primary" @click="testSubmit('formItem1')" :loading="loading">Submit</Button>
                                <Button type="ghost" style="margin-left: 8px" @click="Cancel('formItem1')">Reset</Button>
                            </div>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
        </Row>
	</div>
</template>

<script>
    import config from '@/config/customConfig.js';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import _ from 'lodash';
    import psl from 'psl';
    let randomstring = require("randomstring");
    export default {
        data() {
            return {
                loading: false,
                websiteList: [],
                formItem: {
                    website:'',
                    que: '',
                    ans: ''
                },
                rulesValidation: {
                    que : [
                        { required: true, message: 'Question cannot be empty', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            init() {
                let self = this;
                axios({
                    method: 'get',
                    url: config.default.subscriptionWebsitesapi,
                    headers: {
                      'Authorization': Cookies.get('auth_token'),
                      'subscriptionId': Cookies.get('subscriptionId')
                    } 
                })
                .then(function(response) {
                    if(response.data.data.length == 0){
                      console.log("in if condition")
                      self.$Notice.error({
                        desc: 'Websites not available for this subscription',
                        title: 'Error',
                        duration: 4.5
                      })
                    }else{    
                      var result = _.uniqBy(response.data.data,'websiteId')
                      console.log("result", result)
                      self.websiteList = result
                      console.log("self.websiteList", self.websiteList[0].websiteId)                    
                      self.formItem.website = self.websiteList[0].websiteId
                    }
                })
                .catch(function(error) {
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
                })
            },
            async testSubmit() {
                let que = this.formItem.que;
                let ans = CKEDITOR.instances.editor1.getData();
                if((que != '') && (ans != '')) {
                    console.log('inside if')
                }
                else {
                    console.log('inside else')
                }
            },
            async FAQSubmit(name) {
                // console.log('name',name)
                // console.log('this.$refs[name]',this.$refs[name])
                // await this.$refs[name].validate((valid) => {
                //     console.log('valid',valid)
                //     if (valid) {
                
                        let self = this;
                        let faqData = {};
                        axios({
                            method: 'get',
                            url: config.default.serviceUrl + 'faq',
                            params: {
                                websiteId: this.formItem.website
                            }
                        })
                        .then((response)=> {
                            console.log(response);
                            if (response.data.data.length != 0) {
                                let faq = response.data.data[0].faq;
                                console.log('faq',faq);
                                let maxQueId = Math.max.apply(Math,faq.map(function(o){return o.queId;}))
                                console.log('maxQueId',maxQueId)
                                faq.push({
                                    'que': this.formItem.que,
                                    'ans': CKEDITOR.instances.editor1.getData(),
                                    'createdAt': new Date().toISOString(),
                                    'isActive': true,
                                    'queId': maxQueId + 1
                                });
                                console.log('after push',faq)
                                axios({
                                    method: 'patch',
                                    url: config.default.serviceUrl + 'faq/' + response.data.data[0].id,
                                    data: {'faq': faq},
                                })
                                .then(function(response) {
                                    console.log(response);
                                })
                                .catch(function(error) {
                                    console.log(error);
                                })
                            }
                            else {
                                faqData['websiteId'] = this.formItem.website;
                                faqData['subscriptionId'] = Cookies.get('subscriptionId');
                                faqData['user'] = Cookies.get('user');
                                faqData['faq'] = [{
                                    'que': this.formItem.que,
                                    'ans': CKEDITOR.instances.editor1.getData(),
                                    'createdAt': new Date().toISOString(),
                                    'isActive': true,
                                    'queId': 1
                                }];
                                console.log('faqData',faqData);
                                axios({
                                    method: 'post',
                                    url: config.default.serviceUrl + 'faq',
                                    data: faqData,
                                })
                                .then(function(response) {
                                    console.log(response);
                                })
                                .catch(function(error) {
                                    console.log(error);
                                })
        
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        })
                //     } else {
                //         this.$Message.error('Please fill up all the fields correctly');
                //     }
                // })
            },
            Cancel() {
                // this.$refs['formItem'].resetFields();
                this.formItem.website = this.websiteList[0].websiteId
                this.formItem.que = '';
                CKEDITOR.instances.editor1.setData('');
            }
        },
        mounted() {
            CKEDITOR.replace("editor1"),
            this.init()
        }
    }
</script>
