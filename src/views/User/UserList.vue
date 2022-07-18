<template>
  <div class="main">
    <Crumb :title="['用户管理', '用户列表']"></Crumb>
    <div class="container">
      <div class="title">
        <el-input placeholder="请输入内容" v-model.trim="dataObj.query">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchFn"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="addDialog = true">添加用户</el-button>
      </div>
      <div class="body">
        <el-table :data="userList.users" border stripe>
          <el-table-column type="index" label="#" />
          <el-table-column prop="username" label="姓名" min-width="90px" />
          <el-table-column prop="mobile" label="电话" min-width="115px" />
          <el-table-column prop="role_name" label="角色" min-width="100px" />
          <el-table-column label="状态" min-width="65px">
            <template v-slot="abc">
              <el-switch
                v-model="abc.row.mg_state"
                @change="setState(abc.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="175px">
            <template v-slot="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="setBtn(scope.row)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delBtn(scope.row)"
              />
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setUser(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total,prev ,pager, next ,sizes"
          :page-sizes="[3, 5, 8, 10]"
          :total="userList.total"
          @size-change="changeSize"
          :page-size="dataObj.pagesize"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
      <div class="dialog">
        <el-dialog title="添加用户" :visible.sync="addDialog" width="400px">
          <el-form
            ref="addUserForm"
            :rules="rules[0]"
            :label-position="addUserDataShow"
            label-width="80px"
            :model="addUserData"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addUserData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="addUserData.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addUserData.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="addUserData.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd">取 消</el-button>
            <el-button type="primary" @click="submitAdd">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="分配角色" :visible.sync="setUpDialog" width="400px">
          <p>
            当前用户：<span>{{ setRolesData.username }}</span>
          </p>
          <p>
            当前的角色：<span>{{ setRolesData.role_name }}</span>
          </p>
          <div class="block">
            <span class="demonstration">分配新角色：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.roleDesc"
              >
              </el-option>
            </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="setUpDialog = !setUpDialog">取 消</el-button>
            <el-button type="primary" @click="setUpDialog = !setUpDialog"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-dialog title="编辑用户" :visible.sync="setUserDialog" width="400px">
          <el-form
            v-if="setUserDialog"
            label-width="80px"
            :model="setUserDataFrom"
            :rules="rules[1]"
          >
            <el-form-item label="用户名称">
              <el-input disabled v-model="setUserDataFrom.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="setUserDataFrom.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="setUserDataFrom.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="setUserDialog = !setUserDialog">取 消</el-button>
            <el-button type="primary" @click="setUserDataFn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { validateEmail, validateMobile } from '@/utils/validat'
import { getUserList, delUserAPI, addUserAPI, setStateAPI, setUserDataAPI } from '@/api/user'
import { getRolesAPI } from '@/api/root'
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      value: [],
      addUserDataShow: 'right',
      addUserData: {
      },
      setUserDataFrom: {
        id: 0,
        email: '',
        mobile: '',
        username: ''
      },
      setRolesData: {},
      rules: [
        {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }

          ],
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          mobile: [
            { validator: validateMobile, trigger: 'blur' }

          ]
        },
        {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输手机号', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }

          ]
        }
      ],
      addDialog: false,
      setUpDialog: false,
      setUserDialog: false,
      userList: [],
      rolesList: [],
      dataObj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  methods: {
    searchFn () {
      console.log(1)
      if (this.dataObj.query !== '') {
        this.getUserList()
      } else {
        this.$message('请输入搜索内容')
      }
    },
    async setState (value) {
      try {
        await setStateAPI({
          id: value.id,
          type: value.mg_state
        })
        // console.log(res)
      } catch (error) {
        console.log(error)
        this.$message({
          type: 'error',
          message: '状态设置失败'
        })
      }
    },
    cancelAdd () {
      this.$confirm('退出后将清除输入框的内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addUserData = {}
        this.addDialog = false
      }).catch(() => {
      })
    },
    async submitAdd () {
      try {
        await this.$refs.addUserForm.validate()
        const res = await addUserAPI(this.addUserData)
        console.log(res)
        this.addUserData = {}
        this.getUserList()
        this.addDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    setBtn (data) {
      console.log(data)
      this.setUserDataFrom.id = data.id
      this.setUserDataFrom.email = data.email
      this.setUserDataFrom.mobile = data.mobile
      this.setUserDataFrom.username = data.username
      this.setUserDialog = true
    },
    delBtn (data) {
      console.log(data)
      this.$confirm(`此操作将永久删除${data.username}用户, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await delUserAPI(data.id)
        } catch (error) {
          console.log(error)
        }
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async getUserList () {
      try {
        const res = await getUserList(this.dataObj)
        console.log(res)
        this.userList = res
      } catch (error) {
        console.log(error)
      }
    },
    async setUser (data) {
      const res = await getRolesAPI()
      this.rolesList = res
      console.log(data)
      this.setRolesData = data
      this.setUpDialog = true
    },
    async setUserDataFn () {
      try {
        const res = await setUserDataAPI(this.setUserDataFrom)
        console.log(res)
        this.getUserList()
        this.setUserDialog = false
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    changePage (page) {
      this.dataObj.pagenum = page
      this.getUserList()
    },
    changeSize (size) {
      this.dataObj.pagesize = size
      this.getUserList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  .el-breadcrumb {
    overflow: hidden;
    max-height: 15px;
  }
}
.container {
  margin: 20px 0;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
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
  .el-table {
    margin-bottom: 15px;
  }
}
</style>
