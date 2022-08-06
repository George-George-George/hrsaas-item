import request from '@/utils/request'

export function login(data) {
<<<<<<< HEAD

}


  return request({
      url:'/sys/login',
            method : 'POST',
        data : data
  })
}

/// sys/profile

export function getUserInfoApi() {
  return request({
      url:'/sys/profile',
     method : 'POST',
      
  })
}

// 获取用户基本信息

export function getUserBaseInfo(id) {
  return request({
      url:'/sys/user/' + id,
  })
}
>>>>>>> department
