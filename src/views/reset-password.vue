<template>
  <div>
    <div class="mainBody">
      <vue-particles color="#dedede"></vue-particles>
      <div class="loginContainer">
        <div class="frontbox">
           <div class="login">
             <h2>Reset Password</h2>
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                <FormItem  prop="newPassword" style="margin-top:10px;margin-bottom:10px">
                    <label>New Password</label>
                    <Input type="password" v-model="formValidate.newPassword" placeholder="Enter New Password"></Input>
                </FormItem>
                <FormItem  prop="confirmPassword" style="margin-top:10px;margin-bottom:10px">
                    <label>Confirm Password</label>
                    <Input type="password" v-model="formValidate.confirmPassword" placeholder="Enter Confirm Password"></Input>
                </FormItem>
                <FormItem style="margin-top:10px;margin-bottom:10px">
                    <Button type="primary" id="button" :loading="saveFileLoadingLogin" @click="handleSubmit('formValidate')">Submit</Button>
                </FormItem>
             </Form>
           </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import config from '../config/customConfig'
export default {
  name: 'reset-password',
  data () {
    const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter confirm password!'));
                } else if (value !== this.formValidate.newPassword) {
                    callback(new Error('The entered new and confirm password does not match!'));
                } else {
                    callback();
                }
            };
  return {
      saveFileLoadingLogin : false,
    formValidate: {
                    newPassword: '',
                    confirmPassword: ''
                  },
    ruleValidate: {
      newPassword: [
          { required: true, message: 'Please enter NewPassword', trigger: 'blur' }
        ],
        confirmPassword: [
            { required: true, validator: validatePassCheck, trigger: 'blur' }
                    ]}
    }
  },
  methods: {
    handleSubmit (name) {
                let self = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let url = new URL(window.location.href);
                        let forgetToken = url.hash.slice(1).split('=')[1]
                        console.log("this.$route.params",forgetToken)
                    axios.post(config.default.resetPasswordUrl, {
                              new_password: self.formValidate.newPassword.trim(),
                              token: forgetToken
                        })
                        .then(function (response) {
                            console.log(response);
                            self.$message.success(response.data.message);
                            self.$router.push('/login');
                        })
                        .catch(function (error) {
                            console.log(error.response);
                            self.$message.error(error.response.data);
                        });
                    
                    
                    } else {
                        this.$Message.error('Please enter correct inputs');
                    }
                })
            }
  },
  mounted(){
  }
}
</script>


<style lang="less">
#button:hover{
    background-color:#5daf34 !important;
    color:#fff !important;
}
.ivu-form-item-error-tip {
    position: absolute !important;
    top: 80% !important;
    left: 0;
    line-height: 1;
    color: #ed3f14;
}
    .backbox,
.loginContainer {
    top: 50%;
    display: inline-flex;
    position: absolute
}
.backbox,
.frontbox,
.loginContainer {
    position: absolute
}
.login div  .ivu-tabs-nav-scroll {
    position: fixed;
  }
