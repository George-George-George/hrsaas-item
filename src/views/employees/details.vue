<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="account">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="user">
            <userInfo></userInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="detail">
            <JobInfo></JobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/employees'
import userInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
import JobInfo from './components/JobInfo.vue'
export default {
  data() {
    return {
      formData: {},
      activeName: Cookies.get('active') || 'account'
    }
  },

  created() {
    this.getUserDetail()
  },

  methods: {
    async getUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      this.formData = res
    },
    handleClick(val) {
      // this.activeName = val
      Cookies.set('active', this.activeName)
    }
  },
  components: {
    userInfo,
    JobInfo
  }
}
</script>

<style scoped></style>
