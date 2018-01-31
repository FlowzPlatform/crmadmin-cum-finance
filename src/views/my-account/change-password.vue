<template>
  <div>
    <Card style="height:404px">
   <div class="row">
     <div class="col-lg-6 col-md-6 col-sm-6">
       <h1>
         <i class="fa fa-lock"></i> Change Password
       </h1>
     </div>
   </div>
   <div class="col-lg-6 col-md-6 col-sm-6">
    <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <form-item label="Current Password" prop="oldpasswd">
            <i-input type="password" v-model="formValidate.oldpasswd" placeholder="Enter Current Password"></i-input>
            <!-- <button @click = 'showpassword()'><Icon type="eye"></Icon></button> -->
        </form-item>
        <form-item label="New Password" prop="newpasswd">
            <i-input type="password" v-model="formValidate.newpasswd" placeholder="Enter New Password"></i-input>
        </form-item>
        <form-item label="Confirm Password" prop="confpasswd">
            <i-input type="password" v-model="formValidate.confpasswd" placeholder="Enter Confirm Password"></i-input>
        </form-item>
        <form-item>
            <i-button type="primary" @click="handleSubmit('formValidate')">Submit</i-button>
            <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</i-button>
            <span class="required-field">* Required Fields</span>
        </form-item>
    </i-form>
</div>
</Card>
</div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';
import config from '@/config/customConfig.js'
export default {
  name: 'change-password',
  data () {
    const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter valid confirm password!'));
                } else if (value !== this.formValidate.newpasswd) {
                    callback(new Error('The entered new and confirm password does not match!'));
                } else {
                    callback();
                }
            };
  return {
    formValidate: {
                    oldpasswd: '',
                    newpasswd: '',
                    confpasswd: ''
                },
                ruleValidate: {
                    oldpasswd: [
                        { required: true, message: 'Please enter valid current password!', trigger: 'blur' }
                    ],
                    newpasswd: [
                        { required: true, message: 'Please enter valid new password!', trigger: 'blur' }
                    ],
                    confpasswd: [
                        { required: true, validator: validatePassCheck, trigger: 'blur' }
                    ]
                }
    }
  },
  methods: {
    // showpassword(){
    //   alert(1)
    //   var x = document.getElementsByClassName("myInput");
    //   console.log("xxxxxxxxxxxx", x)
    // if (x.type == "password") {
    //     x.innerHTML = '<i-input type="text" class = "myInput" v-model="formValidate.oldpasswd" placeholder="Enter Current Password"></i-input>'
    // } else {
    //     x.type = '<i-input type="password" class = "myInput" v-model="formValidate.oldpasswd" placeholder="Enter Current Password"></i-input>';
    // }
    // },
    handleSubmit (name) {
      var self = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      		var passDetails = {"oldpass":this.formValidate.oldpasswd ,"newpass":this.formValidate.newpasswd};
                      		let userToken = Cookies.get('auth_token');

                      		$.ajax({
                      			type: 'POST',
                      			url: config.default.changepassword,
                      			async: true,
                      			data:  JSON.stringify(passDetails),
                      			dataType: 'json',
                      			headers: {
                      				"authorization": userToken,
                      				'Content-Type': 'application/json'
                      			},
                      			success: function (result) {
                              console.log('result',result)
                              if(result.code == 201){
                                self.$Message.success({
                                    content: result.message,
                                    duration: 5
                                });
                              }

                      			},
                      			error: function(err) {
                              console.log('err', err)
                              self.$Message.error({
                                  content: 'incorrect current password',
                                  duration: 5
                              });
                      			}
                      		});
                        } else {
                        // this.$Message.error('Fail!');
                      }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
  },
  mounted(){
  }
}
</script>

<style>
h1 {
  font-size: 25px;
  padding: inherit;
}
.required-field {
    color: red;
    font-family: 'Roboto',sans-serif;
    font-weight: 300;
    font-size: 14px;
    float: right;
}

</style>
