
import router,{constantRoutes,asyncRoutes} from '@/router'
export default {
    namespaced: true,
    state:{
        routes:[],
        points:[]

    },
    mutations:{
        setRoles(state,routes){
            state.routes = [...constantRoutes,...routes]
        },
        setPoints(state,payload){
            state.points = payload
        }
    },
    actions:{
        filterRoutes(context,roles){
            console.log(roles.menus);
        const routes = asyncRoutes.filter(item=>{
            return roles.menus.includes(item.meta.id)
         })
     
        context.commit('setRoles',routes)
         router.addRoutes(...[routes],{ path: '*', redirect: '/404', hidden: true })
        },
        setPoints(context,points) {
            context.commit('setPoints',points)
        }
    }
}