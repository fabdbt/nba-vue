// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueGtag from "vue-gtag";
import SocialSharing from "vue-social-sharing";
import VueTouch from "vue-touch";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
VueTouch.config.swipe = {
  direction: "horizontal",
};

Vue.use(VueTouch);
Vue.use(SocialSharing);
Vue.use(
  VueGtag,
  {
    config: {
      id: "UA-109683884-1",
    },
  },
  router
);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
