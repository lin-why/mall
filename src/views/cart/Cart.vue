<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <cart-bottom/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList"
import Scroll from "components/common/scroll/Scroll"
import CartBottom from "./childComps/CartBottom"
import { mapGetters } from "vuex";//可以通过在computed中直接使用vuex中的getter
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottom
  },
  computed: {
    ...mapGetters({
      length: "listLength"
    })
  },
  data () {
    return {
      listLength: this.length
    }
  },
  watch: {
   length () {
     this.$refs.scroll.refresh()
   }
  }
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>