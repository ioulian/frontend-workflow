const path = require('path')
const write = require('write')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const config = require('./package.json').config
const version = require('./package.json').version

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  performance: {
    hints: false, //'warning',
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
      ? new WebappWebpackPlugin({
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
      : () => {},
    config.modules.favicons
      ? new (class {
          // This is needed to fix a bug in favicon generation.
          // For theme color tag in HTML it uses background property instead of theme color property...
          apply(compiler) {
            compiler.hooks.make.tapAsync('CustomPlugin', (compilation, callback) => {
              compilation.hooks.webappWebpackPluginBeforeEmit.tapAsync('CustomPlugin', (result, callback) => {
                result.tags = result.tags.map(tag => {
                  if (tag === `<meta name="theme-color" content="${config.background}">`) {
                    return `<meta name="theme-color" content="${config.theme}">`
                  }

                  return tag
                })

                // Generate HTML to be loaded in theme later
                if (config.cms.active) {
                  const fullPath = path.join(`./${config.outputPath}`, 'tags.html')
                  write.sync(fullPath, result.tags.reduce((html, tag) => `${html}${tag}`, ''))
                }

                return callback(null, result)
              })

              return callback()
            })
          }
        })()
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
          defaultAttribute: 'async',
        })
      : null,
  ],
})
