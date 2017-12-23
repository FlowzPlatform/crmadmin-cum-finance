<template>
    <div>
        
        <div class="settings_header">
            <Button @click="addNewConfig">Add New Configuration</Button>
        </div>

        
    <!-- <RadioGroup v-model="radio7" :on-change="defaultChanged()"> -->
        <div  v-for="(chunk , index) in productChunks">
            <div  v-for="(product, inx) in chunk" style="float:left;width:50%;padding:10px">
            <Widget>
                <WidgetHeading :id='index+""+inx' :Title= "product.configName" :HeaderEditable="false" :TextColor="true" :DeleteButton="false" :ColorBox="true" :Fullscreen="false" :Expand="true" :Collapse="true"></WidgetHeading>
                <WidgetBody>
                    
                    <table id="t01">
                   
                    <tr>
                        <td>User</td>
                        <td>{{ product.user}}</td>
                    </tr>
                    <tr>
                        <td>Domain</td>
                        <td>{{ product.domain}}</td>
                    </tr>

                    <tr v-if="product.domain == 'Xero'">
                        <td >Consumer key </td>
                        <td>
                            <Input :type="consumerKeyType" readonly :value='product.consumerKey'>
                                <Button slot="append" icon="eye" @click="showSecret(product)"></Button>
                            </Input>                            
                        </td>
                    </tr>
                    <tr v-else>
                        <td >Client ID </td>
                        <td>
                             <Input :type="client_idType" readonly :value='product.client_id'>
                                <Button slot="append" icon="eye" @click="showSecret" ></Button>
                            </Input>
                        </td>
                    </tr>

                    <tr v-if="product.domain == 'Xero'">
                        <td >Consumer secret </td>
                        <td>
                            <Input :type="consumerSecretType" readonly :value='product.consumerSecret'>
                                <Button slot="append" icon="eye" @click="showSecret"></Button>
                            </Input>
                        </td>
                    </tr>
                    <tr v-else>
                        <td >Client secret </td>
                        <td>
                            <Input :type="client_secretType" readonly :value='product.client_secret'>
                                <Button slot="append" icon="eye" @click="showSecret"></Button>
                            </Input>
                        </td>
                    </tr>

                    <tr v-if="product.domain == 'Xero'">
                        <td >User agent</td>
                        <td >{{ product.useragent}}</td>
                    </tr>
                    <tr v-else>
                        <td >realmId </td>
                        <td >{{product.realmId}}</td>
                    </tr>

                    <tr v-if="product.domain == 'Xero'">
                        <td >Certificate </td>
                        <td >{{ product.pem}}</td>
                    </tr>
                    <tr v-else>
                        <td >Refresh Token: </td>
                        <td >{{product.refresh_token}}</td>
                    </tr>
                    </table>
                    
                    <div class="actionDiv">
                    <Tooltip placement="top" content="Toggle active / inactive">
                    <i-switch v-model="product.isActive" :disabled="disabled" @on-change="buttonClicked(product)"></i-switch>
                    </Tooltip>
                    <ButtonGroup>
                        <Tooltip placement="top" content="Delete">
                        <Button class="ButtonGroup" @click="deleteConfig(product)"   type="ghost" icon="trash-b"></Button>
                        </Tooltip>
                        <Tooltip placement="top" content="Edit">
                        <Button class="ButtonGroup" @click="editConfig(product)" type="ghost" icon="edit"></Button>
                        </Tooltip>
                    </ButtonGroup>
                    </div>
                       
                </WidgetBody>
            </Widget>
            
            </div>
        </div>
        <!-- </RadioGroup> -->
    </div>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import VueWidgets from 'vue-widgets'
