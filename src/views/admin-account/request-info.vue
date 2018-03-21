<template>
  <div style="text-align: -webkit-center;font-size:10px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div class="drpdwn" style="display: inline;">
      <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: -webkit-left;" @on-change="listData">
          <Option v-for="item in row" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
      </Select>
    </div>
              <h4 class="panel-title" style="text-align:-webkit-right;display: -webkit-inline-box;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion11" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
        <div class="panel panel-default panel-group" id="accordion11" style="border: none;margin-top:1%;text-align: -webkit-left;">
              <!-- <div class="panel-heading">
              </div> -->
              <div class="panel-collapse collapse" id="collapseTwo">
                  <div class="panel-body">
                      <form>
                          <div class="collapse-maindiv maindiv" >
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#username"></span>
                                      <label>Name</label>
                                  </div>
                                  <div class="panel-collapse collapse" id="username">
                                      <select class="form-control"  v-model="cname" id="selectCustomer">
                                        <option value="">All</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="panel panel-default">
                                  <div class="panel-heading"><span class="glyphicon glyphicon-play collapsed" data-toggle="collapse" data-target="#productname"></span>
                                      <label>Product Name</label>
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
    list: []
    }
  },
  methods: {

    reset() {
      this.cname = '';
      this.pname = '';
    },
    async changeData() {
      console.log("Before this.filterArray------->",this.filterArray)
      this.filterArray = this.data
       console.log("After this.filterArray------->",this.filterArray)
      var self = this

      if(this.cname != ''){
        console.log("this.cname", this.cname)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)                  
            return item.productInfo[0].username === self.cname;                  
        });
        console.log("myarr",this.filterArray)
        console.log(" Filter this.filterArray------->",this.filterArray)
        this.list = this.filterArray
        console.log("After Filter this.filterArray------->",this.filterArray)
      }else{
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.cname)
        console.log("myarr",this.filterArray)
        this.list = this.filterArray
      }

      if(this.pname != ''){
        console.log("this.pname", this.pname)
        this.filterArray = _.filter(this.filterArray,  function(item){
          console.log("item",item)                  
            return item.productInfo[0].product_name === self.pname;                  

        });
        console.log("myarr",this.filterArray)
        console.log(" Filter this.filterArray------->",this.filterArray)
        this.list = this.filterArray
        console.log("After Filter this.filterArray------->",this.filterArray)
      }else{
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuu",this.pname)
        console.log("myarr",this.filterArray)
        this.list = this.filterArray
      }

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
          let Namearr = [];
          let Productarr = [];
          self.list = _.orderBy(response.data.data, ['created_at'],['desc'])
          self.data = self.list
          self.data.forEach(obj => {
            Namearr.push(obj.productInfo[0].username)
            Productarr.push(obj.productInfo[0].product_name)
          })
          Namearr = _.chain(Namearr).sort().uniq().value();
          Productarr = _.chain(Productarr).sort().uniq().value();
          Namearr.forEach(item => {
              var x = document.getElementById("selectCustomer");
              var option = document.createElement("option");
              option.text = item;
              console.log()
              x.add(option);
          })
          Productarr.forEach(item => {
              var x = document.getElementById("selectProduct");
              var option = document.createElement("option");
              option.text = item;
              console.log()
              x.add(option);
          })

      })
    },
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