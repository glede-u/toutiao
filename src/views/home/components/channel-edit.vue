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
        @click='onChannelClick(channel, index)'
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
import { getAllChannels, addUserchannel, deleteUserchannel } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
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
    ...mapState(['user']),
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
    onChannelClick (channel, index) {
      // 编辑状态
      if (this.isEdit) {
        // 如果是推荐项,直接返回不处理
        if (this.fixedChannel.includes(index)) return
        // 处理删除选中前的选中项会改变选择状态的状态的问题
        if (index <= this.active) {
          this.$emit('update-article', this.active - 1, true)
        }
        // 根据删除index删除
        this.myChannels.splice(index, 1)
        // 数据持久化
        this.deletechannel(channel, index)
      } else {
        // 未编辑状态
        this.$emit('update-article', index, false)
      }
    },
    async deletechannel (channel, index) {
      if (this.user) {
        // 已登陆状态,将数据更新到线上
        try {
          await deleteUserchannel(channel.id)
        } catch (error) {
          this.$toast('删除频道失败! 稍后再试', error)
        }
      } else {
        // 未登陆将数据更新到本地存储
        setItem('TOUTIAO_CHANNEL', this.myChannels)
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        // 登陆状态 请求接口
        try {
          await addUserchannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号,就是我的频道的数据length
          })
        } catch (error) {
          this.$toast('添加频道失败! 稍后再试')
        }
      } else {
        // 未登陆数据保存到本地存储
        setItem('TOUTIAO_CHANNEL', this.myChannels)
      }
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
