<template>
<div class="container-fluid">
            <div class="form-group row">
                <div class="panel col-sm-12" id="c16894">
                    <label>New CRM case</label>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="col-sm-12">
                            <div class="panel" id="c16913">
                                <p id="c16917"><i class="fa fa-file-text-o" id="c16921" aria-hidden="true"></i>
                                    <label
                                    id="c16925">Basic attributes:</label>
                                </p>
                                <p>
                                    <input class="form-control" type="text" id="name" placeholder="Name" />
                                </p>
                                <textarea name="editor1"></textarea>
                                <p id="c16943">
                                    <input id="c16947" name="myFile" type="file" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="col-sm-12">
                            <div class="panel" id="c16961">
                                <div>
                                    <p id="c16969"><i class="fa fa-users" id="c16973" aria-hidden="true"></i>
                                        <label id="c16977">Add Related Contact:</label>
                                    </p>
                                </div>
                                <div id="c16980">
                                    <p>
                                        <label class="col-xs-3" id="c16988">Customer</label>
                                        <select class="form-control" id="customer">
                                            <option>Select</option>
                                        </select>
                                    </p>
                                </div>
                            </div>
                            <div class="panel" id="c17000">
                                <div>
                                    <p id="c17008"><i class="fa fa-file-text-o" id="c17012" aria-hidden="true"></i>
                                        <label
                                        id="c17016">Additional attributes:</label>
                                    </p>
                                </div>
                                <div id="c17019">
                                    <p>
                                        <label class="col-xs-3" id="c17027">Project</label>
                                        <select class="form-control" id="project">
                                            <option>Select</option>
                                        </select>
                                    </p>
                                    <p>
                                        <label class="col-xs-3" id="c17043">Status</label>
                                        <select class="form-control" id="status">
                                            <option>Select</option>
                                        </select>
                                    </p>
                                    <p>
                                        <label class="col-xs-3" id="c17059">Assignee</label>
                                        <select class="form-control" id="assignee">
                                            <option>Select</option>
                                        </select>
                                    </p>
                                    <p>
                                        <label class="col-xs-3" id="c17075">Product line</label>
                                        <select class="form-control" id="product_line">
                                            <option>Select</option>
                                        </select>
                                    </p>
                                    <p>
                                        <label class="col-xs-3" id="c17091">Contract date</label>
                                        <input class="form-control" type="date" id="contractdate"
                                        />
                                    </p>
                                    <p>
                                        <label class="col-xs-3" id="c17104">Next Action</label>
                                        <input class="form-control" type="date" id="nextdate"
                                        />
                                    </p>
                                    <p>
                                        <label class="col-xs-3" id="c17117">Price</label>
                                        <input class="form-control" type="text" id="priceinput" />
                                        <select class="form-control" id="price">
                                            <option>Select</option>
                                        </select>
                                    </p>
                                    <p>
                                        <label class="col-xs-3" id="c17139">Email</label>
                                        <input class="form-control" type="text" id="email" />
                                    </p>
                                    <p>
                                        <label class="col-xs-3" id="c17152">Phone</label>
                                        <input class="form-control" type="text" id="phone" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> <span class="panel" id="c17165"> <button class="form-control" id="create" @click="postdata">Create</button> <button class="form-control" id="createandcontinue">Create and Continue</button> </span>
                </div>
            </div>
        </div>
