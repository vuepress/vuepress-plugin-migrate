// https://github.com/ulivz/vuepress-plugin-yuque/blob/master/lib/spinner.js

const ora = require('ora')
const { chalk } = require('@vuepress/shared-utils')

module.exports = !process.env.DEBUG
  ? ora()
  : [
    'frame',
    'clear',
    'render',
    'start',
    'stop',
    'succeed',
    'fail',
    'warn',
    'info',
    'stopAndPersist'
  ].reduce((memo, key) => {
    memo[key] = curry(key)
    return memo
  }, {})

function curry(name) {
  return (...args) => console.log(chalk.cyan(`spinner:${name}`), ...args)
}
