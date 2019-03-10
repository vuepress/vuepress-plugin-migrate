const defaultRules = {
  h1: makeWrap('#', '\n\n'),
  h2: makeWrap('##', '\n\n'),
  h3: makeWrap('###', '\n\n'),
  h4: makeWrap('####', '\n\n'),
  h5: makeWrap('#####', '\n\n'),
  h6: makeWrap('######', '\n\n'),
  ul: makeWrap('', ''),
  li: makeWrap('- ', ''),
  ol: makeWrap('- ', ''), // FIXME
  em: makeWrap('*'),
  strong: makeWrap('**'),
  del: makeWrap('-'),
  span: makeWrap(),
  br: _ => '\n',
  a: el => `[${el.nodeValue}|${el.attribs.href}]`,
  img: el => `![image](${el.attribs.src})`,
  blockquote: makeWrap('> ', '\n\n'),
  p: makeWrap('', '\n\n'),
  div: makeWrap(),
  hr: _ => '---\n\n',
  iframe: _ => '[[iframe]]',
  audio: _ => '[[audio]]',
  video: _ => '[[video]]',
  table: _ => '[[table]]',
  nav: _ => '[[nav]]',
  i: makeWrap(),
  figure: makeWrap(), // FIXME
  figcaption: makeWrap('\n', ''),
}

module.exports = class Renderer {
  constructor(rules) {
    this.rules = {
      ...defaultRules,
      ...rules
    }
  }

  render(el) {
    let result = ''
    for (const child of el.children) {
      if (child.type === 'text') {
        result += child.nodeValue
      } else if (child.type === 'tag') {
        if (child.tagName in this.rules) {
          result += this.rules[child.tagName].call(this, child)
        } else {
          throw new Error(`Unrecognized tag name: ${child.tagName}`)
        }
      }
    }
    return result
  }
}

function makeWrap(leftWrap = '', rightWrap = leftWrap) {
  return function (el) {
    return leftWrap + this.render(el) + rightWrap
  }
}

module.exports.makeWrap = makeWrap
