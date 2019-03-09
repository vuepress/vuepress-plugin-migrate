const { resolve, isAbsolute } = require('path')
const { existsSync, mkdirSync } = require('fs')

let fileIndex = 0
const defaultgetFileName = () => String(++fileIndex)

module.exports = (options, context) => {
  options = {
    targetDir: '_posts',
    downloadDir: resolve(context.vuepressDir, 'downloads'),
    getFileName: defaultgetFileName,
    ...options,
  }

  function ensureAbsolute(key) {
    if (!isAbsolute(options[key])) {
      options[key] = resolve(context.sourceDir, options[key])
    }
    if (!existsSync(options[key])) {
      mkdirSync(options[key])
    }
  }

  ensureAbsolute('targetDir')
  ensureAbsolute('downloadDir')

  return {
    name: 'vuepress-plugin-migrate',

    plugins: [
      [require('./crawler'), options],
      [require('./converter'), options],
    ],
  }
}
