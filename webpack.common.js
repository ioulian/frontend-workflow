/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')
const {config} = require('./package.json')

const devMode = process.env.NODE_ENV !== 'production'
const devServer = process.env.NODE_ENV === 'devserver'

const serviceWorkerActive = config.modules.serviceWorker && (!devMode || config.serviceWorkerOnLocalHost)

const subFolder = config.cms.active ? `${config.cms.subFolder}dist/` : '/'
const hash = devServer ? 'hash' : 'contenthash'

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
  target: 'web',
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),

    // Enable these if AsyncModuleLoader doesn't work correctly
    // clickthrough: path.resolve(__dirname, 'src/lib/components/clickthrough/index.ts'),
    // expandable: path.resolve(__dirname, 'src/lib/components/expandable/index.ts'),
    // accordion: path.resolve(__dirname, 'src/lib/components/accordion/index.ts'),
    // sameheight: path.resolve(__dirname, 'src/lib/components/sameheight/index.ts'),
    // inviewanimation: path.resolve(__dirname, 'src/lib/components/in-view-animation/index.ts'),
    // lazyloader: path.resolve(__dirname, 'src/lib/components/lazyloader/index.ts'),
    // scrollintoview: path.resolve(__dirname, 'src/lib/components/scroll-into-view/index.ts'),
    // fixednavbar: path.resolve(__dirname, 'src/lib/components/fixed-navbar/index.ts'),
    // socialshare: path.resolve(__dirname, 'src/lib/components/social-share/index.ts'),
    // slider: path.resolve(__dirname, 'src/lib/components/slider/index.ts'),
    // parallax: path.resolve(__dirname, 'src/lib/components/parallax/index.ts'),
    // gallery: path.resolve(__dirname, 'src/lib/components/gallery/index.ts'),
    // bottomnavbar: path.resolve(__dirname, 'src/lib/components/bottom-navbar/index.ts'),

    // Remove me to disable demo code!
    demo: path.resolve(__dirname, 'src/demo/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, config.outputPath),
    filename: `js/[name].bundle${config.addFilenameHashes && !config.cms.active ? `.[${hash}]` : ''}.js`,
    chunkFilename: `js/[name].chunk${config.addFilenameHashes && !config.cms.active ? `.[${hash}]` : ''}.js`,
    publicPath: devServer ? '/' : subFolder,
  },
  plugins: [
    // Clean build folder on build
    devMode === false ? new CleanWebpackPlugin() : () => {},
    new MiniCssExtractPlugin({
      filename: `css/[name].bundle${config.addFilenameHashes && !config.cms.active ? `.[${hash}]` : ''}.css`,
      chunkFilename: `css/[name].chunk${config.addFilenameHashes && !config.cms.active ? `.[${hash}]` : ''}.css`,
    }),
    // Create pages
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      ...htmlPluginSettings,
    }),
    new HtmlWebpackPlugin({
      filename: 'offline.html',
      template: 'offline.html',
      ...htmlPluginSettings,
    }),
    serviceWorkerActive
      ? new InjectManifest({
          swSrc: './src/sw.js',
          importWorkboxFrom: 'local',
          exclude: [/runtime\.bundle\./],
        })
      : () => {},
    // Define constants for the client (they are injected in the project TS/JS code)
    new webpack.DefinePlugin({
      __SERVICE_WORKER_ACTIVE__: serviceWorkerActive,
      __IS_DEV__: devMode,
      __IS_PROD__: !devMode,
      __LANG__: config.language,
    }),
  ],
  module: {
    rules: [
      {
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
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: devMode}},
          {loader: 'postcss-loader', options: {sourceMap: devMode}},
          {loader: 'sass-loader', options: {sourceMap: devMode}},
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: devMode}},
          {loader: 'postcss-loader', options: {sourceMap: devMode}},
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, 'src'),
              name: `img/[path][name]${config.addFilenameHashes && !config.cms.active ? `.[${hash}]` : ''}.[ext]`,
              outputPath: './',
              publicPath: devServer ? '/' : subFolder,
              useRelativePaths: true,
              esModule: false,
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
              name: `fonts/[path][name]${config.addFilenameHashes && !config.cms.active ? `.[${hash}]` : ''}.[ext]`,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          test: /Factory\.ts|Settings\.ts|Expandable\.ts/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },
}
