<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  padding: 15px 0 30px 0;
  border-bottom: 15px solid #eee
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.recommend-item img {
  height: 70px;
  width: 70px;
}
</style>