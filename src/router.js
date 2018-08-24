import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/404.vue'
import Home from '@/components/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '404',
      component: NotFound
    },{
      path:'/',
      name:'home',
      component:Home
    },
  ]
})
