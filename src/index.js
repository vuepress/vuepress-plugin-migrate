const downloader = require('./downloader')
const converter = require('./converter')
const shared = require('./shared')
const {
  fs: { existsSync, mkdirSync },
  path: { resolve, isAbsolute },
} = require('@vuepress/shared-utils')

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
      const convertCommand = cli.command('convert', 'convert HTML files into markdown')
      converter.registerOptions(convertCommand)
      shared.registerOptions(convertCommand)
        .option('-f, --forced', 'force converting')
        .action(cliOptions => converter.convert(cliOptions, options, context))

      const downloadCommand = cli.command('download', 'download pages offered by given sitemap')
      downloader.registerOptions(downloadCommand)
      shared.registerOptions(downloadCommand)
        .option('-f, --forced', 'force downloading')
        .action(cliOptions => downloader.download(cliOptions, options, context))
      
      const migrateCommand = cli.command('migrate', 'migrate from another website')
      converter.registerOptions(migrateCommand)
      downloader.registerOptions(migrateCommand)
      shared.registerOptions(migrateCommand)
        .option('-f, --forced', 'force downloading and converting')
        .action(async (cliOptions) => {
          await downloader.download(cliOptions, options, context)
          await converter.convert(cliOptions, options, context)
        })
    },
  }
}
