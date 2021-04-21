/* eslint-disable import/no-extraneous-dependencies */
import {pascalCase} from 'pascal-case'
import {paramCase} from 'param-case'
import {createDir, JS_COMPONENT_DIR, writeFile} from '../../utils'

const createJSFileContent = (name: string, withCss: boolean): string => {
  const namePascal = pascalCase(name)

  return `import {classes} from 'polytype'
import {Factory} from '../../../lib/base/js/Factory'
// import Settings from '../../Settings'

${withCss ? `import './index.scss'\n` : ''}
/**
 * Auto generated "${namePascal}" component
 * TODO: Describe this component
 */
export class ${namePascal} extends classes(Factory) {
  public static className: string = '${namePascal}'

  constructor(el: Element) {
    super([el])

    ${namePascal}.makeGlobal(${namePascal}.className)
  }
}
`
}
const createCSSFileContent = (name: string): string => {
  const nameParam = paramCase(name)

  return `.app-${nameParam} {
  // TODO: write css or remove this file
}
`
}

const getDoneText = (name: string): string => {
  const namePascal = pascalCase(name)
  const nameParam = paramCase(name)

  return `Done!

To use this component:
1: Add import in 'src/project/Site.ts': import {${namePascal}} from './components/${nameParam}/${namePascal}'
2: Attach component: ${namePascal}.attach('.app-${nameParam}')`
}

const createFiles = (name: string, withCss: boolean): void => {
  const namePascal = pascalCase(name)
  const nameParam = paramCase(name)

  const dir = createDir(`${JS_COMPONENT_DIR}/${nameParam}`)

  if (withCss) {
    writeFile(`${dir}/index.scss`, createCSSFileContent(name))
  }

  writeFile(`${dir}/${namePascal}.ts`, createJSFileContent(name, withCss))
}

exports.command = 'component [name]'

exports.describe = 'Creates a JS component to be loaded in Site.ts.'

exports.handler = ({name, withCss}: {name: string; withCss: boolean}) => {
  createFiles(name, withCss)
  console.log(getDoneText(name))
}
