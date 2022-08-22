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


export function getUserDetail(id){
    return request({
        url: '/sys/user/' + id,
    })
}


/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}


/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
  })
}


// 更新用户简单信息

export function setUserDetail(data) {
 return request({
  url: `/employees/${data.userId}/personalInfo`,
  method: 'put',
  data,
 })
}

// 给角色分配权限
export function assignPerm(data) {
    return request({
      url: '/sys/role/assignPrem',
      method: 'put',
      data
    })
  }