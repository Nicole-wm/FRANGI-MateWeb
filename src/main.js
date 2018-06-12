// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(VueLazyLoad, {
  error: './static/img/error.png',
  loading: './static/img/loading.gif'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})