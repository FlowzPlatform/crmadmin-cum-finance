<template>
  <div>
    <Tabs type="card">
        <TabPane label="Requested Info">
          <requestInfo></requestInfo>
        </TabPane>
        <TabPane label="Requested Quote">
          <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
              <Option v-for="item in websiteList" :value="item.website_id" :key="item.id">{{ item.website_id }}</Option>
          </Select>
          <Table :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment'
import config from '@/config/customConfig'
import expandRow from './view-request-info.vue';
import requestInfo from './request-info.vue'
import _ from 'lodash';
var api = "http://172.16.230.181:3032/request-quote";
export default {
  name: 'myaccount',
  components: { expandRow,requestInfo },
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
        "key": "total_qty"
      },
      {
        "title": "CREATED DATE",
        "key": "created_at",
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
        url: api,
        params : {
        },
        headers:{
        }
        }).then(async function (response) {
          console.log('response------>',response)
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
              // user_id:self.userid
          }
      })
      .then(function (response){
          console.log("response val", response.data)
          self.list = response.data.data
      })
    },
  },
  async mounted(){
    var self = this
    await axios({
      method: 'get',
      url: config.default.userDetail,
      headers: {'Authorization': Cookies.get('auth_token')}
      }).then(async function (response) {
        self.userid = response.data.data._id               
        console.log('user detail response------>',self.userid)
      })
      .catch(function (error) {
        console.log("-------",error);
          self.$Message.error(error)
      });
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