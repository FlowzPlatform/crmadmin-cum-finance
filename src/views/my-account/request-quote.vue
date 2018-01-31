<template>
  <div>
    <Table :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
import moment from 'moment'
import expandRow from './view-request-quote.vue';
export default {
  name: 'myaccount',
  data () {
  return { 
    components: { expandRow },
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
        "title": "ORDERED ON",
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
    viewDetails(params) {
      console.log('uuuuuuuuuuuuuuuuuu',params)
    },
    DeleteDetails(params){
      console.log('uuuuuuuuuuuuuuuuuu',params)
    },
    async getReuestQuoteData () {
      var self = this;
      await axios({
        method: 'get',
        url: 'http://172.16.230.181:3032/request-quote',
        params : {
        },
        headers:{
        }
        }).then(async function (response) {
          console.log('response------>',response)
          self.list = response.data.data
          // console.log('iiiiiiiiiiiiii',self.list)

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted(){
    this.getReuestQuoteData();
  }
}
</script>

<style>

</style>