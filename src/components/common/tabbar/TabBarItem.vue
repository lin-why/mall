<template>
  <!-- 使用div包裹slot可以在插槽替换的时候不改变属性 -->
  <div class="tab-bar-item" @click="HandleClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div> 
    <div :style="{color:isActiveColor}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:"TabBarItem",
  props:{//父传子
    path: String,//注册属性类型
    ActiveColor: {
      type: String,
      default: "red"//属性默认值
    }
  },
  computed:{
    isActive () {//indexOf如果存在 返回1 不存在返回-1
      return  this.$route.path.indexOf(this.path) != -1 //在活跃路由中查找本路由 如果存在 返回ture不存在返回false
    },
    isActiveColor () {
      return this.isActive ? this.ActiveColor : ""//路由活跃时返回thi.ActiveColor否则返回空串
    }

  },
  methods:{
    HandleClick () {
      // console.log('666');
      this.$router.push(this.path);//路由跳转
    }
  }
}
</script>

<style>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
.tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: bottom;
  }
  
</style>