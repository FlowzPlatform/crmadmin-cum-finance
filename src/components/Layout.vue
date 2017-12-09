<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height:800px;
        margin: 15px;
        overflow: hidden;
        /*background: #010a0f;*/
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: left;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #010a0f;
        color: #fff;
    }
    .layout-header{
        height: 60px;
        background: #2a3f54;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        text-align: left;
    }
    .layout-logo-left
    {
        width: 86%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        text-align: left;
        padding: 0px 11px;
    }
    
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .ivu-menu-dark {
    background: #010a0e;
    }
    .ivu-menu li{
        text-align: left;
        
    }
    .ivu-menu-submenu-title span{
        
        color: #fefefe;
        font-size: 17px;
        font-weight: 500;
        letter-spacing: 0.4px;
    }

    .ivu-menu-submenu ivu-menu-item-active ivu-menu-opened{
        background-color: #010a0e;
    }

    .ivu-select{
        
        margin: 15px 9px;
        
    }

    div.ivu-select-selection{
        background-color: #5a626f !important;
    }
   
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
        border-right: none;
        color: #fff;
        background: #091e33!important;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                
                <Menu active-name="1-2" width="auto" theme="dark" >
                    <div class="layout-logo-left">
                        <img src="../assets/images/Flowz.svg" style="width: 85px;">
                    </div>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate" :size="iconSize"></Icon>
                                 <span class="layout-text" @click="goToDashboard">Dashboard</span>
                            </template>
                            
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad" :size="iconSize"></Icon>
                                <span class="layout-text"> CRM </span>
                            </template>
                            <MenuItem name="2-1"><span @click="goToNewCrm">New</span></MenuItem>
                            <MenuItem name="2-2"><span @click="goToListCrm">List</span></MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics" :size="iconSize"></Icon>
                                <span class="layout-text">  Accounting </span>
                            </template>
                            <Submenu name="3-1">
                                <template slot="title">
                                    <Icon type="bag" :size="iconSize"></Icon>
                                    <span class="layout-text">  Invoice </span>
                                </template>
                                <!-- <MenuItem name="3-1">Invoice</MenuItem> -->
                                    <MenuItem name="3-1-1">New Invoice</MenuItem>
                                    <MenuItem name="3-1-2">List Invoice</MenuItem>
                            </Submenu>
                            <Submenu name="3-2">
                                <template slot="title">
                                    <Icon type="cash" :size="iconSize"></Icon>
                                    <span class="layout-text">  Payment </span>
                                </template>
                                <!-- <MenuItem name="3-1">Invoice</MenuItem> -->
                                    <MenuItem name="3-2-1">New Payment</MenuItem>
                                    <MenuItem name="3-2-2">List Payment</MenuItem>
                            </Submenu>
                        </Submenu>
                    </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" color=#fff size="32"></Icon>
                    </Button>
                    <div style="float:right">
                    <Select class="user-options"  style="width:200px;" placeholder="User">
                         <Option value="myaccount">My Account</Option>
                         <Option value="LogOut"><span @click="logout">Logout</span></Option>
                    </Select>
                    </div>
                </div>
               
                <div class="layout-content">
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import Header from './Header'
import Footer from './Footer'
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19
            }
        },
        components: {
            'f-header': Header,
            'f-footer': Footer
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            logout(){
                this.$cookie.delete('auth_token', {domain: location});
                this.$router.push('/login');
            },
            goToNewCrm(){
                this.$router.push('/newcrm');
            },
            goToListCrm() {
                this.$router.push('/listcrm')
            },
            goToDashboard() {
                 this.$router.push('/')
            }
        }
    }
</script>