<template>
  <div>
    <Crumb :title="['权限管理', '权限列表']"></Crumb>
    <div class="container">
      <el-table :data="rootList" border stripe>
        <el-table-column type="index" label="#" />
        <el-table-column prop="authName" label="权限名称" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <RootList :level="scope.row.level"></RootList>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import RootList from './components/RootTag.vue'
import { getRootListAPI } from '@/api/root'
export default {
  created () {
    this.getRootList()
  },
  data () {
    return {
      rootList: []
    }
  },
  methods: {
    async getRootList () {
      try {
        const res = await getRootListAPI('list')
        console.log(res)
        this.rootList = res
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { RootList }
}
</script>

<style scoped lang='less'>
.container {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
