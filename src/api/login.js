
export function login(username, password) {
  return new Promise((resolve, reject) => {
    resolve({
      code: '0000',
      data: {
        roles: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        name: 'Super Admin'
      },
      msg: 'string'
    })
  })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({
      code: '0000',
      data: {
        roles: ['admin'],
        role: 'admin',
        token: 'admin',
        name: 'admin'
      },
      msg: 'string'
    })
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve({
      code: '0000',
      data: null,
      msg: 'success'
    })
  })
}
