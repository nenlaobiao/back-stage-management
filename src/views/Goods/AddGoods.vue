<template>
  <div>
    <div>
      <Crumb :title="['商品管理', '添加商品']"></Crumb>
      <div class="container">
        <el-alert
          title="添加商品"
          type="info"
          show-icon
          :closable="false"
          center
        />
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="基本信息" />
          <el-step title="商品参数" />
          <el-step title="商品属性" />
          <el-step title="商品属性" />
          <el-step title="商品内容" />
          <el-step title="完成" />
        </el-steps>
        <div class="body">
          <div class="left">
            <el-tabs tabPosition="left" @tab-click="tabFn">
              <el-tab-pane label="基本信息">
                <el-form
                  ref="form"
                  :model="goodsData"
                  label-width="80px"
                  :rules="rules"
                >
                  <el-form-item label="商品名称" prop='goods_name'>
                    <el-input v-model="goodsData.goods_name"></el-input>
                  </el-form-item>
                  <el-form-item label="商品价格" prop='goods_price'>
                    <el-input v-model.number="goodsData.goods_price"></el-input>
                  </el-form-item>
                  <el-form-item label="商品重量" prop='goods_weight'>
                    <el-input
                      v-model.number="goodsData.goods_weight"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="商品数量" prop='goods_number'>
                    <el-input
                      v-model.number="goodsData.goods_number"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类" prop='goods_cat'>
                    <el-cascader
                      v-model="goodsData.goods_cat"
                      :options="options"
                      @change="handleChange"
                    ></el-cascader>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="商品参数">商品参数</el-tab-pane>
              <el-tab-pane label="商品属性">商品属性</el-tab-pane>
              <el-tab-pane label="商品图片">商品图片</el-tab-pane>
              <el-tab-pane label="商品内容">商品内容</el-tab-pane>
              <el-tab-pane label="完成">完成</el-tab-pane>
            </el-tabs>
          </div>
          <div class="right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      active: 0,
      goodsData: {
      },
      value: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在2-30之间', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
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
      }
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    tabFn (value) {
      console.log(value)
      this.active = Number(value.index)
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
}
.el-steps {
  margin: 20px 0;
}
</style>
