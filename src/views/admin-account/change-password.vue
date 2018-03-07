<template>
  <div>
    <Row>
      <Col span="12" offset="6">
        <Card style="height:404px" class = 'card'>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <h1 v-if = "!showForgotPassword" style="padding: initial;">
                <i class="fa fa-lock"></i> Change Password
              </h1>
              <h1 v-if = "showForgotPassword">
                <i class="fa fa-key"></i> Forgot Password
              </h1>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6" style="width: 100%;">
            <i-form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1">
              <div v-if = 'showForgotPassword'>
                <form-item label="Email" prop="email">
                  <Input type="email" v-model="formValidate1.email" placeholder="Enter Email"></Input>
                    <!-- <i-input type="email" v-model="formValidate.email" placeholder="Enter Email"></i-input> -->
                </form-item>
              </div>
            </i-form>
            <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
              <div v-if = '!showForgotPassword'>
                <form-item label="Current Password" prop="oldpasswd">
                    <Input :type="showCurrentpassword" v-model="formValidate.oldpasswd" placeholder="Enter Current Password">
                      <Button slot="append" icon="eye"@click = "showpassword('showCurrentpassword')" ></Button>
                    </Input>
                </form-item>
                <form-item label="New Password" prop="newpasswd">
                  <Input :type="showNewpassword" v-model="formValidate.newpasswd" placeholder="Enter New Password">
                    <Button slot="append" icon="eye" @click ="showpassword('showNewpassword')" ></Button>
                  </Input>
                    <!-- <i-input type="password" v-model="formValidate.newpasswd" placeholder="Enter New Password"></i-input> -->
                </form-item>
                <form-item label="Confirm Password" prop="confpasswd">
                  <Input :type="showConfirmpassword" v-model="formValidate.confpasswd" placeholder="Enter Confirm Password">
                    <Button slot="append" icon="eye" @click ="showpassword('showConfirmpassword')" ></Button>
                  </Input>
                    <!-- <i-input type="password" v-model="formValidate.confpasswd" placeholder="Enter Confirm Password"></i-input> -->
                </form-item>
                <form-item>
                    <i-button type="primary" @click="handleSubmit('formValidate')">Save</i-button>
                    <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</i-button>
                    <a @click="forgotPassword()">Forgot Password</a>
                    <span class="required-field">* Required Fields</span>
                </form-item>
              </div>
              <div v-if = 'showForgotPassword'>
                <form-item>
                  <i-button type="primary" v-if = 'showForgotPassword' @click="forgotPasswordSendEmail('formValidate1')">Submit</i-button>
                  <a @click="backtoLogin()">Back to Change Password</a>
                </form-item>
              </div>
            </i-form>
          </div>
        </Card>
      </Col>
    </Row>
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
                formValidate1: {
                  email: ''
                },
                showForgotPassword: false,
                showCurrentpassword: 'password',
                showNewpassword: 'password',
                showConfirmpassword: 'password',
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
                },
                ruleValidate1: {
                  email:[
                    { required: true, message: 'Email cannot be empty', trigger: 'blur' },
                    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                  ]

                }
    }
  },
  methods: {
    showpassword(value){
      console.log('value', value)
      if(value == "showCurrentpassword"){
        if(this.showCurrentpassword == "password"){
          this.showCurrentpassword = "text"
        } else {
          this.showCurrentpassword = "password"
        }
      } else if(value == "showNewpassword"){
        if(this.showNewpassword == "password"){
          this.showNewpassword = "text"
        } else if(this.showNewpassword == "text") {
          this.showNewpassword = "password"
        }
      } else if(value == "showConfirmpassword"){
        if(this.showConfirmpassword == "password"){
          this.showConfirmpassword = "text"
        } else if(this.showConfirmpassword == "text") {
          this.showConfirmpassword = "password"
        }
      }
      // if(this.showCurrentpassword == "password"){
      //   this.showCurrentpassword = "text"
      // } else if(this.showCurrentpassword == "text") {
      //   this.showCurrentpassword = "password"
      // }
      //
      // if(this.showNewpassword == "password"){
      //   this.showNewpassword = "text"
      // } else if(this.showNewpassword == "text") {
      //   this.showNewpassword = "password"
      // }

    },
    forgotPassword(){
      this.showForgotPassword = true;
      $('.card').css("height",'300px');
    },
    backtoLogin(){
      this.showForgotPassword = false;
      $('.card').css("height",'404px');
    },
    forgotPasswordSendEmail(name) {
      var self = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('config.default.forgotPasswordUrl', config.default.forgotPasswordUrl)
          console.log('self.formValidate1.email', self.formValidate1.email)
          axios.post(config.default.forgotPasswordUrl, {
                  email: self.formValidate1.email.trim(),
                  url: config.default.resetPasswordRedirectUrl,
                  headers: {
                    "authorization": Cookies.get('auth_token')
                  }
              })
              .then(function(response) {
                  console.log(response)
                  if (response.data.code == 200) {
                      self.$message.success(response.data.message);
                      self.formValidate1.email = ""
                  }
              })
              .catch(function(error) {
                  self.$message.error("email  is incorrect");
              });
        } else {

        }
      })

    },
    handleSubmit (name) {
      var self = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      		var passDetails = {"oldpass":this.formValidate.oldpasswd,"newpass":this.formValidate.newpasswd};
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
                                self.handleReset(name)
                              }

                      			},
                      			error: function(err) {
                              console.log('err', err.response)
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
              // alert(1)
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
