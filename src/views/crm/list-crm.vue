<template>
	<Table border :columns="columns5" :data="data5"></Table>
	<!-- <div class="container-fluid" id="c22367">
            <table class="table table-striped table-inverse table-bordered table-hover"
            id="tbdata">
                <tr style="display:none">
                    <th>Project</th>
                    <th>Name</th>
                    <th>Assigned To</th>
                    <th>Price</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>ID</th>
                </tr>
            </table>
        </div> -->
</template>
<!-- // <script>
// 	import config from '../../config/customConfig.js'
// 	var result
// 	var cols = []
// 	var productHtmlS
// 	var api= 'editcrm'
// 	var crmpostapiurl = config.default.serviceUrl + "crm-case";
// 	export default {
//     name: 'newcrm',
//     data() {
//         return { }
//     },
//     methods: {
//     	async showdata() {
//     		$( "th" ).each(function( index ) {
// 				cols.push($( this ).text());
// 			})
//
// 			console.log("this", cols)
// 			var TableHeaders = '<thead>'
// 			for(let i = 0; i < cols.length; i++){
// 				console.log("TTTTTTTTTTt", cols[i])
// 				TableHeaders += '<th>' + cols[i] + '</th>'
// 			}
// 				console.log('TH Single: ', TableHeaders);
//
// 			$('tbody').remove();
// 			$('table').append(TableHeaders)
//
//     		await $.ajax({
// 			    url: crmpostapiurl,
// 			    success: function (data) {
// 			        result = data.data;
// 			    },error: function(err){
// 			       console.log("error",err);
// 			    }
// 			});
//
// 			var len = result.length
// 			var lasttd = ''
// 			// console.log("$$$$$$$$$$$$$", len)
// 			var hcols = ["project","cname","assignee","priceinput","email","status","action","id"]
// 				var productHtml = '<tbody id="tdata">'
// 					for (var [inx, item] of result.entries()) {
// 						// var r =
// 						console.log('dddddddd', item, inx)
// 						productHtml += '<tr class="line-content">'
// 						for(var arr1=0; arr1<hcols.length; arr1++) {
// 							// console.log("cols............", hcols[arr1])
// 							if(hcols[arr1] == "action"){
// 								// console.log('item..................', result[0], item)
// 								productHtml += '<td>'+ '<a href="'+api+'/'+ result[inx].id +'" style="margin-left:35%"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>' + '</td>'
// 							}else {
// 								productHtml += '<td>'+ result[inx][hcols[arr1]] + '</td>'
//
// 								// lasttd = '<td>' + result[item][hcols[arr1]] + '</td>'
// 								// console.log("RRRRRRRRRRRRRRR", lasttd)
// 							setTimeout(function(){
// 								$('#tbdata thead th:last-child , #tbdata tbody tr td:last-child').hide();
// 							},0)
// 							}
// 						}
// 						productHtml += '</tr>'
// 					}
// 					console.log("productHtml", productHtml)
// 					$('table').append(productHtml)
// 					$('#tbdata').DataTable();
//     	}
//     },
//     mounted() {
//       console.log('!!!!!!!!!!!!!!!!!!!!!!!!', crmpostapiurl)
// 		this.showdata()
//
//
//     }
// }
// </script> -->
<script>
import config from '../../config/customConfig.js'
import axios from 'axios'
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
											 title: 'Price',
											 align: 'center',
											 key: 'priceinput',
											 width: 100,
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
											 width: 130,
											 key: 'status',
											 sortable: true
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
													},
											 sortable: true
									 },
									 {
											 title: 'Id',
											 key: 'id',
											 sortable: true
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
					 axios.get(crmpostapiurl +'crm-case', {

			 })
			 .then(function (response) {
					 console.log(response.data.data)
					 setTimeout(function(){
							$('table colgroup col:last-child, table thead tr th:last-child ,table colgroup col:last-child, table tbody tr td:last-child').hide();
						},0)
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
