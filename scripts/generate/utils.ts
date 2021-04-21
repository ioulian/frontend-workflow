/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

export const ROOT_DIR = '../..'

export const JS_COMPONENT_DIR = '/src/project/components'

export const CSS_STYLES_DIR = '/src/project/styles'
export const CSS_SECTIONS_DIR = '/src/project/styles/sections'
export const CSS_COMPONENTS_DIR = '/src/project/styles/components'
export const CSS_BLOCKS_DIR = '/src/project/styles/blocks'

export const resolveDir = (dir: string): string => path.resolve(__dirname, `${ROOT_DIR}${dir}`) as string

export const createDir = (dir: string): string => {
  const newDir = resolveDir(dir)

  fs.mkdirSync(newDir, {recursive: true})

  return newDir
}

export const writeFile = (pathDir: string, content: string): void => {
  fs.writeFile(pathDir, content, () => {})
}

export const readFile = (pathDir: string): string => {
  return fs.readFileSync(pathDir) as string
}
export const fileExists = (pathDir: string): boolean => {
  return fs.existsSync(pathDir) as boolean
}
