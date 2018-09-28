import request from '@/utils/request'

export function listGoodsAttribute(data) {
  return request({
    url: '/goods/findAttributeAndValueList',
    method: 'post',
    data
  })
}

export function createGoodsAttribute(data) {
  return request({
    url: '/goods/addAttributeAndValue',
    method: 'post',
    data
  })
}

export function readGoodsAttribute(data) {
  return request({
    url: '/goods-attribute/read',
    method: 'get',
    data
  })
}

export function updateGoodsAttribute(data) {
  return request({
    url: '/goods/updateAttributeAndValue',
    method: 'post',
    data
  })
}

export function deleteAttribute(query) {
  return request({
    url: '/goods/deleteAttribute',
    method: 'get',
    params: query
  })
}

export function deleteGoodsAttribute(query) {
  return request({
    url: '/goods/deleteAttributeAndValue',
    method: 'get',
    params: query
  })
}
