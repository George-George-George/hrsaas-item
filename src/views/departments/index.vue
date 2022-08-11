<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <el-card class="box-card">
        <tree_tools
          :isRoot="true"
          @add="showAddDepts"
          :currentNode="currentNode"
          :treeNode="{
            name: '传值教育',
            manager: '负责人'
          }"
        />
        <el-tree :data="departs" :props="defaultProps" default-expand-all="">
          <template v-slot="{ data }">
            <tree_tools
              @add="showAddDepts"
              @remove="loadDepart()"
              :treeNode="data"
              @edit="showEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <add_tools
      ref="addDepts"
      @add-success="loadDepart"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    />
  </div>
</template>

<script>
import { getDepart } from '@/api/department'
import tree_tools from './tree-tools'
import { tranListToTreeData } from '@/utils'
import add_tools from './add-tools'
export default {
  name: 'department',
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      company: [
        {
          name: '传值教育',
          manager: '负责人'
        }
      ],
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },
  components: {
    tree_tools,
    add_tools
  },
  created() {
    this.loadDepart()
  },
  methods: {
    async loadDepart() {
      this.loading = true
      const res = await getDepart()
      const list = tranListToTreeData(res.depts, '')
      this.departs = list
      this.loading = false
    },
    showAddDepts(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDepts.getDepartId(val.id)
    },

    
  }
}
</script>

<style scoped lang="less"></style>
