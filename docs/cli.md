---
sidebarDepth: 3
---

# CLI

## General options

These options will take effect in any of the commands.

### --detail

Show detailed informations when an error is encounted.

### -f, --forced

Equivalent to setting [forceDownload](./config.md#forceDownload) and [forceConvert](./config.md#forceConvert) to `true`.

## vuepress download

Crawl the required pages from the source site and store them in a local folder.

### -s, --sitemap `<sitemap>`

See [sitemap](./config.md#sitemap).

## vuepress convert

Convert local HTML files to a markdown files and output them.

### -t, --target `<targetDir>`

See [targetDir](./config.md#targetDir).

## vuepress migrate

Execute download and convert command in sequence. Supports parameters of both commands.
