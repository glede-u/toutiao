<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
       v-for="(item,index) in list"
        :key="index"
        :title="item.title"
       />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },

  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false // 关闭loading状态
        // 3. 判断数据是否加载完  没有让页码page++
        if (results.length) {
          this.page++
        } else {
          this.finished = true // 结束加载
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
