// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-awesome/icons/flag'

import 'vue-awesome/icons'



import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)

import psl from 'psl'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css' // CSS
import VueWidgets from 'vue-widgets'
import 'vue-widgets/dist/styles/vue-widgets.css'
import ElementUI from 'element-ui'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.use(VueWidgets)


var VueCookie = require('vue-cookie')
Vue.use(VueCookie)
Vue.use(psl)

Vue.use(iView, { locale })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
