import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import login from '@/components/login'
import dashboard from '@/components/dashboard'
import newcrm from '@/components/newcrm'
import listcrm from '@/components/listcrm'
import editcrm from '@/components/editcrm'

//import resetpassword from '@/components/resetPassword'


Vue.use(Router)


    const routes = [
      {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
              {
                path: '/',
                component: dashboard,
                name: 'dashboard'
              },
              {
                path: '/newcrm',
                name: 'newcrm',
                component: newcrm
              }, 
              {
                path: '/listcrm',
                name: 'listcrm',
                component: listcrm
              }, 
              {
                path: '/editcrm/:id',
                name: 'editcrm',
                component: editcrm
              }
          ]
       }, 
       {
            path: '/login',
            name: 'login',
            component: login
        }
    
  ]
    export default new Router({mode: 'history' , hashbang: false,routes: routes})