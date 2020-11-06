<template>
  <div>
      <div class="subCategory">
        <div v-for="item in kindPic" :key="item.acm" class="sub-item">
          <img :src="item.image" class="item-img" />
          <span class="item-titile">{{item.title}}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "subCategory",
  props: {
    kindPic: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
  }
};
</script>

<style scoped>
.subCategory {
  display: flex;
  flex-flow: wrap;
}
.item-img {
  width: 70px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
.sub-item {
  height: 120px;
  width: 90px;
  flex: 1;
}
.item-titile {
  display: block;
  text-align: center;
}
.content {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>