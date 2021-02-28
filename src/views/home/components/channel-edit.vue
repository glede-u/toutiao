<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" round size="mini" type="danger" plain @click="isEdit = !isEdit"
        >{{isEdit ? '完成' : '编辑'}}</van-button
      >
    </van-cell>
    <!-- 我的频道内容 -->
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
      >
        <van-icon v-show="isEdit && !fixedChannel.includes(channel.id)" name="clear" slot="icon" />
        <span slot="text" class="text" :class="{ active: index == active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道推荐内容 -->
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommentChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels } from '@/api/channels'
export default {
  name: 'channelEdit',
  props: {
    // 首页的频道列表数据
    myChannels: {
      type: Array,
      required: true
    },
    // 记录频道切换的active
    active: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      AllChannels: [],
      isEdit: false, // 控制关闭按钮的显示与隐藏
      fixedChannel: [0]

    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    // 计算推荐频道 就是让全部频道删减掉我的频道 利用数组filter的方法 判断一个数组是否有某个item可以用find 方法
    recommentChannels () {
      return this.AllChannels.filter(channels => {
        return !this.myChannels.find(
          myChannels => myChannels.id === channels.id
        )
      })
    }
  },
  methods: {
    // 获取全部频道列表
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.AllChannels = data.data.channels
      } catch (error) {
        this.$toast('获取全部推荐列表失败!')
      }
    },
    onAddChannel (channel) {
      this.myChannels.push(channel)
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
