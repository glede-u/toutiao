<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdateName"
    />
    <div class="field-warp">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'updateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      localName: this.value
    }
  },

  methods: {
    async onUpdateName () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName
        if (!localName.length) return
        await updateUserProfile({
          name: localName
        })
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹窗
        this.$emit('close')
        this.$toast.success('更新成功!')
      } catch (error) {
        this.$toast.fail('更新昵称失败! 稍后再试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-warp {
  padding: 20px;
}
</style>
