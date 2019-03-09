const { resolve } = require('path')
const { existsSync, mkdirSync } = require('fs')

let fileIndex = 0
const defaultGetFilename = () => String(++fileIndex)

module.exports = (options, context) => {
  options = {
    downloadDir: resolve(context.vuepressDir, 'downloads'),
    getFilename: defaultGetFilename,
    ...options,
  }

  if (!existsSync(options.downloadDir)) {
    mkdirSync(options.downloadDir)
  }

  return {
    name: 'vuepress-plugin-migrate',

    plugins: [
      [require('./crawler'), options]
    ],
  }
}
