import VueRouter from 'vue-router'
import Vue from 'vue'

const Home = () => import('views/home/Home')//懒加载
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect:'/home'//默认路由
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail', // '/detail/:id'动态路由 添加id
    component: Detail
  }
]


const router = new VueRouter({
  routes,
  mode: 'history',//使用history模式可以利用 this.$router.back 或者go(-1)来返回页面
  base: process.env.BASE_URL,
})

export default router