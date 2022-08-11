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