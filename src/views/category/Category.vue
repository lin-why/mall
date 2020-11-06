<template>
  <div class="category">
    <nav-bar class="navbar">
      <div slot="center">分类</div>
    </nav-bar>
    <div class="content">
      <slide-bar :kind="kindlist" class="slide-bar" @kindMsg="kindMsg" />

      <scroll class="scroll">
        <sub-category :kindPic="kindPic" class="sub-category" />
        <tab-control :titles="titles" class="tab-control" @ChangeTab="ChangeTab" />
        <goods-list :goodslist="goods" />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from "network/category.js";
import SlideBar from "./children/SlideBar";
import subCategory from "./children/subCategory";
import TabControl from "components/conent/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/conent/goods/GoodsList";
export default {
  name: "Category",
  components: {
    NavBar,
    SlideBar,
    subCategory,
    TabControl,
    Scroll,
    GoodsList
  },
  data() {
    return {
      kindlist: [],
      kindPic: [],
      titles: ["流行", "新款", "精选"],
      goods: [],
      goodsType: 'pop',
      miniWallkey:'',
      index: 0
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    kindMsg(maitKey,miniWallkey,index) {
      this.miniWallkey = miniWallkey
      this.getSubCategory(maitKey);
      console.log(this.goodsType)
      this.index = index
      this.getCategoryDetail(this.kindlist[this.index].miniWallkey,this.goodsType)

    },
    getCategory() {
      getCategory().then(res => {
        this.kindlist = res.data.data.category.list;
        // console.log(res.data.data.category.list);
        this.getSubCategory(this.kindlist[0].maitKey);
        getCategoryDetail(this.kindlist[0].miniWallkey, "pop").then(res => {
          this.goods = res.data;
          // console.log(res.data);
          typeof res.data;
        });
      });
    },
    getSubCategory(key) {
      getSubCategory(key).then(res => {
        this.kindPic = res.data.data.list;
        // console.log(this.kindPic)
      });
      
    },
    getCategoryDetail (miniWallkey, type){
        getCategoryDetail(miniWallkey, type).then(res=>{
          this.goods = res.data
        })
      },
    ChangeTab(index) {
      switch(index) {
        case 0: this.goodsType = 'pop'
        break;
        case 1: this.goodsType = 'new'
        break
        case 2: this.goodsType = 'sell'
      }
      this.getCategoryDetail(this.kindlist[this.index].miniWallkey,this.goodsType)
      console.log(this.goodsType)
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 999;
}
.content {
  flex: 1;
  display: flex;
  border: 1px solid red;
  flex-wrap: wrap;
}
.scroll {
  flex: 1;
  display: flex;
  border: 1px solid red;
  flex-wrap: wrap;
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
.tab-control {
  width: 100%;
}
.silde-bar {
  flex: 1;
}
</style>