import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from './components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //事件总线

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用图片懒加载
Vue.use(VueLazyLoad,{
  loading:require("./assets/img/common/placeholder.png") //使用图片占位
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')



import Router from 'vue-router' //多次跳转报错解决方案

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}