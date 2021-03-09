import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Dialog } from 'vant'
import { login } from '@/utils/request'
// 处理vue 内部报错 给错误加一个catch()
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // redirect: '/login',
    // 配置路由懒加载,@是 vue中设置的src根目录
    component: () => import('@/views/login/index'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    // name: 'layout',
    // redirect: '/login',
    component: () => import('@/views/layout/index'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        name: 'home',
        // redirect: '/login',
        // 配置路由懒加载,@是 vue中设置的src根目录
        component: () => import('@/views/home/index'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        // redirect: '/login',
        // 配置路由懒加载,@是 vue中设置的src根目录
        component: () => import('@/views/qa/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/video',
        name: 'video',
        // redirect: '/login',
        // 配置路由懒加载,@是 vue中设置的src根目录
        component: () => import('@/views/video/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/my',
        name: 'my',
        // redirect: '/login',
        // 配置路由懒加载,@是 vue中设置的src根目录
        component: () => import('@/views/my/index'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    // 配置路由懒加载,@是 vue中设置的src根目录
    component: () => import('@/views/search/index'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    // 配置路由懒加载,@是 vue中设置的src根目录
    component: () => import('@/views/article/index'),
    props: true, // 开启props传参
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    // 配置路由懒加载,@是 vue中设置的src根目录
    component: () => import('@/views/user-profile/index'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(async (to, from, next) => {
  // 是否需要权限
  if (to.meta.requiresAuth) {
    // 检测是否登录
    // 已登录直接放行
    if (store.state.user) return next()
    // 未登录提示是否登录
    const r = await Dialog.confirm({
      title: '提示',
      message: '需要登录才能访问，是否登录？'
    })
      .then((r) => r)
      .catch((e) => e)
    if (r === 'confirm') {
      login()
    } else {
      // 中断
      next(false)
    }
  } else {
    next()
  }
})

export default router
