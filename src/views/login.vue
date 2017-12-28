<style lang="less">
    @import './login.css';
</style>

<template>
    
      <div class="mainBody">
      
      <div class="loginContainer">
          
         <div class="success">
            <p id="text_mess" v-if="errmsg!=''">{{errmsg}}</p>
         </div>
         <div class="backbox">
            <div class="loginMsg">
               <div class="textcontentSignup">
                  <p class="title">Don't have an account?</p>
                  <p>Sign up to save all your statistics.</p>
                  <button id="switch1">Sign Up</button>
               </div>
            </div>
            <div class="signupMsg visibility">
               <div class="textcontentLogin">
                  <p class="title">Have an account?</p>
                  <p>Log in to see all your statistics.</p>
                  <button id="switch2">LOG IN</button>
               </div>
            </div>
         </div>
         <!-- <form id="form-facebook" name="form-facebook" :action=loginWithFacebookUrl method="post">
            <input type="hidden" name="success_url" :value=callbackUrl>
            </form>
            <form id="form-google" name="form-google" :action = loginWithGoogleUrl method="post">
            <input type="hidden" name="success_url" :value=callbackUrl>
            </form> -->
         <div class="frontbox">
            <div class="login">
               <h2>LOG IN</h2>
               <form  v-on:submit.prevent="handleLoginSubmit" action="#" method="post">
                   
                  <Tabs class="lconun" type="card" value="1" @on-click="tabsClicked">
                     <TabPane label="Standard" name="1">
                        <div class="lconun">
                           <div class="lrinp">
                              <label>Email</label>
                              <input type="email" v-model="login.email" class="" placeholder="Enter Email (Required) ">
                           </div>
                        </div>
                        <div v-if="!showForgotPassword"  class="lconun">
                           <div class="lrinp">
                              <label>Password</label>
                              <input type="password" class="" v-model="login.password" placeholder="Enter Password (Required) ">
                           </div>
                        </div>
                     </TabPane>
                     <TabPane label="LDAP" name="2">
                        <div class="lconun">
                           <div class="lrinp">
                              <label>Email</label>
                              <input type="email" v-model="login.email" class="" placeholder="Enter Email (Required) ">
                           </div>
                        </div>
                        <div class="lconun">
                           <div class="lrinp">
                              <label>Password</label>
                              <input type="password" class="" v-model="login.password" placeholder="Enter Password (Required) ">
                           </div>
                        </div>
                     </TabPane>
                  </Tabs>
                  <div class="lconun">
                     <div class="lrinp">
                        <div class="row">
                           <div class="col-md-6">
                              <el-button type="success" size="small" v-if="!showForgotPassword" class="signupButton"  @click="loginUser()" :loading="saveFileLoadingLogin" >Login</el-button>
                              <el-button type="success" size="small" class="signupButton"  v-if="showForgotPassword" @click="forgotPasswordSendEmail()" :loading="saveFileLoadingLogin" >Submit</el-button>
                           </div>
                           <div class="col-md-6" style="top: 9px;">
                              <a href="javascript:void()" class="lfort" v-if="!showForgotPassword"  v-show="this.selectedTabIndex==1" @click="forgotPassword()">Forgot Password</a>
                              <a href="javascript:void()" class="lfort" v-if="showForgotPassword" v-show="this.selectedTabIndex==1" @click="backtoLogin()">Back to Login</a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <button type="submit" style="display:none"></button>
               </form>
               <!-- <div class="social">
                  <span @click="facebookLogin()">
                  <i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i>
                  </span>
                  <span @click="googleLogin()">
                  <i class="fa fa-google-plus-square fa-2x" aria-hidden="true"></i>
                  </span>
                  <span @click="twitterLogin()">
                  <i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                  </span>
                  <span @click="githubLogin()">
                  <i class="fa fa-github-square fa-2x" aria-hidden="true"></i>
                  </span>
               </div> -->
            </div>
            <div class="signup hide">
               <h2>SIGN UP</h2>
               <div class="inputbox">
                  <form  v-on:submit.prevent="signupUser" action="#" method="post">
                     <div class="lrinp">
                        <label>Username</label>
                        <input type="text" v-model="signup.username" placeholder="Enter username (Required)">
                     </div>
                     <div class="lrinp">
                        <label>Email</label>
                        <input type="email" v-model="signup.email" placeholder="Enter email (Required)">
                     </div>
                     <div class="lrinp">
                        <label>Password</label>
                        <input type="password" v-model="signup.password" placeholder="Enter password (Required)">
                     </div>
                     <button type="submit" style="display:none"></button>
                  </form>
               </div>
               <el-button type="success" size="medium" class="signupButton"  @click="signupUser()" :loading="saveFileLoadingLogin" >Sign Up</el-button>
               <!-- <button @click="signup()">SIGN UP</button> -->
            </div>
         </div>
      </div>
   </div>  
    
