module.exports = {
  plugins: [
    require('@csstools/postcss-sass')(),
    require('postcss-short'),
    require('postcss-utilities'),
    require('postcss-assets'),
    require('postcss-preset-env'),
    require('postcss-easing-gradients'),
    require('postcss-css-variables')({
      preserve: true,
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
