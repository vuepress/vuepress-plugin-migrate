const cheerio = require('cheerio')
const { resolve } = require('path')
const { safeDump } = require('js-yaml')
const { renderer, render } = require('./renderer')
const { readdirSync, promises: { readFile, writeFile } } = require('fs')

function ensureNoUndef(source) {
  if (Array.isArray(source)) {
    return source.map(value => {
      if (value === undefined) return null
      return ensureNoUndef(value)
    })
  } else if (typeof source !== 'object' || !source) {
    return source
  } else {
    const result = {}
    for (const key in source) {
      if (source[key] !== undefined) {
        result[key] = ensureNoUndef(source[key])
      }
    }
    return result
  }
}

module.exports = (options, context) => ({
  name: 'vuepress-plugin-migrate:converter',

  extendCli(cli) {
    cli
      .command('convert', 'convert HTML files into markdown')
      .allowUnknownOptions()
      .action((cliOptions) => {
        const targetDir = resolve(context.sourceDir, options.targetDir)
        readdirSync(options.downloadDir).forEach(async (name) => {
          const html = await readFile(resolve(options.downloadDir, name))
          const $ = cheerio.load(html, {
            decodeEntities: false,
          })
          const { frontmatter, content, filename } = options.parseHTML($, render)
          const output = (
            '---\n' +
            safeDump(ensureNoUndef(frontmatter)) +
            '---\n' +
            content.trim()
          ).replace(/\n{3,}/g, '\n\n') + '\n'
          writeFile(`${targetDir}/${filename}.md`, output)
        })
      })
  }
})
