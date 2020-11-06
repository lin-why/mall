import { debounce } from './utils'
export const itemListenerMixin = {
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 200) //refresh接收函数，传入的函数不能带()
    this.itemImgListener = () => { //获取提交的事件
      refresh()
    }
    this.$bus.$on('imgLoad', this.itemImgListener)
    // console.log('i am mixin')
  }
}

//mixin封装BackTop
import BackTop from 'components/conent/backtop/BackTop'
export const backTopMixin = {
  data() {
    return {
      isShow: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    comparePosition (position) {
      this.isShow = position > 1000
  }
}
}