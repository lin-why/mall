<template>
  <div class="slide-bar">
    <scroll class="content">
      <div v-for="(item, index) in kind" :key="index" class="slide-bar-item" @click="kindClick(index)" :class="{Active: index === currentIndex}">
      {{ item.title }}
    </div>
    </scroll>
    
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  naem: 'SlideBar',
  components:{
    Scroll
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    kind: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods:{
    kindClick (index) {
      this.currentIndex = index
      this.$emit('kindMsg',this.kind[index].maitKey,this.kind[index].miniWallkey,index)
    }
  }
}
</script>

<style scoped>
.content {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
.slide-bar {
  width: 100px;
  background-color:#F8F8F8;
  text-align: center;
}
.slide-bar-item {
  height: 50px;
  line-height: 50px;
  color: #A0A0A0;
}
.Active {
  color: var(--color-tint);
  border-left: solid 2px var(--color-tint);
}
</style>