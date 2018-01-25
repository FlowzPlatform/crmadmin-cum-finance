<template>
  <div>
    <Table :columns="columns1" :data="list" border size="small" ref="table" stripe></Table>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
import eye from '../../images/Eye.png'
export default {
  name: 'myaccount',
  data () {
  return {
    theme3: 'light',
    eye,
    columns1:[
      {
          "title": "ID",
          "key": "Name"
      },
      {
        "title": "TOTAL ITEM",
        "key": "Name"
      },
      {
        "title": "CREATED DATE",
        "key": "Name"
      },
      {
        "title": "ACTION",
        render: (h, {row}) => {
            
                return h('div', [
                  h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'View Detail'
                      },
                      style:{
                        cursor:'pointer'
                      }
                    }, [
                      h('img', {
                        attrs: {
                          src:this.eye
                        },
                        style: {
                          height:'20px',
                          width:'20px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {   
                            this.viewDetails(row )
                          }
                        }
                      },'')
                    ]),
                  h('Tooltip', {
                      props: {
                        placement: 'top',
                        content: 'Delete'
                      },
                      style:{
                        float:'center',
                        cursor:'pointer'
                      }
                    }, [
                       h('img', {
                        attrs: {
                          src :this.eye
                          },
                        style: {
                          height:'20px',
                          width:'20px',
                          margin: '2px'
                        },
                        on: {
                          click: () => {   
                            this.DeleteDetails(row )
                          }
                        }
                      }, '')
                    ])
                ])
              
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