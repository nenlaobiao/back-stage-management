<template>
  <div>
    <div>
      <div class="container">
        <el-alert
          :title="id === 'add' ? '添加商品' : '修改商品'"
          type="info"
          show-icon
          :closable="false"
          center
        />
        <el-steps :active="active" align-center>
          <el-step title="基本信息" :status="status" />
          <el-step title="商品参数" :status="active >= 2 ? 'success' : ''" />
          <el-step title="商品属性" :status="active >= 3 ? 'success' : ''" />
          <el-step title="商品属性" :status="active >= 4 ? 'success' : ''" />
          <el-step title="商品内容" :status="active >= 5 ? 'success' : ''" />
          <el-step title="完成" />
        </el-steps>
        <div class="body">
          <el-tabs tabPosition="left" @tab-click="tabFn">
            <el-tab-pane label="基本信息">
              <el-form
                ref="form"
                :model="goodsData"
                label-width="80px"
                :rules="rules"
              >
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="goodsData.goods_name" />
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input
                    v-model.number="goodsData.goods_price"
                    min="0"
                    type="number"
                  />
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input
                    v-model.number="goodsData.goods_weight"
                    min="0"
                    type="number"
                  />
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input
                    v-model.number="goodsData.goods_number"
                    type="number"
                  />
                </el-form-item>
                <el-form-item label="商品分类" prop="goods_cat">
                  <el-cascader
                    v-model="goodsData.goods_cat"
                    :options="catList"
                    filterable
                    :props="{
                      label: 'cat_name',
                      value: 'cat_id',
                    }"
                  ></el-cascader>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数">
              <div v-for="obj in attributeList" :key="obj.attr_id">
                <span>{{ obj.attr_name }}</span
                ><br />
                <el-checkbox
                  v-for="(item, index) in (abc = obj.attr_vals.split(' '))"
                  :key="index"
                  v-model="checkboxed"
                  :label="item"
                  border
                ></el-checkbox>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品属性">
              <div v-for="obj in attributeList" :key="obj.attr_id">
                <span>{{ obj.attr_name }}</span
                ><br />
                <el-input v-model="obj.attr_vals"></el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品图片">
              <el-upload
                action="http://liufusong.top:8899/api/private/v1/upload"
                class="upload-demo"
                :on-remove="handleRemove"
                :headers="head"
                :on-progress="photoSuccess"
                :on-success="file"
                :file-list="fileList"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容">
              <div style="border: 1px solid #ccc">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editor"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                />
                <Editor
                  style="height: 300px; overflow-y: hidden"
                  v-model="goodsData.goods_introduce"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="onCreated"
                />
              </div>
              <el-button type="primary" @click="upData">{{
                id === "add" ? "添加商品" : "修改商品"
              }}</el-button></el-tab-pane
            >
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { getCategoriesLst, getRootCatList, addGoodsAPI, getGoodsDataById, setGoodsById, upImgAPI } from '@/api/goods'
export default {
  mounted () {
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },

  created () {
    this.id = this.$route.params.id
    this.getCategoriesLst()
    if (this.id !== 'add') {
      this.getGoodsDataById()
    }
  },
  data () {
    return {
      id: '',
      head: {
        Authorization: this.$store.state.user.userData.token
      },
      editor: null,
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      active: 0,
      activeData: false,
      goodsData: {
      },
      fileList: [],
      checkboxed: [],
      value: [],
      imgList: [],
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在2-30之间', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      catList: [],
      catId: 0,
      status: '',
      attributeList: []
    }
  },
  methods: {
    file (res, file, filelist) {
      console.log(res)
      console.log(file)
      console.log(filelist)
      const obj = {}
      obj.pic = res.data.tmp_path
      console.log(obj)
      this.imgList.push(obj)
    },
    async upImg (data) {
      console.dir(data)
      const res = await upImgAPI(data.file)
      console.log(res)
    },
    async getGoodsDataById () {
      try {
        const res = await getGoodsDataById(this.id)
        res.goods_cat = res.goods_cat.split(',').map(str => Number(str))
        console.log(res)
        this.goodsData = res
      } catch (error) {
        this.$message.error('商品信息获取错误、请刷新页面')
      }
    },
    async upData () {
      try {
        await this.$refs.form.validate()
        this.goodsData.goods_cat = this.goodsData.goods_cat.join()
        if (this.imgList.length !== 0) {
          this.goodsData.pics = this.imgList
        }
        if (this.id === 'add') {
          await addGoodsAPI(this.goodsData)
        } else {
          await setGoodsById(this.id, this.goodsData)
        }
        this.$router.push('/goodslist')
      } catch (error) {
        this.$message.error('请先完成商品的基本信息')
      }
    },
    async photoSuccess (response, file) {
      console.log(file.raw)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    async getRootCatList (sel) {
      try {
        if (this.goodsData.goods_cat.length < 1) {
          this.$message.error('请先完成基本分类中的商品分类')
        } else {
          this.attributeList = []
          const res = await getRootCatList(this.catId, sel)
          console.log(res)
          this.attributeList = res
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getCategoriesLst () {
      try {
        const res = await getCategoriesLst()
        console.log(res)
        this.catList = res
      } catch (error) {
        console.log(error)
      }
    },
    async tabFn (value) {
      this.status = ''
      console.log(value.index)
      if (value.index === '1') {
        this.getRootCatList('many')
      } else if (value.index === '2') {
        this.getRootCatList('only')
      }
      this.active = Number(value.index)
      try {
        await this.$refs.form.validate()
        if (value.index !== 0 && this.catId === '') {
          this.status = 'error'
        }
        this.status = 'success'
      } catch (error) {
        // console.log(error)
        this.status = 'error'
      }
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: { Editor, Toolbar }
}
</script>

<style scoped lang='less'>
.container {
  margin: 20px 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
.el-steps {
  margin: 20px 0;
}
</style>
