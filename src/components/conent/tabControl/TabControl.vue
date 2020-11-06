<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item[index]" 
    class="control-item" 
    :class="{active: index === correntIndex}"
    @click="changeItem(index)"
    >
     <span> {{item}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      correntIndex: 0
    }
  },
  methods: {
    changeItem (index) {//点击变色的通用方法
      this.correntIndex = index
      this.$emit('ChangeTab',index)
    }
  }
    
  
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    background-color: #fff;
    height: 1.5em;
  }
  .control-item {
    flex: 1;
    font-size: 14px;
  }
  .control-item span {
    padding: 3px;
  }
  .active {
    color: var(--color-tint);
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);
  }

</style>