<template>
  <div
    class="outer_body"
    :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
  >
    <a-card :bordered="false">
      <div class="title input_row">教育管理员登录</div>
      <div class="input_row">
        <span>机构名</span>
        <a-input placeholder="请输入机构名"></a-input>
      </div>
      <div class="input_row">
        <span>密码</span>
        <a-input type="password" placeholder="请输入密码"></a-input>
      </div>
      <div class="input_row" style="text-align: center">
        <a-button type="primary" size="large" shape="round" @click="handleLogin">登录</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundImg: require('@/assets/images/background_login.jpg'),
      loginForm: {

      }
    }
  },
  methods: {
    handleLogin() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.outer_body {
  height: 700px;
  position: relative;
  > .ant-card {
    // background-color: #b2c3d4;
    width: 400px;
    height: 500px;
    position: absolute;
    right: 150px;
    top: 70px;
    border-radius: 15px;
    box-shadow: 0 15px 20px #666;
    padding: 0 50px;
    .input_row {
      margin-top: 50px;
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
    .ant-btn {
      padding: 0 40px;
      font-weight: bold;
      font-size: 20px;
      box-shadow: 0px 5px 5px #01547859;
    }
    .ant-btn:hover {
      box-shadow: 0px 5px 5px #015478;
    }
  }
}
</style>
