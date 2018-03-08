<template>
    <div style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; ">
        <div class="drpdwn" style="text-align:center">
            <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
                <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
            </Select>
        </div>
        <Table stripe  border @on-expand="viewDetails" :columns="columns1" :data="data1"></Table>

        <Modal
            v-model="modal1"
            title="Preview Order Details"
            width="59%"
            ok-text= "Download PDF"
            @on-ok="download"
            @on-cancel="cancel">
            <downloadOrderList id="orderList" :row="orderList"></downloadOrderList>
        </Modal>

    </div>
</template>

<script>
    import moment from 'moment';
    import config from '../../config/customConfig.js'
    import expandRow from './view-order-list.vue';

    import downloadOrderList from './download-orderlist.vue';
    import Cookies from 'js-cookie';
    let axios = require('axios'); 
    let _ = require('lodash');

    const accounting = require('accounting-js');
    var res;
    export default {
        name: 'orderlist',
        components: { expandRow , downloadOrderList},
        data() {
            return { 
                value1: '1',

                modal1: false,

                websiteList: {},
                website: '',
                orderList: {},
                orderDate: '',
                userid: '',
                columns1: [
                     {
                        // title: 'Order',
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            // console.log('rowwwwwwwwwwwwww-------Expand', params.row)
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'Order Id',
                        key: 'id',
                        align:  'center'
                    },
                    {
                        title: 'Name',
                        align:  'center',
                        render : (h , {row}) => {
                            return row.user_billing_info.name
                        }
                    },
                    {
                        title: 'Email',
                        align:  'center',
                        render : (h , {row}) => {
                            return row.user_billing_info.email
                        }
                    },
                    {
                        title: 'Order Date',
                        width: 110,
                        align:  'center',
                        render : (h , {row}) => {
                            var date = moment(row.products[0].createdAt).format('DD-MMM-YYYY')
                            return date
                        }
                    },
                    {
                        title: 'User Type',
                        width: 115,
                        align:  'center',
                        key: 'user_type'
                    },
                    // {
                    //     title: 'Total Quantity',
                    //     key: 'quantity'
                    // },
                    {
                        title: 'Total Product',
                        width: 115,
                        align:  'center',
                        render : (h , {row}) => {
                            return row.products.length
                        }
                    },
                    {
                        title: 'Total Amount',
                        width: 115,
                        align:  'center',
                        render : (h , {row}) => { return accounting.formatMoney(row.total) }
                    },
                    {
                        title: 'Download Order',
                        width: 100, 
                        align:  'center',
                        render: (h, params) => {
							return h('Button', {
				                props: {
									type: 'text',
									size: 'large',
									icon: 'ios-cloud-download-outline'
				                },
				                style: {
									marginRight: '3px',
									padding: '0px',
									fontSize: '20px',
									color: '#2d8cf0'
				                },
				                on: {
				                    click: () => {
				                        this.show(params)
				                    }
				                }
				            }, '')
						}
                    }
                ],
                data1: []
            }
        },
        methods: {
            init () {
                var self = this
                console.log("config.default.orderapi", config.default.orderapi)
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
                .then(function (response){
                    console.log("response", response.data)
                    var result = _.uniqBy(response.data.data,'websiteId')
                    console.log("result", result)
                    self.websiteList = result
                    console.log("self.websiteList", self.websiteList[0].websiteId)                    
                    self.website = self.websiteList[0].websiteId                  
                })
                // axios.get( config.default.orderapi , {
                //     params: {
                //       owner_id: self.userid
                //     },
                //     // headers: {
                //     //   'Authorization': Cookies.get('auth_token'),
                //     //   // 'subscriptionId': Cookies.get('subscriptionId')
                //     // } 
                // })
                // .then(function (response){
                //     console.log("response", response.data)
                //     var result = _.uniqBy(response.data.data,'website_id')
                //     console.log("result", result)
                //     self.websiteList = result
                //     self.website = self.websiteList[0].website_id                  
                // })
            },
            listData (val) {
                var self = this
                var len
                console.log("val", val)
                axios.get( config.default.orderapi , {
                    params: {
                        website_id: val
                    },
                    // headers: {
                    //   'Authorization': Cookies.get('auth_token'),
                    //   // 'subscriptionId': Cookies.get('subscriptionId')
                    // }
                })
                .then(function (response){
                    console.log("response val", response.data)
                    self.data1 = _.orderBy(response.data.data, ['created_at'],['desc']);
                })
            },
            show (params) {
                var self = this
                console.log("params", params.row) 

                self.modal1 = true
                self.orderList = params.row
                self.orderDate = moment(self.orderList.products[0].createdAt).format('DD-MMM-YYYY')
                // setTimeout(function(){console.log('.........self.$refs.email2.innerHTML......', $('#orderList').html())
                //     self.download()
                // },100)
            },
            async cancel() {
                self.modal1 = false
            },
            async download() {
                var self = this
		        self.$Loading.start()

                await axios({
                    method: 'post',
                    url: config.default.serviceUrl + 'exporttopdf',
                    data: {
                        "html" : $('#orderList').html()
                    },  
                })
                .then(function (response) {
                    self.$Loading.finish()
                    console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
                    console.log("uuuuuuuuuuuuuuuuuuuuuuQQQQQQQQQQQQQQQQQQ",self.orderList.billing_details.data.InvoiceNumber);
                    var arrayBufferView = new Uint8Array( response.data.data );
                    var blob=new Blob([arrayBufferView], {type:"application/pdf"});
                    var link=document.createElement('a');
                    link.href=window.URL.createObjectURL(blob);
                    link.download=self.orderList.id == undefined ? "custom_Invoice" : self.orderList.id;
                    link.click();
                })    
            },
            getMulti(a, b) {
                return accounting.formatMoney(a * b);
            },
            getImgUrl (url) {
                return this.imgurl + url
            },
            getSubTotal (a, b, c) {
                var res = c.hasOwnProperty('charges')
                if ( res == false) {
                    return accounting.formatMoney(a*b)
                }
                else {
                    return accounting.formatMoney((a*b + parseInt(c.charges.setup_charge)))
                }
            },
            accounting(item){
              return accounting.formatMoney(item)
            },
            clicked (inx) {
                console.log("Clickeddddd...............", inx);
                $('#description'+inx).slideToggle(700);
                $(document).ready(function(){
                    $('.owl-carousel').owlCarousel({
                        stopOnHover : true,
                        navigation:true,
                        items : 4,
                        itemsDesktop: [1199, 4],
                        itemsDesktopSmall: [979, 4],
                        itemsTablet: [767, 2],
                        itemsMobile: [479, 2]
                    });
                });
                // $(".description").css("display", "table-row");
            },
            downloadBill () {
                this.billinfo = true
            },
            async viewDetails(params,status){
                // setTimeout(function(){
                // $('.my-panel').css('display','none')
                // },100)
                if (!status) return
                $('.ivu-table-cell-expand-expanded').click()
            }
        },
        async mounted() {
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
        filters: {
            upper(item) {
                return item.toUpperCase()
            }
        },
    }
</script>

<style scoped>
    .ivu-table-wrapper {
        margin-top: 20px;
    }
    .ivu-table-cell {
        word-break: break-word;
    }
</style>
