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
