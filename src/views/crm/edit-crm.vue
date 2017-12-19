<template>
	<div class="container" id="c2185">
            <div class="panel col-sm-12" id="c22272">
                <label>Edit CRM Case</label>
            </div>
            <div class="col-sm-12">
                <div class="col-sm-12" id="c22272">
                    <div class="panel" id="c22351">
                        <div> <i class="fa fa-file-text-o"  aria-hidden="true"></i>
                            <label>Basic attributes:</label>
                        </div>
                        <div class="col-sm-6" id="c22370">
                            <div class="form-group">
                                <div class="row" id="c2246">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22378">Name</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <input class="form-control" type="text" id="name" style="background-color: white;"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12" id="c22272">
                    <div class="panel" id="c22351">
                        <div> <i class="fa fa-file-text-o" id="c22363" aria-hidden="true"></i>
                            <label
                            id="c22367">Additional attributes:</label>
                        </div>
                        <div class="col-sm-6" id="c22370">
                            <div class="form-group">
                                <div class="row" id="c2304">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22378">Project</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <select class="form-control" id="project">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22339">Customer</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <select class="form-control" id="customer">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22394">Status</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <select class="form-control" id="status">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22410">Assignee</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <select class="form-control" id="assignee">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22426">Product line</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <select class="form-control" id="product_line">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <div class="row" id="c2448">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22442">Contract date</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <input class="form-control" type="date" id="contractdate" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22455">Next Action</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <input class="form-control" type="date" id="nextdate" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22468">Price</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <select class="form-control" id="price">
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22490">Email</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <input class="form-control" type="text" id="email" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-4 text-right">
                                        <label id="c22503">Phone</label>
                                    </div>
                                    <div class="col-xs-8">
                                        <input class="form-control" type="text" id="phone" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
								<div class="col-sm-12" id="c22272">
									<Tabs>
							        <TabPane label="Notes:" icon="edit">
												<textarea name="editor1"></textarea>
		                    <div id="c2597">
		                        <input id="c2601" type="file" name="myFile" />
		                    </div>
											</TabPane>
							        <TabPane label="Comments:" icon="ios-information-outline">
                                                <!-- <div><button class="form-control" id="c2611" style="float: right;margin-top:0px !important">New Comment</button></div> -->
                                                <comment></comment>
                                                <!-- <span>You Don't have any Comments</span> -->
											</TabPane>
							        <!-- <TabPane label="History:" icon="ios-list">456</TabPane> -->
							    </Tabs>
	                <!-- <div class="panel" id="c22351">
	                    <div class="panel">
													<i class="fa fa-pencil" aria-hidden="true"></i>
	                        <label id="c22367">Notes:</label>
	                    </div>
	                    <textarea name="editor1"></textarea>
	                    <div id="c2597">
	                        <input id="c2601" type="file" name="myFile" />
	                    </div>
	                </div> -->
								</div>
                <div id="c2607">
                    <button class="form-control" id="c2611" @click="postdata()">Save</button>
                </div>
            </div>
        </div>
