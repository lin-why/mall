<template>
  <tab-bar>
    <tab-bar-item path="/home" ActiveColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/home-fill.svg">
      <div slot="item-text">主页</div>
    </tab-bar-item>
     <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/classification.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/classification-fill.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
     <tab-bar-item path="/cart" ActiveColor="green">
      <img slot="item-icon" src="~assets/img/tabbar/add-cart.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/add-cart-fill.svg">
      <div slot="item-text">购物</div>
    </tab-bar-item>
     <tab-bar-item path="/profile" ActiveColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/bussiness-man.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/bussiness-man-fill.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  
</style>