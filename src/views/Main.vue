<style lang="less">
    @import "./main.less";

     
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        
        <!--<div class="sidebar-menu-con" :style="{width: shrink?'60px':'206px', overflow: shrink ? 'visible' : 'auto'}"> -->
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'225px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme"
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <div slot="top" class="logo-con">

                    <img v-show="!shrink" src="../images/flowz-logo2.png" key="max-logo" />
                    <img v-show="shrink" src="../images/flowz-logo2.png" key="min-logo" style="height: 22px;" />
                </div>
            </shrinkable-menu>
        </div>
        <!--<div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">-->
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'225px'}">

            <!-- <alert type="success" show-icon closable>
            A success prompt
            <span slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </span>
            </alert> -->
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                    <div style="float:right;margin-top:-26px;">
                        <div class="dweep" style="float: left;margin: 1px 5px;">
                            <span style="color: #606266;border: 1px solid #dcdfe6;;padding: 9px;display: inline-block;border-radius: 5px;">{{user}}</span>
                        </div>
                         <el-select style="width: 240px;" @change="changeSubscription()" no-data-text="No Subscription Found" v-model="value2" placeholder="Select subscription">
                            <el-option
                            v-for="item in options2"
                            :key="item.value2"
                            :label="item.label2"
                            :value="item.value2">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="header-avator-con">
                     
                    <div class="headerMenu">
                       
                    <Menu mode="horizontal"  active-name="1">
                        <Submenu name="3">

                            <template slot="title">
                                <Icon type="grid" size="large" style="font-size: 23px;padding-top: 21px;"></Icon>
                            </template>
                            <MenuGroup title="Flowz-Products" style="text-align:center">
                                <MenuItem name="3-1" style="text-align:left"><span @click="goToFlowzDashboard">Flowz Dashboard</span></MenuItem>
                                <MenuItem name="3-2" style="text-align:left"><span @click="goToFlowzBuilder">Website Builder</span></MenuItem>
                                <!-- <MenuItem name="3-3"><span @click="goToFlowzVmail">Vmail</span></MenuItem> -->
                                <MenuItem name="3-4" style="text-align:left"><span @click="goToFlowzUploader">Uploader</span></MenuItem>
                                <!-- <MenuItem name="3-5"><span @click="goToFlowzDbetl">DBETL</span></MenuItem> -->
                            </MenuGroup>
                        </Submenu>
                    </Menu>
                    </div>
                    <Tooltip placement="bottom">
                         <div @click="goToSettings"><Icon type="gear-b" size="large" style="font-size: 23px;
                            padding-top: 5px;
                            cursor: pointer;"></Icon></div>
                         <div slot="content">
                            Settings
                        </div>
                    </Tooltip>
                    
                    
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <!-- <lock-screen></lock-screen> -->
                    <!-- <message-tip v-model="mesCount"></message-tip> -->
                    <theme-switch></theme-switch>

                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <Tooltip placement="left">
                                    <a href="javascript:void(0)">
                                        <span class="main-user-name">
                                            {{ userName }}
                                            </span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <div slot="content">
                                        {{ userName }}
                                    </div>
                                </Tooltip>
                                
                                <DropdownMenu slot="list">
                                    <!-- <DropdownItem name="ownSpace">Personel Center</DropdownItem> -->
                                    <DropdownItem name="changePassword" divided>Change Password</DropdownItem>
                                    <DropdownItem name="loginout" divided>Sign Out</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <!-- <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar> -->
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <!--<div class="single-page-con" :style="{left: shrink?'60px':'200px'}">-->
        <div class="single-page-con" :style="{left: shrink?'60px':'225px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    // import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import psl from 'psl';
    import config from '@/config/customConfig';
    import axios from 'axios'
    import ElementUI from 'element-ui';
    import Vue from 'vue';
    let subscriptionUrl = config.default.subscriptionUrl
    let usersubscriptionUrl = config.default.usersubscriptionUrl
    let userDetail = config.default.userDetail
    Vue.use(ElementUI);

    export default {
        
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            // lockScreen,
            messageTip,
            themeSwitch
        },
        data () {
            return {
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                flowzDashboardUrl : config.default.flowzDashboardUrl,
                flowzBuilderUrl : config.default.flowzBuilderUrl ,
                flowzVmailUrl : config.default.flowzVmailUrl ,
                flowzUploaderUrl : config.default.flowzUploaderUrl ,
                flowzDbetlUrl : config.default.flowzDbetlUrl,
                options2: '',
                value2: '',
                user: '' 
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {

            async changeSubscription(){
                let location = psl.parse(window.location.hostname)
                location = location.domain === null ? location.input : location.domain
                
                Cookies.set("subscriptionId" , this.value2 , {domain: location})
                window.location.reload();
            },
            async getDataOfSubscriptionUser() {
                let sub_id = [];
                let Role_id = [];
                var self = this
                await axios.get(subscriptionUrl+'register-roles', {
                        // headers: {
                        //     'Authorization': Cookies.get('auth_token')
                        // },
                        params : {module : 'crm'}
                    })
                    .then(response => {
                        //console.log("res.................------>>>>", response)
                        let new_data = response.data.data;
                         //console.log(new_data.length)
                        for (let index = 0; index < new_data.length; index++) {
                            console.log("data.........", new_data[index].role)
                            
                            Role_id.push({
                                "value1": new_data[index].role,
                                "label1": new_data[index].role
                            })
                        }
                        //console.log("Role_id..........", Role_id)
                        
                        this.options = Role_id
                    })
                    await axios.get(config.default.userDetail, {
                        headers: {
                            'Authorization': Cookies.get('auth_token')
                        }
                    })
                    .then(response => {
                        console.log("res.................------>>>>", response)
                        let new_data = response.data.data.package;
                        for (var key in new_data) {
                            if (new_data.hasOwnProperty(key)) {
                                console.log( new_data[key].subscriptionId);
                                sub_id.push({
                                "value2": new_data[key].subscriptionId,
                                "label2": new_data[key].name
                            })
                            }
                        }
                        console.log("sub_id..........", sub_id)
                        this.options2 = sub_id;
                        if(!Cookies.get("subscriptionId") || Cookies.get("subscriptionId") == undefined || Cookies.get("subscriptionId") == ""){
                            this.value2 = sub_id[0].value2;
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain
                            Cookies.set("subscriptionId" , this.value2 , {domain: location})
                            
                        }
                        
                        
                    })
                    .catch(error => {
                        console.log("errr...",error)                    
                        if(error.response.status == 401){
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain
                            
                            Cookies.remove('auth_token' ,{domain: location}) 
                            self.$store.commit('logout', self);
                            
                            self.$router.push({
                                name: 'login'
                            });
                            // self.$Notice.error({
                            //     title: error.response.data.name,
                            //     desc: error.response.data.message,
                            //     duration: 10
                            // })
                        }
                        else if(error.response.status == 403){
                            self.$Notice.error({
                                duration:0, 
                                title: error.response.statusText,
                                desc:error.response.data.message+'. Please <a href="'+configService.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                            });
                        }else {
                            self.$Notice.error({
                                title: error.response.data.name,
                                desc: error.response.data.message,
                                duration: 10
                            })
                        }
                    })

            },
            init () {
                let self = this;
                
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
                setTimeout(function(){ self.userName = Cookies.get('user'); }, 1000);
                
            },
            async usersubscriptionUrl () {
                var self = this
                let response = await axios({
                    method: 'get',
                    url: usersubscriptionUrl + '?id=' + Cookies.get('subscriptionId'),
                    headers: {
                    'authorization': Cookies.get('auth_token')
                    }
                })
                .then(response => {
                    console.log("response response", response.data.data[0].userId)
                    let userId = response.data.data[0].userId

                    return userId
                })
                .catch(error => {
                    console.log("errr...",error)
                    if(error.message == 'Network Error'){
                        self.$Notice.error({
                            title : 'Error',
                            desc: "API service unavailable",
                            duration: 10
                        })
                    }else if(error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain
                        
                        Cookies.remove('auth_token' ,{domain: location}) 
                        self.$store.commit('logout', self);
                        
                        self.$router.push({
                            name: 'login'
                        });
                        // self.$Notice.error({
                        //     title: error.response.data.name,
                        //     desc: error.response.data.message,
                        //     duration: 10
                        // })
                    }
                    else if(error.response.status == 403){
                        self.$Notice.error({
                            duration:0, 
                            title: error.response.statusText,
                            desc:error.response.data.message+'. Please <a href="'+configService.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                        });
                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                })
                this.userDetail()
                // if(response.data.data.length != 0){
                //     list1.push({"value":state.subscription_list[key].value,"label":response.data.data[0].userId})
                // }
            },
            async userDetail () {
                var self = this
                await axios({
                    method: 'get',
                    url: userDetail,
                    headers: {
                    'authorization': Cookies.get('auth_token')
                    }
                }).then(response => {
                    console.log("response userDetail", response.data.data.username)
                    if(response.data.data.fullname) {
                        this.user = response.data.data.fullname
                    }else if(response.data.data.firstname && response.data.data.lastname ) {
                        this.user = response.data.data.firstname + " " + response.data.data.lastname                       
                    }else{
                        this.user = response.data.data.email
                    }
                }).catch(error => {
                    console.log("errr...",error.response)                    
                     if(error.response.status == 401){
                        let location = psl.parse(window.location.hostname)
                        location = location.domain === null ? location.input : location.domain
                        
                        Cookies.remove('auth_token' ,{domain: location}) 
                        self.$store.commit('logout', self);
                        
                        self.$router.push({
                            name: 'login'
                        });
                        // self.$Notice.error({
                        //     title: error.response.data.name,
                        //     desc: error.response.data.message,
                        //     duration: 10
                        // })
                    }
                    else if(error.response.status == 403){
                        self.$Notice.error({
                            duration:0, 
                            title: error.response.statusText,
                            desc:error.response.data.message+'. Please <a href="'+configService.default.flowzDashboardUrl+'/subscription-list" target="_blank">Subscribe</a>'
                        });
                    }else {
                        self.$Notice.error({
                            title: error.response.data.name,
                            desc: error.response.data.message,
                            duration: 10
                        })
                    }
                })
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                console.log('name---------->',name)
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    let location = psl.parse(window.location.hostname)
                    location = location.domain === null ? location.input : location.domain
                    
                    Cookies.remove('auth_token' ,{domain: location}) 
                    Cookies.remove('user' ,{domain: location})
                    Cookies.remove('subscriptionId' ,{domain: location})  
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                    this.$Message.success({content:'You have Succesfully Logged Out',duration:3})
                }
                else if (name === 'changePassword') {
                    this.$router.push({
                        name: 'Change Password'
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            goToSettings () {
               this.$router.push({
                        name: 'Settings'
                    });
            },
            goToFlowzDashboard (){
                
                window.open(this.flowzDashboardUrl, '_blank');
            },
            goToFlowzBuilder (){
                
                window.open(this.flowzBuilderUrl, '_blank');
            },
            goToFlowzVmail() {
                window.open(this.flowzVmailUrl, '_blank');
            },
            goToFlowzUploader (){
                window.open(this.flowzUploaderUrl, '_blank');
            },
            goToFlowzDbetl (){
                window.open(this.flowzDbetlUrl, '_blank');
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.getDataOfSubscriptionUser();
            this.init();
            this.usersubscriptionUrl();
            if(Cookies.get("subscriptionId") && Cookies.get("subscriptionId") != undefined){
                this.value2 = Cookies.get("subscriptionId")
            }
             
        },
        created () {

            this.$store.commit('setOpenedList');
        }
    };
</script>
