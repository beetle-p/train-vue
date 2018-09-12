import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/404.vue'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Search from '@/components/Search.vue'
import TrainLogin from '@/components/TrainLogin.vue'
import CheckOrder from '@/components/CheckOrder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404',
      name: '404',
      component: NotFound
    }, {
      path: '/home',
      name: 'home',
      component: Search
    }, {
      path: '/home2',
      name: 'home2',
      component: Home
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: '/trainLogin',
      name: 'trainLogin',
      component: TrainLogin
    }, {
      path: '/checkOrder',
      name: 'checkOrder',
      component: CheckOrder
    }
  ]
})
