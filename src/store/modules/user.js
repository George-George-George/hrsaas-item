
import {login} from '@/api/user.js'
export default {
  namespaced: true,
  state:{
    token:''
  },
  mutations:{
    setToken(state,payload){
        state.token = payload
        console.log(payload);
    }
  },
  actions:{
   async getToken(context,val){
     const res = await login(val)
        context.commit('setToken',res)

    } 
  }
}