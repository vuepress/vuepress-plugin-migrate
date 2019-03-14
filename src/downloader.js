const pLimit = require('p-limit')
const fetch = require('node-fetch')
const spinner = require('./spinner')
const { parseString } = require('xml2js')
const { performance } = require('perf_hooks')
const { fs: { existsSync, writeFile }} = require('@vuepress/shared-utils')

module.exports.download = async (cliOptions, options, context) => {
  const sitemap = cliOptions.sitemap || options.sitemap
  const forced = cliOptions.forced || options.forceDownload
  if (!sitemap) return

  let urls
  try {
    const startTime = performance.now()
    spinner.start(`Fetching ${sitemap} ...`)
    const response = await fetch(sitemap)
    const xml = await response.text()
    urls = await new Promise((resolve, reject) => {
      parseString(xml, (err, { urlset: { url } }) => {
        if (err) throw reject(err)
        const output = []
        for (const { loc } of url) {
          output.push(loc[0])
        }
        resolve(output)
      })
    })
    spinner.succeed(`Sitemap was fetched in ${((performance.now() - startTime) / 1000).toFixed(2)}s.`)
  } catch (err) {
    spinner.fail('An error was encounted during sitemap fetching.')
    console.log(err)
    return
  }

  const startTime = performance.now()
  const limiter = pLimit(options.maxConcurrentTasks)
  const pages = urls.map((url) => {
    const filename = options.getFileName(url)
    if (!filename) return
    const filepath = `${options.downloadDir}/${filename}.html`
    if (existsSync(filepath) && !forced) return
    return [url, filename + '.html', filepath]
  }).filter(i => i)

  const pageCount = pages.length
  spinner.succeed(`Total ${urls.length} pages, skipped ${urls.length - pageCount} pages.`)

  let processed = 0
  await Promise.all(pages.map(async ([url, filename, filepath]) => {
    try {
      const response = await limiter(() => fetch(url))
      const html = await response.text()
      await writeFile(filepath, html)
      ++ processed
      spinner.start(`${filename} (${processed}/${pageCount}) ...`)
    } catch (err) {
      ++ processed
      spinner.fail(`An error was encounted in ${filename}`)
      if (cliOptions.detail) console.log(err)
    }
  }))

  if (pageCount) {
    spinner.succeed(`Pages were fetched in ${((performance.now() - startTime) / 1000).toFixed(2)}s.`)
  }
}

module.exports.registerOptions = command => command
  .option('-s, --sitemap <sitemap>', 'sitemap URL')
