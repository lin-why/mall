import {request} from "./request"

export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {//发出请求时的参数 用于获取 特定的数据
      type,
      page
    }
  }) 
}