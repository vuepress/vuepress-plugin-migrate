---
sidebarDepth: 3
---

# Introduction

## Usage

### Global Installation

```bash
npm install -g vuepress-plugin-migrate
# OR
yarn global add vuepress-plugin-migrate
```

### Local Installation

```bash
npm install vuepress-plugin-migrate
# OR
yarn add vuepress-plugin-migrate
```

### Add to `config.js`

```js
module.exports = {
  plugins: [
    ['migrate', {
      targetDir: '_posts',
      downloadDir: '.vuepress/downloads'
    }],
  ]
}
```
or
```js
module.exports = {
  plugins: {
    migrate: {
      sitemap: 'path/to/your/sitemap.xml',
      maxConcurrentTasks: 10,
      getFileName(url) {
        if (!/\?p=(\d+)/.test(url)) return false
        return RegExp.$1
      },
    },
  }
}
```

See detailed configurations [here](./config.md).

