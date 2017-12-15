<style >
   
</style>

<template>
    <div>
    <Table :columns="columns8" :data="data7" size="small" stripe = 1 border = 1 ref="table"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
    <br>
    <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
    <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
    <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> Export custom data</Button>
    </div>
</template>

<script>
let config = require("@/config/customConfig.js")
console.log(config)
let feathersUrl =  config.default.serviceUrl;
var _ = require('lodash');
import axios from 'axios'
export default {
        name: 'list-customer',
        data () {
            return {
                columns8: [
                    {
                        "title": "Name",
                        "key": "Name",
                        "fixed": "left",
                        "width": 200
                    },
                    {
                        "title": "Status",
                        "key": "ContactStatus",
                        "width": 150,
                        "sortable": true,
                        filters: [
                            {
                                label: 'ACTIVE',
                                value: 1
                            },
                            {
                                label: 'INACTIVE',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.ContactStatus ==  'ACTIVE';
                            } else if (value === 2) {
                                return row.ContactStatus == 'INACTIVE';
                            }
                        }
                    },
                    {
                        "title": "Email",
                        "key": "EmailAddress",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "Mobile",
                        "key": "Phones",
                        "width": 150,
                        "sortable": true,
                        render:(h,{row})=>{ return row.Phones[3].PhoneNumber }
                    },
                    {
                        "title": "Phone",
                        "key": "click",
                        "width": 150,
                        "sortable": true,
                        render:(h,{row})=>{ return row.Phones[1].PhoneNumber.PhoneCountryCode +" "+row.Phones[1].PhoneNumber }
                    },
                    {
                        "title": "Fax",
                        "key": "active",
                        "width": 150,
                        "sortable": true,
                        render:(h,{row})=>{ return row.Phones[2].PhoneNumber }
                    },
                    {
                        "title": "Address",
                        "key": "Addresses",
                        "width": 250,
                        "sortable": false,
                        render:(h,{row})=>{
                            for (var index = 0; index < row.Addresses.length; index++) {
                                return row.Addresses[0].AddressLine1 +", "+row.Addresses[0].AddressLine2+", " +row.Addresses[0].City+", "+row.Addresses[0].Country+", "+row.Addresses[0].PostalCode;
                            }
                        }
                    },
                    {
                        "title": "isCustomer",
                        "key": "IsCustomer",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "isSupplier",
                        "key": "IsSupplier",
                        "width": 150,
                        "sortable": true
                    }
                ],
                data7: []
            }
        },
        mounted(){
            let self= this;
            axios.get(feathersUrl +'contacts', {
            
        })
        .then(function (response) {
            console.log(response)
            self.data7 = response.data; 
        })
        .catch(function (error) {
            console.log(error);
        });
        },
        methods: {
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            } ,
            changePage(){

            }     
        }
    }
</script>

