<template>
  <div>
    <Crumb :title="['商品管理', '分类参数']"></Crumb>
    <div class="container">
      <el-button type="primary" @click="openAddGoodsClass">添加分类</el-button>
      <ZkTable
        class="tb-cate ZkTable"
        index-text="#"
        show-index
        stripe
        border
        :data="classList"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
      >
        <template slot="isok" slot-scope="scope">
          <i
            :class="scope.row.cat_deleted ? 'el-icon-error' : 'el-icon-success'"
          ></i>
        </template>
        <template slot="level" scope="scope">
          <LevelTag :level="scope.row.cat_level"></LevelTag>
        </template>
        <template slot="opt" slot-scope="scope">
          <div class="box">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="setClassBtn(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delClassBtn(scope.row.cat_id)"
              >删除</el-button
            >
          </div>
        </template>
      </ZkTable>
      <!-- <el-table
        border
        class="table"
        :data="classList"
        lazy
        row-key="cat_id"
        tree-type
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          prop="cat_name"
          label="分类名称"
          min-width="130px"
        ></el-table-column>
        <el-table-column label="是否有效">
          <template v-slot="data">
            <i
              :class="
                data.row.cat_deleted ? 'el-icon-error' : 'el-icon-success'
              "
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template v-slot="data">
            <LevelTag :level="data.row.cat_level"></LevelTag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template>
            <el-button type="primary" size="mini"> 编辑 </el-button>
            <el-button type="danger" size="mini"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageData.pagenum"
        :page-sizes="[2, 3, 5, 8, 10]"
        :page-size="5"
        layout="total, prev, pager, next ,jumper"
        :total="total"
      >
      </el-pagination>
      <el-dialog
        :title="(isSet ? '修改' : '添加') + '商品分类'"
        :visible.sync="classFormVisible"
        @closed="reset"
      >
        <el-form
          :model="classForm"
          :rules="rules"
          v-if="classFormVisible"
          ref="formRes"
        >
          <el-form-item label="分类名称" label-width="80px" prop="cat_name">
            <el-input v-model="classForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类" label-width="80px" v-if="!isSet">
            <el-cascader
              v-model="classForm.selectClass"
              :options="classMenus"
              :props="{
                checkStrictly: true,
                label: 'cat_name',
                value: 'cat_id',
              }"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="classFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsClass">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import LevelTag from './components/LevelTag.vue'
import { getGoodsClassList, addGoodsClassAPI, setGoodsClassAPI, delGoodsClassAPI } from '@/api/goods'
export default {
  created () {
    this.getGoodsClassList()
  },
  data () {
    return {
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          prop: 'effective',
          type: 'template',
          template: 'isok'
        },
        {
          label: '分类等级',
          prop: 'level',
          type: 'template',
          template: 'level'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      props: {
        expandType: false,
        selectionType: false
      },
      classForm: {},
      classFormVisible: false,
      pageData: {
        pagenum: 0,
        pagesize: 5
      },
      total: 0,
      classList: [],
      classMenus: [],
      addClassData: {},
      rules: {
        cat_name: [{ required: true, message: '分类名不能为空', trigger: 'blur' }]
      },
      isSet: false
    }
  },
  methods: {
    async delClassBtn (id) {
      try {
        await this.$confirm('此操作将永久删除此分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'

        })
        await delGoodsClassAPI(id)
        this.getGoodsClassList()
      } catch (error) {
        console.log(error.message)
      }
    },
    reset () {
      console.log(1)
      this.classForm = {}
    },
    setClassBtn (data) {
      this.isSet = true
      this.classFormVisible = true
      this.classForm = Object.assign(data)
    },
    getCateList () {
      this.$http.get('/category/page', { params: this.query }).then((resp) => {
        this.total = resp.total
        this.cateList = resp.items
        console.log(resp)
      })
    },
    handleSizeChange (val) {
      this.pageData.pagesize = val
      this.getGoodsClassList()
    },
    handleCurrentChange (val) {
      this.pageData.pagenum = val
      this.getGoodsClassList()
    },
    async openAddGoodsClass () {
      this.isSet = false
      this.classFormVisible = true
      const res = await getGoodsClassList({
        pagenum: '',
        pagesize: ''
      }, 2)
      console.log(res)
      this.classMenus = res
    },
    async addGoodsClass () {
      try {
        await this.$refs.formRes.validate()
        if (this.isSet) {
          const res = await setGoodsClassAPI(this.classForm)
          console.log(res)
        } else {
          if (this.classForm.selectClass.length > 0) {
            this.classForm.cat_pid = this.classForm.selectClass[this.classForm.selectClass.length - 1]
          } else {
            this.classForm.cat_pid = 0
          }
          this.classForm.cat_level = this.classForm.selectClass.length
          await addGoodsClassAPI(this.classForm)
        }
        this.classFormVisible = false
        this.getGoodsClassList()
      } catch (error) {
        console.log(error)
      }
    },
    async getGoodsClassList () {
      try {
        const res = await getGoodsClassList(this.pageData)
        console.log(res)
        this.classList = res.result
        this.total = res.total
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { LevelTag }
}
</script>

<style scoped lang='less'>
.container {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
}
.ZkTable {
  margin: 20px 0;
  min-width: 450px;
}
.el-icon-success {
  color: rgb(103, 194, 58);
}
.el-icon-error {
  color: red;
}
.box {
  min-width: 160px;
  display: block;
  min-height: 30px;
  max-height: 30px;
}
</style>
