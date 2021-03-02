<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>
      <!-- 搜索结果 -->
    <search-result  v-if="isResultShow"/>
        <!-- 联想建议 -->
    <search-suggestion :search-text='searchText' v-else-if="searchText" />
    <!-- 搜索历史 -->
    <search-history  v-else/>
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
export default {
  name: 'searchIndex',

  data () {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  components: {
    searchHistory,
    searchSuggestion,
    searchResult
  },

  methods: {
    // 搜索事件
    onSearch (val) {
      console.log(val)
      this.isResultShow = true
    },
    // 取消搜索事件
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
