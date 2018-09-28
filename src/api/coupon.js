import request from '@/utils/request'

export function listConpon(data) {
  return request({
    url: '/coupon/queryByMap',
    method: 'post',
    data
  })
}

export function createCoupon(data) {
  return request({
    url: '/coupon/addCouponGoods',
    method: 'post',
    data
  })
}

export function updateCoupon(data) {
  return request({
    url: '/coupon/updateCoupon',
    method: 'post',
    data
  })
}


export function deleteCoupon(id) {
  return request({
    url: '/coupon/updateCouponStatus',
    method: 'get',
    params: {id:id}
  })
}
