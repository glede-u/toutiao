<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      :title="text"
      v-for="(text,index) in suggestions"
      :key="index"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 监听输入框的内容
    searchText: {
      // debounce 防抖 参数1是函数 参数2是防抖时间
      handler: debounce(function (value) {
        // console.log(value)
        this.loadSearchSuggestion(value)
      }, 500),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },

  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },

  methods: {
    // 根据输入框的内容请求线上接口
    async loadSearchSuggestion (q) {
      const { data } = await getSearchSuggestions(q)
      this.suggestions = data.data.options
    }
  }
}
</script>

<style lang='less' scoped>

</style>
