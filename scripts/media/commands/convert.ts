/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-empty-function */

exports.command = 'convert <command>'
exports.desc = 'Converters for Media.'
exports.builder = (yargs: any) =>
  yargs.commandDir('convert', {
    extensions: ['js', 'ts'],
  })
exports.handler = () => {}
