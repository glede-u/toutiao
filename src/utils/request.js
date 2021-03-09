import axios from 'axios'
import store from '../store'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'
let baseURL = null
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://toutiao-app.itheima.net/'
}

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  // transformResponse 允许自定义原始的响应数据（字符串）
  baseURL,
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})
// !注意
const requestToken = axios.create()

export const login = () => router.replace({
  name: 'login',
  query: {
    // router.currentRoute => this.$route
    redirect: router.currentRoute.fullPath
  }
}) // replace 是直接替换，不会添加新纪录
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  async error => {
    const status = error.response.status
    if (status === 400) {
      Toast.fail('客户端参数错误')
    } else if (status === 401) {
      // !#1. 如果没有 user 或 user.refresh_token 直接跳转到登录页
      const { user } = store.state
      if (!user || !user.refresh_token) {
        // return login() // 相当于返回了 undefined，真正的接口请求处是会走 then 的代码
        login() // 相当于返回了下面的 Promise.reject(error)，真正的接口请求处是会走 catch 的代码
      } else {
        // !#2. 如果有 refresh_token，则根据此 refresh_token 请求新的 token
        // 不使用 request 是为了防止死循环，例如刷新 token 接口再 401 的，又会继续刷新 token...
        try {
          const {
            data: {
              data: { token }
            }
          } = await requestToken({
            method: 'PUT',
            url: '/app/v1_0/authorizations',
            headers: {
              Authorization: `Bearer ${user.refresh_token}`
            }
          })
          // !#3. 拿到新的 token 更新 store
          user.token = token
          store.commit('setUser', user)
          // !#4. 把失败的请求发出去，务必 return，这样才能走真正请求的 then 去拿到结果，始终都没有机会触发真正请求的 catch，被响应拦截器拦截了
          return request(error.config)
        } catch (e) {
          error = e
          login()
        }
      }
    } else if (status === 403) {
      Toast.fail('没有权限')
    } else if (status === 404) {
      Toast.fail('资源不存在')
    } else if (status === 405) {
      Toast.fail('请求方法错误')
    } else if (status >= 500) {
      Toast.fail('服务器抽风了')
    }
    // 需要直接返回错误，会走到真正请求的 catch 里面，若省略还是会触发真正请求的 then 回调，then 里面代码出错再走 catch
    return Promise.reject(error)
  }
)

export default request
