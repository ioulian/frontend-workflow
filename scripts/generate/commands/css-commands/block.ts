/* eslint-disable import/no-extraneous-dependencies */
import {paramCase} from 'param-case'
import {fileExists, CSS_BLOCKS_DIR, createDir, writeFile, readFile} from '../../utils'

exports.command = 'block [name]'

exports.describe = 'Creates a CSS block.'

exports.handler = ({name}: {name: string}) => {
  const blocksDir = createDir(CSS_BLOCKS_DIR)

  writeFile(
    `${blocksDir}/_${paramCase(name)}.scss`,
    `.app-b-${paramCase(name)} {
}`
  )

  const baseFilePath = `${blocksDir}/_base.scss`
  const baseFileExists = fileExists(baseFilePath)
  if (baseFileExists) {
    writeFile(
      baseFilePath,
      `${readFile(baseFilePath)}
@import './${paramCase(name)}';`
    )

    console.log('Done and automatically added to _base.scss!')
  } else {
    console.log('Done! Do not forget to import this file.')
  }
}
