<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        
             
        <div v-if = 'data6.length > 0'>
           <Table border :columns="columns7" :data="data6"></Table>
        </div>
        <div v-else style="text-align:center;color:#fd5e5e">
            <!-- <h5>{{assignee}}</h5> -->
            <h5>No data found for this Invoice</h5>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    import config from '@/config/customConfig.js'
    let subscriptionUrl = config.default.subscriptionUrl
    export default {
        props: {
            row: Object,
            
        },
        data(){
            return{
              assignee   : '',
              columns7: [
                    {
                        title: 'Assignee Email',
                        key: 'toEmail',
                        // render: (h, params) => {
                        //     return h('div', [
                        //         h('Icon', {
                        //             props: {
                        //                 type: 'person'
                        //             }
                        //         }),
                        //         h('strong', params.row.name)
                        //     ]);
                        // }
                    },
                    {
                        title: 'Role',
                        key: 'role',
                        render: (h, params) => {
                            return h('div', [
                                //console.log(params)
                                //let obj= Object.keys(params.row.role);
                                h('strong', params.row.role[Object.keys(params.row.role)])
                            ]);
                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.sendEmail(params.index)
                                        }
                                    }
                                }, 'Send Email'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, 'Un-assaign')
                            ]);
                        }
                    }
                ],
                data6: []
            }
        },
        methods : {
            show (index) {
                
            },
            remove (params) {
                //this.data6.splice(index, 1);
                console.log(params)
                // axios({
                //     method:'delete',
                //     url:'172.16.230.86:3030/invite',
                //     params : {subscriptionId : },
                //     responseType:'stream'
                //     })
                //     .then(function(response) {
                //         console.log(response)
                //     }).catch(function(err){
                //         console.log(err)
                //     });
            },
            init(){
                let self = this
                console.log(this.row)
                axios.get(subscriptionUrl + "subscription-invitation?subscriptionId="+this.row.subscriptionId).then(function(result){
                    if(result.data.data.length == 0){
                        self.assignee = "No assignee found for this subscription"
                    }else{
                        console.log(result)
                        self.assignee = result.data.data
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