import PageTool from "./PageTools"
import UpLoadExcel from './UpLoadExcel'
const components = [PageTool,UpLoadExcel]
export default{ 
install(Vue){
       components.forEach(component =>{
           Vue.component(component.name, component)
       })
}
}