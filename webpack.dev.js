const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const PrettierPlugin = require('prettier-webpack-plugin')
const TSLintPlugin = require('tslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const fs = require('fs')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [new PrettierPlugin(), new DashboardPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    https: true,
  },
})
