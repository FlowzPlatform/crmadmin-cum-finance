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
            <div v-if = 'data6.length > 0'>
                <Table border :columns="columns7" :data="data6"></Table>
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
                                //// console.log(params)
                                //let obj= Object.keys(params.row.role);
                                h('strong', this.capitalize(params.row.role[Object.keys(params.row.role)]))
                            ]);
                        }
                    },
                    {
                        title: 'Assigned Date',
                        key: 'assignDate',
                        render: (h, params) => {
                            
                                var date1 = moment(params.assignDate).format('MM-DD-YYYY')
                                // return date1
                                return h('div', [
                                    h('span', date1)
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
                                        size: 'small',
                                        loading: params.row.flag.sendMailFlag
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            
                                            // // console.log("params.row[params.index].flag",this.data6[params.index])
                                            // params.row[params.index].flag = true
                                            params.row.flag.sendMailFlag = true;
                                            // // console.log("============this.data6[params.index]",this.data6[params.index])
                                            this.sendEmail(params)
                                        }
                                    }
                                }, 'Send Email'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        loading: params.row.flag.unAssignFlag
                                    },
                                    on: {
                                        click: () => {
                                            params.row.flag.unAssignFlag = true;
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
            capitalize (str) {
                // // console.log("str before",str)
                str = str[0].toUpperCase() + str.slice(1)
                // // console.log("str after",str)                
                return str;
            },
            show (index) {
                
            },
            sendEmail (params) {
                let self = this;
                let data = params.row
                // console.log("data-------",data)
                var SendEmailBody = SendEmailBodyInvite.replace(/WriteSenderNameHere/i, data.fromEmail);
                SendEmailBody = SendEmailBody.replace(/domainKey/g, process.env.domainkey);
                SendEmailBody = SendEmailBody.replace(/SYSTEMNAME/g, Object.keys(data.role)[0]);
                SendEmailBody = SendEmailBody.replace(/ROLE/g, Object.values(data.role)[0]);
                // // console.log("SendEmailBody",SendEmailBody)
                axios({
                    method: 'post',
                    url: config.default.emailUrl,
                    headers: {Authorization : Cookies.get('auth_token')},
                    data: { "to": data.toEmail, "from": data.fromEmail, "subject": "Invitation from Flowz", "body": SendEmailBody}
                })
                .then(async (result) => {
                    // console.log("result",result);
                    params.row.flag.sendMailFlag = false;
                    self.$Notice.success({
                        duration:0,
                        desc: "Mail Sended Successfully"
                    });
                    return true;
                })
                .catch(function(err){
                    // console.log(err.response)
                    params.row.flag.sendMailFlag = false;
                    if(err.response.status == 401){
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
                        }else if(err.response.status == 403){
                            self.$Notice.error(
                                {duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'}
                                );
                        
                    }else{
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                        // self.$Message.error(err.response.data);
                    }
                })
            },
            remove (params) {

                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>Do you really want to Un-assign this user ?</p><p> You Can not Undo this action</p>',
                    onOk: () => {
                        let self = this;
                        let module = [Object.keys(params.row.role)]
                        let paramss = {
                                subscriptionId : params.row.subscriptionId ,
                                toEmail: params.row.toEmail,
                                role: module, 
                                fromEmail: params.row.fromEmail, 
                                subscription_invitation_id:params.row.id
                            }
                        // console.log(params)
                        axios({
                            method:'delete',
                            url: subscriptionUrl+'invite',
                            //url: "http://172.16.230.86:3030/" + 'invite',
                            params : paramss,
                            headers : {
                                "Authorization": Cookies.get('auth_token'),
                            }
                        })
                        .then(function(response) {
                            // console.log(response)
                            self.data6.splice(params.index, 1);
                            params.row.flag.unAssignFlag = false;
                            // self.$Message.success('User Un-assigned successfully');
                            self.$Notice.success({
                                duration:0,
                                desc: "User Un-assigned successfully"
                            });
                        }).catch(function(error){
                            params.row.flag.unAssignFlag = false;
                            // console.log(error)
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
                                    duration: 4.5
                                })
                            }else {
                                self.$Notice.error({
                                    title: error.response.data.name,
                                    desc: error.response.data.message,
                                    duration: 10
                                })
                            }
                        });
                    },
                    onCancel: () => {
                       params.row.flag.unAssignFlag = false;
                    }
                });
                //this.data6.splice(index, 1);
                
            },
            async init(){
                
                let self = this
                // console.log(this.row)
                 //axios.get(subscriptionUrl + "subscription-invitation?subscriptionId="+this.row.subscriptionId).then(function(result){
                    //axios.get(subscriptionUrl + "subscription-invitation?subscriptionId="+this.row.subscriptionId).then(function(result){
                        // axios.get( "http://172.16.230.86:3030/" + "subscription-invitation?subscriptionId="+this.row.subscriptionId)
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
                        // console.log(result)
                        self.assignee = result.data.data
                        for (let f of self.assignee) {
                            f['flag'] = {
                                sendMailFlag : false,
                                unAssignFlag : false
                            };
                        }
                        // console.log("self.assignee",self.assignee)
                        self.data6 = self.assignee
                    }
                }).catch(function (error){
                    // console.log('Error', error)
                    if(error.message == 'Network Error'){
                        self.$Notice.error({
                            title : 'Error',
                            desc: "API service unavailable",
                            duration: 10
                        })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
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
                            duration: 4.5
                        })
                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                })
            }
        },
        mounted() {
            this.init()
        }
    };
</script>
