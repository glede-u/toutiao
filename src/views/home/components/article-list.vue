/* eslint-disable no-undef */
<template >
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" :success-text="isSuccessText" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <article-item :article='item' v-for="(item,index) in list" :key="index" ></article-item>
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import articleItem from '@/components/article-item/index'
export default {
  name: 'articleList',
  props: {
    channel: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      isLoading: false,
      isSuccessText: '刷新成功'
    }
  },
  components: {
    articleItem
  },

  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        // 1.请求获取数据
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 模拟错误
        // if (Math.random() > 0.54) {
        //   JSON.parse('sgebteeth')
        // }
        // console.log(data)
        // 2. 把数据给list的.注意是push数据
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        // 3. 判断数据是否加载完 如果没有加载完就把新的时间戳给timestamp
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 1.请求获取数据
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 模拟错误
        // if (Math.random() > 0.54) {
        //   JSON.parse('sgebteeth')
        // }
        // console.log(data)
        // 2. 把数据给list的.注意是push数据
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.isSuccessText = `刷新成功, 更新了${results.length}条数据`
      } catch (error) {
        this.isSuccessText = '刷新失败!'
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 记住滚动条位置,之所以返回页面的时候不能记住滚动位置是因为共用一个滚动容器body,所以解决方法为给每一个文章列表添加滚动容器
.article-list {
  // vh 是可视窗口单位
  height: 79vh;
  overflow-y: auto;
}
</style>
