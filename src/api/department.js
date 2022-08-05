import request from '@/utils/request'


export function getDepart() {
  return request({
    url: '/company/department',
    method: 'get',
  })
}

export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}