</template>
<script>
import config from '../../config/customConfig.js'
var nextdate;
var priceinput;
var price;
var email;
var phone;
var apiurl = config.apiurl;
var databaseurl = config.databaseurl;
var result;
var result1;
var name;
var cname;
var project;
var status;
var assignee;
var product_line;
var contractdate;
var databasepost = config.databasepost;
	export default {
    name: 'newcrm',
    data() {
        return { }
    },
    methods: {
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
				cname = new Option(customer);
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
				project = item.project_name;
				status = item.project_status;
				assignee = item.assignee;
				price = item.price;
				product_line = item.product_line;
				$("#project").append('<option>'+ project +'</option>');
				$("#status").append('<option>'+ status +'</option>');
				$("#assignee").append('<option>'+ assignee +'</option>');
				$("#price").append('<option>'+ price +'</option>');
				$("#product_line").append('<option>'+ product_line +'</option>');
				// console.log('!!!!!!!!!!!!', item);
			})
    	},

    	async postdata() {
    		name = $('#name').val()
			cname = $('#customer').val()
			project = $('#project').val()
			status = $('#status').val()
			assignee = $('#assignee').val()
			product_line = $('#product_line').val()
			contractdate = $('#contractdate').val()
			nextdate = $('#nextdate').val()
			priceinput = $('#priceinput').val()
			price = $('#price').val()
			email = $('#email').val()
			phone = $('#phone').val()
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
				type: 'POST',
			    url: databasepost,
			    data: obj,
			    success: function (data1) {
			        result = data1;
					console.log("json data******123",result);
			    },error: function(err){
			       console.log("error",err);
			    } 
			});
    	}

    },
    mounted() {
    	//CKEDITOR.replace("editor1"),
    	this.calldata(),
    	this.dbdata()
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

	.row {
	    display: table;
	    padding-top: 10px;
	    padding-right: 10px;
	    padding-bottom: 10px;
	    padding-left: 10px;
	    width: 100%;
	}
	.crm{
		margin-bottom: 10px;
	}

	div {
		border-radius: 4px !important;
	}

	p {
	    margin: 20px 0 !important
	}

	label{
		font-weight: 700 !important;
	}

	.row {
	    display: table;
	    padding-top: 10px;
	    padding-right: 10px;
	    padding-bottom: 10px;
	    padding-left: 10px;
	    width: 100%;
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

	#c16878 {
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

	#c16894 {
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
	    border-image-repeat: initial;
	}

	#c16913 {
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
	    border-image-repeat: initial;
	}

	#c16917 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}

	#c16921 {
	    margin-right: 10px;
	}

	#c16925 {
	    color: rgb(115, 135, 156);
	}

	#name {
	    width: 100%;
	}

	#c16943 {
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
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	    height: 50px;
	}

	#c16947 {
	    margin-top: 10px;
	    margin-left: 20px;
	}

	#c16961 {
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
	    border-image-repeat: initial;
	}

	#c16969 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}

	#c16973 {
	    margin-right: 10px;
	}

	#c16977 {
	    color: rgb(115, 135, 156);
	}

	#c16980 {
	    margin-left: 40px;
	}

	#c16988 {
	    color: rgb(115, 135, 156);
	}

	#customer {
	    width: 60%;
	}

	#c17000 {
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
	    border-image-repeat: initial;
	}

	#c17008 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}

	#c17012 {
	    margin-right: 10px;
	}

	#c17016 {
	    color: rgb(115, 135, 156);
	}

	#c17019 {
	    margin-left: 40px;
	}

	#c17027 {
	    color: rgb(115, 135, 156);
	}

	#project {
	    width: 60%;
	}

	#c17043 {
	    color: rgb(115, 135, 156);
	}

	#status {
	    width: 60%;
	}

	#c17059 {
	    color: rgb(115, 135, 156);
	}

	#assignee {
	    width: 60%;
	}

	#c17075 {
	    color: rgb(115, 135, 156);
	}

	#product_line {
	    width: 60%;
	}

	#c17091 {
	    color: rgb(115, 135, 156);
	}

	#contractdate {
	    width: 60%;
	}

	#c17104 {
	    color: rgb(115, 135, 156);
	}

	#nextdate {
	    width: 60%;
	}

	#c17117 {
	    color: rgb(115, 135, 156);
	}

	#priceinput {
	    width: 30%;
	}

	#price {
	    width: 30%;
	}

	#c17139 {
	    color: rgb(115, 135, 156);
	}

	#email {
	    width: 60%;
	}

	#c17152 {
	    color: rgb(115, 135, 156);
	}

	#phone {
	    width: 60%;
	}

	#c17165 {
	    width: -webkit-fill-available;
	    text-align: -webkit-center;
	    display: -webkit-inline-box;
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
	    border-image-repeat: initial;
	    margin-left: 15px;
	    margin-right: 15px;
	}

	#create {
	    font-weight: bold;
	    margin-top: 10px;
	    margin-right: 10px;
	    margin-bottom: 10px;
	    margin-left: 10px;
	    background-color: rgb(0, 200, 169);
	    color: white;
	    width: auto;
	}

	#createandcontinue {
	    font-weight: bold;
	    background-color: rgb(237, 237, 237);
	    color: rgb(83, 90, 115);
	    width: auto;
	}

	#c22229 {
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

	#c22245 {
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
	    border-image-repeat: initial;
	}

	#c22264 {
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
	    border-image-repeat: initial;
	}

	#c22268 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}

	#c22272 {
	    margin-right: 10px;
	}

	#c22276 {
	    color: rgb(115, 135, 156);
	}

	#c22294 {
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
	    border-image-source: initial;
	    border-image-slice: initial;
	    border-image-width: initial;
	    border-image-outset: initial;
	    border-image-repeat: initial;
	    height: 50px;
	}

	#c22298 {
	    margin-top: 10px;
	    margin-left: 20px;
	}

	#c22312 {
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
	    border-image-repeat: initial;
	}

	#c22320 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}

	#c22324 {
	    margin-right: 10px;
	}

	#c22328 {
	    color: rgb(115, 135, 156);
	}

	#c22331 {
	    margin-left: 40px;
	}

	#c22339 {
	    color: rgb(115, 135, 156);
	}

	#c22351 {
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
	    border-image-repeat: initial;
	}

	#c22359 {
	    border-bottom-width: 2px;
	    border-bottom-style: solid;
	    border-bottom-color: rgb(156, 158, 160);
	    padding-top: 1px;
	    padding-right: 5px;
	    padding-bottom: 6px;
	    padding-left: 5px;
	}

	#c22363 {
	    margin-right: 10px;
	}

	#c22367 {
	    color: rgb(115, 135, 156);
	}

	#c22370 {
	    margin-left: 40px;
	}

	#c22378 {
	    color: rgb(115, 135, 156);
	}

	#c22394 {
	    color: rgb(115, 135, 156);
	}

	#c22410 {
	    color: rgb(115, 135, 156);
	}

	#c22426 {
	    color: rgb(115, 135, 156);
	}

	#c22442 {
	    color: rgb(115, 135, 156);
	}

	#c22455 {
	    color: rgb(115, 135, 156);
	}

	#c22468 {
	    color: rgb(115, 135, 156);
	}

	#c22490 {
	    color: rgb(115, 135, 156);
	}

	#c22503 {
	    color: rgb(115, 135, 156);
	}

	#c22516 {
	    width: -webkit-fill-available;
	    text-align: -webkit-center;
	    display: -webkit-inline-box;
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
	    border-image-repeat: initial;
	    margin-left: 15px;
	    margin-right: 15px;
	}

	.form-control {
	    display: unset !important;
	}

	.col-xs-3 {
	    float: none;
	}
</style>