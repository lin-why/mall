<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img v-lazy="showGoods" @load="imgLoad" /> 懒加载图片-->
    <img v-lazy="showGoods" @load="imgLoad" />
    <div class="goods-info">
      <p>{{goodItem.title}}</p>
      <span class="price">¥{{goodItem.price}}</span>
      <span class="collect">{{goodItem.id}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed:{
    showGoods () {
      return this.goodItem.image || this.goodItem.img || this.goodItem.show.img 
    }
  },
  methods: {
    imgLoad() {
       //better-scroll的一个bug:当网络请求速度过慢时
      //在item里面的img高度可能为0
      //计算滚动的高度为item高度的总和
      //所以使用了@load方法等待图片加载完毕之后再进行
      //scroll的滚动
      //但item所在的组件与scroll的组件关系不大，无法使用自定义事件通信
      //所以使用了事件总线--this.$bus.$emit和this.$bus.$on('event',()=>{})来进行通信
      //其中$bus并不存在，需要在main.js中实例化: vue.prototype.$bus = new Vue()
      // if(this.$route.path.indexOf('/home') != -1){//避免在推荐的时候刷新主页 这没有必要
      //   this.$bus.$emit("imgLoad");
      // }else if(this.$route.path.indexOf('/detail') != -1){
      //   console.log('detail')
      // }
       this.$bus.$emit("imgLoad");
    },
    itemClick() {
      this.$router.push({
        path: "/detail",
        query: {
          iid: this.goodItem.iid,
        }
      });

      // this.$router.push('/detail/' + this.goodItem.iid) 两种方法传递参数：
      //1.利用动态路由和params传递 方法为：在配置路由的时候添加动态路由'/router/:id'
      //在跳转路由的地方使用 this.$router.push('/router/' + this.id)来传递参数
      //在被传参的路由中的create()方法中利用this.$route.parmas.id来获取id
      //2.利用query的方法来传递参数方法为:
      //该方法传递的是一个query的对象
      // this.$router.push({
      //   path:'/roter',
      //   query: {
      //     id: this.id,
      //     name: this.name
      //   }
      // })
      // 然后直接在被传参的组件中用 this.$route.query.id等获取
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
  border: 3px solid var(--color-tint);
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
