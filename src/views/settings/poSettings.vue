<template>
    <div>
        <div style="width:96%;">
            <Row>
                <Col span="12" offset="6">
                    <Card>
                        <p slot="title">Purchase Order Configuration</p>
                        <Form class="form" label-position="left" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" style="width:100%;align:center;">
                            <FormItem label="PO Generate" prop="POMode">
                                <radio-group v-model="formValidate.POMode">
                                    <radio label="Manual"></radio>
                                    <radio label="Auto"></radio>
                                </radio-group>
                            </FormItem>
                            <FormItem label="Thank You Note" prop="note">
                                <textarea style="width:100%;" v-model="formValidate.note" placeholder="Enter a thank ypu note(Max 200 words)"></textarea>
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
    // import customSetting from './General-setting.vue'
    // import onlinePayment from './Online-Payment.vue'

    export default {
        components: {
            
        },
        data () {
            return {
                loading1: false,
                formValidate: {
                    POMode: '',
                    note: ''
                },
                ruleValidate: {
                    
                }
            }
        },
        methods: {
            poSubmit() {
                let self = this;
				this.$refs[name].validate((valid) => {
					if (valid) {
                        self.loading1 = true;
                        let poPostData = {
                            po_generate_mode : this.formValidate.POMode,
                            thankyou_note : this.formValidate.note,
                            distributor_info: Cookies.get('user'),
                            subscriptionId : Cookies.get('subscriptionId'),
                            websiteId : '',
                            vid: '',
                            supplierId : '',
                            supplierEmail: ''
                        };
                        axios({
                            method: 'POST',
                            url: 'http://172.16.230.56:3037/po-settings',
                            headers:{
                                Authorization : Cookies.get('auth_token'),
                                subscriptionId : Cookies.get('subscriptionId')
                            },
                            data: poPostData
                        })  
                        .then(function (response) {
                            // console.log('response------------------------>',response)
                            self.loading = false;
                            self.poReset();
                            self.$router.push({
                                name: 'Settings'
                            });
                        })
                        .catch(function (error) {
                            self.loading = false;
                            console.log('error in generating po',error)
                        })
                    }
                })
            },
            poReset() {
                this.loading1 = false;
                this.formValidate.POMode = '';
                this.formValidate.note = '';
            },
        }
    }
</script>