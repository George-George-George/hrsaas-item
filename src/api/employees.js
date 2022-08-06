import request from '@/utils/request'

export function getEmployeesList(){
    return request({
        url: '/sys/user/simple'
    })
}