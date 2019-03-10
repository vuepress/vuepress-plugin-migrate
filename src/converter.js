const cheerio = require('cheerio')
const spinner = require('./spinner')
const Renderer = require('./renderer')
const { resolve } = require('path')
const { safeDump } = require('js-yaml')
const { performance } = require('perf_hooks')
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

module.exports.convert = async (cliOptions, options, context) => {
  const files = readdirSync(options.downloadDir)

  let processed = 0
  const startTime = performance.now()
  await Promise.all(files.map(async (file) => {
    try {
      const html = await readFile(resolve(options.downloadDir, file))
      const $ = cheerio.load(html, {
        decodeEntities: false,
      })

      const renderer = new Renderer(options.renderRules)

      const {
        content = '',
        frontmatter = {},
        filename = file.replace(/\.html$/, '.md')
      } = options.parseHTML($, renderer.render.bind(renderer))

      const frontmatterYAML = safeDump(ensureNoUndef(frontmatter)).trim()
      let output = content.trim()
      if (frontmatterYAML) {
        output = `---\n${frontmatterYAML}\n---\n\n` + output
      }
      output = output.replace(/\n{3,}/g, '\n\n') + '\n'
      await writeFile(`${options.targetDir}/${filename}.md`, output)
      ++ processed
      spinner.start(`${filename} (${processed}/${files.length}) ...`)
    } catch (err) {
      ++ processed
      spinner.fail(`An error was encounted in ${file}`)
      if (cliOptions.debug) console.log(err)
    }
  }))

  if (files.length) {
    spinner.succeed(`Files were compiled in ${((performance.now() - startTime) / 1000).toFixed(2)}s.`)
  }
}

module.exports.registerOptions = command => command
  .option('--debug', 'use debug mode')
