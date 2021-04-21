/* eslint-disable import/no-extraneous-dependencies */
import {paramCase} from 'param-case'
import {fileExists, CSS_SECTIONS_DIR, createDir, writeFile, readFile} from '../../utils'

exports.command = 'section [name]'

exports.describe = 'Creates a CSS section.'

exports.handler = ({name}: {name: string}) => {
  const sectionsDir = createDir(CSS_SECTIONS_DIR)

  writeFile(
    `${sectionsDir}/_${paramCase(name)}.scss`,
    `.app-s-${paramCase(name)} {
}`
  )

  const baseFilePath = `${sectionsDir}/_base.scss`
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
