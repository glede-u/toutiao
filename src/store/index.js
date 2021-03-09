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
    user: getItem(token),
    cachePages: ['LayoutIndex'] // 记住需要缓存的组件
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 防止数据丢失,把数据保存到本地存储中
      // window.localStorage.setItem('token', JSON.stringify(data))
      setItem(token, data)
    },
    // 添加缓存页面
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage (state, pageName) {
      const idx = state.cachePages.indexOf(pageName)
      if (idx !== -1) {
        // console.log(this.state.cachePages === state.cachePages)
        state.cachePages.splice(idx, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
