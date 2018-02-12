import request from '../utils/request'

/**
 * 用户登录
 * @param username 登录账号
 * @param password 登录密码
 * @returns {*}
 */
export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