</template>

<script>
import Vue from 'vue';  
import Cookies from 'js-cookie';
import ElementUI from 'element-ui'
import axios from 'axios'
import config from '../config/customConfig'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
var $loginMsg = $('.loginMsg'),
            $login = $('.login'),
            $signupMsg = $('.signupMsg'),
            $signup = $('.signup'),
            $frontbox = $('.frontbox');


//let location = psl.parse(window.location.hostname)
export default {
    data () {
        return {
            form: {
                userName: 'iview_admin',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            errmsg: '',
            email: '',
            password: '',
            username: '',
            signupemail: '',
            signuppassword: '',
            selectedTabIndex: '',
            saveFileLoading: false,
            saveFileLoadingLogin: false,
            showForgotPassword: false,
            login: {
                email: "",
                password: ""
            },
            signup: {
                username: "",
                password: "",
                email: ""
            },
            selectedTabIndex: 1,
            showForgotPassword: false
        };
    },
    methods: {
        // handleSubmit () {
        //     this.$refs.loginForm.validate((valid) => {
        //         if (valid) {
        //             Cookies.set('user', this.form.userName);
        //             Cookies.set('password', this.form.password);
        //             this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
        //             if (this.form.userName === 'iview_admin') {
        //                 Cookies.set('access', 0);
        //             } else {
        //                 Cookies.set('access', 1);
        //             }
        //             this.$router.push({
        //                 name: 'home_index'
        //             });
        //         }
        //     });
        // }

         forgotPassword(){
            this.showForgotPassword = true;
        },
        backtoLogin(){
            this.showForgotPassword = false;
        },
        facebookLogin() {
            console.log("calling")
            // $("#form-facebook").submit() 
        },
        googleLogin() {
            console.log("calling")
            // $("#form-google").submit();
        },
        twitterLogin() {
            console.log("calling")
        },
        githubLogin() {
            console.log("calling")
        },
        forgetPassword() {

        },
        tabsClicked(val) {
            this.login.email = ''
            this.login.password = ''
            console.log('value is:', val);
            this.selectedTabIndex = val;
        },
        handleLoginSubmit: function() {
            if (this.showForgotPassword) {
                this.forgotPasswordSendEmail()
            } else {
                this.loginUser()
            }
        },
        loginUser: async function() {
            let self = this;
            let emailValidator = await this.validateEmail(self.login.email);
            console.log(emailValidator);

            if (self.login.email == "") {
                self.$message.warning("email field is required");
            } else if (emailValidator == false) {
                self.$message.warning("Email is not valid");
            } else if (self.login.password == "") {
                self.$message.warning("password field is required");
            } else {
                self.saveFileLoadingLogin = true;
                axios.post(this.selectedTabIndex == 1 ? config.default.loginUrl : config.default.ldapLoginUrl, {
                        email: self.login.email.trim(),
                        password: self.login.password.trim()
                    })
                    .then(function(response) {
                        console.log(response);
                        self.saveFileLoadingLogin = false;
                        axios({
                            method: 'post',
                            url: config.default.userDetail,
                            headers: {'Authorization': response.data.logintoken}
                        })
                        .then(function(result) {
                            console.log(result)
                             Cookies.set('user',  result.data.data.email);
                              Cookies.set('auth_token', response.data.logintoken);
                        
                            Cookies.set('email', response.data.email);
                            Cookies.set('password', '123456');
                            self.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            if (self.form.email === 'iview_admin') {
                                Cookies.set('access', 0);
                            } else {
                                Cookies.set('access', 1);
                            }
                            self.$router.push({
                                name: 'home_index'
                            });
                        })
                       
                    })
                    .catch(function(error) {
                        console.log("error-->", error)
                        self.saveFileLoadingLogin = false;
                        self.$message.error("email or password is incorrect");
                    });
            }
        },
          signupUser:async function(){
            let self = this;
           let emailValidator = await this.validateEmail(self.signup.email);
           console.log(emailValidator)
          if(self.signup.username == ""){
               self.$message.warning("User Name is required");
           }else if(self.signup.email == ""){
               self.$message.warning("email is required");
           }else if(emailValidator == false){
               self.$message.warning("Email is not valid");
           }else if(self.signup.password == ""){
               self.$message.warning("password is required");
           }else{
               self.saveFileLoading = true;
               axios.post(config.default.signupUrl, {
                email: self.signup.email.trim(),
                password: self.signup.password.trim(),
                username: self.signup.username.trim()
            })
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                    self.saveFileLoading = false;
                    //alert(response.data.message+", please check your email for password")
                    self.$message({
                        message : response.data.message,
                        type: 'success'
                    });
                    
                    $loginMsg.toggleClass("visibility");
                    $frontbox.removeClass("moving");
                    $signupMsg.toggleClass("visibility");
                    $signup.toggleClass('hide');
                    $login.toggleClass('hide');
                }else{
                   self.saveFileLoading = false;
                   self.$message({
                    message: response.data.error,
                    type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                // this.login.password = ''
                 console.log(error);
                self.saveFileLoading = false;
                //alert(error);
                self.$message.error("Something went wrong , Please try again later");
            });
           }
          },
        
        forgotPasswordSendEmail: async function() {
            let self = this;
            let emailValidator = await this.validateEmail(self.login.email);
            console.log(emailValidator);

            if (self.login.email == "") {
                self.$message.warning("email field is required");
            } else if (emailValidator == false) {
                self.$message.warning("Email is not valid");
            } else {
                self.saveFileLoadingLogin = true;
                axios.post(config.default.forgotPasswordUrl, {
                        email: self.login.email.trim(),
                        url: "http://google.com"
                    })
                    .then(function(response) {
                        self.saveFileLoadingLogin = false;
                        console.log(response)
                        if (response.data.code == 200) {
                            self.$message.success(response.data.message);
                            self.login.email = ""
                        }
                    })
                    .catch(function(error) {
                        console.log("error-->", error)
                        self.saveFileLoadingLogin = false;
                        self.$message.error("email  is incorrect");

                    });
            }
        },
        validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    },
    mounted() {
    //   if(Cookies.get("auth_token") != undefined){
    //     this.$router.push({
    //                             name: 'home_index'
    //                         });
    //   }
        var $loginMsg = $('.loginMsg'),
            $login = $('.login'),
            $signupMsg = $('.signupMsg'),
            $signup = $('.signup'),
            $frontbox = $('.frontbox');
        $('#switch1').on('click', function() {
            $loginMsg.toggleClass("visibility");
            $frontbox.addClass("moving");
            $signupMsg.toggleClass("visibility");
            $signup.toggleClass('hide');
            $login.toggleClass('hide');
        })
        $('#switch2').on('click', function() {
            $loginMsg.toggleClass("visibility");
            $frontbox.removeClass("moving");
            $signupMsg.toggleClass("visibility");
            $signup.toggleClass('hide');
            $login.toggleClass('hide');
        })
    }
};
</script>



