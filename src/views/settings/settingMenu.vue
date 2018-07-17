<style>
    .slide{
        position: fixed;
        background: #485060;
        color: #fff;
        width: 0px; 
        right: 30px;
        z-index: 9;
        height: auto;
        transition: right 0.4s ease-in-out;
        -o-transition: right 0.4s ease-in-out;
        -ms-transition: right 0.4s ease-in-out;
        -moz-transition: right 0.4s ease-in-out;
        -webkit-transition: right 0.4s ease-in-out;
        bottom: 75px;
    }

    #toggle{
        cursor: pointer;
        position: absolute;
        right: 0;
        padding: 10px;
        background: #485060;
        color: #fff;
        width: 50px;
        height: 50px;
        text-align: center;
        border-radius: 23px;
        box-shadow: 0px 0px 5px #3ac5fc;
    }
    .box {
        padding: 20px;
        cursor: pointer;
    }
    .ivu-tree-title {
        color: hsla(0,0%,100%,.7);
        padding: 5px 4px;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 15px;
    }
    .ivu-tree-arrow {
        cursor: pointer;
        width: 12px;
        text-align: center;
        margin: 7px;
        display: inline-block;
    }

    .ivu-tree {
        padding-top: 30px;
    }

    .ivu-tree-title:hover {
        color: #fff;
        background-color: #475060;
    }

    .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
        /*background-color: #475060;*/
        background: #363e4f;
        color: #2d8cf0  ;
    }
    #slide .ivu-tree {
        position: absolute;
    }
    #slide.opens .ivu-tree {
        bottom: 15px;
        right: 10px;
        z-index: 1;
        background-color: #485060;
        padding-top: 0;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 0px 6px #3ac5fc;
        min-width:220px;
    }

    #slide.opens .ivu-tree ul.ivu-tree-children > li > span {
        float:  right;
        width: auto;
        padding: 5px 0;
        margin: 0;
    }

    #slide.opens .ivu-tree ul.ivu-tree-children li > ul {
        padding: 0 18px 0 0;
        float:  left;
        width: 100%;
    }

    #slide.opens .ivu-tree ul.ivu-tree-children li {
        display: inline-block;
        width: 100%;
        float:  left;
        margin: 0;
        white-space: nowrap;
    }

    #slide.opens .ivu-tree ul.ivu-tree-children > li > span.ivu-tree-title {
        margin-right: 7px;
    }

    #slide.opens > .ivu-tree:before {
        content: "\F10A";
        display: inline-block;
        font-family: Ionicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        position: absolute;
        bottom: -17px;
        transform: rotate(90deg);
        color: #485060;
        font-size: 28px;
        right: 8px;
    }
</style>


<template>
    <div>
        <div id="slide" class="slide">
            <div id="toggle" style="font-size: x-large;" v-on:click="slide(toggle)">&#9776;</div>
            <tree :data="treeData" @on-select-change="treeNodeClick"></tree>
            <!--<div class="box" style="margin-top:20px;" v-on:click="tabClick('account')"><span>ACCOUNT</span></div>
            <div class="box" v-on:click="tabClick('po')"><span>PURCHASE ORDER</span></div>-->
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                toggle: false,
                accountTab: true,
                treeData: [
                    {
                        title: 'ACCOUNT',
                        expand: true,
                        children: [
                            {
                                title: 'Add New Account',
                            },
                            {
                                title: 'Add New Profile Configuration',
                            },
                            {
                                title: 'Add New Payment Configuration',
                            }
                        ]
                    },
                    {
                        title: 'PURCHASE ORDER',
                        // children: [
                        //     {
                        //         title: 'Add New PO Config',
                        //     }
                        // ]
                    }
                ],
            }
        },
        methods: {
            slide(toggle1) {
                let self = this;
                if (toggle1) {
                    $('.slide').removeClass('opens');
                    self.toggle = false
                }
                else {
                    $('.slide').addClass('opens');
                    self.toggle = true
                }
            },
            treeNodeClick(data) {
                console.log("--------treedata",data)
                this.treeData[0].expand=!this.treeData[0].expand
                if (data[0].title === 'ACCOUNT') {
                    this.accountTab = true;
                    this.$store.state.settingData = ""
                    this.$router.push({
                        name: 'Settings'
                    });
                }
                else if (data[0].title === 'Add New Account') {
                    this.$store.state.settingData = ""
                    this.$router.push({
                        name: 'Account Settings'
                    });
                }
                else if (data[0].title === 'Add New Profile Configuration') {
                    this.$store.state.settingData = ""
                    this.$router.push({
                        name: 'Profile Settings'
                    });
                }
                else if (data[0].title === 'Add New Payment Configuration') {
                    this.$store.state.settingData = ""
                    this.$router.push({
                        name: 'Payment Settings'
                    });
                }
                else if (data[0].title === "PURCHASE ORDER") {
                    this.accountTab = false;
                    this.$store.state.settingData = ""
                    this.$router.push({
                        name: 'PurchaseOrder Settings'
                    });
                    $('.slide').addClass('opens');
                }
                // else if (data[0].title === 'Add New PO Config') {
                //     this.$store.state.settingData = ""
                //     this.$router.push({
                //         name: 'PurchaseOrder Settings'
                //     });
                // }   
            }
        }
    }
</script>