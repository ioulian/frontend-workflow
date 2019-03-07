const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const config = require('./package.json').config
const version = require('./package.json').version

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ImageminPlugin({
      cacheFolder: path.resolve(__dirname, 'cache'),
      jpegtran: {
        progressive: true,
      },
    }),
    new AppManifestWebpackPlugin({
      logo: path.resolve(__dirname, 'src/favicon.png'),
      prefix: './',
      emitStats: false,
      statsFilename: 'iconstats.json', // can be absolute path
      statsEncodeHtml: false,
      persistentCache: false,
      inject: true,
      config: {
        appName: config.name,
        appShortName: config.shortName,
        appDescription: config.description, // Your application's description. `string`
        developerName: config.author, // Your (or your developer's) name. `string`
        developerURL: config.authorUrl, // Your (or your developer's) URL. `string`
        background: config.background, // Background colour for flattened icons. `string`
        theme_color: config.theme, // Theme color for browser chrome. `string`
        display: 'standalone', // Android display: "browser" or "standalone". `string`
        orientation: 'any', // Android orientation: "portrait" or "landscape". `string`
        start_url: '/?homescreen=1', // Android start application's URL. `string`
        appleStatusBarStyle: 'black-translucent',
        version: version, // Your application's version number. `number`
        scope: '/',
        lang: 'en-US',
        logging: false, // Print logs to console? `boolean`
        icons: {
          android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
          appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }`
          appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }`
          coast: true, // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
          favicons: true, // Create regular favicons. `boolean`
          firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background }`
          windows: true, // Create Windows 8 tile icons. `boolean` or `{ background }`
          yandex: true, // Create Yandex browser icon. `boolean` or `{ background }`
        },
      },
    }),
  ],
})
