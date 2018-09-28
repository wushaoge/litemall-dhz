import request from '@/utils/request'

export function listOrder(data) {
  return request({
    url: '/order/queryPageByMap',
    method: 'post',
    data
  })
}

export function listOrderGoods(data) {
  return request({
    url: '/orderGoods/queryPageByMap',
    method: 'post',
    data
  })
}

export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data
  })
}

export function readOrder(data) {
  return request({
    url: '/order/read',
    method: 'get',
    data
  })
}

export function updateOrderDeliver(data) {
  return request({
    url: '/order/setOrderDeliver',
    method: 'post',
    data
  })
}

export function updateOrderReturn(data) {
  return request({
    url: '/order/setOrderReturn',
    method: 'post',
    data
  })
}

export function deleteOrder(data) {
  return request({
    url: '/order/delete',
    method: 'post',
    data
  })
}

export function getLogistics(data) {
  return request({
    url: '/order/getLogistics',
    method: 'post',
    data
  })
}
