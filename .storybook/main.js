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
    "@storybook/addon-storysource"
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules
      },
      plugins: [
        ...config.plugins,
        custom.plugins[1] // DefinePlugin
      ]
    };
  },
};
