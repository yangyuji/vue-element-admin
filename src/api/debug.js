import request from '@/utils/request'

export function debugReport(data) {
  return request({
    url: '/debug/post',
    method: 'post',
    data: data
  })
}
