/* eslint-disable import/no-extraneous-dependencies */
import {paramCase} from 'param-case'
import {fileExists, CSS_COMPONENTS_DIR, createDir, writeFile, readFile} from '../../utils'

exports.command = 'component [name]'

exports.describe = 'Creates a CSS component.'

exports.handler = ({name}: {name: string}) => {
  const componentsDir = createDir(CSS_COMPONENTS_DIR)

  writeFile(
    `${componentsDir}/_${paramCase(name)}.scss`,
    `.app-${paramCase(name)} {
}`
  )

  const baseFilePath = `${componentsDir}/_base.scss`
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
