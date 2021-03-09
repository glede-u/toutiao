<template>
  <div class="user-profile">
    <van-nav-bar class="page-nav-bar" title="个人资料" left-arrow @click-left="$router.back()"/>
    <van-cell title="头像"  @click="$refs.file.click()" is-link>
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <!-- 图片输入框 -->
    <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
    >
    <van-cell title="呢称" :value="user.name" is-link @click="isUpdateNameShow=true" />
    <van-cell title="性别" :value="user.gender===0 ? '男': '女' " is-link  @click="isUpdateGenderShow=true" />
    <van-cell title="生日" :value="user.birthday" is-link   @click="isUpdateBirthdayShow=true" />

    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateNameShow" position="bottom" :style="{ height: '100%' }" >
      <update-name
       v-if="isUpdateNameShow"
       @close='isUpdateNameShow=false'
       v-model="user.name"
      />
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom"  >
      <update-gender
       v-if="isUpdateGenderShow"
       @close='isUpdateGenderShow=false'
       v-model="user.gender"
      />
    </van-popup>
    <!-- 编辑生日 -->
      <van-popup v-model="isUpdateBirthdayShow" position="bottom"  >
      <update-birthday
       v-if="isUpdateBirthdayShow"
       @close='isUpdateBirthdayShow=false'
       v-model="user.birthday"
      />
    </van-popup>
    <!-- 编辑图片 -->
     <van-popup v-model="isUpdatePhotoShow" position="bottom"  :style="{ height: '100%' }" >
      <update-photo
       v-if="isUpdatePhotoShow"
       @close='isUpdatePhotoShow=false'
       v-model="img"
       @update-photo='user.photo=$event'
      />
    </van-popup>

  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'userProfile',

  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  components: {
    updateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  created () {
    this.loadUserProfile()
  },

  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取信息失败!')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang='less' scoped>
.user-profile{
  .avatar{
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>
