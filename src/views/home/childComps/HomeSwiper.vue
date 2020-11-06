<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item[item]">
      <a :href="item.link">
        <img :src="item.image" @load="swiperLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: true
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperLoad() {
      if (this.isLoad) { //优化@load的加载次数
        this.$emit("swiperLoad");
        this.isLoad = false;
      }
    }
  }
};
</script>

<style>
</style>