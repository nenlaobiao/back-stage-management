<template>
  <div class="login-container">
    <div class="form-box">
      <img src="../../assets/logo.png" alt="" />
      <el-form :model="loginForm" :rules="rules" ref="loginFromRef">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    async login () {
      try {
        await this.$refs.loginFromRef.validate()
        console.log('校验成功')
        try {
          const res = await loginAPI(this.loginForm)
          // console.log(res)
          this.$store.commit('user/setUserData', res)
          this.$router.push('/welcome')
        } catch (error) {
          this.$message.error('登录失败、请再次尝试')
          console.log(error)
        }
      } catch (error) {
        this.$message.error('登录表单校验失败')
        console.log(error)
      }
    },
    reset () {
      this.$refs.loginFromRef.resetFields()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/bg.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .form-box {
    width: 450px;
    height: 315px;
    background-color: #fff;
    padding: 15px 15px 30px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 0 10px #666;
    img {
      width: 200px;
      margin-bottom: 20px;
    }
    .btn-item {
      text-align: right;
    }
  }
}
</style>
