<template>
  <div>
    <Crumb :title="['权限管理', '角色列表']"></Crumb>
    <div class="container">
      <el-button type="primary" class="addBtn" @click="addRole"
        >添加角色</el-button
      >
      <el-table :data="roleList" border>
        <el-table-column type="expand" label="#">
          <template slot-scope="props">
            <div v-for="(item, index) in props.row.children" :key="item.id">
              <div class="box">
                <div class="maxleft" style="flex: 1">
                  <div>
                    <el-tag>{{ item.authName }}</el-tag
                    ><i class="el-icon-caret-right"></i>
                  </div>
                </div>
                <div class="right" style="flex: 3">
                  <div
                    class="box"
                    v-for="(obj, index) in item.children"
                    :key="index"
                  >
                    <div style="flex: 1">
                      <div class="row1 box">
                        <div class="left2">
                          <el-tag type="success" class="gad">{{
                            obj.authName
                          }}</el-tag
                          ><i class="el-icon-caret-right"></i>
                        </div>
                        <div class="right2">
                          <el-tag
                            closable
                            :disable-transitions="true"
                            v-for="(obj1, index) in obj.children"
                            :key="index"
                            @close="delTag(obj1, props.row)"
                            >{{ obj1.authName }}</el-tag
                          >
                        </div>
                      </div>
                      <el-divider v-if="item.children.length !== index + 1" />
                    </div>
                  </div>
                </div>
              </div>
              <el-divider v-if="props.row.children.length !== index + 1" />
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" />
        <el-table-column prop="roleName" label="角色名称" min-width="100px" />
        <el-table-column prop="roleDesc" label="角色描述" min-width="100px" />
        <el-table-column label="操作" width="290px">
          <template slot-scope="props">
            <el-button
              @click="setRoleBtn(props.row)"
              icon="el-icon-edit"
              type="primary"
              size="mini"
              >编辑</el-button
            >
            <el-button
              @click="delfn(props)"
              icon="el-icon-delete"
              type="danger"
              size="mini"
              >删除</el-button
            >
            <el-button
              @click="rootfn(props.row)"
              icon="el-icon-setting"
              type="warning"
              size="mini"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="dia">
        <el-dialog
          :title="state === 'add' ? '添加角色' : '修改角色'"
          :visible.sync="addRoleDia"
          @close="cancelBtn"
          width="400px"
        >
          <el-form
            v-if="addRoleDia"
            :model="addRoleData"
            ref="addRoleForm"
            :rules="rules"
          >
            <el-form-item label="角色名称" label-width="80px" prop="roleName">
              <el-input
                v-model="addRoleData.roleName"
                placeholder="请输入角色名称"
              />
            </el-form-item>
            <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
              <el-input
                v-model="addRoleData.roleDesc"
                placeholder="请输入角色描述"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelBtn">取 消</el-button>
            <el-button type="primary" @click="defineBtn">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="rootDiaShow" width="350px">
          <div class="treebox">
            <el-tree
              v-if="rootDiaShow"
              :default-checked-keys="jb"
              :data="roleTree"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="treeKey"
            >
            </el-tree>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="rootDiaShow = false">取 消</el-button>
            <el-button type="primary" @click="treeDataFn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getRolesAPI, addRoleAPI, setRoleAPI, delRoleAPI, delRoleRootAPI, getRootListAPI, submitRoleAPI } from '@/api/root'
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      jb: [],
      roleId: 0,
      treeKey: {
        children: 'children',
        label: 'authName'
      },
      roleTree: {},
      state: '',
      addRoleData: {
        id: 0,
        roleName: '',
        roleDesc: ''
      },
      rootDiaShow: false,
      addRoleDia: false,
      roleList: [],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    setCheckedKeys () {
      const arr = []
      this.roleList.forEach(obj => {
        obj.children.forEach(item => {
          item.children.forEach(data => {
            data.children.forEach(abc => {
              arr.push(abc.id)
            })
          })
        })
      })
      this.$nextTick(function () {
        // DOM 更新了
        this.$refs.tree.setCheckedKeys(arr)
      })
    },
    async treeDataFn () {
      try {
        const data1 = this.$refs.tree.getHalfCheckedKeys()
        const data2 = this.$refs.tree.getCheckedKeys()
        console.log(data2)
        const data = data1.join(',') + ',' + data2.join(',')
        await submitRoleAPI(this.roleId, data)
        this.getRoles()
        this.rootDiaShow = false
      } catch (error) {
        console.log(error)
      }
    },
    async delTag (obj, data) {
      try {
        await this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log(obj)
        const res = await delRoleRootAPI({
          id: data.id,
          roleId: obj.id
        })
        // console.log(res)
        data.children = res
      } catch (error) {
        console.log(error)
      }
    },
    setRoleBtn (data) {
      this.state = 'set'
      // console.log(data)
      this.addRoleData.id = data.id
      this.addRoleData.roleName = data.roleName
      this.addRoleData.roleDesc = data.roleDesc
      this.addRoleDia = true
    },
    async rootfn (row) {
      this.jb = []
      try {
        const res = await getRootListAPI()
        // console.log(res)
        this.roleTree = res
        this.roleId = row.id
        this.rootDiaShow = true
        console.log(row)
        row.children.forEach(obj => {
          obj.children.forEach(item => {
            item.children.forEach(data => {
              this.jb.push(data.id)
            })
          })
        })

        // this.setCheckedKeys()
      } catch (error) {
        console.log(error)
      }
    },
    cancelBtn () {
      this.addRoleData = {
        id: 0,
        roleName: '',
        roleDesc: ''
      }
      this.addRoleDia = false
    },
    async defineBtn () {
      try {
        await this.$refs.addRoleForm.validate()
        if (this.state === 'add') {
          const res = await addRoleAPI(this.addRoleData)
          console.log(res)
          this.roleList.push(res)
        } else if (this.state === 'set') {
          const res = await setRoleAPI(this.addRoleData)
          console.log(res)
          this.addRoleData = {
            id: 0,
            roleName: '',
            roleDesc: ''
          }
        }
        this.getRoles()
        this.addRoleDia = false
      } catch (error) {
        console.log(error)
      }
    },
    addRole () {
      this.state = 'add'
      this.addRoleDia = true
    },
    fn (data) {
      console.log(data)
    },
    async delfn (data) {
      try {
        await this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.delOpen = !this.delOpen
        console.log(data)
        await delRoleAPI(data.row.id)
        // delete data.row
        this.getRoles()
      } catch (error) {
        console.log(error)
      }
    },
    async getRoles () {
      try {
        const res = await getRolesAPI()
        // console.log(res)
        this.roleList = res
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {

  },
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
.addBtn {
  margin-bottom: 20px;
}
:deep(.box) {
  display: flex !important;
}
/deep/ .el-table__expanded-cell {
  padding: 6px 0 !important;
}
:deep(.el-divider--horizontal) {
  margin: 6px 0 !important;
}
.maxleft {
  min-width: 180px;
  max-width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.row1 {
  align-items: center;
  justify-content: flex-start;
  .left2 {
    display: flex;
    align-items: center;
    margin: 0 20px 0 10px;
  }
  .right2 > span {
    display: inline-block;
    // flex-wrap: wrap;
    min-height: 34px;
    margin: 6px 6px !important;
  }
}
.gad {
  display: inline-block;
  margin: 6px 0 !important;
}
</style>
