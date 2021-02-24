import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const token = 'token'
export default new Vuex.Store({
  state: {
    // 存储本地存储信息
    // user: null
    // user: JSON.parse(window.localStorage.getItem('token'))
    user: getItem(token)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 防止数据丢失,把数据保存到本地存储中
      // window.localStorage.setItem('token', JSON.stringify(data))
      setItem(token, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
