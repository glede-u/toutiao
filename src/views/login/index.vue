<template>
  <div class="login-container">
    <van-nav-bar title="标题" class="page-nav-bar" >
       <van-icon v-if="$route.query.redirect"
        slot="left"
        name="cross"
        @click="$router.push($route.query.redirect || '/')"
      />
    </van-nav-bar>
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- 手机号区域 -->
      <van-field
        v-model="user.mobile"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
        name="mobile"
        placeholder="请输入手机号"
      >
        <i slot="left-icon" class="iconfont toutiao-shouji"></i>
      </van-field>
      <!-- 验证码区域 -->
      <van-field
        v-model="user.code"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
        name="code"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="iconfont toutiao-yanzhengma"></i>
        <!-- 发送验证码区域 -->
        <template #button>
          <van-count-down v-if="isCountDownShow" :time="time" format=" ss s" @finish="isCountDownShow=false" />
          <van-button
            v-else
            round
            size="small"
            native-type="button"
            type="default"
            class="send-sms-btn"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn "
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入请求模块
import { login, sendSms } from '@/api/user'
export default {
  name: 'loginIndex',

  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '手机号格式不对!'
          }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不对!' }
        ]
      },
      time: 60 * 1000,
      isCountDownShow: false
    }
  },

  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功!')
        // 清除 LayoutIndex 缓存
        this.$store.commit('removeCachePage', 'LayoutIndex')
        // 跳转原来的页面,其中用传递query数据redirect进行跳转,如果找不到redirect 就跳转到首页
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败!')
        } else {
          this.$toast.fail('登录失败! 稍后再试')
        }
      }
    },
    async onSendSms () {
      // 校验手机号码是否正确
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('登录失败!', err)
      }
      // 校验通过显示倒计时,利用vant countDown组件
      this.isCountDownShow = true
      // 请求接口发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功!')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁! 一分钟后再试 ', err)
        } else {
          this.$toast('发送失败! 稍后再试 ')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
