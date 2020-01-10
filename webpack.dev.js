/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge')
const path = require('path')
const PrettierPlugin = require('prettier-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const common = require('./webpack.common.js')

module.exports = {}
module.exports.default = merge(common.default, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [new PrettierPlugin(), new DashboardPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: false,
    https: common.config.devServerHTTPS,
    host: '0.0.0.0',
  },
})
