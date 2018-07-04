<template>
  <div>
    <div class="panel panel-default panel-group" id="accordion">
      <div class="panel-heading">
        <h4 class="panel-title" style="text-align:-webkit-right;"><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
      </div>
      <div class="panel-collapse collapse" id="collapseTwo">
        <div class="panel-body">
          <form>
              <div class="collapse-maindiv maindiv" style="text-align: left;">
                  <div class="panel panel-default">
                      <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#Customer"></span>
                          <label>Customer Name</label>
                      </div>
                      <div class="panel-collapse collapse" id="Customer">
                          <select class="form-control"  v-model="cname" id="selectCustomer">
                            <option value="">All</option>
                          </select>
                      </div>
                  </div>
                  <div class="panel panel-default">
                      <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#Email"></span>
                          <label>Email Address</label>
                      </div>
                      <div class="panel-collapse collapse" id="Email">
                          <select class="form-control"  v-model="email" id="selectEmail">
                            <option value="">All</option>
                          </select>
                      </div>
                  </div>
                  <div class="panel panel-default">
                      <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse"
                          data-target="#status"></span>
                          <label>Status</label>
                      </div>
                      <div class="panel-collapse collapse" id="status">
                          <select class="form-control mb-2 mb-sm-0" v-model="status" id="selectStatus">
                              <option value="">All</option>
                              <!-- <option value="ACTIVE">ACTIVE</option>
                              <option value="INACTIVE">INACTIVE</option> -->
                          </select>
                      </div>
                  </div>
                  <div style="margin-top: 5px;">
                    <Button type="warning" @click= "reset()" style= "float:right;margin-right: 5px;">Reset</Button>
                    <Button type="primary" @click= "changeData()" style= "float:right;    margin-right: 5px;">Apply</Button>
                  </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  <div class="table-box">
    <div v-if="spinShow">
      <Spin size="large"></Spin>
    </div>
    <div v-else>
      <Tabs  @on-click="tabClicked" :value="tabIndex">
        <TabPane  v-for="tabPane in tabPanes" :label="tabPane.configName">
        <!-- <i-table v-if ="tabPane.domain=='Xero'" :height="tableHeight" :columns="columns1" :data="list" size="small" ref="table" stripe></i-table>
        <i-table v-if ="tabPane.domain=='QB'" :height="tableHeight" :columns="columns2" :data="list" size="small" ref="table" stripe></i-table>
        <i-table v-if ="tabPane.domain=='custom'" :height="tableHeight" :columns="column3" :data="list" size="small" ref="table" stripe></i-table> -->
        <i-table v-if ="tabPane.domain=='Xero'" :columns="columns1" :data="list" size="small" ref="table" stripe></i-table>
        <i-table v-if ="tabPane.domain=='QB'" :columns="columns2" :data="list" size="small" ref="table" stripe></i-table>
        <i-table v-if ="tabPane.domain=='custom'" :columns="column3" :data="list" size="small" ref="table" stripe></i-table>
        <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
            </div>
        </div>
        <!-- <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
          <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button> -->
      </TabPane>
      </Tabs>
    </div>
  </div>
  </div>
</template>

