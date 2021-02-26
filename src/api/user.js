/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 发送验证码
export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
