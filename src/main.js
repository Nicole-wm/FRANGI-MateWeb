import Vue from 'vue';
import App from './App';
import router from './router';
import VueLazyLoad from 'vue-lazyload';
import axios from 'axios';
import VueScroller from 'vue-scroller';
import wxapi from './assets/js/weixinshare.js';

Vue.use(VueScroller);

Vue.use(VueLazyLoad, {
  error: './static/img/error.png',
  loading: './static/img/loading.gif'
});

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

Vue.prototype.wxapi = wxapi;

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
});

// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })

// router.beforeEach((to, from,next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// });
