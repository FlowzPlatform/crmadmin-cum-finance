<template>
  <div>
    <Tabs type="card">
        <TabPane label="Requested Quote">
          <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
              <Option v-for="item in websiteList" :value="item.website_id" :key="item.id">{{ item.website_id }}</Option>
          </Select>
          <Table :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
        </TabPane>
        <TabPane label="Requested Info">
          <requestInfo></requestInfo>
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
    websiteList: {},
    website: '',
    userid:'',
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
        "title": "TOTAL ITEM",
        "key": "total_qty"
      },
      {
        "title": "REQUESTED ON",
        "key": "created_at",
        render:(h,{row})=>{
                var date1 = moment(row.created_at).format('DD-MMM-YYYY')
                return date1
              }
      },
      {
          title: 'Download Request_Quote',
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
    list: []
    }
  },
  methods: {
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
         })
    },
    async getReuestQuoteData () {
      var self = this;
      await axios.get( api, {
        // params : {
        //   owner_id: self.userid
        // },
        headers: {
          'Authorization': Cookies.get('auth_token'),
          // 'subscriptionId': Cookies.get('subscriptionId')
        } 
        }).then(async function (response) {
          console.log('response request quote>',response)
          var result = _.uniqBy(response.data.data,'website_id')
          self.websiteList = result
          self.website = self.websiteList[0].website_id
        })
        .catch(function (error) {
          console.log("-------",error);
            self.$Message.error({
              content: error,
              duration: 10
            })
        });
    },
    listData (val) {
      var self = this
      var len
      console.log("val", val)
      axios.get(api, {
          params: {
              website_id: val,
          },
           headers: {
            'Authorization': Cookies.get('auth_token'),
            // 'subscriptionId': Cookies.get('subscriptionId')
          } 
      })
      .then(function (response){
          console.log("response val", response.data)
          self.list = response.data.data
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
  this.getReuestQuoteData();
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
