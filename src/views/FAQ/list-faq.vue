<template>
    <div>
        <div style="text-align: center;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; ">
            <div class="drpdwn" style="text-align:center">
                <Select v-model="website" clearable filterable placeholder="Select Website" style="width: 85%;text-align: left;" @on-change="websiteChange">
                    <Option v-for="item in websiteList" :value="item.websiteId" :key="item.websiteId">{{ item.websiteName }}</Option>
                </Select>

                <h4 class="panel-title" style="text-align:right;display: inline-block;    margin-left: 2%;"><a data-toggle="collapse" data-parent="#accordion13" href="#collapseTwo"><button class="btn btn-default btn-sm" type="button"><span class="glyphicon glyphicon-filter"></span> Filter </button></a></h4>
        
            </div>

            <Row>
                <Col span="22" offset="1">
            <div class="panel panel-default panel-group" id="accordion13" style="border: none;margin-top:1%;text-align: left;">
                <!-- <div class="panel-heading">
                </div> -->
                <div class="panel-collapse collapse" id="collapseTwo">
                    <div class="panel-body">
                        <form>
                            <div class="collapse-maindiv maindiv" >
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <span class="more-less glyphicon glyphicon-chevron-down collapsed" data-toggle="collapse" style="width: 100%;" data-target="#que">
                                            <label style="padding-left:  7px;">Question</label>
                                        </span>
                                    </div>
                                    <div class="panel-collapse collapse" id="que">
                                        <AutoComplete v-model="que" :data="queList" :filter-method="filterMethod" placeholder="input here" clearable>
                                        </AutoComplete>
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
            </Col>
            </Row>
        </div>
        <div>
            <div>
                <Row>
                    <Col span="22" offset="1">
                        <Table :columns="columns1" :data="list"  size="small" ref="table"></Table>
                    </Col>
                </Row>
            </div>
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
                                            value: params.row.isActive,
                                            size: 'small'
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
                                                this.deleteFaq(params.row)
                                            }
                                        }
                                    })
								])
                                
                            ]);
						}
					}
                ],
                list: [],
                allFAQ: [],
                que: '',
                queList: [],
                filterArray: []
            }
        },
        methods: {
            init() {
                this.website = '';                   
                axios({
                    method: 'get',
                    url: config.default.subscriptionWebsitesapi,
                    headers: {
                      'Authorization': Cookies.get('auth_token'),
                      'subscriptionId': Cookies.get('subscriptionId')
                    } 
                })
                .then((response) => {
                    if(response.data.data.length == 0){
                      this.$Notice.error({
                        desc: 'Websites not available for this subscription',
                        title: 'Error',
                        duration: 4.5
                      })
                    }else{    
                      let result = _.uniqBy(response.data.data,'websiteId')
                      // console.log("result", result)
                      this.websiteList = result
                      // console.log("this.websiteList", this.websiteList[0].websiteId) 
                      this.website = this.websiteList[0].websiteId
                      this.websiteChange();
                    }
                })
                .catch((error) => {
                    if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain
                        
                        Cookies.remove('auth_token' ,{domain: location}) 
                        Cookies.remove('subscriptionId' ,{domain: location}) 
                        this.$store.commit('logout', this);
                        
                        this.$router.push({
                            name: 'login'
                        });
                        this.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                        this.$Notice.error({
                            title: error.response.statusText,
                            desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                            duration: 0
                        })
                    }else {
                        this.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                })
            },
            async websiteChange() {
                // console.log('this.websiteId',this.website)
                this.queList = [];
                this.list = [];
                if (this.website != '' && this.website != undefined) {
                    this.$Loading.start();
                    await axios({
                        method: 'get',
                        url: config.default.serviceUrl + 'faq',
                        params: {
                            websiteId: this.website
                        }
                    })
                    .then((response)=> {
                        // console.log(response);
                        this.$Loading.finish();
                        if (response.data.data.length != 0) {
                            this.listId = response.data.data[0].id;
                            this.allFAQ = response.data.data[0].faq
                            this.list = this.allFAQ;
                            response.data.data[0].faq.forEach(item => {
                                this.queList.push(item.que)
                            })
                        }
                        else {

                            this.$Notice.error({
                                desc: 'FAQ not available for this website',
                                title: 'Error',
                                duration: 4.5
                            })
                        }
                    })
                    .catch((error) => {
                        this.$Loading.error();
                        // console.log('errrooorrr',error.response);
                        if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 401){
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain
                            
                            Cookies.remove('auth_token' ,{domain: location}) 
                            Cookies.remove('subscriptionId' ,{domain: location}) 
                            this.$store.commit('logout', this);
                            
                            this.$router.push({
                                name: 'login'
                            });
                            this.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }else if(error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status == 403){
                            this.$Notice.error({
                                title: error.response.statusText,
                                desc: error.response.data.message+'. Please <a href="'+config.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>',
                                duration: 4.5
                            })
                        }else {
                            this.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }
                    })
                }
                else {
                    this.list = [];
                    this.queList = [];
                    this.$Message.error('Please select website');
                }
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
                // // console.log('faqdata',faqData);
                faqData.patchFaq.isActive = status;
                axios({
                    method: 'patch',
                    url: config.default.serviceUrl + 'faq/' + this.listId,
                    data: faqData,
                })
                .then((response) => {
                    // // console.log(response);
                    let statusText = '';
                    if (status) {
                        statusText = 'Activated'
                    }
                    else {
                        statusText = 'Deactivated'
                    }
                    this.$Message.success(statusText+' successfully');
                })
                .catch(function(error) {
                    // console.log(error);
                })
            },
            deleteFaq(row) {
                this.$Modal.confirm({
                    title: '',
                    content: 'Are you sure you want to delete?',
                    okText: 'Delete',
                    onOk: () => {
                        let faqData = {
                            websiteId : this.website,
                            deleteFaq: row
                        };
                        // // console.log('faqdata',faqData);
                        axios({
                            method: 'patch',
                            url: config.default.serviceUrl + 'faq/' + this.listId,
                            data: faqData,
                        })
                        .then((response) => {
                            // // console.log(response);
                            this.list = this.list.filter(function(item) { return item.queId != row.queId })
                            this.$Message.success('Deleted successfully');
                        })
                        .catch(function(error) {
                            // console.log(error);
                        })
                    }
                })
            },
            filterMethod (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            changeData () {
                this.filterArray = this.allFAQ;

                if(this.que != ''){
                    this.filterArray = _.filter(this.filterArray,  (item) => {
                        return item.que === this.que;
                    });
                }
                this.list = this.filterArray;
            },
            reset () {
                this.que = '';
                this.websiteChange()
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