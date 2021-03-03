<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form class="search-form" action="/">
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
    <search-result  v-if="isResultShow" :search-text='searchText'/>
        <!-- 联想建议 -->
    <search-suggestion :search-text='searchText' v-else-if="searchText" @search='onSearch'/>
    <!-- 搜索历史 -->
    <search-history :search-histories='searchHistories' @search='onSearch' v-else/>
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'searchIndex',

  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 在本地获得历史记录数据,
    }
  },
  components: {
    searchHistory,
    searchSuggestion,
    searchResult
  },
  watch: {
    // 监听searchHistories的变化
    searchHistories (val) {
      // 数据变化的时候将数据保存到本地
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    }
  },

  methods: {
    // 搜索事件
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
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
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
