<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text,index) in suggestions"
      :key="index"
      @click="$emit('search',text)"
    >
    <div slot="title" v-html="highlight(text)"></div>
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
    },
    // 处理联想建议高亮
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`

      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang='less' scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
