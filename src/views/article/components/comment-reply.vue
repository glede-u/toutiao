<template>
  <div class="commentReply">
    <van-nav-bar
      :title="comment.reply_count>0 ? `${comment.reply_count}条回复` : '暂无回复'"
    >
    <div slot="left" ><van-icon name="cross" @click="$emit('close')" /></div>
    </van-nav-bar>
    <div class="scroll-wrap">
      <comment-item :comment='comment' />
      <van-cell title="全部回复"/>
      <comment-list :source='comment.com_id' type='c' :list='commentList' />
    </div>
    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow=true"
      >写评论</van-button>
    </div>
    <!-- /底部区域 -->
    <!-- 展示发布弹出层 -->
          <van-popup
           v-model="isPostShow"
           position="bottom"
          >
          <comment-post :target='comment.com_id' @onPostSuccess='onPost' />
          </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list'
import commentPost from './comment-post'
export default {
  name: 'commentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    commentItem,
    commentList,
    commentPost
  },

  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },

  methods: {
    onPost (data) {
      console.log(data)
      this.comment.reply_count++
      this.commentList.unshift(data.new_obj)
      this.isPostShow = false
    }
  }
}
</script>

<style lang='less' scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
