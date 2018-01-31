<template>
    <div>
        <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
            <Option v-for="item in websiteList" :value="item.website_id" :key="item.id">{{ item.website_id }}</Option>
        </Select>
        <Table stripe  border  :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
    import moment from 'moment';
    import expandRow from './view-order-list.vue';
    let axios = require('axios'); 
    let _ = require('lodash');
    var api = "http://172.16.61.160:3032/myOrders";
    const accounting = require('accounting-js');
    var res;
    export default {
        name: 'orderlist',
        components: { expandRow },
        data() {
            return { 
                value1: '1',
                modal2: false,
                websiteList: {},
                website: '',
                orderList: '',
                orderDate: '',
                columns1: [
                     {
                        // title: 'Order',
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
                        title: 'Order Id',
                        key: 'id',
                        align:  'center'
                    },
                    {
                        title: 'Name',
                        align:  'center'
                    },
                    {
                        title: 'Email',
                        align:  'center'
                    },
                    {
                        title: 'Order Date',
                        width: 110,
                        align:  'center',
                        render : (h , {row}) => {
                            console.log("row", row)
                            var date = moment(row.products[0].createdAt).format('DD-MMM-YYYY')
                            return date
                        }
                    },
                    {
                        title: 'User Type',
                        width: 115,
                        align:  'center'
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
                            // console.log("row", row)
                            return row.products.length
                        }
                    },
                    {
                        title: 'Total Amount',
                        width: 115,
                        align:  'center',
                        render : (h , {row}) => { return accounting.formatMoney(row.total) }
                    },
                    // {
                    //     title: 'Action',
                    //     width: 100, 
                    //     align:  'center',
                    //     render: (h, params) => {
					// 		return h('Button', {
				    //             props: {
					// 				type: 'text',
					// 				size: 'large',
					// 				icon: 'eye'
				    //             },
				    //             style: {
					// 				marginRight: '3px',
					// 				padding: '0px',
					// 				fontSize: '20px',
					// 				color: '#2d8cf0'
				    //             },
				    //             on: {
				    //                 click: () => {
				    //                     this.show(params)
				    //                 }
				    //             }
				    //         }, '')
					// 	}
                    // }
                ],
                data1: []
            }
        },
        methods: {
            init () {
                var self = this
                axios.get( api , {
                    params: {
                        owner_id: '59a8e0dd41dc17001aeb1e67'
                    }
                })
                .then(function (response){
                    // console.log("response", response.data)
                    var result = _.uniqBy(response.data,'website_id')
                    // console.log("result", result)
                    self.websiteList = result                   
                })
            },
            listData (val) {
                var self = this
                var len
                console.log("val", val)
                axios.get( api , {
                    params: {
                        website_id: val
                    }
                })
                .then(function (response){
                    console.log("response val", response.data)
                    self.data1 = response.data
                })
            },
            // show (params) {
            //     var self = this
            //     console.log("params", params.row) 
            //     self.orderList = params.row
            //     self.orderDate = moment(self.orderList.products[0].createdAt).format('DD-MMM-YYYY')
            //     self.modal2 = true
            // }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style>
    .single-page {
        text-align: center;
    }
    .ivu-table-wrapper {
        margin-top: 20px;
    }
</style>
