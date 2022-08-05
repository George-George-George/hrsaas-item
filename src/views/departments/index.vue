<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <tree_tools
          :isRoot="true"
          @add="dialogVisible = true"
          :treeNode="{
            name: '传值教育',
            manager: '负责人'
          }"
        />

        <el-tree :data="departs" :props="defaultProps" default-expand-all="">
          <template v-slot="{ data }">
            <tree_tools @remove="loadDepart()" :treeNode="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <add_tools @add="dialogVisible = true" :visible="dialogVisible" />
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
      dialogVisible: false
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
      const res = await getDepart()
      console.log(res)
      const list = tranListToTreeData(res.depts, '')
      this.departs = list
    }
  }
}
</script>

<style scoped lang="less"></style>
