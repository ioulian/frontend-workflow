/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path')
const merge = require('webpack-merge')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const {CriticalPlugin} = require('webpack-plugin-critical')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.common.js')
const {config} = require('./package.json')
const {version} = require('./package.json')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  performance: {
    hints: false, // 'warning',
    maxEntrypointSize: 250000, // in bytes, default 250k
    maxAssetSize: 450000, // in bytes
  },
  plugins: [
    new ImageminPlugin({
      cacheFolder: path.resolve(__dirname, '.cache'),
      jpegtran: {
        progressive: true,
      },
    }),
    config.modules.favicons
      ? new FaviconsWebpackPlugin({
          logo: path.resolve(__dirname, 'src/favicon.png'),
          prefix: './',
          inject: true,
          favicons: {
            appName: config.manifest.name,
            appShortName: config.manifest.shortName,
            appDescription: config.manifest.description,
            developerName: config.manifest.author,
            developerURL: config.manifest.authorUrl,
            background: config.background,
            theme_color: config.theme,
            display: 'standalone',
            orientation: 'any',
            start_url: '/index.html',
            appleStatusBarStyle: 'black-translucent',
            version,
            scope: '/',
            lang: 'en-US',
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
    config.modules.criticalCSS && !config.cms.active
      ? new CriticalPlugin({
          src: 'index.html',
          inline: true,
          minify: true,
          dest: 'index.html',
          dimensions: [
            {
              width: 360,
              height: 500,
            },
            {
              width: 1024,
              height: 700,
            },
            {
              width: 1300,
              height: 900,
            },
          ],
        })
      : () => {},
    new InlineManifestWebpackPlugin(),
    config.modules.asyncJS
      ? new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'defer',
        })
      : null,
  ],
})
