<template>
    <Menu mode="horizontal"   :theme="'primary'">
        <Row type="flex">
        
        <i-col :span="5">
            <div class="f-logo">
                <a href="#"><img src="../assets/images/logo.png"> </a>
            </div>
        </i-col>
        <i-col :span="18">
            <Row type="flex" justify="end">
                <div class="layout-nav">
                    <Menu-item name="2">
                        
                    </Menu-item>
                    <Menu-item name="3">
                      <Submenu name="1">
                        <template slot="title">
                          <Icon type="person" :size="16"></Icon>
                          {{email}}
                        </template>
                        <Menu-item name="1-1">
                            <a @click="logout()">
                                <Icon type="ios-locked-outline" :size="16"></Icon>
                                Logout
                            </a>
                        </Menu-item>
                    </Submenu>
                    </Menu-item>
                </div>
                </Row>
        </i-col>
        </Row>
    </Menu>
</template>
<script>
/*eslint-disable*/
import psl from 'psl'

let location = psl.parse(window.location.hostname)
location = location.domain === null ? location.input : location.domain
  export default {
      data () {
    return {
     email : 'User'
    }
  },
    computed: {
        
      
    },
    created() {
        // if(this.$session.get('user')){
        //     this.email = this.$session.get('user');
        // };
    },
    methods:{
    //   logout () {
    //         this.$session.destroy('auth_token');
    //         this.$router.push('/login');
    //    }

     logout : function(){
           //this.$session.destroy('auth_token');
           
           this.$cookie.delete('auth_token', {domain: location});
            this.$router.push('/login');

      },
    }
  }
</script>
<style scoped>
.ivu-menu-horizontal {
    height: 60px;
    line-height: 60px;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    background:#2a3f54;
}
</style>