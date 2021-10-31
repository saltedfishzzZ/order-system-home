import request from '@/utils/request'

export function listGood(merchantId, pageNo, pageSize) {
  return request({
    url: `/good/list`,
    method: 'post',
    data: { merchantId, pageNo, pageSize }
  })
}

export function deleteById(id) {
  return request({
    url: `/good/deleteById`,
    method: 'post',
    params: { id }
  })
}

export function editStatusById(id, status) {
  return request({
    url: `/good/editStatus`,
    method: 'post',
    params: { id, status }
  })
}
