import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // redirect: '/login',
    // 配置路由懒加载,@是 vue中设置的src根目录
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    name: 'layout',
    // redirect: '/login',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '',
        name: 'home',
        // redirect: '/login',
        // 配置路由懒加载,@是 vue中设置的src根目录
        component: () => import('@/views/home/index')
      },
      {
        path: '/qa',
        name: 'qa',
        // redirect: '/login',
        // 配置路由懒加载,@是 vue中设置的src根目录
        component: () => import('@/views/qa/index')
      },
      {
        path: '/video',
        name: 'video',
        // redirect: '/login',
        // 配置路由懒加载,@是 vue中设置的src根目录
        component: () => import('@/views/video/index')
      },
      {
        path: '/my',
        name: 'my',
        // redirect: '/login',
        // 配置路由懒加载,@是 vue中设置的src根目录
        component: () => import('@/views/my/index')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    // 配置路由懒加载,@是 vue中设置的src根目录
    component: () => import('@/views/search/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
