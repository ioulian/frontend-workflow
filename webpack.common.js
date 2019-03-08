const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const config = require('./package.json').config
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  target: 'web',
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/', //devMode ? '/' : config.publicPath + '/',
  },
  plugins: [
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
      : null,
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
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
              name: 'images/[path][name].[ext]',
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
              name: 'fonts/[path][name].[ext]',
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
