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

module.exports = (cliOptions, options, context) => {
  readdirSync(options.downloadDir).forEach(async (name) => {
    const html = await readFile(resolve(options.downloadDir, name))
    const $ = cheerio.load(html, {
      decodeEntities: false,
    })
    const { frontmatter, content, filename } = options.parseHTML($, render)
    const frontmatterYAML = safeDump(ensureNoUndef(frontmatter)).trim()
    let output = content.trim()
    if (frontmatterYAML) {
      output = `---\n${frontmatterYAML}\n---\n\n` + output
    }
    output = output.replace(/\n{3,}/g, '\n\n') + '\n'
    writeFile(`${options.targetDir}/${filename}.md`, output)
  })
}
