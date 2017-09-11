var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  baseFileUrl: '"http://test321.hongcai.com/uploads/"',
  domain: '"http://m.test321.hongcai.com"',
  WEB_DEFAULT_DOMAIN: '"/hongcai/api/v1"',
  vue_domain: '"http://vue.test321.hongcai.com"'
})
