<template>
  <div
    class="outer_body"
    :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
  >
    <a-card :bordered="false">
      <div class="title input_row">教育管理员登录</div>
      <div class="input_row">
        <span>机构名</span>
        <a-input
          v-model="loginForm.subject"
          placeholder="请输入机构名"
        ></a-input>
      </div>
      <div class="input_row">
        <span>密码</span>
        <a-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
        ></a-input>
      </div>
      <a-row class="btn_row" :gutter="16">
        <a-col :span="12">
          <a-button
            type="primary"
            size="large"
            shape="round"
            @click="handleLogin"
            >登录
          </a-button>
        </a-col>
        <a-col :span="12">
          <a-button
            type="default"
            size="large"
            shape="round"
            @click="handleRegister"
            >注册
          </a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { login, register } from '@/api'
import { storage } from '@/utils'
export default {
  data() {
    return {
      backgroundImg: require('@/assets/images/background_login.jpg'),
      loginForm: {
        subject: '金陵科技学院',
        password: '123456'
      }
    }
  },
  methods: {
    // 登录
    async handleLogin() {
      const res = await login(this.loginForm)
      if (res.data.code !== 200) {
        return this.$message.error(res.data.msg)
      }
      this.$message.success('登录成功')
      const token = res.data.token
      storage.setItem('educatortoken', token)
      this.$router.push('/')
    },
    // 注册
    async handleRegister() {
      const res = await register(this.loginForm).catch(e => {
        this.$message.error('注册失败')
      })
      if (res.data.code === 200) {
        this.$message.success(res.data.msg)
      } else {
        this.$message.error(res.data.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.outer_body {
  height: 900px;
  position: relative;
  > .ant-card {
    // background-color: #b2c3d4;
    width: 400px;
    height: 500px;
    position: absolute;
    right: 150px;
    top: 170px;
    border-radius: 15px;
    box-shadow: 0 15px 20px #666;
    padding: 0 50px;
    .input_row {
      margin-top: 50px;
    }
    .btn_row {
      margin-top: 50px;
      text-align: center;
      .ant-btn {
        width: 100px;
        font-weight: bold;
        font-size: 20px;
        box-shadow: 0px 5px 5px #01547859;
      }
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #015478;
    }
    .ant-input {
      border: none;
      background: none;
      border-bottom: #027db4 2px solid;
    }
    .ant-input:focus {
      box-shadow: none;
      box-shadow: 0 -2px 5px #027db4 inset;
    }
    span {
      font-size: 14px;
      color: #999;
      font-weight: bold;
    }
    .ant-btn:hover {
      box-shadow: 0px 5px 5px #015478;
    }
  }
}
</style>
