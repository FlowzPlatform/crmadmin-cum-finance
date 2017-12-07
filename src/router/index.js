import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import login from '@/components/login'
import dashboard from '@/components/dashboard'
import newcrm from '@/components/newcrm'
//import resetpassword from '@/components/resetPassword'


Vue.use(Router)


    const routes = [
      {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [{
          path: '/',
          component: dashboard,
          name: 'dashboard',
        }]
      }, {
        path: '/login',
        name: 'login',
        component: login
      }, {
        path: '/newcrm',
        name: 'newcrm',
        component: newcrm
      }
    // ,
    // {
    //   path: '/resetpassword',
    //   name: 'resetpassword',
    //   component: resetpassword
    // }
  ]
    export default new Router({mode: 'history' , hashbang: false,routes: routes})