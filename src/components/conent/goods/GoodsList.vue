<template>  
  <div class="goods-list">
    <goods-list-item v-for="item in goodslist" :key="item[item]" :goodItem="item" class="goods-list-item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  components:{
    GoodsListItem
  },
  props: {
    goodslist: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    // handleClick () {
    //   console.log(this.goodslist)
    //   console.log(typeof(this.goodslist))
    // }
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
</style>