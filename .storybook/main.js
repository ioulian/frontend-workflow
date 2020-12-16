const path = require('path');

const custom = require('../webpack.config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.mjs'],
      },
      plugins: [
        ...config.plugins,
        custom.plugins[1], // DefinePlugin
        custom.plugins[2], // MiniCssExtractPlugin
        custom.plugins[6] // SpriteLoaderPlugin
      ]
    };
  },
};
