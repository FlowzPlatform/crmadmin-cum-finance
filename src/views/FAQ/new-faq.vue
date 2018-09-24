<template>
	<div>
        <Row>
            <Col span="16" offset="4">
                <Card style="padding:10px;">
                    <p slot="title">Add New FAQ</p>
                    <div>
                        <div class="row" style="padding:10px;">
                            <div class="col-sm-2">
                                <span style="color:red">*</span>
                                <label>Website</label>
                            </div>
                            <div class="col-sm-10">
                                <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 100%;text-align: left;">
                                    <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
                                </Select>
                            </div>
                        </div>
                        <div class="row" style="padding:10px;">
                            <div class="col-sm-2">
                                <span style="color:red">*</span>
                                <label>Question</label> 
                            </div>
                            <div class="col-sm-10">
                                <Input v-model="que" placeholder="Enter your question..."/>
                            </div>
                        </div>
                        <div class="row" style="padding:10px;">
                            <div class="col-sm-2">
                                <span style="color:red">*</span>
                                <label>Answer</label>
                            </div>
                            <div class="col-sm-10">
                                <textarea v-model="ans" placeholder="Write answer" id="editor1" name="editor1"></textarea>
                            </div>
                        </div>
                        <div style="text-align:center;">
                            <Button type="primary" @click="FAQSubmit()" :loading="loading">Submit</Button>
                            <Button type="ghost" style="margin-left: 8px" @click="Cancel()">Reset</Button>
                        </div>
                    </div>
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
                website:'',
                que: '',
                ans: '',
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
                      self.$Notice.error({
                        desc: 'Websites not available for this subscription',
                        title: 'Error',
                        duration: 4.5
                      })
                    }else{    
                      var result = _.uniqBy(response.data.data,'websiteId')
                    //   // console.log("result", result)
                      self.websiteList = result
                    //   // console.log("website", self.websiteList[0].websiteId)                    
                      self.website = self.websiteList[0].websiteId
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
            async FAQSubmit() {
                let que = this.que.trim();
                let ans = CKEDITOR.instances.editor1.document.getBody().getChild(0).getText().trim();
                if((que != '') && (ans != '')) {
                    let self = this;
                        let faqData = {};
                        axios({
                            method: 'get',
                            url: config.default.serviceUrl + 'faq',
                            params: {
                                websiteId: this.website
                            }
                        })
                        .then((response)=> {
                            // // console.log(response);
                            if (response.data.data.length != 0) {
                                let faq = response.data.data[0].faq;
                                // // console.log('faq',faq);
                                let maxQueId = 0;
                                if (faq.length != 0) {
                                    maxQueId = Math.max.apply(Math,faq.map(function(o){return o.queId;}))
                                }
                                // // console.log('maxQueId',maxQueId)
                                faq.push({
                                    'que': this.que,
                                    'ans': CKEDITOR.instances.editor1.getData(),
                                    'createdAt': new Date().toISOString(),
                                    'isActive': true,
                                    'queId': maxQueId + 1
                                });
                                axios({
                                    method: 'patch',
                                    url: config.default.serviceUrl + 'faq/' + response.data.data[0].id,
                                    data: {'faq': faq},
                                })
                                .then((response) => {
                                    // // console.log(response);
                                    this.$router.push({
                                        name: 'List FAQ'
                                    });
                                })
                                .catch(function(error) {
                                    // console.log(error);
                                })
                            }
                            else {
                                faqData['websiteId'] = this.website;
                                faqData['subscriptionId'] = Cookies.get('subscriptionId');
                                faqData['user'] = Cookies.get('user');
                                faqData['faq'] = [{
                                    'que': this.que,
                                    'ans': CKEDITOR.instances.editor1.getData(),
                                    'createdAt': new Date().toISOString(),
                                    'isActive': true,
                                    'queId': 1
                                }];
                                // // console.log('faqData',faqData);
                                axios({
                                    method: 'post',
                                    url: config.default.serviceUrl + 'faq',
                                    data: faqData,
                                })
                                .then((response) => {
                                    // // console.log(response);
                                    this.$router.push({
                                        name: 'List FAQ'
                                    });
                                })
                                .catch(function(error) {
                                    // console.log(error);
                                })
        
                            }
                        })
                        .catch(function(error) {
                            // console.log(error);
                        })
                }
                else {
                    this.$Message.error('Please fill up all the fields correctly');
                }
            },
            Cancel() {
                // this.$refs['].resetFields();
                this.website = this.websiteList[0].websiteId
                this.que = '';
                CKEDITOR.instances.editor1.setData('');
            }
        },
        mounted() {
            CKEDITOR.replace("editor1"),
            this.init()
        }
    }
</script>
