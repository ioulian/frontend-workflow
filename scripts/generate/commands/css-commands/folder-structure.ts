import {
  CSS_BLOCKS_DIR,
  CSS_COMPONENTS_DIR,
  createDir,
  CSS_SECTIONS_DIR,
  CSS_STYLES_DIR,
  resolveDir,
  writeFile,
  fileExists,
  readFile,
} from '../../utils'

exports.command = 'folder-structure'

exports.describe = 'Creates a folder structure for CSS. This will overwrite existing code!'

exports.handler = () => {
  const generalDir = createDir(`${CSS_STYLES_DIR}/general`)
  writeFile(`${generalDir}/_base.scss`, '')

  const typographyDir = createDir(`${CSS_STYLES_DIR}/typography`)
  writeFile(`${typographyDir}/_base.scss`, '')

  const formsDir = createDir(`${CSS_STYLES_DIR}/forms`)
  writeFile(`${formsDir}/_base.scss`, '')

  const componentsDir = createDir(CSS_COMPONENTS_DIR)
  writeFile(`${componentsDir}/_base.scss`, '')

  const sectionsDir = createDir(CSS_SECTIONS_DIR)
  const sectionsHeaderDir = createDir(`${CSS_SECTIONS_DIR}/header`)
  const sectionsFooterDir = createDir(`${CSS_SECTIONS_DIR}/footer`)
  writeFile(`${sectionsHeaderDir}/_base.scss`, '')
  writeFile(`${sectionsFooterDir}/_base.scss`, '')
  writeFile(
    `${sectionsDir}/_base.scss`,
    `@import './header/base';
@import './footer/base';
`
  )

  const blocksDir = createDir(CSS_BLOCKS_DIR)
  writeFile(`${blocksDir}/_base.scss`, '')

  writeFile(
    `${resolveDir(CSS_STYLES_DIR)}/_base.scss`,
    `@import './general/base';
@import './typography/base';
@import './forms/base';
@import './components/base';
@import './blocks/base';
@import './sections/base';
`
  )

  // Add to index
  const baseFilePath = resolveDir(`/src/index.scss`)
  const baseFileExists = fileExists(baseFilePath)
  if (baseFileExists) {
    writeFile(
      baseFilePath,
      `${readFile(baseFilePath)}@import './project/styles/base';
`
    )

    console.log('Done and automatically added to src/index.scss!')
  } else {
    console.log('Done! Do not forget to import this file in src/index.scss!')
  }
}
