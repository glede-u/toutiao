<template>
   <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
      <span @click="deleteAll">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete" @click="isDeleteShow=true" v-else/>
    </van-cell>
    <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="deleteItem(item,index)">
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      isDeleteShow: false
    }
  },

  methods: {
    deleteItem (item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    },
    // 删除所有项,注意不能searchHistories=[] 因为子组件传递的数据是引用类型的时候.要只能改变数据里面不能直接赋值
    deleteAll () {
      this.searchHistories.splice(0)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
