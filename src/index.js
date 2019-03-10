const { resolve, isAbsolute } = require('path')
const { existsSync, mkdirSync } = require('fs')
const crawler = require('./crawler')
const converter = require('./converter')

let fileIndex = 0
const defaultgetFileName = () => String(++fileIndex)

module.exports = (options, context) => {
  options = {
    targetDir: '_posts',
    downloadDir: '.vuepress/downloads',
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
      const convertCommand = cli
        .command('convert', 'convert HTML files into markdown')
        .allowUnknownOptions()
      converter.registerOptions(convertCommand)
      convertCommand.action(cliOptions => converter.convert(cliOptions, options, context))

      const crawlCommand = cli
        .command('crawl', 'crawl pages offered by given sitemap')
        .allowUnknownOptions()
      crawler.registerOptions(crawlCommand)
      crawlCommand.action(cliOptions => crawler.crawl(cliOptions, options, context))
      
      const migrateCommand = cli
        .command('migrate', 'migrate from another website')
        .allowUnknownOptions()
      converter.registerOptions(migrateCommand)
      crawler.registerOptions(migrateCommand)
      migrateCommand.action(async (cliOptions) => {
        await crawler.crawl(cliOptions, options, context)
        await converter.convert(cliOptions, options, context)
      })
    },
  }
}
