<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="channels in userChannels"
        :key="channels.id"
        :title="channels.name"
      >
        <!-- 对应文章内容 用组件显示对应的内容 -->
        <articleList :channel="channels"></articleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelShow = true">
        <i class="iconfont toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 编辑弹出层 -->
    <van-popup
      v-model="isChannelShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      close-icon="cross"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="userChannels"
        :active="active"
        @update-article="onUpdate"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import articleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'homeIndex',

  data () {
    return {
      active: 0,
      userChannels: [],
      isChannelShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    articleList,
    channelEdit
  },
  created () {
    this.loadUserChannels()
  },

  methods: {
    async loadUserChannels  () {
      try {
        let channel = []
        // 已登录
        if (this.user) {
          const { data } = await getUserChannels()
          channel = data.data.channels
        } else {
          // 未登陆 判断是否本地有数据
          if (getItem('TOUTIAO_CHANNEL')) {
            //    有，拿来使用
            channel = getItem('TOUTIAO_CHANNEL')
          } else {
            // 没有 请求默认频道列表
            const { data } = await getUserChannels()
            channel = data.data.channels
          }
        }
        this.userChannels = channel
      } catch (error) {
        this.$toast('获取频道列表失败')
      }
    },
    onUpdate (index, isChannelShow = true) {
      this.active = index
      this.isChannelShow = isChannelShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    /deep/.van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 82px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
