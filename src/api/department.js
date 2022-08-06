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


// /company/department

export function postNewDepart(data) {
    return request({
        url: '/company/department',
        method: 'POST',
        data,
    })
}


// /company/department/{id}

export function getDetailDepts(id) {
    return request({
        url: `/company/department/${id}`,
    })
}


// /company/department/{id}


export function editDept(data) {
    return request({
        url: `/company/department/${data.id}`,
        method: 'PUT',
    })
}