<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled='!message.length'
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { addCommentPost } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      try {
        const { data } = await addCommentPost({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId.toString() === this.target.toString() ? null : this.articleId.toString()
        })
        console.log(data)
        this.$emit('onPostSuccess', data.data)
        this.message = ''
      } catch (error) {
        this.$toast.fail('发布失败!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
