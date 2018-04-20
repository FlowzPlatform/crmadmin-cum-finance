<template>
    <div>
        <div style="padding:10px;">
            <Table stripe :columns="columns1" :data="poData"></Table>
        </div>
        <settingMenu></settingMenu>
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
                poData: [],
                columns1: [
                    {
                        title: 'POMode',
                        key: 'po_generate_mode'
                    },
                    {
                        title: 'thankyou_note',
                        key: 'thankyou_note'
                    },
                    {
                        title: 'Supplier Email',
                        key: 'supplierEmail'
                    }
                ]
            }
        },
        methods: {
            init () {
                axios({
                    method:'get',
                    url:feathersUrl +'po-settings',
                    headers:{
                        Authorization : Cookies.get('auth_token'),
                        subscriptionId : Cookies.get('subscriptionId')
                    },
                })
                .then(async response => {
                    console.log("po settings response",response)
                    this.poData = response.data;
                    // this.poData = [
                    //     {
                    //         po_generate_mode : "auto",
                    //         thankyou_note : "123256",
                    //         distributor_id : "",
                    //         distributor_email : "",
                    //         subscription_id :"",
                    //         websiteId:"",
                    //         vid : "",
                    //         supplierId:"",
                    //         supplierEmail:""
                    //     },
                    //     {
                    //         po_generate_mode : "auto",
                    //         thankyou_note : "dfcgh",
                    //         distributor_id : "",
                    //         distributor_email : "",
                    //         subscription_id :"",
                    //         websiteId:"",
                    //         vid : "",
                    //         supplierId:"",
                    //         supplierEmail:""
                    //     },
                    //     {
                    //         po_generate_mode : "auto",
                    //         thankyou_note : "fghjk",
                    //         distributor_id : "",
                    //         distributor_email : "",
                    //         subscription_id :"",
                    //         websiteId:"",
                    //         vid : "",
                    //         supplierId:"",
                    //         supplierEmail:""
                    //     }
                    // ];
                })
                .catch(error => {
                    console.log("error in po settings get",error)
                })
            }
        },
        mounted() {
            this.init()
        }
    }
</script>