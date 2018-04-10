<style>
    .ivu-spin-main {
      width: 100% !important;
      text-align: -webkit-center !important;
  }
</style>
<template>
    <div>
        <div v-if="spinShow">
                  <Spin size="large"></Spin>
        </div>
        <div v-else>
            <div v-if = 'data7.length > 0'>
                <Table border :columns="columns7" :data="data7"></Table>
            </div>
            <div v-else style="text-align:center;color:#fd5e5e">
                <!-- <h5>{{assignee}}</h5> -->
                <h5>No one is assigned</h5>
            </div>
        </div>
    </div>
</template>
<script>

    // import axios from "axios"
    // import config from '@/config/customConfig.js'
    // let subscriptionUrl = config.default.subscriptionUrl
    // import Cookies from 'js-cookie';
    // let emailTemp = require('../emailTemplate')
    // let SendEmailBodyInvite = emailTemp.sendInviteemail;

    export default {
        props: {
            row: Object,
            
        },
        data(){
            return{
                spinShow: true,
                assignee   : '',
                columns7: [
                   
                    {
                        title: 'Module',
                        key: 'module',
                        render: (h, params) => {
                            console.log("params",params)
                            return h('div', [
                                //let obj= Object.keys(params.row.role);
                                h('strong', this.capitalize(Object.keys(params.row)[0]))
                            ]);
                        }
                    },
                    {
                        title: 'Role',
                        key: 'role',
                        render: (h, params) => {
                            // console.log("Object.keys(params.row.role)",Object.keys(params.row))
                            // console.log("params.row[Object.keys(params.row)]",params.row[Object.keys(params.row)[0]])
                            return h('div', [
                                //let obj= Object.keys(params.row);
                                h('strong', this.capitalize(params.row[Object.keys(params.row)[0]]))
                            ]);
                        }
                    }
                    
                    
                ],
                data7: []
            }
        },
        methods : {
            capitalize (str) {
                // console.log("str before",str)
                str = str[0].toUpperCase() + str.slice(1)
                // console.log("str after",str)                
                return str;
            },
            show (index) {
                
            },
            
           
            async init(){
                
                let self = this
                // console.log("this.row",this.row)
                self.spinShow = false;
                for (let role in this.row.role) {
                    // console.log("role",role)
                    // console.log("this.row.role[role]",this.row.role[role])
                    self.data7.push({ [role] : this.row.role[role]})
                }
                console.log("self.data7",self.data7)
            }
        },
        mounted() {
            this.init()
        }
    };

</script>