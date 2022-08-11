import request from '@/utils/request'


export function getRolesApi(params) {
    return request({
        url: '/sys/role',
        params,
    })
}


export function addRoles(data) {
    return request({
        url: '/sys/role',
        method: 'POST',
        data,
    })
}