import 'vue-widgets/dist/styles/vue-widgets.css'
import axios from "axios"
let config = require("@/config/customConfig.js")
let feathersUrl =  config.default.serviceUrl;
import Cookies from 'js-cookie';
Vue.use(VueWidgets);


    export default {
        data () {
            return {
                disabled:false,
                switch1: false,
                comp: true,
                consumerKeyType:"password",
                client_idType:"password",
                consumerSecretType:"password",
                client_secretType:"password",
                Configurations: "Configurations",
                columns7: [
                    {
                        title: 'User',
                        key: 'user'
                    },
                    {
                        title: 'Domain',
                        key: 'domain'
                    },
                    {
                        title: 'consumerKey',
                        key: 'consumerKey'
                    },
                    {
                        title: 'consumerSecret',
                        key: 'consumerSecret'
                    },
                    {
                        title: 'useragent',
                        key: 'useragent'
                    }
                ],
                data6: [
                    
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            addNewConfig(){
                this.$router.push({
                        name: 'newsettings'
                    });
            },
            defaultChanged(e){
                
                console.log(e)
            },
            change (status) {
                
            },
            deleteConfig(data){
                axios({
                    method:'patch',
                    url:feathersUrl +'settings/'+data.id,
                    data:{isDeleated : true },
                    headers:{
                        Authorization : Cookies.get('auth_token')
                    },
                }).then(response => {
                    if(response.status == 200){
                        this.$Message.success("Configuaration deleated successfully")
                        let deletedData =  this.data6.filter(function(el) {
                            return el.id !== data.id;
                        });
                        this.data6 = deletedData, null, ' '
                    }
                    
                })
                .catch(error => {
                        console.log(error)
                        
                        Cookies.remove('auth_token') 
                        this.$Message.error('Auth Error!');
                       this.$store.commit('logout', this); 
                        this.$router.push({
                        name: 'login'
                    })
                });
                
            },
            editConfig(data){

            },
            showSecret(data){
                console.log(this)
                
               alert(data.id)
                 
                       
                //if(data == show[0].id){
                
                if(this.client_idType == "password" ){
                    this.client_idType = "text"
                }else{
                    this.client_idType = "password"
                }

                if(this.client_secretType == "password"){
                    this.client_secretType = "text"
                }else{
                    this.client_secretType = "password"
                }

                if(this.consumerKeyType == "password"){
                    this.consumerKeyType = "text"
                }else{
                    this.consumerKeyType = "password"
                }

                if(this.consumerSecretType == "password"){
                    this.consumerSecretType = "text"
                }else{
                    this.consumerSecretType = "password"
                }
                //}
                
                
            },
            buttonClicked(data){
                this.disabled = true;
                axios({
                    method:'patch',
                    url:feathersUrl +'settings/'+data.id,
                    data:{isActive : data.isActive },
                    headers:{
                        Authorization : Cookies.get('auth_token')
                    },
                }).then(response => {
                    if(response.status == 200){
                        this.$Message.success("Configuaration updated successfully")
                    }
                    this.disabled = false;
                })
                .catch(error => {
                        console.log(error)
                        this.disabled = false;
                        Cookies.remove('auth_token') 
                        this.$Message.error('Auth Error!');
                        this.$store.commit('logout', this); 
                        this.$router.push({
                        name: 'login'
                    })
                });
            }
        },
        computed: {
        productChunks(){
            return _.chunk(this.data6, 2);
        }
        },
        mounted(){
            console.log(this.$store);
            axios({
                    method:'get',
                    url:feathersUrl +'settings',
                    headers:{
                        Authorization : Cookies.get('auth_token')
                    },
                })
                .then(response => {
                console.log(response)
                this.data6 = response.data.data
                })
                .catch(error => {
                        Cookies.remove('auth_token') 
                        this.$Message.error('Auth Error!');
                        this.$store.commit('logout', this); 
                        this.$router.push({
                        name: 'login'
                    })
                });
        }
    }
</script>

<style scoped>
.settings_header{
    padding : 10px;
    text-align:right;
    background: #cacaca;
    width:100%;
    margin:14px 2px;
}

.ivu-radio-group {
    display: block !important;
    font-size: 14px !important;
    /* vertical-align: middle; */
}

.default_radio {
    background: #cacaca;
    max-width: 126px;
    color: #5a5252;
    padding: 12px 5px;
    width: auto;
    float: right;
}

table {
    width:100%;
}
table, th, td {
    border:  1px solid #d6d6d6;
    border-collapse: collapse;
}
th, td {
    padding: 5px;
    text-align: left;
}
table#t01 tr:nth-child(even) {
    background-color: #eee;
}
table#t01 tr:nth-child(odd) {
   background-color:#fff;
}
table#t01 th {
    background-color: #232038;
    color: white;
}
.actionDiv{
   padding: 6px;
    text-align: -webkit-right;
    background: #f3f3f3;
    margin-top: 3px;
}

.ButtonGroup  {
    margin-left : 10px
}
.eyeIcon{
    float:right;
    font-size:16px 
}
</style>
