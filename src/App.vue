<template>
  <div id="app">
    <keep-alive exclude="Detail">
        <!-- exclude可以使得该组件不会被保存，方便刷新 -->
       <!-- keep-alive可以保存页面跳转前的状态 -->
      <router-view/> 
    </keep-alive>
    <main-tab-bar/>
    
  </div>
</template>

<script>
import MainTabBar from './components/conent/maintabbar/MainTabBar'
export default {
  name: 'App',
  components: {
   MainTabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
