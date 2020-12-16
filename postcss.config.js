module.exports = {
  plugins: [
    require('@csstools/postcss-sass')(),
    require('postcss-utilities'),
    require('postcss-preset-env'),
    require('postcss-easing-gradients'),
    require('postcss-custom-properties')({
      preserve: true,
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
