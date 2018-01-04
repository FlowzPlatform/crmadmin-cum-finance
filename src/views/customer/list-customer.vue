<style >
   
</style>

<template>
  <div>
    <!-- <Table :columns="columns8" :data="listData" stripe border ref="table"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="len" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
    <br> -->
    <div v-if="spinShow">
      <Spin size="large"></Spin>
    </div>
    <div v-else>
      <Tabs  @on-click="tabClicked">
        <TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
        <Table v-if ="tabPane.domain=='Xero'" :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
        <Table v-else :columns="columns2" :data="list" border size="small" ref="table" stripe></Table>
        
        <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                <Page :total="len" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
        <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
          <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
      </TabPane>
      </Tabs>  
    </div>
  </div>
</template>

<script>
let config = require("@/config/customConfig.js")
import Cookies from 'js-cookie';
console.log(config)
let feathersUrl =  config.default.serviceUrl;
var _ = require('lodash');
var pageSize = 10
import axios from 'axios'
export default {
  name: 'list-customer',
  data () {
  return {
    tabPanes : [],
    spinShow: true,
    page: 1,
    len: 1,
    list: [],
    pageSize: pageSize,
    columns1: [
      {
        "title": "Name",
        "key": "Name",
      },
      {
        "title": "Status",
        "key": "ContactStatus",
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
        "sortable": true,
        render:(h,{row})=>{
          if((row.EmailAddress == undefined) || (row.EmailAddress == ''))
            {
              return "Not available"
            } 
            else {
              return row.EmailAddress
            }
          }
      },
      {
        "title": "Mobile",
        "key": "Phones",
        "sortable": true,
        render:(h,{row})=>{
          if((row.Phones[3].PhoneNumber == undefined) || (row.Phones[3].PhoneNumber == ''))
            {
              return "Not available"
            } 
            else {
              return row.Phones[3].PhoneNumber
            }
          }
      },
      {
        "title": "Phone",
        "key": "click",
        "sortable": true,
        render:(h,{row})=>{ 
          if((row.Phones[1].PhoneCountryCode != undefined || row.Phones[1].PhoneNumber != undefined) || (row.Phones[1].PhoneCountryCode != '' || row.Phones[1].PhoneNumber != ''))
            {
              return "Not available"
            }
            else{
              return row.Phones[1].PhoneCountryCode +" "+row.Phones[1].PhoneNumber 
            }
          }
      },
      {
        "title": "Fax",
        "key": "active",
        "sortable": true,
        render:(h,{row})=>{ 
          if(row.Phones[2].PhoneNumber != undefined || row.Phones[2].PhoneNumber != '')
            {
              return "Not available"
            } 
          else
            {
              return row.Phones[2].PhoneNumber
            }
          }
      },
      {
        "title": "Address",
        "key": "Addresses",
        "sortable": false,
        render:(h,{row})=>{
          return row.Addresses[0].AddressLine1 +", "+row.Addresses[0].AddressLine2+", " +row.Addresses[0].City+", "+row.Addresses[0].Country+", "+row.Addresses[0].PostalCode;      
        }
      },
      {
        "title": "isCustomer",
        "key": "IsCustomer",
        "sortable": true
      },
      {
        "title": "isSupplier",
        "key": "IsSupplier",
        "sortable": true
      }
    ],
    columns2: [
      {
        "title": "Name",
        "key": "Name",
      },
      {
        "title": "Status",
        "key": "ContactStatus",
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
        "sortable": true,
        render:(h,{row})=>{
          if((row.EmailAddress == undefined) || (row.EmailAddress == ''))
            {
              return "Not available"
            } 
            else {
              return row.EmailAddress
            }
          }
      },
      {
        "title": "Mobile",
        "key": "Phones",
        "sortable": true,
        render:(h,{row})=>{
          if((row.Phones[3].PhoneNumber == undefined) || (row.Phones[3].PhoneNumber == ''))
            {
              return "Not available"
            } 
            else {
              return row.Phones[3].PhoneNumber
            }
          }
      },
      {
        "title": "Phone",
        "key": "click",
        "sortable": true,
        render:(h,{row})=>{ 
          if((row.Phones[1].PhoneCountryCode != undefined || row.Phones[1].PhoneNumber != undefined) || (row.Phones[1].PhoneCountryCode != '' || row.Phones[1].PhoneNumber != ''))
            {
              return "Not available"
            }
            else{
              return row.Phones[1].PhoneCountryCode +" "+row.Phones[1].PhoneNumber 
            }
          }
      },
      {
        "title": "Fax",
        "key": "active",
        "sortable": true,
        render:(h,{row})=>{ 
          if(row.Phones[2].PhoneNumber != undefined || row.Phones[2].PhoneNumber != '')
            {
              return "Not available"
            } 
          else
            {
              return row.Phones[2].PhoneNumber
            }
          }
      },
      {
        "title": "Address",
        "key": "Addresses",
        "sortable": false,
        render:(h,{row})=>{
          
              return row.Addresses[0].AddressLine1 +", "+row.Addresses[0].AddressLine2+", " +row.Addresses[0].City+", "+row.Addresses[0].Country+", "+row.Addresses[0].PostalCode;
          
        }
      },
      {
        "title": "isCustomer",
        "key": "IsCustomer",
        "sortable": true
      },
      {
        "title": "isSupplier",
        "key": "IsSupplier",
        "sortable": true
      }
    ],
    data6: [],
    listData: []
    }
  },
  methods: {
    async mockTableData1 (p,size) {
      this.len = this.data6.length
      return this.data6.slice((p - 1) * size, p * size);
    },
    async changePage (p) {
      this.page = p
      this.list = await this.mockTableData1(p,pageSize);
    },
    async tabClicked(data){
      console.log(data)
      let settingId = this.tabPanes[data].id
      this.getContactBySettingId(settingId)
    },
    async getContactBySettingId(settingId){
      this.$Loading.start();
      this.data6 = [];
      let self = this;
      self.list = [];
      await axios.get(feathersUrl +'contacts', {
         headers:{
          Authorization : Cookies.get('auth_token')
      },
      params : {
      settingId : settingId
      }
      }).then(async function (response) {
        console.log("$$$$$$$$$$$$$$$$$$$",response)
        self.data6 = response.data[0].data;
          self.$Loading.finish();
          $('.preload').css("display","none")
          self.list = await self.mockTableData1(1,pageSize)
      }).catch(function (error) {
        console.log("error",error);
          self.$Loading.error();
      });   
    },          
    async getAllSettings(){
        let self = this;
        axios.get(config.default.serviceUrl + 'settings?isActive=true', {
            headers:{
                Authorization : Cookies.get('auth_token')
            },
        })
        .then(function (response) {
            console.log("response------>iuy",response);
            self.spinShow = false;
            if (response.data.data.length != 0)
            {
              self.tabPanes = response.data.data;
            $('.preload').css("display","none")
            let settingId = self.tabPanes[0].id
            self.getContactBySettingId(settingId)
            }else
            {
                self.$Modal.warning({
                title: 'No Configuration available',
                okText : "Go to Settings",
                content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
                onOk: () => {
                      self.$router.push({
                          name: 'newsettings'
                      })
                  }
                });
            }
            
        })
        .catch(function (error) {
            console.log("error",error);
            self.spinShow = false;
        });
    },
    exportData (type) {
                if (type === 1) {
                  console.log(this.$refs);
                    this.$refs.table[0].exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table[0].exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } 
    } 
  },
  mounted(){
    this.getAllSettings();
  }
}
</script>

<style>
.ivu-table table {
  font-size: 14px;
}
.ivu-table th{
  background-color: #d9edf7;
}
.ivu-table-border th {
    border-right: 1px solid #ddd;
}
</style>