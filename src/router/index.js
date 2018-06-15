import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        navShow: true,
        title: 'FRANGI_素材库'
      },
      component(resolve) {
        require(['@/views/type_list.vue'], resolve)
      }
    },
    {
      path: '/matelist/:tid?/:mid?',
      name: 'matelist',
      meta: {
        navShow: true,
        title: 'FRANGI_素材列表'
      },
      component(resolve) {
        require(['@/views/mate_list.vue'], resolve)
      }
    },
    {
      path: '/error/404',
      name: 'error-404',
      meta: {
        navShow: true,
        title: 'FRANGI_404'
      },
      component(resolve) {
        require(['@/views/error/404.vue'], resolve)
      }
    },
    {
      path: '/error/110',
      name: 'error-110',
      meta: {
        navShow: true,
        title: 'FRANGI_110'
      },
      component(resolve) {
        require(['@/views/error/110.vue'], resolve)
      },
    }
  ]
})

