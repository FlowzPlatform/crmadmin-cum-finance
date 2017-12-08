<template>
	<div class="container-fluid" id="c22367">
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
        </div>
</template>
<script>
var result
var cols = []
var productHtml
var api= 'editcrm'
var crmpostapiurl = "http://localhost:3030/crm-case";
	export default {
    name: 'newcrm',
    data() {
        return { }
    },
    methods: {
    	async showdata() {
    		$( "th" ).each(function( index ) {
				cols.push($( this ).text());
			})

			console.log("this", cols)
			var TableHeaders = '<thead>'
			for(let i = 0; i < cols.length; i++){
				console.log("TTTTTTTTTTt", cols[i])
				TableHeaders += '<th>' + cols[i] + '</th>'
			}
				console.log('TH Single: ', TableHeaders);

			$('tbody').remove();
			$('table').append(TableHeaders)

    		await $.ajax({
			    url: crmpostapiurl,
			    success: function (data) {
			        result = data.data;
			    },error: function(err){
			       console.log("error",err);
			    } 
			});

			var len = result.length
			var lasttd = ''
			// console.log("$$$$$$$$$$$$$", len)
			var hcols = ["project","cname","assignee","priceinput","email","status","action","id"]
				productHtml = '<tbody id="tdata">'
					for (var [inx, item] of result.entries()) {
						// var r = 
						console.log('dddddddd', item, inx)
						productHtml += '<tr class="line-content">'
						for(var arr1=0; arr1<hcols.length; arr1++) {
							// console.log("cols............", hcols[arr1])
							if(hcols[arr1] == "action"){
								// console.log('item..................', result[0], item)
								productHtml += '<td>'+ '<a href="'+api+'/'+ result[inx].id +'" style="margin-left:35%"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>' + '</td>'
							}else {
								productHtml += '<td>'+ result[inx][hcols[arr1]] + '</td>'	

								// lasttd = '<td>' + result[item][hcols[arr1]] + '</td>'
								// console.log("RRRRRRRRRRRRRRR", lasttd)
							// $('#tbdata thead th:nth-last-child(1) , #tbdata tbody tr td:nth-last-child(1)').hide();
							}
						}
						productHtml += '</tr>'
					}
					console.log("productHtml", productHtml)
					$('table').append(productHtml)
					$('#tbdata').DataTable();
    	}
    },
    mounted() {
		this.showdata()

		
    }
}

</script>
<style scoped>
	* {
    box-sizing: border-box;
}

body {
    margin: 0;
}

.gjs-am-file-uploader > form {
    min-height: 325px !important;
}

* {
    box-sizing: border-box;
}

body {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
}
label{

	font-weight: 700 !important;
}
table{
	width: 100% !important;
}
table.dataTable tbody th, table.dataTable tbody td:nth-last-child(1) {
    display: none !important;
}

/*.fg-toolbar {
    display: inline-block;
    width: 100%;
    padding: 10px;
    border-radius: 0;
}
.fg-toolbar .dataTables_info {
    padding-top: 0 !IMPORTANT;
    font-size: 13px;
    font-weight: normal;
}
.fg-toolbar .dataTables_paginate a {
    padding: 5px;
    margin: 0 2px;
    background-color: #000;
    color: #fff;
    cursor: pointer !important;
}
.fg-toolbar .dataTables_length {
    width: 300px;
    font-size: 14px;
}
.dataTables_wrapper .fg-toolbar .dataTables_length label {
    margin: 0;
    width: auto;
    display: inline-block;
}
.dataTables_wrapper .fg-toolbar .dataTables_length select {
    background-color: #fff;
    line-height: 28px;
    display: inline-block;
    height: 28px;
    margin: 0 15px;
}
.fg-toolbar .dataTables_filter {
    font-size: 14px;
}
.fg-toolbar .dataTables_filter input {
    border: solid 1px #aaa;
}*/

#c22367 {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: block;
}

table.dataTable tbody tr {
    background-color: rgba(255, 255, 255, 0.05) !important;
}

#c26445 {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: block;
}

.table-striped tbody tr:nth-of-type(2n+1) {
    background-color: rgba(0, 0, 0, 0.05);
}

#c6819 {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: block;
}

#c28221 {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: block;
}

#c24268 {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: block;
}

#c27341 {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: block;
}

#c39776 {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: block;
}

#c6951 {
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: block;
}
</style>