<template>
    <div>
        <settingMenu></settingMenu>
        <div style="width:96%;">
            <Row>
                <Col span="20" offset="3">
                    <Card>
                        <p slot="title">Purchase Order Configuration</p>
                       
                        
                        <Form class="form" label-position="left" ref="formValidate" :model="formValidate" :label-width="140" style="width:100%;align:center;padding: 27px;">
                            
                             <FormItem label="Select Website">
                                <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 86%;text-align: -webkit-left;" @on-change="listData">
                                    <Option v-for="item in websiteList" :value="item" :key="item.websiteId" >{{ item.websiteName }} </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="Select Suppliers">
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
                            <!--<FormItem label="Thank You Note" prop="note">
                                <textarea style="width:86%;padding: 0px 6px;"  placeholder="Enter a thank you note(Max 200 words)"></textarea>
                            </FormItem>-->
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
                    POMode: ''
                },
                submit: false,
                data3: [],
                data4: [],
                targetKeys3: [],
                poArr: [],
                supplierArr: [],
                newSupplierArr: [],
                leftarr: [],
                rightarr: [],
                listStyle: {
                    width: '250px',
                    height: '300px'
                },
                poSettingGetData: [],
                distributorId: ''
            }
        },
         async mounted() {
            let self = this
            await axios.get(config.default.userDetail, {
                headers: {
                    'Authorization': Cookies.get('auth_token')
                }
            })
            .then(response => {
                // console.log("userdetail response",response.data);
                this.distributorId = response.data.data._id;
            })
            .catch(error => {
                console.log("Error in userdetail",error)
            })

            //Get existing poSettings for selected website
            console.log("distributorId",this.distributorId)

            this.init()
        },
        methods: {
            async listData (val) {
                let len
                console.log("listdata val",val)
                this.data3 = [];
                this.leftarr = [];
                this.rightarr = [];
                await this.getPoSettings();
                await this.getSupplierData(val.vid);
            },
            async getMockData (response) {
                //console.log("getmockdata response",response)
                
                let self = this
                // console.log(response)
                if(response != undefined) {
                    this.data4 = response.data.aggregations.group_by_username.buckets;
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.data4)
                    let modified_supplier_data = await this.modify_supplier_data(this.data4)
                    this.data3 = modified_supplier_data;
                    console.log("modified_supplier_data",this.data3[0])
                    self.supplierArr = [];
                    for (let item of this.data3) {
                        self.supplierArr.push(item.key)
                    }
                    this.supplierArr = this.supplierArr.filter((e) => !this.poArr.includes(e))
                    console.log("supplierArr",self.supplierArr);
                } 
            },
            async modify_supplier_data(data){
                // console.log("inside modified supplier data----------",data)
                let self = this;
                self.newSupplierArr = [];
                // return new Promise((resolve , reject) =>{
                    //     data.forEach(async (item,index) => {
                    //         axios({
                    //             method: 'get',
                    //             url: "https://api.flowzcluster.tk/user/getuserdetails/"+item.key,
                    //             headers: {
                    //             'Authorization': Cookies.get('auth_token')
                    //             } 
                    //         })
                    //         .then(async function (response){
                    //             console.log("user data response " , response)
                    //             response.data.data[0].key = item.key
                    //             self.newSupplierArr.push(response.data.data[0])
                                
                    //         }).catch(error => {
                    //             console.log("-------",error); 
                    //         });
                    //     })
                    //     console.log("self.newSupplierArr------------------------------------> " , self.newSupplierArr)
                    //     resolve(self.newSupplierArr)
                // })
                for (let [index, item] of data.entries()) {
                    console.log("item",item)
                    let resp = await axios({
                        method: 'get',
                        url: "https://api.flowzcluster.tk/user/getuserdetails/"+item.key,
                        headers: {
                            'Authorization': Cookies.get('auth_token')
                        } 
                    })
                    .then(function (response){
                        console.log("user data response " , response)
                        return response.data.data[0]                        
                    }).catch(error => {
                        console.log("-------",error);
                        return {} 
                    });

                    if (Object.keys(resp).length > 0) {
                        resp.key = item.key
                        self.newSupplierArr.push(resp)
                    }
                }

                return self.newSupplierArr;
                
            },
            // getMockData (response,poSettingGetData) {
            //     let self = this;
            //     console.log("getmockdata response",response)
            //     if(response != undefined) {
            //         this.data3 = response.data.aggregations.group_by_username.buckets;
            //         for (let i=0;i<this.data3.length;i++) {
            //             this.supplierArr.push(this.data3[i].key)
            //         }
            //         this.supplierArr = this.supplierArr.filter((e) => !this.poArr.includes( e ))
            //     }
                
            //     console.log("this.data3",JSON.stringify(this.data3))

            //     return this.data3;
            // },
            handleChange3 (newTargetKeys,direction,moveKeys) {
                // console.log("=================handleChange3 direction",direction)
                // console.log("movedkey",movedkey)
                if (direction === 'left') {
                    moveKeys.forEach(item => {
                        this.leftarr.push(item)
                        this.rightarr = this.rightarr.filter(e => e !== item)
                    })
                }
                else if (direction === 'right') {
                    moveKeys.forEach(item => {
                        this.rightarr.push(item)
                        this.leftarr = this.leftarr.filter(e => e !== item)
                    })
					// this.rightarr.push(moveKeys[0])
                }
                else {

                }
                this.targetKeys3 = newTargetKeys;
                console.log("this.leftarr",this.leftarr)
                console.log("this.rightarr",this.rightarr)
                // console.log("------------------this.targetKeys3",this.targetKeys3)
            },
            render3 (item) {
                // return item.key ;
                if(item.lastname != undefined){
                    return item.firstname + ' ' +item.lastname
                }else if(item.username != undefined){                                
                     return item.username
                }else {
                    return item.email ;
                }
            },
            async poSubmit() {
                let self = this;
				// this.$refs[name].validate((valid) => {
				// 	if (valid) {

                        //-------------------------------------------------------------
                        //Get distributorId from Userdetail 
                        self.loading1 = true;
                        this.rightarr = this.rightarr.filter((e) => !this.poArr.includes( e ))
                        console.log("on submit this.rightarr",this.rightarr)
                        this.rightarr.forEach(item => {
                            let poPostData = {
                                po_generate_mode : 'Auto',
                                thankyou_note : this.formValidate.note,
                                distributorId: this.distributorId,
                                distributor_email: Cookies.get('user'),
                                subscriptionId : Cookies.get('subscriptionId'),
                                websiteId : this.website.websiteId,
                                vId: this.website.vid,
                                supplierId : item
                            };
                            console.log("PO PostData",poPostData)
                            axios({
                                method: 'POST',
                                url: feathersUrl +'po-settings',
                                headers:{
                                    Authorization : Cookies.get('auth_token'),
                                    subscriptionId : Cookies.get('subscriptionId')
                                },
                                data: poPostData
                            })  
                            .then(function (response) {
                                // console.log('response------------------------>',response)
                                self.loading1 = false;
                                self.poReset();
                                // window.location.reload();
                                self.submit = true;
                                // self.$router.push({
                                //     name: 'PurchaseOrder'
                                // });
                            })
                            .catch(function (error) {
                                self.loading1 = false;
                                self.submit = false;
                                console.log('error in generating po',error)
                            })
                        });

                        this.leftarr = this.leftarr.filter((e) => !this.supplierArr.includes(e))
                        console.log("on submit this.leftarr",this.leftarr)
                        this.leftarr.forEach(async (item) => {
                            console.log("inside leftarr foreach",item)
                            console.log("this.poSettingGetData",this.poSettingGetData)
                            let index = _.findIndex(this.poSettingGetData, function(o) { return o.supplierId === item; });
                            console.log("index",index)
                            if (index >= 0) {
                                let poId = this.poSettingGetData[index].id;
                                console.log("poId",poId)
                                await axios.delete(feathersUrl+'po-settings/'+poId)                                    
                                .then(async (res) => {
                                    // console.log("po delete response",res);
                                    self.loading1 = false;
                                    self.poReset();
                                    this.submit = true;
                                    // self.$router.push({
                                    //     name: 'PurchaseOrder'
                                    // });
                                })

                            }
                        })
                        console.log("this.submit",this.submit);
                        if (this.submit) {
                            this.$Message.success('PO setting updated successfully')
                        }
                        //-------------------------------------------------------------

                //     }
                // })
            },
            poReset() {
                this.loading1 = false;
                this.formValidate.POMode = '';
                this.formValidate.note = '';
            },
            async init () {
                let self = this
                await axios({
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
                        let result = _.uniqBy(response.data.data,'websiteId')
                        console.log("result", result)
                        self.websiteList = result
                        console.log("self.websiteList", self.websiteList[0])                    
                        self.website = self.websiteList[0]
                        console.log("self.website",self.website)
                        // await self.getPoSettings();
                        // await self.getSupplierData(self.website.vid);
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
            async getPoSettings() {
                let self = this;
                await axios({
                    method: 'GET',
                    url: feathersUrl+'po-settings',
                    params: {
                        subscriptionId : Cookies.get('subscriptionId'),
                        distributorId: self.distributorId,
                        websiteId : self.website.websiteId,
                        vId: self.website.vid
                    },
                    headers: {
                        Authorization : Cookies.get('auth_token'),
                    }
                })
                .then(function(response){
                    // console.log("posetting get response",response.data.data);
                    self.poSettingGetData = response.data.data
                    self.poArr = [];
                    for (let item of self.poSettingGetData) {
                        self.poArr.push(item.supplierId)
                    }
                    self.targetKeys3 = self.poArr;
                    console.log("get posetting data inside function",self.poSettingGetData)
                    // console.log("self.poArr",JSON.stringify(self.poArr))
                })
                .catch(function(error) {
                    console.log("error in get posetting",error)
                })
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
                    console.log(".>>>>>>>>>>>>>>>>>>> ....supplier get response ",response)
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