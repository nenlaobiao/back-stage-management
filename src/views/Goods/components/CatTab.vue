<template>
  <div>
    <el-button type="primary" size="mini" @click="addBtnFn">添加参数</el-button>
    <el-table border :data="classList" class="table">
      <el-table-column type="expand">
        <template v-slot="scope">
          <el-tag
            :key="ind"
            v-for="(tag, ind) in scope.row.attr_vals
              .split(' ')
              .filter((str) => str !== '')"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible === scope.row.attr_id"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(scope.row)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="attr_name" label="分类名称"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template v-slot="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="primary"
            @click="setBtnFn(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="delBtnFn(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="
        (isSet ? '修改' : '添加') + (type === 'only' ? '静态' : '动态') + '属性'
      "
      :visible.sync="setFormVisible"
    >
      <el-form
        :model="setForm"
        :rules="rules"
        v-if="setFormVisible"
        ref="nameForm"
      >
        <el-form-item
          :label="(type === 'only' ? '静态' : '动态') + '属性'"
          label-width="80px"
          prop="attr_name"
        >
          <el-input v-model="setForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="setFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setNameFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRootCatList, setCatValueAPI, delCatValueAPI, addCatValueAPI } from '@/api/goods'

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    catList: {
      type: Array,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      isSet: false,
      setForm: {
        attr_name: ''
      },
      setFormVisible: false,
      classList: [],
      inputVisible: '',
      inputValue: '',
      id: null,
      rules: {
        attr_name: [
          { required: true, message: '属性名不能为空', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在2-16之间', trigger: 'blur' }
        ]
      },
      data: {}
    }
  },
  methods: {
    addBtnFn () {
      this.setForm = {}
      console.log(this.classList)
      if (this.catList.length === 3) {
        this.isSet = false
        this.setFormVisible = true
      } else {
        this.$message.error('请先选择商品分类再尝试添加')
      }
    },
    async getRootCatList () {
      const res = await getRootCatList(this.id, this.type)
      console.log(res)
      this.classList = res
    },
    async delBtnFn (data) {
      try {
        console.log(data)
        data.id = this.id
        await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delCatValueAPI(data)
        this.getRootCatList()
        data = {}
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
    },
    async setNameFn () {
      try {
        await this.$refs.nameForm.validate()
        this.data.attr_name = this.setForm.attr_name
        this.data.id = this.id
        if (this.isSet) {
          await setCatValueAPI(this.data)
        } else {
          this.data.attr_sel = this.type
          await addCatValueAPI(this.data)
        }
        this.getRootCatList()
        this.setFormVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    setBtnFn (data) {
      this.isSet = true
      console.log(data)
      this.data = data
      this.setForm.attr_name = data.attr_name
      this.setFormVisible = true
    },
    handleClose (tag) {
      console.log(tag)
    },

    showInput (data) {
      this.inputVisible = data.attr_id
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    async handleInputConfirm (data) {
      const inp = data.attr_vals
      try {
        console.log(data)
        const inputValue = ' ' + this.inputValue
        if (inputValue) {
          data.attr_vals += inputValue
          data.id = this.id
          const res = await setCatValueAPI(data)
          console.log(res)
        }
        this.inputVisible = ''
        this.inputValue = ''
      } catch (error) {
        console.log(error)
        this.$message.error('添加失败、请刷新后重试')
        this.$message.error(error.message)
        data.attr_vals = inp
      }
    }
  },
  computed: {},
  watch: {
    catList: {
      handler: async function (newval) {
        // console.log(newval)
        if (newval.length === 3) {
          this.id = this.catList[2]
          this.getRootCatList()
        } else {
          this.classList = []
        }
      },
      immediate: true // 立即监听
    }

  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.table {
  margin: 18px 0;
}
</style>
