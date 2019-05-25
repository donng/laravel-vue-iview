import request from '../utils/request'

/**
 * 用户登录
 * @param email 登录邮箱
 * @param password 登录密码
 * @returns {*}
 */
export function login(email, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

/**
 * 获取当前登录用户的信息
 * @returns {*}
 */
export function getUserInfo() {
  return request({
    url: '/api/user',
  })
}

/**
 * 密码重置的邮件发送
 * @param email
 * @returns {*}
 */
export function sendEmail(email) {
  return request({
    url: '/api/password/email',
    method: 'post',
    data: { email }
  })
}

/**
 * 密码重置的请求
 * @returns {*}
 */
export function resetPassword(form) {
  return request({
    url: '/api/password/reset',
    method: 'post',
    data: { ...form }
  })
}
