import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.用new的方式根据组件构造器创建一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象手动挂载到某一个对象上
  toast.$mount(document.createElement('div'))

  //4.toast.$el就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
export default obj