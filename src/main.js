import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// import Mock from './mock'

// Mock.bootstrap()


Vue.use(ElementUI)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
