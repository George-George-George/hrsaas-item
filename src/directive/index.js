import store from '@/store'
export  const imgError = {
     inserted:function(el,{value}){
       if(!el.src){
         el.src = value
       }else{
         el.onerror = function(){
          el.src = value
     }
       }
     
  },
  update(el,{value}) {
    if(!el.src){
         el.src = value
       }
  },
}
export const isHas = {
  inserted(el,value) {
    const res = store.state.permission.points.includes(value)
    if(!res){
      el.remove()
    }
}
}