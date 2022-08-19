import PageTool from "./PageTools"
import UpLoadExcel from './UpLoadExcel'
import UpLoadImg from './UpLoadImg'
const components = [PageTool,UpLoadExcel,UpLoadImg]
export default{ 
install(Vue){
       components.forEach(component =>{
           Vue.component(component.name, component)
       })
}
}