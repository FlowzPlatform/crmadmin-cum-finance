<template>
    <div>
        <Card>
            <Collapse  accordion>
                <Panel name="1">
                    User Information
                    <p slot="content">
                        <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12"> 
                            <h4>{{row.user_billing_info.name}}</h4> 
                            <p>
                                <span style="font-weight:500">
                                    {{row.user_billing_info.street1}} <br>
                                    <span v-if="row.user_billing_info.street2"> {{row.user_billing_info.street2}}<br></span>
                                    <span v-else></span>
                                    {{row.user_billing_info.city}} - {{row.user_billing_info.postalcode}}<br>
                                    {{row.user_billing_info.state}} , {{row.user_billing_info.country}}
                                </span>
                            </p>
                        </label>
                        <label class="col-sm-12 col-md-6 col-lg-3 col-xs-12"> 
                            <ul class="ulList">
                                <li>
                                    <Icon type="ios-telephone" size="15"></Icon> 
                                    <label style="font-weight:500">{{row.user_billing_info.phone}}</label>
                                </li>
                                <li>
                                    <Icon type="ios-email" size="15"></Icon> 
                                    <label style="font-weight:500">{{row.user_billing_info.email}}</label>
                                </li>
                            </ul>
                        </label>
                    </p>
                </Panel>
                <Panel name="2">
                    Product Information
                    <p slot="content">
                        <Table stripe border :columns="columns1" :data="data1"></Table>
                    </p>
                </Panel>
            </Collapse>
        </Card>
        <div ref="email" style="display:none">
            <h2>Purchase Order</h2>
            <p style="font-size:16px">Purchase order received from {{row.PO_id}}</p>
            <p style="font-size:16px">To view the order please click below Button.</p>
            <a :href='"http://localhost:8080/#/purchase-order-received?PO_id="+row.PO_id' style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">View PO</a>  
        </div>
    </div>
</template>
<script>
const accounting = require('accounting-js');
import purchaseOrder from '../purchase-order-received.vue';
import expandRow from './view-purchaseOrder-list-Product.vue';
import Cookies from 'js-cookie';
import config from '../../config/customConfig.js'
import axios from 'axios';
import psl from 'psl';

export default {
    name: 'view-purchaseOrder-list',
    props: {
        row: Object
    },
    components:{
        purchaseOrder
    },
    data() {
        return {
            // value1: '1',
            imgurl: 'http://image.promoworld.ca/migration-api-hidden-new/web/images/',
            data1: [],
            columns1: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: 'Product Image',
                    align:  'center',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: this.getImgUrl(params.row.product_description.default_image)
                                },
                                style: {
                                    width:'75px',
                                    margin: '2px'
                                }
                                }, '')
                        ]);
                    }
                },
                {
                    title: 'Item#',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            h('span', row.product_description.sku)
                        ]);
                    }
                },
                {
                    title: 'Product Name',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            h('span', row.product_description.product_name)
                        ]);
                    }
                },
                {
                    title: 'Quantity',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            h('span', row.total_qty)
                        ]);
                    }
                },
                {
                    title: 'Unit Price',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            h('span', accounting.formatMoney(row.unit_price))
                        ]);
                    }
                },
                {
                    title: 'Total Amount',
                    align:  'center',
                    render : (h , {row}) => {
                        let total = accounting.formatMoney(row.total_qty * row.unit_price);
                        return h('div', [
                            
                            h('span',  total)
                        ]);
                    }
                },
                {
                    title: 'Supplier Name',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            
                            h('span', row.product_description.supplier_info.supplier_name)
                        ]);
                    }
                },
                {
                    title: 'Supplier Email',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            h('span',  row.product_description.supplier_info.email)
                        ]);
                    }
                },
                {

                    title: 'Supplier Company',
                    align:  'center',
                    render : (h , {row}) => {
                        return h('div', [
                            h('span',  row.product_description.supplier_info.company)
                        ]);
                    }
                },
                {
                    title: 'Action',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                placement: 'top',
                                content: 'Resend Email'
                                },
                                style:{
                                // float:'left',
                                cursor:'pointer'
                                }
                            },[
                                h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'large',
                                    icon: 'android-send'
                                },
                                style: {
                                    marginRight: '3px',
                                    padding: '0px',
                                    fontSize: '20px',
                                    color: '#2d8cf0'
                                },
                                on: {
                                    click: () => {
                                        this.resendEmail(params.row)
                                    }
                                }
                            }, '')
                            ])
                        ]);
                    }
				}
            ],
        }
    },
    methods:{
        resendEmail (data) {
            this.$Modal.confirm({
				title: 'Email would be sent to',
				okText: 'OK',
				cancelText: 'Cancel',
				render: (h) => {
					return h('Input', {
						props: {
							value: data.product_description.supplier_info.email,
							autofocus: true,
							placeholder: 'Please enter email Id...'
						},
						on: {
							input: (val) => {
								data.product_description.supplier_info.email = val;
							}
						}
					})
				},
				onOk: async ()=>{
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",data)
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%",this.row.orderId)
                    this.$Loading.start()
                    var self = this
                    let myData = {
                            "to":  data.product_description.supplier_info.email,
                            // "to":"hdheniya@officebrain.com",
                            "from": Cookies.get('user'),
                            "subject": "Purchase Order Generated for Order Id :- " + this.row.orderId,
                            "body": self.$refs.email.innerHTML
                        };
                        myData = JSON.stringify(myData)
                        await axios({
                            method: 'post',
                            url:  'https://api.'+process.env.domainkey+'/vmailmicro/sendEmail',
                            data: myData,
                            headers: {
                                'authorization':  Cookies.get('auth_token'),
                            }
                        }).then(async function (response) {
                            console.log(response);
                            self.$message.success("Email Send Successfully");
                            await axios({
                                method: 'patch',
                                url: config.default.serviceUrl + 'purchase-order/'+self.row.id,
                                data: {
                                    "EmailStatus":"Sent"
                                },
                                headers: {
                                    'Authorization': Cookies.get('auth_token'),
                                    'subscriptionId': Cookies.get('subscriptionId')
                                } 
                            }).then(async function (response){
                                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",response)
                                let data = {
                                    "data":response.data,
                                    "index":self.row._index
                                }
                                self.$emit('mydataemit',data)

                            })
                    self.$Loading.finish()
                })
                .catch(function (error) {
                    console.log(error);
                    self.$Loading.error()
                    self.$Message.warning("Email Send Failed, Please try again later");
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
                            duration: 4.5
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
			})
        },
        getImgUrl (url) {
                return this.imgurl + url
            }
    },
    mounted(){
        console.log("@@@@@@@@@@@@@@@@@@@@@-------->",this.row)
        this.data1 = this.row.products
    } 
}
</script>
<style>
.ivu-table-cell{
    word-break: break-word;
}
</style>

