<template>
  <div class="cart-bottom">
    <div class="button">
      <check-buttom :is-check="AllSelect" @click.native="AllChange" />
      <span>全选</span>
    </div>
    <span class="text">价格:{{tatolPrice}}</span>
    <div class="text2" @click="NoChange">
      <span>去结算:{{Num}}</span>
    </div>
  </div>
</template>

<script>
import CheckButtom from "components/conent/checkbutton/CheckButton";
export default {
  name: "CartBottom",
  components: {
    CheckButtom
  },
  data() {
    return {
      price: 0
    };
  },
  computed: {
    tatolPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.isCheck;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      ); //保留两位小数
    },
    Num() {
      return this.$store.state.cartList.filter(item => {
        return item.isCheck;
      }).length;
    },
    AllSelect() {
      //  if(this.$store.state.cartList.length ===0) return false //可以先获取长度进行优化  
      //  return !(this.$store.state.cartList.filter(item => !item.isCheck).length)//利用filter查询没有isCheck的数组的长度,如果不存在则返回true

      // if(this.$store.state.cartList.length ===0) return false
      // return !(this.$store.state.cartList.find(item => !item.isCheck)) //利用find函数查找没有isCheck数组的长度,不存在返回ture效率高于上个方法
      if (this.$store.state.cartList.length === 0) return false;
      for (let item of this.$store.state.cartList) {
        if (!item.isCheck) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    AllChange() {
      if (this.AllSelect) {
        this.$store.state.cartList.forEach(item => {
          item.isCheck = false;
        });
      } else {
        this.$store.state.cartList.forEach(item => {
          item.isCheck = true;
        });
      }
    },
    NoChange() {
      if (this.$store.state.cartList.filter(item => item.isCheck).length === 0) {
        this.$toast.show("请选择商品");
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom {
  height: 40px;
  width: 100%;
  background: #f8f8f8;
  position: relative;
  display: flex;
  
}
.button {
  flex: 1;
  align-items: center;
  line-height: 40px;
  display: flex;
}
.text {
  flex: 1;
  line-height: 40px;
}
.text2 {
  flex: 1;
  line-height: 40px;
  background: coral;
  color: #fff;
  text-align: center;
}
</style>