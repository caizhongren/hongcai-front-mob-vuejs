var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  baseFileUrl: '"http://test321.hongcai.com/uploads/"',
  domain: '"http://m.test321.hongcai.com"'
})
