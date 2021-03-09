<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :default-index="this.value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'updateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },

  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localGender = index
        await updateUserProfile({
          gender: localGender
        })
        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹窗
        this.$emit('close')
        this.$toast.success('更新成功!')
      } catch (error) {
        this.$toast.fail('更新性别失败! 稍后再试')
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
