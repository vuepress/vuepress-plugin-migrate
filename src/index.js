const { resolve, isAbsolute } = require('path')
const { existsSync, mkdirSync } = require('fs')
const crawl = require('./crawler')
const convert = require('./converter')

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

    extendCli(cli) {
      cli
        .command('convert', 'convert HTML files into markdown')
        .allowUnknownOptions()
        .action(cliOptions => convert(cliOptions, options, context))
      cli
        .command('crawl', 'crawl pages offered by given sitemap')
        .option('-s, --sitemap <sitemap>', 'sitemap URL')
        .option('-f, --forced', 'forced downloading')
        .allowUnknownOptions()
        .action(cliOptions => crawl(cliOptions, options, context))
    },
  }
}
