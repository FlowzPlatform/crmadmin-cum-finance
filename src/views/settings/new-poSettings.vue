<template>
    <div>
        <settingMenu></settingMenu>
        <div style="width:96%;">
            <Row>
                <Col span="20" offset="3">
                    <Card>
                        <p slot="title">Purchase Order Configuration</p>
                       
                        
                        <Form class="form" label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" style="width:100%;align:center;padding: 27px;">
                            
                             <FormItem label="Select Website" prop="POMode">
                                <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 86%;text-align: -webkit-left;" @on-change="listData">
                                    <Option v-for="item in websiteList" :value="item" :key="item.websiteId" >{{ item.websiteName }} - {{item.websiteId}} - {{item.vid}} </Option>
                                </Select>
                               
                            </FormItem>
                            <FormItem label="Select Suppliers" prop="POMode">
                                <Row>
                                    <Col span="22">
                                        <transfer
                                            :data="data3"
                                            :target-keys="targetKeys3"
                                            :list-style="listStyle"
                                            :render-format="render3"
                                            :operations="['Set to Manual','Set to Auto']"
                                            :titles="['Manual' , 'Auto']"
                                            filterable
                                            @on-change="handleChange3">
                                        </transfer>
                                    </Col>
                                    <Col span="2">
                                        <Tooltip style="float:right" placement="top">
                                            <Icon  type="ios-help-outline" size=28></Icon>
                                            <div slot="content">
                                                <p>Set the mode to Auto/Manual for different <br/>supplier.In auto mode Purchase order will<br/> be generated and sent to the supplier as <br/>soon as a order is generated.In manual<br/> mode you will have a option to generate <br/>and edit PO from Order List segment</p>
                                                
                                            </div>
                                        </Tooltip>                                    
                                    </Col>
                                </Row>
                            </FormItem>
                            <!-- <FormItem label="PO Generate" prop="POMode">
                                <radio-group v-model="formValidate.POMode">
                                    <radio label="Manual"></radio>
                                    <radio label="Auto"></radio>
                                </radio-group>
                            </FormItem> -->
                            <FormItem label="Thank You Note" >
                                <textarea style="width:86%;padding: 0px 6px;"  placeholder="Enter a thank you note(Max 200 words)"></textarea>
                            </FormItem>
                            <div style="text-align:center;">
                                <Button type="primary" @click="poSubmit('formValidate')" :loading="loading1">Submit</Button>
                                <Button type="ghost" @click="poReset('formValidate')" style="margin-left: 8px;">Reset</Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import axios from "axios"
    let config = require("@/config/customConfig.js")
    let feathersUrl =  config.default.serviceUrl;
    let baseUrl = config.default.baseUrl;
    import Cookies from 'js-cookie';
    import psl from 'psl';
    import settingMenu from './settingMenu.vue';
    // import customSetting from './General-setting.vue'
    // import onlinePayment from './Online-Payment.vue'
    export default {
        components: {
            settingMenu
        },
        data () {
            return {
                loading1: false,
                websiteList: {},
                website: '',
                formValidate: {
                    POMode: '',
                    note: ''
                },
                ruleValidate: {
                    
                },
                data3: [],
                targetKeys3: this.getTargetKeys(),
                listStyle: {
                    width: '250px',
                    height: '300px'
                },
                autoData: []
            }
        },
         async mounted() {
             this.autoData = [];
            var self = this
            // await axios({
            //     method: 'get',
            //     url: config.default.userDetail,
            //     headers: {'Authorization': Cookies.get('auth_token')}
            //     }).then(async function (response) {
            //         self.userid = response.data.data._id               
            //         console.log('user detail response------>',self.userid)
            //     })
            //     .catch(function (error) {
            //         console.log("-------",error);
            //         self.$Message.error(error)
            // });
            this.init()
        },
        methods: {
            async listData (val) {
                var self = this
                var len
                console.log("listdata val",val)
                await self.getSupplierData(val.vid);
            },
            getMockData (response) {
                console.log("getmockdata response",response)
                if(response != undefined) {
                    this.data3 = response.data.aggregations.group_by_username.buckets;
                }
                
                // let mockData = [];
                // for (let i = 1; i <= 20; i++) {
                //     mockData.push({
                //         key: i.toString(),
                //         label: 'Content ' + i,
                //         description: 'The desc of content  ' + i
                        
                //     });
                // }
                // console.log("----------------------------------mockdata",mockData)
                // return mockData;
            },
            getTargetKeys () {
                return this.getMockData()
                        // .filter(() => Math.random() * 2 > 1)
                        // .map(item => item.key);
            },
            handleChange3 (newTargetKeys) {
                console.log("=================handleChange3 newTargetKeys",newTargetKeys)
                this.autoData = newTargetKeys;
                this.targetKeys3 = newTargetKeys;
            },
            render3 (item) {
                return item.key ;
            },
            async poSubmit() {
                let self = this;
				// this.$refs[name].validate((valid) => {
				// 	if (valid) {

                        //-------------------------------------------------------------
                        //Get distributorId from Userdetail 
                        self.loading1 = true;
                        let distributorId;
                        await axios.get(config.default.userDetail, {
                            headers: {
                                'Authorization': Cookies.get('auth_token')
                            }
                        })
                        .then(response => {
                            // console.log("userdetail response",response.data);
                            distributorId = response.data.data._id;
                        })
                        .catch(error => {
                            console.log("Error in userdetail",error)
                        })

                        //Get existing poSettings for selected website
                        console.log("distributorId",distributorId)
                        await axios({
                            method: 'GET',
                            url: 'http://localhost:3037/po-settings',
                            params: {
                                subscriptionId : Cookies.get('subscriptionId'),
                                distributor_id: distributorId,
                                websiteId : this.website.websiteId,
                                vid: this.website.vid
                            },
                            headers:{
                                Authorization : Cookies.get('auth_token'),
                            }
                        })
                        .then(function(response){
                            console.log("posetting get response",response);
                        })
                        .catch(function(erroor) {
                            console.log("error in get posetting",error)
                        })

                        // this.autoData.forEach(item => {
                        //     let poPostData = {
                        //         po_generate_mode : 'Auto',
                        //         thankyou_note : this.formValidate.note,
                        //         distributor_id: distributorId,
                        //         distributor_email: Cookies.get('user'),
                        //         subscriptionId : Cookies.get('subscriptionId'),
                        //         websiteId : this.website.websiteId,
                        //         vid: this.website.vid,
                        //         supplierId : item
                        //     };
                        //     console.log("poPostData0000000000000000000000",poPostData)
                        //     axios({
                        //         method: 'POST',
                        //         url: 'http://localhost:3037/po-settings',
                        //         headers:{
                        //             Authorization : Cookies.get('auth_token'),
                        //             subscriptionId : Cookies.get('subscriptionId')
                        //         },
                        //         data: poPostData
                        //     })  
                        //     .then(function (response) {
                        //         // console.log('response------------------------>',response)
                        //         self.loading = false;
                        //         self.poReset();
                        //         self.$router.push({
                        //             name: 'Settings'
                        //         });
                        //     })
                        //     .catch(function (error) {
                        //         self.loading = false;
                        //         console.log('error in generating po',error)
                        //     })
                        // });
                        //-------------------------------------------------------------

                //     }
                // })
            },
            poReset() {
                this.loading1 = false;
                this.formValidate.POMode = '';
                this.formValidate.note = '';
            },
            init () {
                
                var self = this
                axios({
                    method: 'get',
                    url: config.default.subscriptionWebsitesapi,
                    // params: {
                    //   owner_id: self.userid
                    // },
                    headers: {
                      'Authorization': Cookies.get('auth_token'),
                      'subscriptionId': Cookies.get('subscriptionId')
                    } 
                })
                .then(async function (response){
                    console.log("------------------------response",response);
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
                      self.website = self.websiteList[0]
                      
                      await self.getSupplierData(self.website.vid);
                    }                       
                }).catch(error => {
                    console.log("-------",error.response);
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
                });
            },
            async getSupplierData (vid) {
               // alert(vid)
               
               let self = this;
                axios({
                    method: 'get',
                    url: "https://api.flowzcluster.tk/pdmnew/filters/username",
                    // params: {
                    //   owner_id: self.userid
                    // },
                    headers: {
                      'Authorization': Cookies.get('auth_token'),
                      'vid': vid
                    } 
                })
                .then(async function (response){
                    console.log(".>>>>>>>>>>>>>>>>>>> .... ",response)
                    await self.getMockData(response);
                }).catch(error => {
                    console.log("-------",error.response);
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
                });
            }
        }
    }
</script>