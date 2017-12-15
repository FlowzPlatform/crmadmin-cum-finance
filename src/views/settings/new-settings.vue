<template>
    <div>
        <div class="settings_header">
            <Button @click="goToSettingsList">All Settings</Button>
        </div>
        <Tabs type="card">
            <TabPane label="Xero">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="User Agent" prop="useragent">
                        <Input v-model="formValidate.useragent" placeholder="Enter your useragent"></Input>
                    </FormItem>
                    <FormItem label="Consumer Key" prop="consumerKey">
                        <Input v-model="formValidate.consumerKey" placeholder="Enter your consumerKey"></Input>
                    </FormItem>
                    <FormItem label="Consumer Secret" prop="consumerSecret">
                        <Input v-model="formValidate.consumerSecret" placeholder="Enter your consumerSecret"></Input>
                    </FormItem>
                    <FormItem label="Private Key" prop="privateKey">
                        <Input v-model="formValidate.privateKey" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>
            </TabPane>
            <TabPane label="Quickbook">2</TabPane>
        </Tabs>
    

    </div>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import VueWidgets from 'vue-widgets'
import 'vue-widgets/dist/styles/vue-widgets.css'
Vue.use(VueWidgets);


    export default {
        data () {
            return {
               tabs: 1 ,
               formValidate: {
                    useragent: '',
                    consumerKey:'',
                    consumerSecret:'',
                    privateKey: ''
                },
                ruleValidate: {
                    useragent: [
                        { required: true, message: 'User agent cannot be empty', trigger: 'blur' }
                    ],
                    consumerKey: [
                        { required: true, message: 'Consumer Key cannot be empty', trigger: 'blur' }
                    ],
                    consumerSecret: [
                        { required: true, message: "Consumer Secret cannot be empty", trigger: 'blur' }
                    ],
                    privateKey: [
                        { required: true, message: "Private Key cannot be empty", trigger: 'blur' }
                    ]
                }
                
            }
        },
        methods: {
            
            goToSettingsList(){
                this.$router.push({
                        name: 'settings'
                    });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        computed: {
        productChunks(){
            return _.chunk(this.data6, 2);
        }
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
</style>