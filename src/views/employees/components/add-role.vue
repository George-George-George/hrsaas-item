<template>
  <el-dialog @open="onOpen" :visible="visible" @close="roleInfo">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="assignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/roles'
import { getUserBaseInfo } from '@/api/user'
import { assignPerm } from '@/api/employees'
export default {
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    rolesId: {
      type: String,
      required: true
    }
  },
  created() {},

  methods: {
    roleInfo() {
      this.$emit('update:visible', false)
    },
    async onOpen() {
      const { rows } = await getRolesApi()
      this.roles = rows
      this.getUserBaseInfo()
    },
    async getUserBaseInfo() {
      const { roleIds } = await getUserBaseInfo(this.rolesId)
      this.checkList = roleIds
    },
    async assignRoles() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignPerm({
        id: this.rolesId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.close()
    }
  }
}
</script>

<style scoped></style>
