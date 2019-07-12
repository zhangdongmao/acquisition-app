'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://10.30.140.90:6269"'
}
