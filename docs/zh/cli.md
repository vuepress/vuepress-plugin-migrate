---
sidebarDepth: 3
---

# CLI

## 通用选项

这些选项将在任何一个命令中生效。

### --detail

在遇到错误时显示详细信息。

### -f, --forced

相当于将 [forceDownload](./config.md#forceDownload) 和 [forceConvert](./config.md#forceConvert) 都设置为 `true`。

## vuepress download

从源网站中爬取所需的页面，并存储到本地文件夹中。

### -s, --sitemap `<sitemap>`

详见 [sitemap](./config.md#sitemap)。

## vuepress convert

将存储在本地的 HTML 文件转化为 markdown 文件并输出。

### -t, --target `<targetDir>`

详见 [targetDir](./config.md#targetDir)。

## vuepress migrate

依次完成 download 和 convert 两个命令。支持两个命令的全部参数。
