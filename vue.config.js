// vue.config.js

module.exports = {
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://192.168.1.100:8081',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
