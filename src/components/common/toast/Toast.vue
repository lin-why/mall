<template>
  <div class="toast" v-show="toastShow">
    <span >{{message}}</span>
  </div>
</template>

<script>
import {debounce} from "common/utils.js"
export default {
  name: "Toast",
  data () {
    return {
      toastShow: false,
      message: ''
    }
  },
  methods:{
    show (msg,delay) {
      const shownoce = debounce(this.toshow)
      shownoce(msg,delay=2000)
    },
    toshow (msg, delay=2000) {
      this.message = msg
      this.toastShow = true
      setTimeout(()=>{
        this.message = ''
      this.toastShow = false
      },delay)
    }
  }
 
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /*偏移居中*/
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  z-index: 999;
}
</style>