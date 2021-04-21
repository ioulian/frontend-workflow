/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-empty-function */

exports.command = 'css <command>'
exports.desc = 'Generators for CSS.'
exports.builder = (yargs) =>
  yargs.commandDir('css-commands', {
    extensions: ['js', 'ts'],
  })
exports.handler = () => {}
