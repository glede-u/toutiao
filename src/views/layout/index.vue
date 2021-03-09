<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部 tan栏 -->
    <van-tabbar class="layout-tabNar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont toutiao-wode"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登陆' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',

  data () {
    return {}
  },
  mounted () {
    // 渲染好之后再次添加缓存
    this.$store.commit('addCachePage', 'LayoutIndex')
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabNar {
    .iconfont {
      font-size: 40px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
