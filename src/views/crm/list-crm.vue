<template>
	<Table border stripe :columns="columns5" :data="data5"></Table>
</template>
<script>
import config from '../../config/customConfig.js'
import axios from 'axios'
var crmpostapiurl = config.default.serviceUrl;
export default {
			 data () {
					 return {
							 columns5: [
									 {
											 title: 'Id',
											 key: 'id',
											 width: 257,
											 align: 'center',
											 sortable: true
									 },
									 {
											 title: 'Project',
											 align: 'center',
											 key: 'project',
											 sortable: true
									 },
									 {
											 title: 'Name',
											 align: 'center',
											 key: 'cname',
											 sortable: true
									 },
									 {
											 title: 'Assigned To',
											 key: 'assignee',
											 align: 'center',
											 sortable: true
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
                                label: 'Waiting',
                                value: 1
                            },
                            {
                                label: 'New',
                                value: 2
                            },
														{
                                label: 'In Process',
                                value: 3
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.status == 'Waiting';
                            } else if (value === 2) {
                                return row.status == 'New';
                            } else if (value === 3) {
                                return row.status == 'In Process';
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
							                  	// alert(params.index)
							                    // this.$router.push('edit-crm/:id')
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
			 mounted(){
					 let self= this;
					 axios.get(crmpostapiurl +'crm-case/', {

			 })
			 .then(function (response) {
					 console.log(response.data.data)
					//  setTimeout(function(){
					// 		$('table colgroup col:last-child, table thead tr th:last-child ,table colgroup col:last-child, table tbody tr td:last-child').hide();
					// 	},100)
					 self.data5 = response.data.data;
			 })
			 .catch(function (error) {
					 console.log(error);
			 });
			 }
	 }
</script>
<style scoped>

</style>
