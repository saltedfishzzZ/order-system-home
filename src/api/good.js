import request from '@/utils/request'

export function listGood(searchObj) {
  return request({
    url: `/good/list`,
    method: 'post',
    data: { ...searchObj }
  })
}

export function deleteById(id) {
  return request({
    url: `/good/deleteById`,
    method: 'post',
    params: { id }
  })
}

export function batchDelete(ids) {
  return request({
    url: `/good/batchDelete`,
    method: 'post',
    data: ids
  })
}

export function editStatusById(id, status) {
  return request({
    url: `/good/editStatus`,
    method: 'post',
    params: { id, status }
  })
}

export function allGoodStatus() {
  return request({
    url: `/good/getAllStatus`,
    method: 'post'
  })
}
