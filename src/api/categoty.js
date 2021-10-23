import request from '@/utils/request'

export function getCategoryList(id, pageNo, pageSize) {
  return request({
    url: `/category/list/${id}`,
    method: 'get',
    params: { pageNo, pageSize }
  })
}

export function batchDeleteCategory(idList) {
  console.log(idList)
  return request({
    url: `/category/batch/delete`,
    method: 'delete',
    data: idList
  })
}
