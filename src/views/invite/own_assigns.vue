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

    import axios from "axios"
    import config from '@/config/customConfig.js'
    let subscriptionUrl = config.default.subscriptionUrl
    import Cookies from 'js-cookie';
    import moment from 'moment'
    let emailTemp = require('../emailTemplate')
    let SendEmailBodyInvite = emailTemp.sendInviteemail;

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
                        title: 'Role',
                        key: 'role',
                        render: (h, params) => {
                            return h('div', [
                                //console.log(params)
                                //let obj= Object.keys(params.row.role);
                                h('strong', this.capitalize(params.row.role[Object.keys(params.row.role)]))
                            ]);
                        }
                    }
                    
                    
                ],
                data7: []
            }
        },
        methods : {
            capitalize (str) {
                console.log("str before",str)
                str = str[0].toUpperCase() + str.slice(1)
                console.log("str after",str)                
                return str;
            },
            show (index) {
                
            },
            
           
            async init(){
                
                let self = this
                console.log(this.row)
                await axios.get(subscriptionUrl +'subscription-invitation', {
                    params: {
                       subscriptionId: this.row.subscriptionId
                        // own : true
                    },
                    headers : {
                        Authorization : Cookies.get('auth_token')
                    }
                })
                .then(function(result){
                    self.spinShow = false;
                    if(result.data.data.length == 0){
                        self.assignee = "No assignee found for this subscription"
                    }else{
                        console.log(result)
                        self.assignee = result.data.data
                        for (let f of self.assignee) {
                            f['flag'] = {
                                sendMailFlag : false,
                                unAssignFlag : false
                            };
                        }
                        console.log("self.assignee",self.assignee)
                        self.data6 = self.assignee
                    }
                })
            }
        },
        mounted() {
            this.init()
        }
    };

</script>