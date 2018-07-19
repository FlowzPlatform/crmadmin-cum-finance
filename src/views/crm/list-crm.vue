<template>
	<Table size="small" stripe :columns="columns5" :data="data5"></Table>
</template>
<script>
	import config from '../../config/customConfig.js'
	import axios from 'axios'
	import Cookies from 'js-cookie';
	import _ from 'lodash';
	import psl from 'psl';
	var crmpostapiurl = config.default.serviceUrl;
	export default {
		data () {
			return {
				columns5: [
					{
						title: 'Project',
						align: 'center',
						key: 'project',
						sortable: true
					},
					{
						title: 'Customer Name',
						align: 'center',
						key: 'cname',
						sortable: true
					},
					{
						title: 'Assigned To',
						key: 'assignee',
						align: 'center',
						sortable: true,
						render : (h,{row})=>{
							if(Array.isArray(row.assignee)){
								return h('div', [
                                	h('span', row.assignee.join())
                            	]);	
							} 
							else {
								return h('div', [
                                	h('span', row.assignee)
                            	]);
							}	
						}
					},
					{
						title: 'Email',
						align: 'center',
						key: 'email',
						sortable: true
					},
					{
						title: 'Status',
						align: 'center',
						width: 120,
						key: 'status',
						sortable: true,
						filters: [
			    			{
						        label: 'Leed',
						        value: 1
						    },
						    {
						        label: 'Quotation',
						        value: 2
						    },
							{
						        label: 'Opportunity',
						        value: 3
						    },
						    {
						        label: 'Negotiation',
						        value: 4
						    },
						    {
						        label: 'Won',
						        value: 5
						    },
						    {
						        label: 'Closed',
						        value: 6
						    }
						],
						filterMultiple: false,
						filterMethod (value, row) {
							console.log("123.....Status.........", row, value)
							if (value === 1) {
									return row.status == 'Leed';
							} else if (value === 2) {
									return row.status == 'Quotation';
							} else if (value === 3) {
									return row.status == 'Opportunity';
							} else if (value === 4) {
									return row.status == 'Negotiation';
							} else if (value === 5) {
									return row.status == 'Won';
							} else if (value === 6) {
									return row.status == 'Closed';
							}
						}
					},
					{
						title: 'Action',
						width: 100,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								 h('Tooltip', {
									props: {
									placement: 'top',
									content: 'View Details'
									},
									style:{
									float:'left',
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
				              				this.show(params.row.id)
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
									float:'left',
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
											// this.flag = true
											this.deleteList(params.row)
										}
									}
								})
								])
                                
                            ]);
						}
					}
				],
				data5: []
			}
		},
		methods: {
			show(index) {
				console.log('!!!!!!!!', index)
				this.$router.push('/edit-crm/'+index)
			},
			deleteList(item){
				console.log("params params params", item)
				var itemId = item.id
				console.log('deleteItem', itemId)
				let self = this
				this.$Modal.confirm({
					okText: 'OK',
					cancelText: 'Cancel',
					content: '<p>Are you sure you want to delete this relation ? <p>',
					onOk: () => {
						var userid = Cookies.get('user')
            			self.$Message.success('Relationship Deleted Successfully');						
						var data1= {
							"isDeleted": true,
							"deletedBy": userid,
							"deletedAt": new Date()
						}
						axios({
							method:'patch',
							url: crmpostapiurl +'crm-case/' + itemId,
							headers:{
								Authorization : Cookies.get('auth_token')
							},
							data: data1
						})
						.then(function(response) {
							console.log("delete response.....",response)
							for(let i=0;i<self.data5.length;i++){
								console.log("for..................",self.data5[i])
								if(response.data.id == self.data5[i].id){
									self.data5.splice(i,1)
								}
							}
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
					},
					onCancel: () => {
						// this.$Message.info('Clicked cancel');
					}
				})
				// console.log("params params params after", params)
			}
		},
		mounted() {
			let self= this;
			self.$Loading.start()
			axios.get(crmpostapiurl +'crm-case/', {
				headers: {
						'Authorization' : Cookies.get('auth_token'),
						'subscriptionId': Cookies.get('subscriptionId')
					}
			})
			.then(function (response) {
				console.log("crm-case response",response.data.data)
				var subscriptionId1 = Cookies.get('subscriptionId')
				 // setTimeout(function(){
					// 	$('table colgroup col:last-child, table thead tr th:last-child ,table colgroup col:last-child, table tbody tr td:last-child').hide();
					// },100)
				response.data.data.forEach(function(item,index){
					// console.log("item index",item )
					if (item.isDeleted == false && item.subscriptionId == subscriptionId1){
						self.data5.push(item);
					}
				})
				self.data5 = _.orderBy(self.data5, ['createdAt'],['desc']);
				self.$Loading.finish()
				console.log( "response.data.data", self.data5)
			 }).catch(error => {
                    console.log("-------",error);
					if(error.message == 'Network Error'){
                        self.$Notice.error({
                            title: "Error",
                            desc: 'API service unavailable',
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
                            duration: 0
                        })
                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                });
		}
	 }
</script>
<style scoped>
	.ivu-table-cell {
        word-break: break-word;
    }
</style>
