import request from '@/utils/request'

export function listGoodsSpecification(data) {
  return request({
    url: '/goods/findHomeAndSourceList',
    method: 'post',
    data
  })
}

export function createGoodsSpecification(data) {
  return request({
    url: '/goods/addHomeSource',
    method: 'post',
    data
  })
}

export function updateGoodsSpecification(data) {
  return request({
    url: '/goods/updateHomeSource',
    method: 'post',
    data
  })
}

export function deleteGoodsSpecification(query) {
  return request({
    url: '/goods/deleteHomeSource',
    method: 'get',
    params: query
  })
}
