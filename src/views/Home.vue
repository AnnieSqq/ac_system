<template>
  <a-layout style="min-width: 1200px">
    <!-- 页头 -->
    <a-layout-header class="header">
      <a-row>
        <a-col :span="12">
          <span style="font-weight: bold; font-size: 28px">
            学位学历认证管理系统
          </span>
        </a-col>
        <a-col :span="6">
          <span>{{ nowTime }}</span>
        </a-col>
        <a-col :span="6" class="logout">
          <div @click="logout"><a-icon type="poweroff"></a-icon> <span>退出登录</span></div>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout>
      <!-- 信息框 -->
      <a-layout-sider width="400" class="msg_box">
        <!-- 头像与名称 -->
        <a-card class="avatar_card" :bordered="false">
          <a-avatar icon="user" :size="120"></a-avatar>
          <div>{{ adminInfo.name }}</div>
          <!-- 浮动返回按钮 -->
          <a-button
            v-show="activeNav != ''"
            class="back_btn"
            @click="$router.go(-1)"
            >返回
          </a-button>
        </a-card>
        <!-- 导航小按钮 -->
        <a-card
          class="nav_card"
          :class="{ nav_card_active: activeNav == '' }"
          :bordered="false"
          @click="activeNav == '' ? null : $router.push('/educated_list')"
          >受教育者列表
        </a-card>
        <a-card
          v-if="activeNav != ''"
          class="nav_card nav_card_active"
          style="margin-top: 16px"
          :bordered="false"
        >
          {{ activeNav }}
        </a-card>
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <!-- 页面内容主体 -->
        <a-layout-content class="main_content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { formatDate } from '@/utils'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      nowTime: '',
      activeNav: ''
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    // 设置当前时间
    setCurrentTime() {
      this.nowTime = formatDate(new Date())
    },
    setActiveNav(path) {
      switch (path) {
        case '/educated_info':
          this.activeNav = '受教育者详情'
          break
        case '/certificate_info':
          this.activeNav = '证书详情'
          break
        case '/study_auth':
          this.activeNav = '学习认证'
          break
        case '/educated_list':
          this.activeNav = ''
          break
        default:
          this.activeNav = path
          break
      }
    },
    logout() {
      this.$router.push('/login')
    }
  },
  mounted() {
    // 定时器实时更新当前时间
    setInterval(this.setCurrentTime, 500)
    // 获取路由
    this.setActiveNav(this.$route.path)
  },
  beforeDestroy() {
    // 清除定时器
    if (this.setCurrentTime) {
      clearInterval(this.setCurrentTime)
    }
  },
  watch: {
    // 监听路由改变
    $route(to, from) {
      this.setActiveNav(to.path)
    }
  }
}
</script>

<style lang="less" scoped>
// 页头
.header {
  background-color: #027db4;
  color: #fff;
}
// 退出登录
.logout {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > div {
    cursor: pointer;
  }
}
// 信息框
.msg_box {
  background-color: #fff;
  padding-left: 50px;
  position: relative;
  .avatar_card {
    height: 280px;
    text-align: center;
    .ant-avatar {
      margin-top: 25px;
      background-color: #027db4;
    }
    div {
      font-size: 24px;
      margin-top: 25px;
      color: #027db4;
    }
    .back_btn {
      width: 80px;
      height: 50px;
      background-color: #f0f2f5;
      border: none;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .nav_card {
    background-color: #f0f2f5;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }
  .nav_card_active {
    color: #027db4;
  }
}
// 页面主体
.main_content {
  margin: 0;
  min-height: 600px;
}
</style>
