import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 92

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: '我是测试数据',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

export default {
  getList: config => {
    const { importance, status, title, pageNo = 1, pageSize = 10, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (status && item.status !== status) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))

    return {
      code: '0000',
      data: {
        total: mockList.length,
        list: pageList
      },
      msg: 'success'
    }
  },
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return {
          code: '0000',
          data: article,
          msg: ''
        }
      }
    }
  },
  createArticle: () => ({
    code: '0000',
    data: null,
    msg: 'success'
  }),
  updateArticle: () => ({
    code: '0000',
    data: null,
    msg: 'success'
  }),
  deleteArticle: () => ({
    code: '0000',
    data: null,
    msg: 'success'
  })
}
