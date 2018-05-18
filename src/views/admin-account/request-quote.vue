<template>
  <div class="table-box" style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div class="drpdwn" style="display: inline;">
    <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
        <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
    </Select>
    </div>
    <Tabs type="card" @on-click="click" style="margin-top: 10px;">
        <TabPane label="Request Quote">
         <div style=" text-align: -webkit-right;">
            <h4 class="panel-title" style="text-align:-webkit-right;display: -webkit-inline-box;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion12" href="#collapseT"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
         </div>
        <div class="panel panel-default panel-group" id="accordion12" style="border: none;margin-top:1%;text-align: -webkit-left;">
              <!-- <div class="panel-heading">
              </div> -->
              <div class="panel-collapse collapse" id="collapseT">
                  <div class="panel-body">
                      <form>
                          <div class="collapse-maindiv maindiv" >
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#uname"></span>
                                      <label>Name</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="uname">
                                      <select class="form-control"  v-model="cname" id="selectCustom">
                                        <option value="">All</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#prname"></span>
                                      <label>Product Name</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="prname">
                                      <select class="form-control"  v-model="pname" id="selectPro">
                                        <option value="">All</option>
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
          <Table :columns="columns1" :data="list" size="small"  ref="table" stripe></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
                </div>
            </div>
        </TabPane>
        <TabPane label="Request Info">
          <requestInfo :row="websiteList"></requestInfo>
        </TabPane>
    </Tabs>
    <Modal
        v-model="modal1"
        title="Preview RequestQuote Details"
        width="45%"
        ok-text= "Download PDF"
        @on-ok="download"
        @on-cancel="cancel">
        <downloadRequestQuote id="requestQuote" :row="requestQuote"></downloadRequestQuote>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment'
