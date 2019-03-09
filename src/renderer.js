const renderer = {
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
  span: render,
  br: _ => '\n',
  a: el => `[${el.nodeValue}|${el.attribs.href}]`,
  img: el => `![image](${el.attribs.src})`,
  blockquote: makeWrap('> ', '\n\n'),
  p: makeWrap('', '\n\n'),
  div: render,
  hr: _ => '---\n\n',
  iframe: _ => '[[iframe]]',
  audio: _ => '[[audio]]',
  video: _ => '[[video]]',
  table: _ => '[[table]]',
  nav: _ => '[[nav]]',
  i: render,
  figure: render, // FIXME
  figcaption: makeWrap('\n', ''),
}

function makeWrap(leftWrap = '', rightWrap = leftWrap) {
  return el => leftWrap + render(el) + rightWrap
}

function render(el) {
  let result = ''
  for (const child of el.children) {
    if (child.type === 'text') {
      result += child.nodeValue
    } else if (child.type === 'tag') {
      if (child.tagName in renderer) {
        result += renderer[child.tagName](child)
      } else {
        console.log(child)
        throw child.tagName
      }
    }
  }
  return result
}

module.exports = {
  renderer,
  makeWrap,
  render,
}
