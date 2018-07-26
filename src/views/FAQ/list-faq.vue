<template>
    <div>
        <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: left;" @on-change="websiteChange">
            <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
        </Select>
        <div>
            <Row>
                <Col span="17" offset="3">
                    <Table :columns="columns1" :data="list"  size="small" ref="table"></Table>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import config from '@/config/customConfig.js';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import _ from 'lodash';
    import psl from 'psl';
    export default {
        data() {
            return {
                websiteList: [],
                website: '',
                listId: '',
                columns1: [
                    {
                        type: 'expand',
                        width: 100,
                        render: (h, {row}) => {
                            // console.log('row.ans',row.ans)
                            return h('div', [
                                h('span', {
                                    domProps: {
                                        innerHTML: row.ans
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: 'Question',
                        key: 'que',
                        align: 'center'
                    },
                    {
                        title: 'Created Date',
                        key: 'createdAt',
                        align: 'center'
                    },
                    {
						title: 'Action',
						width: 200,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Tooltip', {
									props: {
                                        placement: 'top',
                                        content: 'Edit'
									},
									style:{
                                        cursor:'pointer'
									}
								},[
									h('Button', {
                                    props: {
										type: 'text',
										size: 'large',
										icon: 'ios-compose-outline'
				          			},
				          			style: {
										marginRight: '3px',
										padding: '0px',
										fontSize: '20px',
										color: '#2d8cf0'
				          			},
                                    on: {
				            			click: () => {
                                            console.log('edit click')
                                            this.editFAQ(params.row)
				            			}
				          			}
                                }, '')
                                ]),
                                h('Tooltip', {
									props: {
                                        placement: 'top',
                                        content: 'Active/Inactive'
									},
									style:{
                                        cursor:'pointer'
									}
								},[
									h('i-switch', {
                                        props: {
                                            value: params.row.isActive
                                        },
                                        style: {
                                            marginRight: '3px',
                                            padding: '0px',
                                            fontSize: '20px',
                                            color: '#2d8cf0'
                                        },
                                        on: {
                                            'on-change': (status) => {
                                                this.statusChange(params.row, status)
                                            }
                                        }
                                    }, '')
                                ]),
								 h('Tooltip', {
									props: {
                                        placement: 'top',
                                        content: 'Delete'
									},
									style:{
                                        cursor:'pointer'
									}
								},[
									h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'large',
                                            icon: 'ios-trash-outline'
                                        },
                                        style: {
                                            color: 'red',
                                            marginLeft: '3px',
                                            padding: '0px',
                                            fontSize: '20px',
                                        },
                                        on: {
                                            click: () => {
                                                console.log('delete click')
                                                this.deleteFaq(params.row)
                                            }
                                        }
                                    })
								])
                                
                            ]);
						}
					}
                ],
                list: []
            }
        },
        methods: {
            init() {
                let self = this;
                axios({
                    method: 'get',
                    url: config.default.subscriptionWebsitesapi,
                    headers: {
                      'Authorization': Cookies.get('auth_token'),
                      'subscriptionId': Cookies.get('subscriptionId')
                    } 
                })
                .then(function(response) {
                    if(response.data.data.length == 0){
                      console.log("in if condition")
                      self.$Notice.error({
                        desc: 'Websites not available for this subscription',
                        title: 'Error',
                        duration: 4.5
                      })
                    }else{    
                      var result = _.uniqBy(response.data.data,'websiteId')
                      console.log("result", result)
                      self.websiteList = result
                      console.log("self.websiteList", self.websiteList[0].websiteId)                    
                      self.website = self.websiteList[0].websiteId
                    }
                })
                .catch(function(error) {
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
                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                })
            },
            async websiteChange() {
                await axios({
                    method: 'get',
                    url: config.default.serviceUrl + 'faq',
                    params: {
                        websiteId: this.website
                    }
                })
                .then((response)=> {
                    console.log(response);
                    this.listId = response.data.data[0].id;
                    this.list = response.data.data[0].faq;
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            editFAQ(row) {
                this.$router.push({
                    name: 'Edit-FAQ',
                    params: { 
                        row: row,
                        listId: this.listId,
                        websiteId: this.website
                    }
                })
            },
            statusChange(row, status) {
                let faqData = {
                    websiteId : this.website,
                    patchFaq: row
                }
                console.log('faqdata',faqData);
                faqData.patchFaq.isActive = status;
                // faqData['updatedAt'] = new Date().toISOString();
                console.log('after edit',faqData);
                axios({
                    method: 'patch',
                    url: config.default.serviceUrl + 'faq/' + this.listId,
                    data: faqData,
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                })
            },
            deleteFaq(row) {
                let faqData = {
                    websiteId : this.website,
                    deleteFaq: row
                }
                console.log('faqdata',faqData);
                axios({
                    method: 'patch',
                    url: config.default.serviceUrl + 'faq/' + this.listId,
                    data: faqData,
                })
                .then((response) => {
                    console.log(response);
                    this.list = this.list.filter(function(item) { return item.queId != row.queId })
                })
                .catch(function(error) {
                    console.log(error);
                })
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    .ivu-table-wrapper {
        margin-top: 20px;
    }
    .ivu-table-cell {
        word-break: break-word;
    }
</style>