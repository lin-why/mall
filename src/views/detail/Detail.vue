<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="listenScorll" :probeType="3">
      <detail-swiper :images="swiperImg" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-images-info :images-info="detailsInfo" @imgLoad="imgLoad" />
      <detail-params-info :param-info="goodsParams" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goodslist="recommends" ref="recommend" />
    </scroll>
    <back-top class="backtop" @click.native="backClick" v-show="isShow" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import {
  getDetailData,
  Goods,
  Shop,
  GoodsParams,
  getRecommend
} from "network/detail";

import GoodsList from "components/conent/goods/GoodsList";
import { debounce } from "common/utils";

import { itemListenerMixin, backTopMixin } from "common/mixin";

import DetailNavBar from "./childcomponents/DetailNavBar";
import DetailSwiper from "./childcomponents/DetailSwiper";
import DetailBaseInfo from "./childcomponents/DetailBaseInfo";
import DetailShopInfo from "./childcomponents/DetailShopInfo";
import DetailImagesInfo from "./childcomponents/DetailImagesInfo";
import DetailParamsInfo from "./childcomponents/DetailParamsInfo";
import DetailCommentInfo from "./childcomponents/DetaiCommentInfo";
import DetailBottomBar from "./childcomponents/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      res: null,
      swiperImg: null,
      goods: {},
      shop: {},
      detailsInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      toastMsg: '',
      toastShow: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  created() {
    this.iid = this.$route.query.iid;
    getDetailData(this.iid).then(res => {
      const data = res.data.result;
      this.swiperImg = data.itemInfo.topImages;
      // console.log(data)
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //商品的数据
      this.shop = new Shop(data.shopInfo);
      //图片的数据
      this.detailsInfo = data.detailInfo;
      //尺寸数据
      this.goodsParams = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule || {}
      );
      //评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] || {};
      }
    });
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list;
      // console.log(res)
      // console.log(this.recommends)
    }),
      //this.$nextTick() 等组件中的dom元素加载完成之后执行,但是有可能图片未加载完成
      (this.getThemeTopY = debounce(() => {
        //点击标题到相应内容实现思路,利用detail-tab-bar的切换函数，自定义事件来决定跳转的index
        this.themeTopY.push(0); //动态获取滚动条的位置的方法为,在imgload中将对应的dom的offfsetTop的值获取，传入数组
        this.themeTopY.push(this.$refs.params.$el.offsetTop - 44); //这种做法才不会出现跳转时y轴的错误
        this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopY.push(Number.MAX_VALUE); //在themeTopy中多添加了一个最大值,如此可以简化以下判断条件
        // console.log("demounce");
      }, 200));
  },
  mixins: [itemListenerMixin, backTopMixin],
  // mounted () {
  //   let  refresh = debounce(this.$refs.scroll.refresh,200)
  //   this.itemImgListener = function () {
  //     refresh()
  //   }
  //   this.$bus.$on('imgLoad',this.itemImgListener)
  // },
  destroyed() {
    this.$bus.$off("imgLoad", this.itemImgListener);
    // console.log('distroyed')
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh(); //图片加载完成之后刷新页面 使得scroll获得正确的高度 避免bug
      // console.log('times')
      this.getThemeTopY();
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300);
    },
    listenScorll(position) {
      const positionY = -position.y;
      this.comparePosition(-position.y);
      let length = this.themeTopY.length;
      for (let i = 0; i < length; i++) {
        // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) || (i === length-1 && positionY >= this.themeTopY[i]))) {
        //   this.currentIndex = i;
        //   this.$refs.nav.correntIndex = this.currentIndex
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
            positionY >= this.themeTopY[i] &&
            positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.correntIndex = this.currentIndex;
          console.log("a");
        }
      }
    },
    addToCart () {
      //获取购物车信息
      const product = {}
      product.image = this.swiperImg[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      
      //将商品添加到购物车内
      // this.$store.state.cartList.push(product)
      // console.log(this.$store.state.cartList)
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res=>{ //dispatch可以返回一个Promise 
        this.$toast.show(res) //使用toast插件
      })
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.backtop {
  position: fixed;
  bottom: 60px;
  right: 20px;
}

</style>