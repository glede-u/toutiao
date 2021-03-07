/**
 * 评论相关的请求模块
 */
import request from '@/utils/request'
// 获取评论列表
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 点赞评论
export const addCommentLink = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消点赞评论
export const deleteCommentLink = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

// 发布评论
export const addCommentPost = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
