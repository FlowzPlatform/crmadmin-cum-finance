<template>
    <div>
        <div class="settings_header">
            <Button @click="addNewConfig">Add New Configuration</Button>
        </div>

        
    <RadioGroup v-model="radio7" :on-change="defaultChanged()">
        <div  v-for="chunk in productChunks">
            <div  v-for="product in chunk" style="float:left;width:50%;padding:10px">
            <Widget>
                <WidgetHeading :id="1" :Title="Configurations" :HeaderEditable="false" :TextColor="true" :DeleteButton="false" :ColorBox="true" :Fullscreen="false" :Expand="true" :Collapse="true"></WidgetHeading>
                <WidgetBody>
                    <h4>User : {{ product.user}}</h4>
                    <h4>Domain : {{ product.domain}}</h4>
                    <h4>Consumer key : {{ product.consumerKey}}</h4>
                    <h4>Consumer secret : {{ product.consumerSecret}}</h4>
                    <h4>User agent: {{ product.useragent}}</h4>
                    
                    
                        <!-- <Radio  :label ="product.id">Make As Default</Radio> -->
                        <div class="default_radio">
                        <input  name="myfield" type="radio" v-bind:checked="product.isdefault==true"  v-bind:value="product.id" >
                        <label>Set As Default</label>
                        </div>
                    
                </WidgetBody>
            </Widget>
            
            </div>
        </div>
        </RadioGroup>
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
                radio7 : '',
                comp: true,
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
            }
        },
        computed: {
        productChunks(){
            return _.chunk(this.data6, 2);
        }
        },
        mounted(){
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
</style>