.el-tabs__header {
    margin-bottom: 5px !important;
}
.email,
.password {
    margin-right: 3px
}
.mainBody {
    margin-top: 30%
}
.loginContainer {
    width: 600px;
    height: 350px;
    left: 50%;
    transform: translate(-50%, -50%)
}
.backbox {
    background-color: #404040;
    width: 100%;
    height: 80%;
    transform: translate(0, -50%)
}
.frontbox {
    background-color: #fff;
    height: 100%;
    width: 50%;
    z-index: 10;
    right: 25%;
    margin-right: 3%;
    margin-left: 3%;
    transition: right .8s ease-in-out
}
.moving {
    right: 44%
}
.social{
    padding: 15px 0px;
    text-align: center;
}
.social > span {
    padding : 2px 7px;
    cursor: pointer;
}
.loginMsg,
.signupMsg {
    width: 50%;
    height: 100%;
    font-size: 15px;
    box-sizing: border-box;
    transition: opacity .8s ease-in-out
}
.loginMsg .title,
.signupMsg .title {
    font-weight: 300;
    font-size: 23px
}
.loginMsg p,
.signupMsg p {
    font-weight: 100
}
.textcontentLogin {
    color: #fff;
    margin-top: 65px;
    margin-left: 26%
}
.textcontentSignup {
    color: #fff;
    margin-top: 65px;
    margin-left: 3%
}
.loginMsg button,
.signupMsg button {
    background-color: #ed6b75;
    border: 2px solid #ed6b75;
    color: #fff;
    font-size: 12px;
    box-sizing: content-box;
    font-weight: 300;
    padding: 10px;
    margin-top: 20px
}
.login,
.signup {
    padding: 0px 17px;
    /* text-align: center */
}
.login h2,
.signup h2 {
    color: #41cac0;
    font-size: 22px
}
.inputbox {
    margin-top: 16px
}
.login input,
.signup input {
    display: block;
    width: 100%;
    height: 40px;
    background-color: #f2f2f2;
    border: none;
    margin-bottom: 20px;
    font-size: 12px;
    padding-left: 10px
}
.login input:focus,
.signup input:focus {
    outline: 0
}
.login button,
.signup button {
    border: none;
    color: #fff;
    font-size: 15px;
    font-weight: 300;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    width: 60px;
    cursor: pointer;
}
.login p {
    cursor: pointer;
    color: #4b5a6f;
    font-size: 15px
}
.visibility {
    opacity: 0
}
.hide {
    display: none
}
.login button:focus,
.loginMsg button:focus,
.signup button:focus,
.signupMsg button:focus {
    outline: 0
}
.success {
    margin-top: -15%;
    margin-left: 28%;
    text-align: center;
    font-size: 20px
}
#text_mess {
    color: #fff;
    font-weight: bold;
    background-color: #ed6b75;
    padding: 4px 10px
}
.mainBody {
    margin: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #364150
}
.backbox {
    background-color: #2b3643
}
.login h2,
.signup h2 {
    color: #4b5a6f
}
.login button,
.signup button {
    background-color: #4b5a6f
}
.loginMsg button:hover,
.signupMsg button:hover {
    cursor: pointer
}
::-webkit-input-placeholder {
    color: #2b3643
}
::-ms-input-placeholder {
    color: #2b3643
}
::-moz-placeholder {
    color: #2b3643
}
.login2 {
    width: 400px;
    margin: 16px auto;
    font-size: 16px;
  }
  
  /* Reset top and bottom margins from certain elements */
  .login2-header,
  .login2 p {
    margin-top: 0;
    margin-bottom: 0;
  }
  
  /* The triangle form is achieved by a CSS hack */
  .login2-triangle {
    width: 0;
    margin-right: auto;
    margin-left: auto;
    border: 12px solid transparent;
    border-bottom-color: #28d;
  }
  
  .login2-header {
    background: #28d;
    padding: 20px;
    font-size: 1.4em;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
  }
  
  .login2-container {
    background: #ebebeb;
    padding: 12px;
  }
  
  /* Every row inside .login-container is defined with p tags */
  .login2 p {
    padding: 12px;
  }
  
  .login2 input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    padding: 16px;
    outline: 0;
    font-family: inherit;
    font-size: 0.95em;
  }
  
  .login2 input[type="email"],
  .login2 input[type="password"] {
    background: #fff;
    border-color: #bbb;
    color: #555;
  }
  
  /* Text fields' focus effect */
  .login2 input[type="email"]:focus,
  .login2 input[type="password"]:focus {
    border-color: #888;
  }
  
  .login2 input[type="submit"] {
    background: #28d;
    border-color: transparent;
    color: #fff;
    cursor: pointer;
  }
  
  .login2 input[type="submit"]:hover {
    background: #17c;
  }
  
  /* Buttons' focus effect */
  .login2 input[type="submit"]:focus {
    border-color: #05a;
  }
</style>