<template>
  <div>
    <Crumb :title="['商品管理', '商品分类']"></Crumb>
    <div class="container">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
         :closable="false"
        show-icon
      />

      <div class="block">
        <span class="demonstration">选择商品分类：</span>
        <el-cascader
          v-model="catList"
          clearable
          :options="categoriesLst"
          @change="handleChange"
          :props="{
            label: 'cat_name',
            value: 'cat_id',
          }"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many"
          ><CatTab v-if="type === 'many'" type="many" :catList="catList"
        /></el-tab-pane>
        <el-tab-pane label="静态参数" name="only"
          ><CatTab v-if="type === 'only'" type="only" :catList="catList"
        /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CatTab from './components/CatTab.vue'
import { getCategoriesLst } from '@/api/goods'
export default {
  props: {
  },
  created () {
    this.getCategoriesLst()
  },
  data () {
    return {
      type: 'many',
      activeName: 'many',
      catList: [],
      categoriesLst: []
    }
  },
  methods: {
    handleClick (tab) {
      //   // console.log(tab.name)
      this.type = tab.name
    },
    async getCategoriesLst () {
      const res = await getCategoriesLst()
      console.log(res)
      this.categoriesLst = res
    },
    handleChange (value) {
      console.log(value)
      if (value.length < 3) {
        this.$message.error('请选择三级分类')
        this.catList = []
      }
    }
  },
  computed: {

  },
  watch: {},
  filters: {},
  components: { CatTab }
}
</script>

<style scoped lang='less'>
.container {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
.block {
  margin: 20px 0;
}
</style>
