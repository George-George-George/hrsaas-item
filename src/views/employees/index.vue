<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click.native="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click.native="showAdd = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeesList">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/common/head.jpg')"
                style="width: 100px; height: 100px"
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>

          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable
            :formatter="formOfEmploymentFn"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/details/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="delEmployeesFn(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <el-dialog title="123" :visible.sync="dialogVisible" width="30%">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <addem @add-success="getEmployeesInfoList" :visible.sync="showAdd" />
  </div>
</template>

<script>
import { getEmployeesInfoList, delEmployees } from '@/api/employees'
import employees from '@/constant/employees'
import addem from './components/addem.vue'
const { exportExcelMapPath, hireType } = employees
import QRCode from 'qrcode'
export default {
  data() {
    return {
      employeesList: [],
      pages: {
        page: 1,
        size: 5
      },
      total: 0,
      showAdd: false,
      dialogVisible: false
    }
  },

  created() {
    this.getEmployeesInfoList()
  },

  methods: {
    async getEmployeesInfoList() {
      const { rows, total } = await getEmployeesInfoList(this.pages)
      this.employeesList = rows
      this.total = total
    },
    changePage(val) {
      this.pages.page = val
      this.getEmployeesInfoList()
    },
    formOfEmploymentFn(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => {
        return item.id === cellValue
      })
      return findItem ? findItem.value : '未知'
    },
    async delEmployeesFn(id) {
      await this.$confirm('删除吗')
      await delEmployees(id)
      this.$message.success('成功')
      this.getEmployeesInfoList()
    },
    async exportExcel() {
      const { rows } = await getEmployeesInfoList({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      await import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header, //表头 必填
          data, //具体数据 必填
          filename: 'excel-list', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx' //非必填
        })
      })
    },
    showErCodeDialog(val) {
      if (!val) {
        return this.$message.error('请上传图片')
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, val)
      })
    }
  },
  components: {
    addem
  }
}
</script>

<style scoped lang="less"></style>
