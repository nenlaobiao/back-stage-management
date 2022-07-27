<template>
  <div>
    <Crumb :title="['商品管理', '商品列表']"></Crumb>
    <div class="container">
      <div class="title">
        <el-input placeholder="请输入内容" v-model.trim="getGoodsData.query">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchFn"
          ></el-button>
        </el-input>
        <el-button
          type="primary"
          @click="$router.push('/goodslist/goods/' + 'add')"
          >添加商品</el-button
        >
      </div>
      <el-table border stripe :data="allGoodsList.goods">
        <el-table-column label="#" type="index" />
        <el-table-column label="商品名称" prop="goods_name">
          <template v-slot="data">
            <div class="text">
              {{ data.row.goods_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="105px"
        />
        <el-table-column label="商品重量" prop="goods_weight" width="80px" />
        <el-table-column label="创建时间" width="100px">
          <template v-slot="data">
            {{ data.row.add_time | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="data">
            <el-button
              @click="$router.push('/goodslist/goods/' + data.row.goods_id)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              >编辑</el-button
            >
            <el-button
              @click="fn(data.row)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev ,pager, next ,sizes"
        :page-sizes="[3, 5, 8, 10]"
        :total="allGoodsList.total"
        @size-change="changeSize"
        :page-size="getGoodsData.pagesize"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getGoodsList, delGoodsAPI } from '@/api/goods'
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      setForm: {},
      inputValue: '',
      getGoodsData: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      allGoodsList: []
    }
  },
  methods: {
    async fn (data) {
      console.log(data)
      try {
        await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delGoodsAPI(data.goods_id)
        this.getGoodsList()
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    searchFn () {
      if (this.getGoodsData.query !== '') {
        this.getGoodsList()
      }
    },
    async getGoodsList () {
      const res = await getGoodsList(this.getGoodsData)
      console.log(res)
      this.allGoodsList = res
    },
    changePage (num) {
      this.getGoodsData.pagenum = num
      this.getGoodsList()
    },
    changeSize (num) {
      this.getGoodsData.pagesize = num
      this.getGoodsList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  .title {
    display: flex;
    width: 45%;
    margin-bottom: 20px;
    .el-input {
      min-width: 160px;
      margin-right: 20px;
    }
  }
}
.el-pagination {
  margin-top: 20px;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
