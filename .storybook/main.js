const path = require('path')

const custom = require('../webpack.config.js')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: {printWidth: 80, singleQuote: false},
        },
      },
    },
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules,
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.mjs'],
        fallback: {
          crypto: false,
          path: false,
        },
      },
      plugins: [
        ...config.plugins,
        custom.plugins[0], // DefinePlugin
        custom.plugins[1], // MiniCssExtractPlugin
        custom.plugins[5], // SpriteLoaderPlugin
      ],
    }
  },
}
