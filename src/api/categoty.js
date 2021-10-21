import request from '@/utils/request'

export function getCategoryList(id, pageNo, pageSize) {
  return request({
    url: `/category/list/${id}`,
    method: 'get',
    params: { pageNo, pageSize }
  })
}
