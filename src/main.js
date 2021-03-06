// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAnalytics from 'vue-analytics'
import SocialSharing from 'vue-social-sharing'
import VueTouch from 'vue-touch'
import router from './router'
import store from './store'

Vue.config.productionTip = false
VueTouch.config.swipe = {
  direction: 'horizontal'
}

Vue.use(VueTouch)
Vue.use(SocialSharing)
Vue.use(VueAnalytics, {
  id: 'UA-109683884-1',
  router,
  checkDuplicatedScript: true,
  autoTracking: {
    page: true,
    prependBase: false
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
