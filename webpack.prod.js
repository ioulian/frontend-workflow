/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path')
const merge = require('webpack-merge')
const Critters = require('critters-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.common.js')
const {version} = require('./package.json')

module.exports = {}
module.exports.default = merge(common.default, {
  mode: 'production',
  devtool: false,
  performance: {
    hints: false, // 'warning',
    maxEntrypointSize: 250000, // in bytes, default 250k
    maxAssetSize: 450000, // in bytes
  },
  plugins: [
    common.config.modules.favicons
      ? new FaviconsWebpackPlugin({
          logo: path.resolve(__dirname, 'src/favicon.png'),
          prefix: './',
          inject: true,
          favicons: {
            appName: common.config.manifest.name,
            appShortName: common.config.manifest.shortName,
            appDescription: common.config.manifest.description,
            developerName: common.config.manifest.author,
            developerURL: common.config.manifest.authorUrl,
            background: common.config.background,
            theme_color: common.config.theme,
            display: 'standalone',
            orientation: 'any',
            start_url: '/index.html',
            appleStatusBarStyle: 'black-translucent',
            version,
            scope: '/',
            lang: common.config.language,
            logging: false,
            icons: {
              android: true,
              appleIcon: true,
              appleStartup: true,
              coast: true,
              favicons: true,
              firefox: true,
              windows: true,
              yandex: true,
            },
          },
        })
      : () => {},
    common.config.modules.criticalCSS
      ? new Critters({
          preload: 'swap',
          noscriptFallback: true,
          pruneSource: false,
        })
      : () => {},
    common.config.modules.asyncJS
      ? new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'defer',
        })
      : () => {},
  ],
})
