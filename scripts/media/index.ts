#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies, no-unused-expressions */
// @ts-ignore
const yargs = require('yargs')

yargs
  .scriptName('yarn media')
  .usage('$0 <command> [args]')
  .commandDir('commands', {
    extensions: ['js', 'ts'],
  })
  .help()
  .wrap(72).argv
