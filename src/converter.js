const cheerio = require('cheerio')
const spinner = require('./spinner')
const Renderer = require('./renderer')
const { safeDump } = require('js-yaml')
const { performance } = require('perf_hooks')
const { fs, path } = require('@vuepress/shared-utils')
const { readdirSync, existsSync, readFile, writeFile } = fs

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
  const forced = cliOptions.forced || options.forceConvert
  const targetDir = cliOptions.target
    ? path.resolve(context.sourceDir, cliOptions.target)
    : options.targetDir
  if (!targetDir) return

  let processed = 0
  const startTime = performance.now()
  await Promise.all(files.map(async (file) => {
    try {
      const html = await readFile(`${options.downloadDir}/${file}`)
      const $ = cheerio.load(html, {
        decodeEntities: false,
      })

      const renderer = new Renderer({
        renderRules: options.renderRules,
        skipUnknown: options.skipUnknownTags,
      })

      const {
        content = '',
        frontmatter = {},
        filename = file.replace(/\.html$/, '')
      } = options.parseHTML($, renderer.render.bind(renderer))

      const filepath = `${targetDir}/${filename}.md`
      if (!existsSync(filepath) || forced) {
        const frontmatterYAML = safeDump(ensureNoUndef(frontmatter)).trim()
        let output = content.trim()
        if (frontmatterYAML) {
          output = `---\n${frontmatterYAML}\n---\n\n` + output
        }
        output = output.replace(/\n{3,}/g, '\n\n') + '\n'
        await writeFile(`${targetDir}/${filename}.md`, output)
      }

      ++ processed
      spinner.start(`${filename} (${processed}/${files.length}) ...`)
    } catch (err) {
      ++ processed
      spinner.fail(`An error was encounted in ${file}`)
      if (cliOptions.detail) console.log(err)
    }
  }))

  if (files.length) {
    spinner.succeed(`Files were compiled in ${((performance.now() - startTime) / 1000).toFixed(2)}s.`)
  }
}

module.exports.registerOptions = command => command
  .option('-t, --target <targetDir>', 'target directory')
