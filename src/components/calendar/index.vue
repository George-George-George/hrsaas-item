<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="upDateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select @change="upDateCalendar" v-model="currentMonth">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="value">
      <template v-slot:dateCell="{ date }">
        {{ date.getDate() }}
        <span v-if="isWeek(date)">休</span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      years: [],
      currentYear: '',
      currentMonth: '',
      value: ''
    }
  },

  created() {
    this.getCurrentTime()
  },

  methods: {
    getCurrentTime() {
      const data = new Date()
      this.currentYear = data.getFullYear()
      this.currentMonth = data.getMonth() + 1
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i)
      this.value = data
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    upDateCalendar() {
      this.value = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .current {
  border: none;
}
::v-deep .next {
  border: none;
}
</style>
