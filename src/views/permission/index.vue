<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :isShowLeft="false">
        <template slot="right">
          <el-button type="primary" @click="addAssignPer(0, 1)"
            >添加权限</el-button
          >
        </template>
      </page-tools>

      <el-table
        :data="permission"
        stripe
        style="width: 100%"
        row-key="id"
        slot="right"
        ref="table"
      >
        <el-table-column label="名称" width="180">
          <template slot-scope="{ row }">
            <i
              v-if="row.children"
              style="margin-right: 5px"
              class="el-icon-folder-opened"
              @click="expend(row)"
            ></i>
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>

        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
            <el-button type="text" @click="addAssignPer(row.id, 2)"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="设置权限点" :visible.sync="showDialog">
      <!-- 表单 -->
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="onSave"
            >确定</el-button
          >
          <el-button size="small" @click="showDialog = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      permission: [],
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },

  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      this.permission = tranListToTreeData(res, '0')
    },
    expend(row) {
      row.isExpent = !row.isExpent
      this.$refs.table.toggleRowExpansion(row, row.isExpent)
    },
    onSave() {
      this.$refs.form.validate(async (vaild) => {
        if (!vaild) return
        console.log('qingqiu', this.formData)
        await addPermission(this.formData)
        this.$message.success('成功')
        this.showDialog = false
      })
    },
    addAssignPer(pid, type) {
      this.showDialog = true
      this.formData.pid = pid
      this.formData.type = type
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
