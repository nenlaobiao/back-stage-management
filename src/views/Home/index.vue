<template>
  <el-container class="container">
    <el-header>
      <div class="left">
        <img
          class="login"
          src="../../assets/logo.png"
          alt=""
          @click="$router.push('/welcome')"
        />
        <h1>后台管理系统</h1>
      </div>
      <el-dropdown>
        <el-button type="primary">
          {{ userData.username
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled
            >用户名:{{ userData.username }}</el-dropdown-item
          >
          <el-dropdown-item disabled>ID:{{ userData.id }}</el-dropdown-item>
          <el-dropdown-item disabled
            >电话:{{ userData.mobile }}</el-dropdown-item
          >
          <el-dropdown-item disabled
            >邮箱:{{ userData.email }}</el-dropdown-item
          >
          <el-dropdown-item divided
            ><span @click="logoutFn()">退出登录</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <div @click="isCollapse = !isCollapse" class="btn">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
        </el-radio-group>
        <el-menu
          router
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          background-color="#64aedf"
          text-color="#222"
          unique-opened
          active-text-color="#222"
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-user" style="color: #222"></i>
              <span slot="title">用户管理 </span>
            </template>
            <el-menu-item index="/userlist"
              >用户列表<i class="el-icon-arrow-right"></i
            ></el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-receiving" style="color: #222"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="/role"
              >角色列表<i class="el-icon-arrow-right"></i
            ></el-menu-item>
            <el-menu-item index="/rootlist"
              >权限列表<i class="el-icon-arrow-right"></i
            ></el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template #title>
              <i class="el-icon-shopping-bag-1" style="color: #222"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="/goodslist"
              >商品列表<i class="el-icon-arrow-right"></i
            ></el-menu-item>
            <el-menu-item index="/goodsclass"
              >商品分类<i class="el-icon-arrow-right"></i
            ></el-menu-item>
            <el-menu-item index="/parameters"
              >分类参数<i class="el-icon-arrow-right"></i
            ></el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template #title>
              <i class="el-icon-document-copy" style="color: #222"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="/order"
              >订单列表<i class="el-icon-arrow-right"></i
            ></el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template #title>
              <i class="el-icon-data-line" style="color: #222"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="/report"
              >数据报表<i class="el-icon-arrow-right"></i
            ></el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <div @click="isCollapse = !isCollapse" class="btn">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
        </el-radio-group>
        <el-menu
          router
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          background-color="#64aedf"
          text-color="#222"
          unique-opened
          active-text-color="#222"
        >
          <el-submenu :index="obj.id+''" v-for="obj in routerList" :key="obj.id">
            <template #title>
              <i class="el-icon-user" style="color: #222"></i>
              <span slot="title">{{ obj.authName }}</span>
            </template>
            <el-menu-item
              v-for="item in obj.children"
              :key="item.id"
              :index="'/' + obj.path+'/' + item.path"
              >{{ item.authName }}<i class="el-icon-arrow-right"></i
            ></el-menu-item>
          </el-submenu>
        </el-menu> -->
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    // if (!this.userData && !this.userData.token) {
    //   this.$router.push('/login')
    // }
  },
  data () {
    return {
      isCollapse: true,
      routerList: [
        {
          id: 125,
          authName: '用户管理',
          path: 'users',
          children: [
            {
              id: 110,
              authName: '用户列表',
              path: 'users',
              children: [],
              order: null
            }
          ],
          order: 1
        },
        {
          id: 103,
          authName: '权限管理',
          path: 'rights',
          children: [
            {
              id: 111,
              authName: '角色列表',
              path: 'roles',
              children: [],
              order: null
            },
            {
              id: 112,
              authName: '权限列表',
              path: 'rights',
              children: [],
              order: null
            }
          ],
          order: 2
        },
        {
          id: 101,
          authName: '商品管理',
          path: 'goods',
          children: [
            {
              id: 104,
              authName: '商品列表',
              path: 'goods',
              children: [],
              order: 1
            },
            {
              id: 115,
              authName: '分类参数',
              path: 'params',
              children: [],
              order: 2
            },
            {
              id: 121,
              authName: '商品分类',
              path: 'categories',
              children: [],
              order: 3
            }
          ],
          order: 3
        },
        {
          id: 102,
          authName: '订单管理',
          path: 'orders',
          children: [
            {
              id: 107,
              authName: '订单列表',
              path: 'orders',
              children: [],
              order: null
            }
          ],
          order: 4
        },
        {
          id: 145,
          authName: '数据统计',
          path: 'reports',
          children: [
            {
              id: 146,
              authName: '数据报表',
              path: 'reports',
              children: [],
              order: null
            }
          ],
          order: 5
        }
      ]
    }
  },
  methods: {
    logoutFn () {
      console.log(1)
      this.$store.commit('user/setUserData', '')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.container {
  height: 100vh;
  overflow: auto;
  background-color: #eaedf1;

  .el-header {
    height: 60px !important;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
      display: flex;
      img {
        height: 50px;
        width: auto;
        margin: 5px 30px 0 0;
      }
      h1 {
        color: #222;
        font-size: 26px;
        font-weight: 500;
        line-height: 60px;
        min-width: 160px;
      }
    }
    .el-dropdown {
      font-size: 16px;
      color: #333;
      line-height: 60px;
    }
  }
  .el-aside {
    background-color: #64aedf;
  }
  .el-menu {
    border-right: none;
  }
}
.el-radio-group {
  margin-bottom: 0 !important;
  width: 100%;

  .btn {
    background-color: transparent;
    height: 56px;
    border: 0;
    display: block;
    text-align: center;
    // margin: 0 auto;
    i {
      font-size: 20px;
      line-height: 56px;
      color: #222;
    }
  }
}
:deep(.el-submenu__title) {
  font-size: 16px !important;
}
.el-menu-item {
  font-size: 16px !important;
}
:deep(.el-menu i) {
  color: #222 !important;
  font-size: 20px !important;
}
:deep(.el-menu .el-icon-arrow-right) {
  font-size: 16px !important;
  color: #222 !important;
}
:deep(.el-icon-arrow-right) {
  color: #222 !important;
  // transform: translateY(-2px);
}
:deep(.el-dropdown-menu__item.is-disabled) {
  color: #222 !important;
}
:deep(.el-dropdown-menu__item) {
  color: #222 !important;
}
:deep(.el-dropdown span) {
  font-size: 16px !important;
}
</style>
