<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check='false'
    @load="onLoad"
  >
    <comment-item
     v-for="(item,index) in list"
     :key="index"
     :comment='item'
     @reply-click="$emit('reply-click',$event)"
    />
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import commentItem from './comment-item'
export default {
  name: 'commentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: [String],
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    commentItem
  },

  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  created () {
    // 因为取消list 自动触发onload事件,所以需要自己添加loadIng
    this.loading = true
    this.onLoad()
  },

  methods: {
    async onLoad () {
      try {
        const { data } = await getComment({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        // 展示总评论数
        this.$emit('onLoad-comment', data.data.total_count)
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取失败!')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
