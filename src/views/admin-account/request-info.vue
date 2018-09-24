<template>
  <div style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <!-- <div class="drpdwn" style="display: inline;">
      <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
          <Option v-for="item in row" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
      </Select>
    </div> -->
    <div style=" text-align: -webkit-right;">
      <h4 class="panel-title" style="text-align:-webkit-right;display: -webkit-inline-box;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion11" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
    </div>
        <div class="panel panel-default panel-group" id="accordion11" style="border: none;margin-top:1%;text-align: -webkit-left;">
              <!-- <div class="panel-heading">
              </div> -->
              <div class="panel-collapse collapse" id="collapseTwo">
                  <div class="panel-body">
                      <form>
                          <div class="collapse-maindiv maindiv" >
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;"  data-target="#username">
                                      <label style="padding-left:  7px;">Name</label>
                                      </span>
                                  </div>

                                  <div class="panel-collapse collapse" id="username">
                                      <select class="form-control"  v-model="cname" id="selectCustomer">
                                        <option value="">All</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#productname">
                                      <label style="padding-left:  7px;">Product Name</label>
                                      </span>
                                  </div>
                                  <div class="panel-collapse collapse" id="productname">
                                      <select class="form-control"  v-model="pname" id="selectProduct">
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
  <div>
    <Table :columns="columns1" :data="list" @on-expand="viewDetails" size="small" ref="table" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
          <Page :total="len" :current="1" @on-change="changePage" show-sizer @on-page-size-change="changepagesize" :page-size-opts="optionsPage"></Page>
      </div>
    </div>
  </div>
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
  props: {
    row: Array
  },
  data () {
  return {
    websiteList: {},
    cname: '',
    pname: '',
    website: '',
    userid:'',
    filterArray: '',
    len:1,
    pageSize:10,
    optionsPage:[10,20,30,50],
    tableHeight:450,
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

          "title": "Name",
          "key": "username",
          render: (h,params) => {
            // return params.row.productInfo[0].username
             return h('div', [
                h('span', params.row.productInfo[0].username)
              ]);
          }
      },
      {
          "title": "Product Name",
          "key": "product_name",
          render: (h,params) => {
            // return params.row.productInfo[0].product_name
            return h('div', [
                h('span', params.row.productInfo[0].product_name)
              ]);
          }
      },
      {

        "title": "Total Item",
        // "key": "productInfo",
        render:(h,{row})=>{
          var total = row.productInfo.length
          // return total
          return h('div', [
                h('span', total)
              ]);
        }
      },
      {
        "title": "Requested On",
        // "key": "created_at",
        render:(h,{row})=>{
                var date1 = moment(row.created_at).format('DD-MMM-YYYY')
                return h('div', [
                  h('span', date1)
                ]);
                // return date1
              }
      }
    ],
    data: [],
    list: []
    }
  },
  methods: {
    changepagesize(pageSize){
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
        if(self.filterArray.length == 0){
            self.list1 = await self.mockTableData1(p,self.pageSize);
        }else{
            self.list1 = await self.mockTableData2(p,self.pageSize);
        }
    },
    async mockTableData1 (p,size) {
        this.len = this.list.length
        if(this.len == 0){
            this.tableHeight = 100
        }else if(this.len < 10){
              this.tableHeight = (this.len * 40) + 35
        }else{
            this.tableHeight = 450
        }

        return this.list.slice((p - 1) * size, p * size);
    },
    async mockTableData2 (p,size) {
        this.len = this.filterArray.length
        if(this.len == 0){
            this.tableHeight = 100
        }else if(this.len < 10){
              this.tableHeight = (this.len * 40) + 35
        }else{
            this.tableHeight = 450
            }
        return this.filterArray.slice((p - 1) * size, p * size);
    },
    reset() {
      this.cname = '';
      this.pname = '';
      this.listData(this.website);
    },
    async viewDetails(params,status){
        if (!status) return
        $('.ivu-table-cell-expand-expanded').click()
    },
    async changeData() {
      this.filterArray = this.data
      var self = this

      if(this.cname != ''){
        this.filterArray = _.filter(this.filterArray,  function(item){
            return item.productInfo[0].username === self.cname;
        });
        // this.list = await this.mockTableData2(1,self.pageSize)
        // this.list = this.filterArray
      }else{
        // this.list = await this.mockTableData2(1,self.pageSize)
        // this.list = this.filterArray
      }

      if(this.pname != ''){
        this.filterArray = _.filter(this.filterArray,  function(item){
            return item.productInfo[0].product_name === self.pname;

        });
        // this.list = await this.mockTableData2(1,self.pageSize)
        // this.list = this.filterArray
      }else{
        // this.list = await this.mockTableData2(1,self.pageSize)
        // this.list = this.filterArray
      }
      this.list = await this.mockTableData2(1,self.pageSize)

    },
    listData (val) {
      var self = this
      var len
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
      .then(async function (response){
          let Namearr = [];
          let Productarr = [];
          $('#selectCustomer').children('option:not(:first)').remove();
          $('#selectProduct').children('option:not(:first)').remove();
          self.list = _.orderBy(response.data.data, ['created_at'],['desc'])
          self.data = await self.mockTableData1(1,self.pageSize)
          // self.data = self.list
          self.list.forEach(obj => {
            Namearr.push(obj.productInfo[0].username)
            Productarr.push(obj.productInfo[0].product_name)
          })
          Namearr = _.chain(Namearr).sort().uniq().value();
          Productarr = _.chain(Productarr).sort().uniq().value();
          Namearr.forEach(item => {
              var x = document.getElementById("selectCustomer");
              var option = document.createElement("option");
              option.text = item;
              x.add(option);
          })
          Productarr.forEach(item => {
              var x = document.getElementById("selectProduct");
              var option = document.createElement("option");
              option.text = item;
              x.add(option);
          })

      }).catch(function (error){
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
		}else if(error.hasOwnProperty('response')){
			self.$Notice.error({
				title: error.response.data.name,
				desc: error.response.data.message,
				duration: 10
			})
		}
      })
    },
    toggleIcon: function (e) {
                $(e.target)
                    .prev('.panel-heading')
                    .find(".more-less")
                    .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
            }

  },
  mounted () {
    $('.panel-group').on('hidden.bs.collapse', this.toggleIcon);
            $('.panel-group').on('shown.bs.collapse', this.toggleIcon);
  },
   watch: {
     'row': async function(id) {
            this.website = this.row[0].websiteId
            this.listData(this.website)
          }
   }
}
</script>

<style>
  .ivu-table-wrapper {
    margin-top: 20px;
  }
  .ivu-table-cell {
        word-break: break-word;
    }
</style>
