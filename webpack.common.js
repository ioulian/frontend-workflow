const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('./package.json').config
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const devServer = process.env.NODE_ENV === 'devserver'

const serviceWorkerActive = config.modules.serviceWorker && (!devMode || config.serviceWorkerOnLocalHost)

const subFolder = config.cms.active ? config.cms.subFolder : '/'

module.exports = {
  target: 'web',
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),

    // Enable these if AsyncModuleLoader doesn't work correctly
    // clickthrough: path.resolve(__dirname, 'src/vendor/fw/clickthrough/index.ts'),
    // expandable: path.resolve(__dirname, 'src/vendor/fw/expandable/index.ts'),
    // accordion: path.resolve(__dirname, 'src/vendor/fw/accordion/index.ts'),
    // sameheight: path.resolve(__dirname, 'src/vendor/fw/sameheight/index.ts'),
    // inviewanimation: path.resolve(__dirname, 'src/vendor/fw/in-view-animation/index.ts'),
    // responsivenavbar: path.resolve(__dirname, 'src/vendor/fw/responsive-navbar/index.ts'),
    // lazyloader: path.resolve(__dirname, 'src/vendor/fw/lazyloader/index.ts'),
    // scrollintoview: path.resolve(__dirname, 'src/vendor/fw/scroll-into-view/index.ts'),
    // fixednavbar: path.resolve(__dirname, 'src/vendor/fw/fixed-navbar/index.ts'),
    // socialshare: path.resolve(__dirname, 'src/vendor/fw/social-share/index.ts'),
    // slider: path.resolve(__dirname, 'src/vendor/fw/slider/index.ts'),
    // parallax: path.resolve(__dirname, 'src/vendor/fw/parallax/index.ts'),
    // gallery: path.resolve(__dirname, 'src/vendor/fw/gallery/index.ts'),
    // bottomnavbar: path.resolve(__dirname, 'src/vendor/fw/bottom-navbar/index.ts'),

    // Remove me to disable demo code!
    demo: path.resolve(__dirname, 'src/demo/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, config.outputPath),
    filename: `js/[name].bundle${config.addFilenameHashes && !config.cms.active ? '.[contenthash]' : ''}.js`,
    chunkFilename: `js/[name].chunk${config.addFilenameHashes && !config.cms.active ? '.[contenthash]' : ''}.js`,
    publicPath: devServer ? '/' : subFolder,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name].bundle${config.addFilenameHashes && !config.cms.active ? '.[contenthash]' : ''}.css`,
      chunkFilename: `css/[name].chunk${config.addFilenameHashes && !config.cms.active ? '.[contenthash]' : ''}.css`,
    }),
    // TODO: remove duplicate code
    new HtmlWebpackPlugin({
      title: config.name,
      filename: 'index.html',
      template: 'index.html',
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
    }),
    new HtmlWebpackPlugin({
      title: config.name,
      filename: 'offline.html',
      template: 'offline.html',
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
    }),
    serviceWorkerActive
      ? new InjectManifest({
          swSrc: './src/sw.js',
          importWorkboxFrom: 'local',
          exclude: [/runtime\.bundle\./],
        })
      : () => {},
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
              name: `img/[path][name]${config.addFilenameHashes && !config.cms.active ? '.[contenthash]' : ''}.[ext]`,
              outputPath: './',
              publicPath: devServer ? '/' : subFolder,
              useRelativePaths: true,
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        exclude: /(index|offline)\.html$/,
        use: {
          loader: 'html-loader',
          options: {
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, 'src'),
              name: `fonts/[path][name]${config.addFilenameHashes && !config.cms.active ? '.[contenthash]' : ''}.[ext]`,
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
