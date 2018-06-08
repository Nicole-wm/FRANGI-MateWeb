import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component(resolve){
        require(['@/views/type_list.vue'], resolve)
      }
    },
    {
      path: '/matelist',
      name: 'matelist',
      component(resolve){
        require(['@/views/mate_list.vue'], resolve)
      }
    },
    {
      path: '/matedetails',
      name: 'matedetails',
      component(resolve){
        require(['@/views/mate_details.vue'], resolve)
      }
    },
    {
      path: '/error/404',
      name: 'error-404',
      component(resolve){
        require(['@/views/error/404.vue'], resolve)
      }
    },
    {
      path: '/error/110',
      name: 'error-110',
      component(resolve){
        require(['@/views/error/110.vue'], resolve)
      }
    }
  ]
})
