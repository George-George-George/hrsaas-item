<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/filters'
import employees from '@/constant/employees'
const { importmapKeyPath } = employees
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('xlsx')) {
        this.$message.error('excel')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importmapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            console.log(date)
            obj[importmapKeyPath[key]] = formatTime(date)
          } else {
            obj[importmapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      const res = await importEmployee(newArr)
      console.log(res)
      this.$message.success('成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less"></style>
