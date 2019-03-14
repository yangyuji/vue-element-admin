import request from '@/utils/request'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    resolve({
      code: '0000',
      data: {
        roles: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      },
      msg: 'string'
    })
  })
  /* return request({
    url: '/user/login' + '?username=' + username,
    method: 'post'
  }) */
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({
      code: '0000',
      data: {
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roles: ['admin'],
        role: 'admin',
        token: 'admin',
        name: 'admin'
      },
      msg: 'string'
    })
  })
  /* return request({
    url: '/user/info' + '?username=' + token,
    method: 'get'
  }) */
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
