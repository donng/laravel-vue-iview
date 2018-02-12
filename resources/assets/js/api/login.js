import request from '../utils/request'

/**
 * 用户登录
 * @param email 登录邮箱
 * @param password 登录密码
 * @returns {*}
 */
export function login(email, password) {
  return request({
    url: '/auth/login',
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
    url: '/auth/user',
  })
}
