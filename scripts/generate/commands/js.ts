/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-empty-function */

exports.command = 'js <command>'
exports.desc = 'Generators for JS.'
exports.builder = (yargs: any) =>
  yargs.commandDir('js-commands', {
    extensions: ['js', 'ts'],
  })
exports.handler = () => {}
