import router,{asyncRoutes} from '@/router/index'
import store from '@/store'
const whitelist = ['/login','/404']
router.beforeEach( async (to,from,next)=>{
 const token = store.state.user.token
 if(token){
     if(!store.state.user.userInfo.userId){
     const {roles} = await store.dispatch('user/getUserInfo')
     await store.dispatch('permission/filterRoutes',roles)
     await store.dispatch('permission/setPoints',roles.points)
     next(to.path)
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