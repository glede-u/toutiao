<template>
  <van-icon
   :class="{link: value===1}"
   :name="value===1 ? 'good-job' : 'good-job-o' "
   :loading='loading'
   @click="onLink"
  />
</template>

<script>
import { addLink, deleteLink } from '@/api/article'
export default {
  name: 'linkArticle',
  props: {
    value: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },

  data () {
    return {
      loading: false
    }
  },

  methods: {
    async onLink () {
      this.loading = true
      let status = 0
      try {
        if (this.value === 1) {
          // 已关注, 取消关注
          await deleteLink(this.articleId)
        } else {
          await addLink(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败! 请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.link{
   color: #ffa500;
}
</style>
