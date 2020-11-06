<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

      <tab-control :titles="['流行','新款','精选']"  
      class="tab-control"
      @ChangeTab="ChangeTab"
      ref="tabcontrol2"
      v-show="istabcontrolfixed"
      
    />
      <scroll class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp='upLoadMore'
      >
      <home-swiper :banners="banners" @swiperLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']"  
      class="tab-control"
      @ChangeTab="ChangeTab"
      ref="tabcontrol1"
    />
    <goods-list :goodslist="goods[currentType].list"/>
    </scroll>
    <back-top class="backtop" @click.native="backClick" v-show="isShow"/> 
    <!-- 修饰符.navtive可以使得组件拥有原生事件 -->
    
    
  </div>
</template>

<script>
import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {debounce} from 'common/utils'
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import {itemListenerMixin,backTopMixin} from 'common/mixin'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import GoodsList from 'components/conent/goods/GoodsList'
// import BackTop from 'components/conent/backtop/BackTop'

import TabControl from'components/conent/tabControl/TabControl'

export default {
  name:"Home",
  components:{
    NavBar,
    HomeSwiper,
    Scroll,
    RecommendView,
    FeatureView,
    GoodsList,
    TabControl,
    // BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {//商品列表
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',//选择的类型
      // isShow: false,//是否显示
      TabcontrolOffSetTop: null,//tab-control距离顶部的位置
      istabcontrolfixed: false, //是否fixed
      saveY: 0,
      itemImgListener: null
    }
  },
  created () {//生命周期函数 created
    this.getHomeMultidata()
    this.getHomeGoods('pop',1)
    this.getHomeGoods('new',1)
    this.getHomeGoods('sell',1)
    console.log(this.goods['pop'])

   
  },
  mixins: [itemListenerMixin, backTopMixin],//混入类似与vuex

  // mounted() {//生命周期函数mounted 常用于选取dom
  //   // let refresh = debounce(this.$refs.scroll.refresh,200) //refresh接收函数，传入的函数不能带()
  //   // this.itemImgListener = ()=>{ //获取提交的事件
  //   //   refresh()
  //   // }
  //   // this.$bus.$on('imgLoad',this.itemImgListener)
  //   // console.log(this.$refs.tabcontrol.$el.offsetTop)//$el可用来获取组件关联的dom元素
  // },
  activated() { //对象没有被销毁的时候触发函数 和keep-alive配合使用 keep-alive可以保存对象
    // console.log('activeated')
    this.$refs.scroll.scrollTo(0,this.saveY) //利用scrollTo 返回离开时保存的y值实现 记录离开时的位置
    // console.log(this.$refs.scroll.scroll.y )
    this.$refs.scroll.refresh()
  },
  deactivated () {//离开当前对象时触发
    // console.log('deactivated')
    this.saveY = this.$refs.scroll.scroll.y //将离开时的scroll的y值保存下来
    // console.log(this.saveY)
    this.$bus.$off('imgLoad',this.itemImgListener)
    // console.log('distroyed')

  },

  methods:{//监听tab-control的点击
    ChangeTab (index) {
      switch (index){
        case 0: this.currentType = 'pop'
           break;
        case 1: this.currentType = 'new'
           break;
        case 2: this.currentType = 'sell'
           break
      }
      this.$refs.tabcontrol2.correntIndex = this.$refs.tabcontrol1.correntIndex = index //使得两个correnIndex的值保持一致
    },
    //网络请求
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      //  console.log(this.recommends)
    },err => {
      console.log(err)
    })
    },
    getHomeGoods (type, page) {
         page = this.goods[type].page + 1 //获取page的初始值+1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list) //将数组分别push到list中
        this.goods[type].page += 1
        // this.$refs.scroll.refresh()
      })
    },
    // backClick () { //返回顶部
    //   this.$refs.scroll.scrollTo(0,0)
    //   // console.log('a')
    // },
      //监听滚动
    contentScroll (position) {
      // this.isShow = -(position.y) > 1000 //scroll y轴的距离超过1000则isShow为true backTop显示
      this.comparePosition(-position.y)
      this.istabcontrolfixed = -(position.y) >= this.TabcontrolOffSetTop//判定tab-control的位置 如果小于swiper的offsettop则不显示
      
    },
    // comparePosition (position) {
    //   this.isShow = position > 1000
    // },
    upLoadMore () { //下拉加载更多
      this.getHomeGoods(this.currentType)//加载当前tab-control的数据
      setTimeout(()=>{
        this.$refs.scroll.finishPullUp() //调用Scroll组件中的 scroll对象的方法finishPullUp 作用为表示下拉加载完成
      },2000)
    },
    // debounce(fun,delay) { //防抖动函数
    //   let timmer = null
    //   return function (...args) {
    //     let that = this
    //     if(timmer) clearTimeout(timmer)
    //     timmer = setTimeout(()=>{
    //       fun.apply(that,args)
    //     },delay)
    //   }
    // },
    swiperImgLoad () { //轮播图，图片加载完成
      this.TabcontrolOffSetTop = this.$refs.tabcontrol1.$el.offsetTop
    }
  }
}
</script>

<style scoped>
#home{
  /* 视口高度 */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  
  z-index: 9; */
  position: relative;
  z-index: 9;
}
.tab-control{
  position: relative;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
.backtop {
  position: fixed;
  bottom: 60px;
  right: 20px;
}
</style>