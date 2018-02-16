<template>
	<Table border stripe :columns="columns5" :data="data5"></Table>
</template>
<script>
	import config from '../../config/customConfig.js'
	import axios from 'axios'
	import Cookies from 'js-cookie';
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
								return row.assignee.join()	
							} 
							else {
									return row.assignee
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
							return h('Button', {
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
			}
		},
		mounted() {
			let self= this;
			axios.get(crmpostapiurl +'crm-case/', {
				headers: {
						Authorization : Cookies.get('auth_token')
					}
			})
			.then(function (response) {
				console.log(response)
				 // setTimeout(function(){
					// 	$('table colgroup col:last-child, table thead tr th:last-child ,table colgroup col:last-child, table tbody tr td:last-child').hide();
					// },100)
				self.data5 = _.orderBy(response.data.data, ['createdAt'],['desc']);
				console.log( "response.data.data", self.data5)
			 })
			 .catch(function (error) {
				console.log(error);
			 });
		}
	 }
</script>
<style scoped>
</style>

