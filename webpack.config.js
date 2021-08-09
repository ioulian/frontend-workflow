/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const {cosmiconfigSync} = require('cosmiconfig')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin')
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks')
const {ESBuildMinifyPlugin} = require('esbuild-loader')
const TerserPlugin = require('terser-webpack-plugin')
const {version} = require('./package.json')

const defaults = {
  theme: '#007bb3',
  background: '#ffffff',
  language: 'en-US',
  googleSiteVerification: null,
  manifest: {
    name: 'Frontend workflow',
    shortName: 'Frontend',
    description: '',
    author: '',
    authorUrl: '',
  },
  html: {
    title: '',
    description: '',
    url: '',
    siteName: '',
    siteSummary: '',
    author: '',
    twitterSite: null,
    twitterAuthor: null,
  },
  devServerHTTPS: true,
  addFilenameHashes: true,
  forceNoHashesOnDev: false,
  outputPath: 'dist',
  subFolder: '/',
  serviceWorkerOnLocalHost: false,
  createTagsFile: true,
  useEsBuild: false,
  modules: {
    favicons: true,
    serviceWorker: true,
    asyncJS: true,
  },
  bootstrap: {
    importBundle: true,
  },
  components: {
    expose: false,
  },
  googleFonts: [],
}

// Set up environments
const devMode = process.env.NODE_ENV !== 'production'
const devServer = process.env.NODE_ENV === 'devserver'
const isStorybook = process.env.IS_STORYBOOK === 'true'

// Get config
const explorerSync = cosmiconfigSync('fw')
const configFile = explorerSync.search()

if (configFile === null) {
  console.warn('No config file found, using defaults')
}

const config = merge(defaults, configFile.config)

// Setup some settings
const serviceWorkerActive = config.modules.serviceWorker && (!devMode || config.serviceWorkerOnLocalHost)
const shouldUseGoogleFonts = Array.isArray(config.googleFonts) && config.googleFonts.length !== 0
const addHash = config.addFilenameHashes && !(devMode === true && config.forceNoHashesOnDev === true)

