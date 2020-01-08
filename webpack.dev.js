/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge')
const path = require('path')
const PrettierPlugin = require('prettier-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const common = require('./webpack.common.js')
const {config} = require('./package.json')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [new PrettierPlugin(), new DashboardPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: false,
    https: config.devServerHTTPS,
  },
})
