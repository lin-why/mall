module.exports = {
  configureWebpack: { //vue中配置别名的方法 十分管用
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views' : '@/views'
      }
    }
  }
}