const htmlPluginSettings = {
  title: config.name,
  siteTitle: config.html.title,
  siteDescription: config.html.description,
  siteLanguage: config.language,
  siteAuthor: config.html.author,
  siteUrl: config.html.url,
  siteName: config.html.siteName,
  siteSummary: config.html.siteSummary,
  siteTwitterSite: config.html.twitterSite,
  siteTwitterAuthor: config.html.twitterAuthor,
  googleSiteVerification: config.googleSiteVerification,
  googleFontsActive: shouldUseGoogleFonts,
  scriptLoading: config.modules.asyncJS ? 'defer' : 'blocking',
  minify: {
    collapseWhitespace: !devMode,
    removeComments: !devMode,
    removeRedundantAttributes: false,
    removeScriptTypeAttributes: false,
    removeStyleLinkTypeAttributes: false,
    useShortDoctype: false,
  },
}

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'source-map' : false,
  performance: {
    hints: false, // 'warning',
    maxEntrypointSize: 250000, // in bytes, default 250k
    maxAssetSize: 450000, // in bytes
  },
  target: 'web',
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),

    // Remove me to disable demo code!
    demo: path.resolve(__dirname, 'src/demo/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, config.outputPath),
    filename: `js/[name].bundle${addHash ? '.[contenthash]' : ''}.js`,
    chunkFilename: `js/[name].chunk${addHash ? '.[contenthash]' : ''}.js`,
    publicPath: devServer ? '/' : config.subFolder,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: false,
    open: true,
    https: config.devServerHTTPS,
  },
  plugins: [
    // Clean build folder on build
    devMode === false ? new CleanWebpackPlugin() : () => {},
    devMode === true ? new CleanObsoleteChunks() : () => {},

    // Define constants for the client (they are injected in the project TS/JS code)
    new webpack.DefinePlugin({
      __SERVICE_WORKER_ACTIVE__: serviceWorkerActive,
      __IS_DEV__: devMode,
      __IS_PROD__: !devMode,
      __LANG__: config.language,
      __BOOTSTRAP_IMPORT_BUNDLE__: config.bootstrap.importBundle,
      __PUBLIC_PATH__: JSON.stringify(devServer ? '/' : config.subFolder),
      __EXPOSE_COMPONENTS__: config.components.expose,
    }),

    !isStorybook
      ? new MiniCssExtractPlugin({
          filename: `css/[name].bundle${addHash ? '.[contenthash]' : ''}.css`,
          chunkFilename: `css/[name].chunk${addHash ? '.[contenthash]' : ''}.css`,
        })
      : () => {},

    // Create pages
    !isStorybook
      ? new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.ejs',
          ...htmlPluginSettings,
        })
      : () => {},
    !isStorybook
      ? new HtmlWebpackPlugin({
          filename: 'offline.html',
          template: 'offline.ejs',
          ...htmlPluginSettings,
        })
      : () => {},
    !isStorybook && config.createTagsFile
      ? new HtmlWebpackPlugin({
          filename: 'tags.html',
          templateContent: ({htmlWebpackPlugin}) =>
            `${htmlWebpackPlugin.tags.headTags.filter(
              (tag) => !(tag.tagName === 'link' && tag.attributes.rel === 'stylesheet') && tag.tagName !== 'script'
            )}`,
          inject: false,
        })
      : () => {},
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    shouldUseGoogleFonts
      ? new GoogleFontsPlugin({
          fonts: config.googleFonts,
          filename: `css/fonts.css`,
        })
      : () => {},
    devMode === false && !isStorybook && config.modules.favicons
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
            lang: config.language,
            logging: false,
            icons: {
              android: [
                // Icons marked with "x" are not actually needed.
                // But because you can't modify output of manifest.json now, we still need to provide them.
                'android-chrome-36x36.png', // x
                'android-chrome-48x48.png', // x
                'android-chrome-72x72.png', // x
                'android-chrome-96x96.png', // x
                'android-chrome-144x144.png', // x
                'android-chrome-192x192.png',
                'android-chrome-256x256.png',
                'android-chrome-384x384.png', // x
                'android-chrome-512x512.png',
              ],
              appleIcon: ['apple-touch-icon-1024x1024.png', 'apple-touch-icon-180x180.png', 'apple-touch-icon.png'],
              appleStartup: false,
              coast: ['coast-228x228.png'],
              favicons: ['favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png', 'favicon.ico'],
              firefox: ['firefox_app_128x128.png', 'firefox_app_512x512.png'],
              windows: ['mstile-150x150.png', 'mstile-310x150.png', 'mstile-310x310.png'],
              yandex: ['yandex-browser-50x50.png'],
            },
          },
        })
      : () => {},

    !isStorybook && serviceWorkerActive
      ? new InjectManifest({
          swSrc: './src/sw.js',
          exclude: [/runtime\.bundle\./],
        })
      : () => {},

    devMode === true ? new PrettierPlugin() : () => {},
    devMode === true ? new DashboardPlugin() : () => {},
  ],
  module: {
    rules: [
      config.useEsBuild
        ? {
            test: /\.tsx?$/,
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'es2016',
            },
          }
        : {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              configFile: '.tsconfig.json',
            },
          },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          devMode || isStorybook ? 'style-loader' : MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: devMode}},
          {loader: 'postcss-loader', options: {sourceMap: devMode}},
          {loader: 'sass-loader', options: {sourceMap: devMode}},
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode || isStorybook ? 'style-loader' : MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: devMode}},
          {loader: 'postcss-loader', options: {sourceMap: devMode}},
        ],
      },
      {
        test: /-sprite\.svg$/,
        use: [
          {loader: 'svg-sprite-loader', options: {extract: true}},
          {
            loader: 'svgo-loader',
            options: {
              plugins: [],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /-sprite\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, 'src'),
              name: `img/[path][name]${addHash ? '.[contenthash]' : ''}.[ext]`,
              outputPath: './',
              publicPath: devServer ? '/' : config.subFolder,
              useRelativePaths: true,
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 80,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
                strip: true,
              },
              gifsicle: {
                interlaced: false,
              },
              svgo: {
                plugins: [],
              },
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        exclude: /(index|offline)\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              root: '.',
              attrs: [
                'img:src',
                'img:data-src',
                'img:srcset',
                'img:data-srcset',
                'source:srcset',
                'source:data-srcset',
                'link:href',
                'a:href',
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, 'src'),
              name: `fonts/[path][name]${addHash ? '.[contenthash]' : ''}.[ext]`,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.mjs'],
  },
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    minimizer: [
      config.useEsBuild
        ? new ESBuildMinifyPlugin({
            target: 'es2016',
          })
        : new TerserPlugin({
            parallel: true,
            // sourceMap: false,
            terserOptions: {
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            },
          }),
    ],
  },
}
