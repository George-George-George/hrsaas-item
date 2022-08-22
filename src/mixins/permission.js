
import employeesList from '@/constant/permission'
export default {
    data(){
        return {
 points: employeesList
        }
    },
    methods: {
        isHas(point) {
      return this.$store.state.permission.points.includes(point)
    }
    },
}