import request from '@/utils/request'

export function getCategoryList(id, pageNo, pageSize) {
  return request({
    url: `/category/list/${id}`,
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function addCategory(data) {
  return request({
    url: `/category`,
    method: 'post',
    data
  })
}

export function editCategory(id, name) {
  return request({
    url: `/category/${id}`,
    method: 'put',
    data: { name }
  })
}

export function deleteCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}

export function batchDeleteCategory(idList) {
  return request({
    url: `/category/batch/delete`,
    method: 'delete',
    data: idList
  })
}
