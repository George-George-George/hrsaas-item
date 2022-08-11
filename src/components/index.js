import PageTool from "./PageTools"
const components = [PageTool]
export default{ 
install(Vue){
       components.forEach(component =>{
           Vue.component(component.name, component)
       })
}
}