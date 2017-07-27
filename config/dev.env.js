var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseFileUrl: '"http://test321.hongcai.com/uploads/"',
  domain: '"http://m.test321.hongcai.com"'
})
