import Vue from 'vue'
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // use locale
import relativeTime from 'dayjs/plugin/relativeTime' // 加载中文显示
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// 过滤时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
