const pLimit = require('p-limit')
const fetch = require('node-fetch')
const { resolve } = require('path')
const { parseString } = require('xml2js')
const { existsSync, promises: { writeFile } } = require('fs')

module.exports = (options, context) => ({
  name: 'vuepress-plugin-migrate:crawler',

  extendCli(cli) {
    cli
      .command('crawl', 'crawl pages offered by given sitemap')
      .option('-s, --sitemap <sitemap>', 'sitemap URL')
      .option('-f, --forced', 'forced downloading')
      .allowUnknownOptions()
      .action(async (cliOptions) => {
        const sitemap = cliOptions.sitemap || options.sitemap
        if (!sitemap) return
        const response = await fetch(sitemap)
        const xml = await response.text()
        const pages = await new Promise((resolve, reject) => {
          parseString(xml, (err, { urlset: { url } }) => {
            if (err) throw reject(err)
            const output = []
            for (const { loc } of url) {
              output.push(loc[0])
            }
            resolve(output)
          })
        })
        const limiter = pLimit(options.maxConcurrentTasks)
        pages.forEach(async (url) => {
          const filename = options.getFileName(url)
          if (!filename) return
          const filepath = resolve(options.downloadDir, filename + '.html')
          if (existsSync(filepath) && !cliOptions.forced) return
          const response = await limiter(() => fetch(url))
          const html = await response.text()
          await writeFile(filepath, html)
        })
      })
  }
})
