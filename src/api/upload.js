import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: 'https://dahaizhe.com:6099/mgt/file/upload',
    method: 'post',
    data
  })
}
