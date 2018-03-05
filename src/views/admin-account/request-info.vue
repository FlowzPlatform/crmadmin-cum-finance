<template>
  <div>
    <div class="drpdwn" style="text-align:center">
      <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
          <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
      </Select>
    </div>
    <Table :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
import moment from 'moment'
import config from '@/config/customConfig'
import expandRow from './view-request-info.vue';
import _ from 'lodash'
export default {
  name: 'myaccount',
  components: { expandRow },
  data () {
  return {
    websiteList: {},
    website: '',
    userid:'',
    columns1:[
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
          "title": "ID",
          "key": "id"
      },
      {
        "title": "TOTAL ITEM",
        // "key": "productInfo",
        render:(h,{row})=>{
          var total = row.productInfo.length
          return total
        }
      },
      {
        "title": "REQUESTED ON",
        // "key": "created_at",
        render:(h,{row})=>{
                var date1 = moment(row.created_at).format('DD-MMM-YYYY')
                return date1
              }
      }
    ],
    list: []
    }
  },
  methods: {
    async getReuestQuoteData () {
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
          console.log('response------>',response)
          // self.list = response.data.data
          var result = _.uniqBy(response.data.data,'websiteId')
          self.websiteList = result
          self.website = self.websiteList[0].websiteId
        })
        .catch(function (error) {
          console.log("-------",error);
            self.$Message.error(error)
        });
    },
    listData (val) {
      var self = this
      var len
      console.log("val", val)
      axios({
          method: 'get',
          url: config.default.requestinfoapi,
          params: {
              website_id: val
          },
          headers:{
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