import config from '@/config/customConfig'
import expandRow from './view-request-quote.vue';
import requestInfo from './request-info.vue'
import _ from 'lodash';
import downloadRequestQuote from './download-requestQuote.vue';
var api = config.default.requestquoteapi;
export default {
  name: 'myaccount',
  components: { expandRow,requestInfo,downloadRequestQuote},
  data () {
  return {
    requestQuote: {},
    modal1: false,
    filterArray:'',
    len: 1,
    pageSize: 10,
    websiteList: [],
    website: '',
    userid:'',
    optionsPage:[10,20,30,50],
    columns1:[
      {
        type: 'expand',
        width: 50,
        render: (h, params) => {
          console.log('params--------------->',params)
          return h(expandRow, {
            props: {
              row: params.row
            }
          })
        }
      },
      {
          "title": "ID",
          "key": "id"
      },
      {

          "title": "Name",
          "key": "user_info",
          render: (h,params) => {
            // return params.row.user_info.fullname
            return h('div', [
                h('span', params.row.user_info.fullname)
              ]); 
          }
      },
      {
          "title": "Product Name",
          "key": "product_name",
          render: (h,params) => {
            // return params.row.product_description.product_name
            return h('div', [
                h('span', params.row.product_description.product_name)
              ]);
          }
      },
      {

        "title": "Total Item",
        "key": "total_qty"
      },
      {
        "title": "Requested On",
        "key": "created_at",
        render:(h,{row})=>{
                var date1 = moment(row.created_at).format('DD-MMM-YYYY')
                // return date1
                return h('div', [
                  h('span', date1)
                ]);
              }
      },
      {
          title: 'Download',
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
    list: [],
    tableHeight: 450,
    cname: '',
    pname: ''
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
    async changePage (p) {
        // this.page = p
        var self = this
        console.log("not inside",self.filterArray.length)
        if(self.filterArray.length == 0){
            console.log("inside",self.filterArray)
            self.list = await self.mockTableData(p,self.pageSize);
        }else{
            self.list = await self.mockTableDataFilter(p,self.pageSize);
        }
    },
    async mockTableData (p,size) {
        console.log("mocktable call---------------",this.data)
        this.len = this.data.length
        if(this.len == 0){
            console.log("data length 0--------------->",this.tableHeight)
            this.tableHeight = 100
        }else if(this.len < 10){
            console.log("data length 10--------------->",this.tableHeight)
              this.tableHeight = (this.len * 40) + 35
        }else{
            this.tableHeight = 450
        }

        return this.data.slice((p - 1) * size, p * size);
    },
    async mockTableDataFilter (p,size) {
        console.log("p-------------->",p)
        console.log("p-------------->",size)
        console.log("console.log------------>",this.filterArray)
        this.len = this.filterArray.length
        if(this.len == 0){
            console.log("data length 0--------------->",this.tableHeight)
            this.tableHeight = 100
        }else if(this.len < 10){
            console.log("data length 10--------------->",this.tableHeight)
              this.tableHeight = (this.len * 40) + 35
        }else{
            this.tableHeight = 450
            }
        return this.filterArray.slice((p - 1) * size, p * size);
    },
    reset(){
        this.pname = '';
        this.cname = '';
        this.listData(this.website);
    },
     click (index) {
      console.log("Tab clicked", index)
      if(index == 1){
        this.getReuestInfoData()
      }else {
        this.getReuestQuoteData()
      }
    },
    // async viewDetails(params,status){
    //   console.log("params and status", status , params)
    //     if (!status) {
    //       console.log("if", status)
    //       return
    //     }
    //     else{
    //       console.log("else", status)
    //     $('.ivu-table-cell-expand-expanded').click()
    //     }  
    // },
    async getReuestInfoData () {
      console.log("getReuestInfoData getReuestInfoData getReuestInfoData")
      var self = this;
      await axios({
        method: 'get',
        url: config.default.subscriptionWebsitesapi,
        // params : {
        //   userId:self.userid,
        // },
        headers:{
          'Authorization': Cookies.get('auth_token'),
          'subscriptionId': Cookies.get('subscriptionId')    
        }
        }).then(async function (response) {
           if(response.data.data.length == 0){
            console.log("in if condition")
            self.$Notice.error({
              desc: 'Websites not available for this subscription',
              title: 'Error',
              duration: 4.5
            })
          }else{    
            console.log("in else condition")       
            var result = _.uniqBy(response.data.data,'websiteId')
            self.websiteList = result
            // self.website = self.websiteList[0].websiteId
            // console.log("websiteList websiteList", self.website)
          }
          // console.log('response------>',response)
          // self.list = response.data.data
          // var result = _.uniqBy(response.data.data,'websiteId')
          // self.websiteList = result
          console.log("self.websiteList self.websiteList self.websiteList", self.websiteList)
          // self.website = self.websiteList[0].websiteId
        }).catch(error => {
            console.log("-------",error);
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
    reset() {
      this.cname = '';
      this.pname = '';
      this.listData(this.website);
    },
     async changeData() {
        console.log("Before this.filterArray------->",this.data)
        this.filterArray = this.data
         console.log("After this.filterArray------->",this.filterArray)
        var self = this

        if(this.cname != ''){
          console.log("this.cname", this.cname)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)                  
              return item.user_info.fullname === self.cname;                  
          });
          console.log("myarr",this.filterArray)
          console.log(" Filter this.filterArray------->",this.filterArray)
          this.list = await this.mockTableDataFilter(1,self.pageSize)
        //   this.list = this.filterArray
          console.log("After Filter this.filterArray------->",this.filterArray)
        }else{
          console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
          console.log("myarr",this.filterArray)
          this.list = await this.mockTableDataFilter(1,self.pageSize)
        //   this.list = this.filterArray
        }

        if(this.pname != ''){
          console.log("this.pname", this.pname)
          this.filterArray = _.filter(this.filterArray,  function(item){
            console.log("item",item)                  
              return item.product_description.product_name === self.pname;                  
          });
          console.log("myarr",this.filterArray)
          console.log(" Filter this.filterArray------->",this.filterArray)
          this.list = await this.mockTableDataFilter(1,self.pageSize)
        //   this.list = this.filterArray
          console.log("After Filter this.filterArray------->",this.filterArray)
        }else{
          console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.pname)
          console.log("myarr",this.filterArray)
          this.list = await this.mockTableDataFilter(1,self.pageSize)
        //   this.list = this.filterArray
        }

    },

    show (params) {
        var self = this
        console.log("params", params.row)
        self.modal1 = true
        self.requestQuote = params.row
        // self.orderDate = moment(self.orderList.products[0].createdAt).format('DD-MMM-YYYY')
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

                 "html" : $('#requestQuote').html()
             },

             }).then(function (response) {
               self.$Loading.finish()
               // console.log("uuuuuuuuuuuuuuuuuuuuuu",response);
               // console.log("uuuuuuuuuuuuuuuuuuuuuuQQQQQQQQQQQQQQQQQQ",self.orderList.billing_details.data.InvoiceNumber);
               var arrayBufferView = new Uint8Array( response.data.data );
               var blob=new Blob([arrayBufferView], {type:"application/pdf"});
               var link=document.createElement('a');
               link.href=window.URL.createObjectURL(blob);
               link.download=self.requestQuote.id == undefined ? "custom_Invoice" : self.requestQuote.id;
               link.click();
         }).catch(function (error) {
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
         })
    },
    async getReuestQuoteData () {
      var self = this;
      await axios.get( config.default.subscriptionWebsitesapi, {
        // params : {
        //   owner_id: self.userid
        // },
        headers: {
          'Authorization': Cookies.get('auth_token'),
          'subscriptionId': Cookies.get('subscriptionId')
        } 
        }).then(async function (response) {

          console.log('response request quote------>',response.data.data)
          if(response.data.data.length == 0){
            console.log("in if condition")
            self.$Notice.error({
              title: "Error",
              desc: 'Websites not available for this subscription',
              duration: 4.5
            })
          }else{    
            console.log("in else condition")       
            var result = _.uniqBy(response.data.data,'websiteId')
            self.websiteList = result
            self.website = self.websiteList[0].websiteId
          }
        }).catch(error => {
            console.log("-------",error);
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
    listData (val) {
      var self = this
      var len
      console.log("val", val)
      let Namearr = [];
      let Productarr = [];
        $('#selectCustom').children('option:not(:first)').remove();
        $('#selectPro').children('option:not(:first)').remove();
      axios.get(api, {
          params: {
              website_id: val,
          },
           headers: {
            'Authorization': Cookies.get('auth_token'),
            // 'subscriptionId': Cookies.get('subscriptionId')
          } 
      })
      .then(async function (response){
          console.log("response val", response.data)

          self.data = _.orderBy(response.data.data, ['created_at'],['desc'])
          self.list = await self.mockTableData(1,self.pageSize)
        //   self.data = self.list
          self.data.forEach(obj => {
            Namearr.push(obj.user_info.fullname)
            Productarr.push(obj.product_description.product_name)
          })
          Namearr = _.chain(Namearr).sort().uniq().value();
          Productarr = _.chain(Productarr).sort().uniq().value();
          Namearr.forEach(item => {
              var x = document.getElementById("selectCustom");
              var option = document.createElement("option");
              option.text = item;
              console.log()
              x.add(option);
          })
          Productarr.forEach(item => {
              var x = document.getElementById("selectPro");
              var option = document.createElement("option");
              option.text = item;
              console.log()
              x.add(option);
          })

      })
      .catch(function (error){
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
            }else if (error.hasOwnProperty('response')){
                self.$Notice.error({
                    title: error.response.data.name,
                    desc: error.response.data.message,
                    duration: 10
                })
            }
      })
    },
  },
  async mounted(){
    // var self = this
    // await axios({
    //   method: 'get',
    //   url: config.default.userDetail,
    //   headers: {'Authorization': Cookies.get('auth_token')}
    //   }).then(async function (response) {
    //     self.userid = response.data.data._id
    //     console.log('user detail response------>',self.userid)
    //   })
    //   .catch(function (error) {
    //     console.log("-------",error);
    //       self.$Message.error(error)
    //   });
    console.log("mounted of request quote")
  this.getReuestQuoteData();
  }
}
</script>

<style scoped>
  .ivu-table-wrapper {
    margin-top: 20px;
  }
  .ivu-table-cell {
        word-break: break-word;
    }
    .table-box .ivu-tabs {padding-bottom: 150px;}
</style>