<template>
  <el-dialog
    @close="onClose"
    :title="departName"
    :visible="visible"
    width="50%"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          placeholder="请输入部门编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择部门负责人"
        >
          <el-option
            v-for="item in employeesList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="请输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDepart,
  postNewDepart,
  getDetailDepts,
  editDept
} from '@/api/department'
import { getEmployeesList } from '@/api/employees'

export default {
  data() {
    const deptsNameRules = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDepart()
        const filtersDepts = depts.filter((item) => {
          return item.pid === this.formData.pid && item.id !== this.formData.id
        })
        const isRepeat = filtersDepts.some((item) => {
          return item.name === value
        })
        console.log(filtersDepts)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value
        )
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }
    const deptsCodeRules = async (rule, value, callback) => {
      const { depts } = await getDepart()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          {
            validator: deptsNameRules,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入编号', trigger: 'blur' },
          { validator: deptsCodeRules, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入负责人名称', trigger: 'change' }
        ],
        introduce: [{ required: true, message: '请输入介绍', trigger: 'blur' }]
      },
      employeesList: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getEmployeesList()
  },

  methods: {
    async getEmployeesList() {
      const res = await getEmployeesList()
      this.employeesList = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          await editDept(this.formData)
          this.$message.success('成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          this.formData.pid = this.currentNode.id
          await postNewDepart(this.formData)
          this.$message.success('成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (error) {
        this.$message.fail('失败')
      }
    },
    async getDepartId(id) {
      this.formData = await getDetailDepts(id)
    }
  },
  computed: {
    departName() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  }
}
</script>

<style scoped></style>
