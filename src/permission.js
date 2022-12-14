import router from '@/router/index'
import store from '@/store'
const whitelist = ['/login','/404']
router.beforeEach((to,from,next)=>{
 const token = store.state.user.token
 if(token){
     if(!store.state.user.userInfo.userId){
     store.dispatch('user/getUserInfo')
     }
     if(to.path ==='/login'){
         next('/')
     }else{
         next()
     }
 }else{
     const include = whitelist.includes(to.path)
     if(include){
         next()
     }else{
         next('/login')
     }
 }
})