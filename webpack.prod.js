const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const config = require('./package.json').config
const version = require('./package.json').version

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new ImageminPlugin({
      cacheFolder: path.resolve(__dirname, '.cache'),
      jpegtran: {
        progressive: true,
      },
    }),
    config.modules.favicons
      ? new AppManifestWebpackPlugin({
          logo: path.resolve(__dirname, 'src/favicon.png'),
          prefix: './',
          emitStats: false,
          statsFilename: 'iconstats.json',
          statsEncodeHtml: false,
          persistentCache: false,
          inject: true,
          config: {
            appName: config.name,
            appShortName: config.shortName,
            appDescription: config.description,
            developerName: config.author,
            developerURL: config.authorUrl,
            background: config.background,
            theme_color: config.theme,
            display: 'standalone',
            orientation: 'any',
            start_url: '/?homescreen=1',
            appleStatusBarStyle: 'black-translucent',
            version: version,
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
      : null,
    config.modules.criticalCSS
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
      : null,
    new InlineManifestWebpackPlugin(),
    config.modules.asyncJS
      ? new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'async',
        })
      : null,
  ],
})
