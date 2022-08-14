import request from '@/utils/request'

export function getEmployeesList(){
    return request({
        url: '/sys/user/simple'
    })
}


export function getEmployeesInfoList(params){
    return request({
        url: '/sys/user',
        params
    })
}


// /sys/role/{id}


export function delEmployees(id){
    return request({
        url: `/sys/role/${id}`,
    })
}


/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

export function importEmployee(data) {
    return request({
        method: 'post',
        url:'/sys/user/batch',
        data,
    })
}