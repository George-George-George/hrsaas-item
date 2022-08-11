import request from "@/utils/request"

// /company/{id}


export function getCompanyInfo(id) {
    return request({
        url: `/company/${id}`,
    })
}