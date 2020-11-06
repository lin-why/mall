<template>
  <div >
    <nav-bar>
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="clickBack">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
        :key="index" class="title-item" 
        :class="{active:correntIndex===index}"
        @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles:['商品','参数','评论','推荐'],
      correntIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.correntIndex = index //切换title
      this.$emit('itemClick',index)
    },
    clickBack () {
      this.$router.back() //返回上一步
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: var(--color-tint);
  }
  .back {
    margin-top: 12px;
  }
</style>