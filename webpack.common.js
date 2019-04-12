const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const config = require('./package.json').config
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  target: 'web',
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),
    clickthrough: path.resolve(__dirname, 'src/vendor/bulma/clickthrough/index.ts'),
    expandable: path.resolve(__dirname, 'src/vendor/bulma/expandable/index.ts'),
    accordion: path.resolve(__dirname, 'src/vendor/bulma/accordion/index.ts'),
    sameheight: path.resolve(__dirname, 'src/vendor/bulma/sameheight/index.ts'),
    inviewanimation: path.resolve(__dirname, 'src/vendor/bulma/in-view-animation/index.ts'),
    responsivenavbar: path.resolve(__dirname, 'src/vendor/bulma/responsive-navbar/index.ts'),
    lazyloader: path.resolve(__dirname, 'src/vendor/bulma/lazyloader/index.ts'),
    scrollintoview: path.resolve(__dirname, 'src/vendor/bulma/scroll-into-view/index.ts'),
    fixedheader: path.resolve(__dirname, 'src/vendor/bulma/fixed-header/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, config.outputPath),
    filename: `js/[name].bundle${config.addFilenameHashes ? '.[contenthash]' : ''}.js`,
    chunkFilename: `js/[name].chunk${config.addFilenameHashes ? '.[contenthash]' : ''}.js`,
    publicPath: devMode ? `${config.fromRoot}` : `${config.publicPath}${config.fromRoot}`,
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    // Do not forget to remove the ServiceWorker bootsrap code in index.ts
    config.modules.swPrecache
      ? new SWPrecacheWebpackPlugin({
          cacheId: config.cacheId,
          dontCacheBustUrlsMatching: /\.\w{20}\./,
          filename: 'service-worker.js',
          minify: true,
          navigateFallback: config.publicPath + '/index.html',
          staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        })
      : () => {},
    new CleanWebpackPlugin([path.resolve(__dirname, config.outputPath)]),
    new MiniCssExtractPlugin({
      filename: `css/[name].bundle${config.addFilenameHashes ? '.[contenthash]' : ''}.css`,
      chunkFilename: `css/[name].chunk${config.addFilenameHashes ? '.[contenthash]' : ''}.css`,
    }),
    new HtmlWebpackPlugin({
      title: config.name,
      template: 'index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      minify: {
        collapseWhitespace: !devMode,
        removeComments: !devMode,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: false,
      },
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
        test: /\.(sa|sc|c)ss$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, 'src'),
              name: `images/[path][name]${config.addFilenameHashes ? '.[contenthash]' : ''}.[ext]`,
              outputPath: './',
              publicPath: '../',
              useRelativePaths: true,
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
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
              name: `fonts/[path][name]${config.addFilenameHashes ? '.[contenthash]' : ''}.[ext]`,
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
      },
    },
  },
}
