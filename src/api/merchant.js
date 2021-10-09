import request from '@/utils/request'

export function getMerchantInfo(id) {
  return request({
    url: `/merchant/${id}`,
    method: 'get'
  })
}

export function editMerchantInfo(id, data) {
  return request({
    url: `/merchant/${id}`,
    method: 'post',
    data
  })
}