<script>

  let config = require("@/config/customConfig.js")
  import Cookies from 'js-cookie';
  // console.log(config)
  let feathersUrl =  config.default.serviceUrl;
  var _ = require('lodash');
  import axios from 'axios'
  export default {
    name: 'list-customer',
    data () {
      return {
        tableHeight: 450,
        tabIndex: 0,
        tabPanes : [],
        spinShow: true,
        pageSize: 10,
        page: 1,
        len: 1,
        list: [],
        // pageSize: pageSize,
        columns1: [
          {
            "title": "Customer Name",
            "key": "Name"
          },
          {
            "title": "Email",
            "key": "EmailAddress",
            "sortable": true,
            render:(h,{row})=>{
              if((row.EmailAddress == undefined) || (row.EmailAddress == ''))
                {
                  // return "Not available"
                  return h('div', [              
                      h('span', "Not available")
                  ]);
                }
                else {
                  // return row.EmailAddress
                  return h('div', [                
                      h('span', row.EmailAddress)
                  ]);
                }
              }
          },
          {
            "title": "Mobile No.",
            "key": "Phones",
            "sortable": true,
            "align":"center",
            render:(h,{row})=>{
              if((row.Phones[3].PhoneNumber == undefined) || (row.Phones[3].PhoneNumber == ''))
                {
                  // return "Not available"
                  return h('div', [            
                        h('span', "Not available")
                    ]);
                }
                else {
                  // return row.Phones[3].PhoneNumber
                  return h('div', [              
                      h('span', row.Phones[3].PhoneNumber)
                  ]);
                }
              }
          },
          {
            "title": "Phone No.",
            "key": "click",
            "align":"center",
            "sortable": true,
            render:(h,{row})=>{
              if((row.Phones[1].PhoneCountryCode == undefined || row.Phones[1].PhoneNumber == undefined) || (row.Phones[1].PhoneCountryCode == '' || row.Phones[1].PhoneNumber == ''))
                {
                  // return "Not available"
                  return h('div', [              
                      h('span', "Not available")
                  ]);
                }
                else{
                  // return row.Phones[1].PhoneCountryCode +" "+row.Phones[1].PhoneNumber
                  return h('div', [              
                      h('span', row.Phones[1].PhoneCountryCode +" "+row.Phones[1].PhoneNumber)
                  ]);
                }
              }
          },
          {
            "title": "Fax No.",
            "key": "active",
            "sortable": true,
            "align":"center",
            render:(h,{row})=>{
              // console.log("row.Phones[2].PhoneNumber",row.Phones[2].PhoneNumber)
              if((row.Phones[2].PhoneNumber == undefined) || (row.Phones[2].PhoneNumber == ''))
                {
                  // return "Not available"
                  return h('div', [            
                        h('span', "Not available")
                    ]);
                }
              else
                {
                  // return row.Phones[2].PhoneNumber
                  return h('div', [            
                        h('span', row.Phones[2].PhoneNumber)
                    ]);
                }
              }
          },
          {
            "title": "Address",
            "key": "Addresses",
            "sortable": false,
            render:(h,{row})=>{

              if((row.Addresses[0] == undefined) || (row.Addresses[0] == ''))
              {
                  // return "Not available"
                  return h('div', [            
                        h('span',  "Not available")
                    ]);
              }
              else
              {
                // return row.Addresses[0].AddressLine1 +", "+row.Addresses[0].AddressLine2+", " +row.Addresses[0].City+", "+row.Addresses[0].Country+", "+row.Addresses[0].PostalCode;
                return h('div', [                
                    h('span', row.Addresses[0].AddressLine1 +", "+row.Addresses[0].AddressLine2+", " +row.Addresses[0].City+", "+row.Addresses[0].Country+", "+row.Addresses[0].PostalCode)
                ]);
              }

                  if((row.Addresses[0] == undefined) || (row.Addresses[0] == ''))
                  {
                    // return "Not available"
                    return h('div', [            
                      h('span',  "Not available")
                    ]);
                  }
                  else {
                    // return row.Addresses[0].AddressLine1 +", "+row.Addresses[0].AddressLine2+", " +row.Addresses[0].City+", "+row.Addresses[0].Country+", "+row.Addresses[0].PostalCode;
                    return h('div', [                
                      h('span', row.Addresses[0].AddressLine1 +", "+row.Addresses[0].AddressLine2+", " +row.Addresses[0].City+", "+row.Addresses[0].Country+", "+row.Addresses[0].PostalCode)
                    ]);
                  }
                }
              },
              {
                "title": "Status",
                "key": "ContactStatus",
                "sortable": true,
                "width":120,
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
              }
            ],
            columns2: [
              {
              "title": "Customer Name",
              "key": "DisplayName"
              },
              {
              "title": "Email",
              "key": "PrimaryEmailAddr",
              "sortable": true,
              render:(h,{row})=>{
                // return row.PrimaryEmailAddr.Address
                return h('div', [
                  h('span', row.PrimaryEmailAddr.Address)
                ]);
              }
              },
              {
              "title": "Mobile No.",
              "key": "Mobile",
              "sortable": true,
              "align":"center",
              render:(h,{row})=>{
                  // return "Not available"
                return h('div', [
                  h('span', "Not available")
                ]);
                }
              },
              {
              "title": "Phone No.",
              "key": "PrimaryPhone",
              "sortable": true,
              "align":"center",
              render:(h,{row})=>{
                if(row.PrimaryPhone.FreeFormNumber == "'")
                {
                  // return "Not available"
                  return h('div', [
                    h('span', "Not available")
                  ]);
                }
                else {
                  // return row.PrimaryPhone.FreeFormNumber
                  return h('div', [
                    h('span', row.PrimaryPhone.FreeFormNumber)
                  ]);
                }
                }
              },
              {
              "title": "Fax No.",
              "key": "active",
              "sortable": true,
              "align":"center",
              render:(h,{row})=>{
                  // return "Not available"
                  return h('div', [
                    h('span', "Not available")
                  ]);
                }
              },
              {
              "title": "Address",
              "key": "BillAddr",
              "sortable": false,
              render:(h,{row})=>{

                if(row.BillAddr == "'")
                {
                  // return "Not available"
                  return h('div', [
                    h('span', "Not available")
                  ]);
                }
                else {
                  // return row.BillAddr.Line1 +", "+row.BillAddr.City
                  return h('div', [
                    h('span', row.BillAddr.Line1 +", "+row.BillAddr.City)
                  ]);
                }

            }
          },
          {
            "title": "Status",
            "key": "Active",
            "width":120,
            "sortable": true,
            render:(h,{row})=>{
              if(row.Active == true)
                {
                  // return "ACTIVE"
                  return h('div', [
                      h('span', "ACTIVE")
                  ]);
                }
                else {
                  // return 'INACTIVE'
                  return h('div', [
                      h('span', "ACTIVE")
                  ]);
              }
            },
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
          }
        ],
        column3:[
          {
            "title": "Customer Name",
            "key": "Name",
            render:(h,{row})=>{
              // console.log("-------------row",row)
              // return row.Name
                return h('div', [
                      h('span', row.Name)
                  ]);
              }
          },
          {
            "title": "Email",
            "key": "EmailAddress",
            render:(h,{row})=>{
              // return row.EmailAddress
              return h('div', [
                      h('span', row.EmailAddress)
                  ]);
              }
          },
          {
            "title": "Phone No",
            "key": "PhoneNumber",
            render:(h,{row})=>{
              // return row.PhoneNumber
              return h('div', [
                      h('span', row.PhoneNumber)
                  ]);
              }
          },
          {
            "title": "Address",
            "key": "Address",
            render:(h,{row})=>{
              // return row.Address
              return h('div', [
                      h('span', row.Address)
                  ]);
              }
          },
          {
            "title": "Status",
            "key": "ContactStatus",
            render:(h,{row})=>{
              // return row.ContactStatus
              return h('div', [
                      h('span', row.ContactStatus)
                  ]);
              }
          }
        ],
        data6: [],
        data7: [],
        filterArray: [],
        optionsPage:[10,20,30,50],
        listData: [],
        cname: '',
        status:'',
        email: ''
      }
    },
    methods: {
      changepagesize(pageSize){
          console.log("####################################",pageSize)
          this.pageSize = pageSize
          if(this.pageSize > 10){
            this.tableHeight = 530
          }else{
            this.tableHeight = 450
          }
          this.changePage(1)
      },
      reset() {
        this.cname = '';
        this.status = '';
        this.email = '';
        this.getAllSettings();
      },
      async changeData() {
        // console.log("this.data6", this.data6)
        this.filterArray = this.data6
        var self = this

        if(this.cname != ''){
        //  console.log("this.cname", this.cname)
        this.filterArray = _.filter(this.filterArray,  function(item){
          // console.log("item",item)
            if(item.Name != undefined){
              return item.Name === self.cname;
            }else{
              return item.DisplayName === self.cname;
            }
        });
        //  console.log("myarr",this.filterArray)
        //  this.list = await this.mockTableData2(1,self.pageSize)
        }else{
            // console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
            // console.log("myarr",this.filterArray)
            // this.list = await this.mockTableData2(1,self.pageSize)
          }


        if(this.status != ''){
          // console.log("this.status", this.status)
          this.filterArray = _.filter(this.filterArray,  function(item){
          // console.log("item",item)
            if(item.ContactStatus != undefined){
              return item.ContactStatus === self.status;
            }else{
              if(self.status == 'ACTIVE'){
                if(item.Active == true){
                  return item
                }
              }else{
                if(item.Active == false){
                  return item
                }
              }
            }
          });
        //  console.log("myarr",this.filterArray)
        //  this.list = await this.mockTableData2(1,self.pageSize)
        }else{
            // console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.status)
            // console.log("myarr",this.filterArray)
            // this.list = await this.mockTableData2(1,self.pageSize)
          }
        
        if(this.email != ''){
        //  console.log("this.email", this.email)
        this.filterArray = _.filter(this.filterArray,  function(item){
          // console.log("item",item)
          if(item.EmailAddress != undefined){
            return item.EmailAddress === self.email;
          }
          else{
          if(item.PrimaryEmailAddr != undefined){
            return item.PrimaryEmailAddr.Address === self.email;
          }
          }
        });
        //  console.log("myarr",this.filterArray)
        //  this.list = await this.mockTableData2(1,self.pageSize)
        }else{
            // console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.status)
            // console.log("myarr",this.filterArray)
            // this.list = await this.mockTableData2(1,self.pageSize)
          }

            this.list = await this.mockTableData2(1,self.pageSize)
          
      },
      async mockTableData2 (p,size) {
        // console.log("p-------------->",p)
        // console.log("p-------------->",size)
        // console.log("console.log------------>",this.filterArray)
        this.len = this.filterArray.length
        if(this.len == 0){
            console.log("data length 0--------------->",this.tableHeight)
            this.tableHeight = 100
          }else {
            console.log("data length 10--------------->",this.tableHeight)
            this.tableHeight = (this.len * 40) + 35
          }
        return this.filterArray.slice((p - 1) * size, p * size);
      },
      async mockTableData1 (p,size) {
        this.len = this.data6.length
        if(this.len == 0){
            console.log("data length 0--------------->",this.tableHeight)
            this.tableHeight = 100
          }else {
            console.log("data length 10--------------->",this.tableHeight)
            this.tableHeight = (this.len * 40) + 35
          }
        return this.data6.slice((p - 1) * size, p * size).reverse();
      },
      async changePage (p) {
        var self = this
        this.page = p
        // console.log("not inside",this.filterArray.length)
        if(this.filterArray.length == 0){
          // console.log("inside",this.filterArray)
          this.list = await this.mockTableData1(p,self.pageSize);
        }else{
          this.list = await this.mockTableData2(p,self.pageSize);
        }
      },
      async tabClicked(data){
        // console.log(data)
        this.tabIndex = data;
        let settingName = this.tabPanes[data].configName;
        let settingId = this.tabPanes[data].id
        let settingDomain = this.tabPanes[data].domain;
        this.getContactBySettingId(settingId ,settingDomain , data, settingName)
      },
      async getContactBySettingId(settingId , settingDomain , data, settingName){
        this.$Loading.start();
        this.data6 = [];
        let self = this;
        self.list = [];


        if(settingDomain == 'custom'){
        // console.log(">>>>>>>>>>>>> " , this.tabPanes[data]);
        let customerUrl = this.tabPanes[data].customer_url;
        await axios({
          method: 'get',
          url: customerUrl,
          params : {
            settingId : this.tabPanes[data].id
          },
          headers:{
            Authorization : Cookies.get('auth_token')
          },
        })
        .then(async function (response) {
          self.$Loading.finish();
          // console.log("custom customer get response",response)
          self.data6 = response.data.data.reverse();

          let columnArray =  _.union(...(_.chain(self.data6).map(m => { return _.keys(m) }).value()))
          let modifiedArray = _.pull(columnArray, "id", "importTracker_id" ,"Action" , "settingId" );
          let arr = [];
          let len = columnArray.length;
          for (let i = 0; i < len; i++) {
            arr.push({
              title: columnArray[i],
              key : columnArray[i],
              sortable: true

                });
            }
            self.list = await self.mockTableData1(1,self.pageSize)
            // self.column3 = arr;
          })
          .catch(function (error) {
            self.$Loading.error();
            console.log("error in get customer",error);
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
        else{
          await axios.get(feathersUrl +'contacts', {
            headers:{
              Authorization : Cookies.get('auth_token')
            },
            params : {
              settingId : settingId
            }
          })
          .then(async function (response) {
            console.log("$$$$$$$$$$$$$$$$$$$",typeof response.data[0].data)
            if (response.data[0].data.data) {
              self.$Loading.finish();
              $('.preload').css("display","none")
              self.$Notice.error({
                  duration:4.5, 
                  title: "Xero : Account Credential Incorrect",
                  desc: "Invalid key for "+settingName
              });
            }
            else {
              self.data6 = response.data[0].data.reverse();
              self.$Loading.finish();
              $('.preload').css("display","none")
              self.list = await self.mockTableData1(1,self.pageSize)
            }
          })
          .catch(function (error) {
              console.log("error",error);
              if (error.response.data.message === 'invalid_grant') {
                  self.$Notice.error({
                      duration:0, 
                      title: "QB : Credential Expired",
                      desc: "Token is expired for "+settingName
                  });
              } else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
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
              self.$Loading.error();
          });
        }


        var NameArr = [];
        $('#selectCustomer').children('option:not(:first)').remove();
        var EmailArr = [];
        $('#selectEmail').children('option:not(:first)').remove();
        var StatusArr = [];
        $('#selectStatus').children('option:not(:first)').remove();


        self.data6.forEach (obj => {
        // console.log("obj------------------->",obj);
        if(obj.Name != undefined){
          NameArr.push(obj.Name);
          StatusArr.push(obj.ContactStatus);
          if(obj.EmailAddress === undefined || obj.EmailAddress === ""){

          }else{
          EmailArr.push(obj.EmailAddress)
          }
        }else{
          NameArr.push(obj.DisplayName)
          if(obj.PrimaryEmailAddr != undefined){
          // console.log('IIIIIIIIIIIIIIIIIIIIII',obj.PrimaryEmailAddr.Address)
          EmailArr.push(obj.PrimaryEmailAddr.Address)
          }
          if(obj.Active != undefined){            
            if(obj.Active == true){
              StatusArr.push("ACTIVE");
            }else{
            StatusArr.push("INACTIVE");
            }
          }
          // console.log('StatusArr------------>',StatusArr)
        }
        })

        // console.log("NameArr----------->before", NameArr);
        NameArr.sort();
        // console.log("NameArr----------->after", NameArr);

        // console.log("EmailArr----------->before", EmailArr);
        EmailArr.sort();
        // console.log("EmailArr----------->after", EmailArr);

        NameArr.forEach(item => {
        var x = document.getElementById("selectCustomer");
        var option = document.createElement("option");
        option.text = item;
        x.add(option);
        })

        EmailArr.forEach(item => {
        var y = document.getElementById("selectEmail");
        var option = document.createElement("option");
        option.text = item;
        y.add(option);
        })

        StatusArr = _.chain(StatusArr).sort().uniq().value();
        StatusArr.forEach(item => {
        var y = document.getElementById("selectStatus");
        var option = document.createElement("option");
        option.text = item;
        y.add(option);
        })

      },
      async getAllSettings(){
        let self = this;
        axios.get(config.default.serviceUrl + 'settings?isActive=true', {
          headers:{
            Authorization : Cookies.get('auth_token'),
            subscriptionId : Cookies.get('subscriptionId')
          },
        })
        .then(function (response) {
          // console.log("response------>iuy",response);
          // console.log('this.tabIndex', self.tabIndex)
          self.spinShow = false;
          if (response.data.data.length != 0)
          {
            self.tabPanes = response.data.data;
            $('.preload').css("display","none")
            let settingName = self.tabPanes[self.tabIndex].configName;            
            let settingId = self.tabPanes[self.tabIndex].id
            let settingDomain = self.tabPanes[self.tabIndex].domain;
            self.getContactBySettingId(settingId , settingDomain , self.tabIndex, settingName)
          }
          else {
            self.$Modal.warning({
            title: 'No Configuration available',
            okText : "Go to Settings",
            content: '<h3 style="font-family: initial;">Please navigate to settings and configure or activate at least one Xero or Quickbook account </h3>',
            onOk: () => {
                self.$router.push({
                  name: 'Settings'
                })
              }
            });
          }

        })
        .catch(function (error) {
          console.log("error",error);
          self.spinShow = false;
          if(error.message == 'Network Error'){
            self.$Notice.error({
              title: "Error",
              desc: 'API service unavailable',
              duration: 10
            })
          }else if(error.response.status == 403){
            self.$Notice.error({
            duration:0, 
            title: error.response.statusText,
            desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
            });
          }else if(error.response.status == 401){
            
            let location = psl.parse(window.location.hostname)
            location = location.domain === null ? location.input : location.domain
            
            Cookies.remove('auth_token' ,{domain: location}) 
            self.$store.commit('logout', self);
            
            self.$router.push({
              name: 'login'
            });
            self.$Notice.error({
              title: error.response.data.name,
              desc: error.response.data.message,
              duration: 10
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

  .ivu-spin-main {
      width: 100%;
      text-align: -webkit-center;
  }
  .ivu-table-border th {
      border-right: 1px solid #ddd;
  }
  .ivu-table-cell {
      word-break: break-word;
  }
  .table-box .ivu-tabs {padding-bottom: 150px;}

</style>
