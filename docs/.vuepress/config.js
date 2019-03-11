const name = 'vuepress-plugin-migrate'

const guideSidebar = () => [
  '',
  'config.html',
]

module.exports = ({ isProd }) => ({
  base: `/${name}/`,

  plugins: [
    '@vuepress/medium-zoom',
    '@vuepress/back-to-top',
  ],
  
  locales: {
    '/': {
      lang: 'en-US',
      title: name,
      description: 'A VuePress plugin which migrates a website to VuePress.',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: name,
      description: '一个从其他网站迁移到 VuePress 的插件',
    },
  },
  
  themeConfig: {
    repo: `Shigma/${name}`,
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [{
          text: 'Ecosystem',
          items: [{
            text: 'plugins',
            items: [{
              text: 'vuepress-plugin-mathjax',
              link: 'https://Shigma.github.io/vuepress-plugin-mathjax',
            }, {
              text: 'vuepress-plugin-pangu',
              link: 'https://Shigma.github.io/markdown-it-pangu/',
            }],
          }],
        }],
        sidebar: {
          '/': guideSidebar(),
        },
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [{
          text: '生态系统',
          items: [{
            text: '插件',
            items: [{
              text: 'vuepress-plugin-mathjax',
              link: 'https://Shigma.github.io/vuepress-plugin-mathjax',
            }, {
              text: 'vuepress-plugin-pangu',
              link: 'https://Shigma.github.io/markdown-it-pangu/',
            }],
          }],
        }],
        sidebar: {
          '/zh/': guideSidebar(),
        },
      },
    },
  },

  evergreen: !isProd,
})
