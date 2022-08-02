
import {login,getUserInfoApi,getUserBaseInfo} from '@/api/user.js'
export default {
  namespaced: true,
  state:{
    token:'',
    userInfo:{}
  },

  mutations:{
    setToken(state,payload){
        state.token = payload
        console.log(payload);
    },
    setUserInfo(state,payload){
      state.userInfo = payload
    }
  },
  actions:{
   async getToken(context,val){
     const res = await login(val)
        context.commit('setToken',res)

    } ,
   async getUserInfo(context){
      const userBaseInfo = await getUserInfoApi()
      const userDetailsInfo = await getUserBaseInfo(userBaseInfo.userId)
      context.commit('setUserInfo',{...userBaseInfo,...userDetailsInfo})
        // setTimeout(()=>{
        //   const res = {name:'zs'}
        // context.commit('setUserInfo',res)
        // },1000)
    }
  }
}