import request from '@/utils/request'

export function getCategoryList(id) {
  return request({
    url: `/category/list/${id}`,
    method: 'get'
  })
}