</template>
<script>
import comment from './comment.vue'
import config from '../../config/customConfig.js'
var result;
var result1;
var name1;
var cname1;
var project1;
var status1;
var assignee1;
var product_line1;
var contractdate1;
var nextdate1;
var priceinput1;
var price1;
var email1;
var phone1;
var databasepost = config.default.serviceUrl + "crm-case/";
var apiurl = config.default.apiurl + "contacts/";
var databaseurl = config.default.serviceUrl + "crm-service/";
		export default {
    name: 'newcrm',
    components: {
        comment
    },
    data() {
        return { }
    },
    methods: {
    	async editdata() {
    		await $.ajax({
				type: 'GET',
			    url: databasepost  + this.$route.params.id,
			    success: function (data) {
			        result = data;
			    },error: function(err){
			       console.log("error",err);
			    }
			});

			name1 = result.name;
			project1 = result.project
			cname1 = result.cname
			status1 = result.status
			assignee1 = result.assignee
			product_line1 = result.product_line
			contractdate1 = result.contractdate
			nextdate1 = result.nextdate
			price1 = result.price
			email1 = result.email
			phone1 = result.phone
			console.log("json data******",result);

			document.getElementById("name").value = name1;
			$("#name").prop("readonly",true);

			$("#project").append("<option value='"+ project1 +"'>"+ project1 +"</option>")
			$("#project option[value='"+ project1 +"']").prop('selected', true)

			$("#customer").append("<option value='"+ cname1 +"'>"+ cname1 +"</option>")
			$("#customer option[value='"+ cname1 +"']").prop('selected', true)

			$("#status").append("<option value='"+ status1 +"'>"+ status1 +"</option>")
			$("#status option[value='"+ status1 +"']").prop('selected', true)

			$("#assignee").append("<option value='"+ assignee1 +"'>"+ assignee1 +"</option>")
			$("#assignee option[value='"+ assignee1 +"']").prop('selected', true)

			$("#product_line").append("<option value='"+ product_line1 +"'>"+ product_line1 +"</option>")
			$("#product_line option[value='"+ product_line1 +"']").prop('selected', true)

			$("#price").append("<option value='"+ price1 +"'>"+ price1 +"</option>")
			$("#price option[value='"+ price1 +"']").prop('selected', true)
			document.getElementById("contractdate").value = contractdate1
			document.getElementById("nextdate").value = nextdate1
			document.getElementById("email").value = email1
			document.getElementById("phone").value = phone1
		},
		async calldata() {
			await $.ajax({
			type: 'GET',
			url: apiurl,
			async: true,
			dataType: 'json',
			success: function (data) {
				result = data.data.data
				// console.log(data)
			},error: function(err) {
				console.log("Error",err)
			}
		});
				// console.log("resp data",result);
				result.forEach(item => {
			var customer = item.Name;
			var cname = new Option(customer);
			$("#customer").append(cname);
		})
	},
	async dbdata() {
		await $.ajax({
			url: databaseurl,
			success: function (data) {
					result1 = data.data;
			},error: function(err){
				 console.log("error",err);
			}
		});
		// console.log("json data databaseurl",result1);
		result1.forEach(function(item){
			var project = item.project_name;
			var status = item.project_status;
			var assignee = item.assignee;
			var price = item.price;
			var product_line = item.product_line;
			$("#project").append('<option>'+ project +'</option>');
			$("#status").append('<option>'+ status +'</option>');
			$("#assignee").append('<option>'+ assignee +'</option>');
			$("#price").append('<option>'+ price +'</option>');
			$("#product_line").append('<option>'+ product_line +'</option>');
			// console.log('!!!!!!!!!!!!', item);
		})
	},
	async postdata() {
		var name = $('#name').val()
		var cname = $('#customer').val()
		var project = $('#project').val()
		var status = $('#status').val()
		var assignee = $('#assignee').val()
		var product_line = $('#product_line').val()
		var contractdate = $('#contractdate').val()
		var nextdate = $('#nextdate').val()
		var priceinput = $('#priceinput').val()
		var price = $('#price').val()
		var email = $('#email').val()
		var phone = $('#phone').val()
		var obj = {
			name: name,
			cname: cname,
			project: project,
			status: status,
			assignee : assignee,
			product_line: product_line,
			contractdate : contractdate,
			nextdate : nextdate,
			priceinput : priceinput,
			price : price,
			email: email,
			phone: phone
		}

		console.log("obj", obj, databasepost)
		await $.ajax({
			type: 'PUT',
				url: databasepost + this.$route.params.id,
				data: obj,
				success: function (data1) {
						result = data1;
				console.log("json data******123",result);
				},error: function(err){
					 console.log("error",err);
				}
		});
	},

    },
    mounted() {
			console.log('^^^^^^^^^^^^^^^^^^^^^^^^', databasepost)
    	CKEDITOR.replace("editor1");
    	console.log("this.$route.params.id", this.$route.params.id)
    	this.editdata()
			this.calldata()
			this.dbdata()
			// this.postdata()
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
.panel {
	background-color: #f6f6f6 !important;
}
.row {
    display: table;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    width: 100%;
}

.row {
    display: table;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    width: 100%;
}
div {
		border-radius: 4px !important;
	}

label{
		font-weight: 700 !important;
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

#c22272{
	background-color: #f6f6f6 !important;
	padding-top: 10px;
	padding-right: 17px;
	padding-bottom: 10px;
	padding-left: 17px;
	background-image: initial;
	background-position-x: initial;
	background-position-y: initial;
	background-size: initial;
	background-repeat-x: initial;
	background-repeat-y: initial;
	background-attachment: initial;
	background-origin: initial;
	background-clip: initial;
	background-color: rgb(241, 241, 241);
	border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	border-top-color: rgb(230, 233, 237);
	border-right-color: rgb(230, 233, 237);
	border-bottom-color: rgb(230, 233, 237);
	border-left-color: rgb(230, 233, 237);
	border-image-source: initial;
	border-image-slice: initial;
	border-image-width: initial;
	border-image-outset: initial;
	border-image-repeat: initial
}

#c2185 {
    display: block;
    width: 100%;
    vertical-align: middle;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
}

#c2246 {
    margin-top: 15px !important;
}

#c2304 {
    margin-top: 15px !important;
}

#c2448 {
    margin-top: 15px !important;
}

#c2597 {
    margin-top: 10px;
    border-top-width: 2px;
    border-right-width: 2px;
    border-bottom-width: 2px;
    border-left-width: 2px;
    border-top-style: dashed;
    border-right-style: dashed;
    border-bottom-style: dashed;
    border-left-style: dashed;
    border-top-color: rgb(199, 199, 199);
    border-right-color: rgb(199, 199, 199);
    border-bottom-color: rgb(199, 199, 199);
    border-left-color: rgb(199, 199, 199);
    height: 50px;
}

#c2601 {
    margin-top: 10px;
    margin-left: 20px;
}

#c2607 {
    text-align: -webkit-center;
}

#c2611 {
    background-color: rgb(0, 200, 169);
    font-weight: bold;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    color: rgb(255, 255, 255);
    width: auto;
}

.form-control {
    display: unset !important;
}
</style>
