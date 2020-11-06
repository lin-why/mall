<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {//mounted中执行 才可以获得dom
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,//监听滑动的类型 0 1 不监听 2只监听手离开屏幕的位置 3可以监听惯性滑动的位置
      pullUpLoad: this.pullUpLoad
    });
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position); //监听滑动
    });
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => { //下拉加载
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();//表明该次下拉加载完成
    },
    refresh() {
      this.scroll.refresh();//刷新滑动 配合scrollTo可以记录滑动位置
      // console.log("a");
    }
  }
};
</script>

<style scoped>
</style>