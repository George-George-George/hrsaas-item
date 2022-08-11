<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" @click="adddialogVisible = true"
            >新增人员</el-button
          >
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="90px">
            </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="doin" label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="prev, pager, next,sizes"
            :page-size="pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[3, 4, 5, 10]"
          >
          </el-pagination>
          <el-dialog
            title="编辑角色"
            :visible.sync="adddialogVisible"
            width="50%"
            @close="dialogClose"
          >
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
              :rules="formRules"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="form.des"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="adddialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="resetForm">确 定</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second"
          ><el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form1" label-width="80px" :model="companyInfo">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item> </el-form
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getRolesApi, addRoles } from '@/api/roles'
import { getCompanyInfo } from '@/api/setting'

export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      adddialogVisible: false,
      form: { name: '', des: '' },
      formRules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      companyInfo: {}
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize
      })
      this.tableData = rows
      this.total = total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    async resetForm() {
      await this.$refs.form.validate()
      await addRoles(this.form)
      this.$message.success('添加角色成功')
      this.adddialogVisible = false
      this.getRoles()
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.form.des = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId
      )
      console.log(res)
      this.companyInfo = res
    }
  }
}
</script>

<style scoped lang="less"></style>
