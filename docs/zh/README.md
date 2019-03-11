---
sidebarDepth: 3
---

# 介绍

vuepress-plugin-migrate 是一个用于从其他网站迁移到 VuePress 的插件。

## 用法

### 全局安装

```bash
npm install -g vuepress-plugin-migrate
# 或者
yarn global add vuepress-plugin-migrate
```

### 局部安装

```bash
npm install vuepress-plugin-migrate
# 或者
yarn add vuepress-plugin-migrate
```

### 添加到 `config.js`

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
或者
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

在[这里](./config.md)可以查看详细的配置。