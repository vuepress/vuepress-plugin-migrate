# vuepress-plugin-migrate

[![npm](https://img.shields.io/npm/v/vuepress-plugin-migrate.svg)](https://www.npmjs.com/package/vuepress-plugin-migrate)

A [VuePress](https://vuepress.vuejs.org/) plugin which migrates a website to VuePress.

- [CLI](#cli)
  - [vuepress download](#vuepress-download)
    - [-s, --sitemap `<sitemap>`](#s---sitemap-sitemap)
    - [-f, --force-download](#f---force-download)
    - [-c, --clear-download](#c---clear-download)
  - [vuepress convert](#vuepress-convert)
    - [-t, --target `<targetDir>`](#t---target-targetdir)
    - [-f, --force-convert](#f---force-convert)
    - [-c, --clear-target](#c---clear-target)
  - [vuepress migrate](#vuepress-migrate)
    - [-f, --force](#f---force)
    - [-c, --clear](#c---clear)
  - [general options](#general-options)
    - [--error-log](#error-log)
    - [--download-dir `<downloadDir>`](#download-dir-downloaddir)
- [Options](#options)
  - [targetDir](#targetdir)
  - [downloadDir](#downloaddir)
  - [maxConcurrentTasks](#maxconcurrenttasks)
  - [forceDownload](#forcedownload)
  - [clearDownloadDir](#cleardownloaddir)
  - [forceConvert](#forceconvert)
  - [clearTargetDir](#cleartargetdir)
  - [sitemap](#sitemap)
  - [getFileName](#getfilename)
  - [parseHTML](#parsehtml)
- [Contribution](#contribution)

## CLI

### vuepress download

Crawl pages from the source site and store them in [a local folder](#downloaddir).

#### -s, --sitemap `<sitemap>`

See [sitemap](#sitemap).

#### -f, --force-download

See [forceDownload](#forcedownload).

#### -c, --clear-download

See [clearDownloadDir](#cleardownloaddir).

### vuepress convert

Convert local HTML files to a markdown files and output them.

#### -t, --target `<targetDir>`

See [targetDir](#targetDir).

#### -f, --force-convert

See [forceConvert](#forceconvert).

#### -c, --clear-target

See [clearTargetDir](#cleartargetdir).

### vuepress migrate

Execute download and convert command in sequence. Supports parameters of both commands.

#### -f, --force

Equivalent to `--force-download --force-convert`.

#### -c, --clear

Equivalent to `--clear-download --clear-target`.

### general options

These options can be applied in all commands.

#### --error-log

Show detailed informations when an error is encounted.

#### --download-dir `<downloadDir>`

See [downloadDir](#downloaddir).

## Options

### targetDir

- **type:** `string`
- **default:** `'_posts'`

The directory for generated markdown files.

### downloadDir

- **type:** `string`
- **default:** `'.vuepress/downloads'`

The directory for downloaded HTMLs.

### maxConcurrentTasks

- **type:** `number`
- **default:** `10`

The maximum number of concurrent downloads allowed.

### forceDownload

- **type:** `boolean`
- **default:** `false`

Whether to force download a `.html` file when it already exists.

### clearDownloadDir

- **type:** `boolean`
- **default:** `false`

Whether to clear download directory before downloading.

### forceConvert

- **type:** `boolean`
- **default:** `false`

Whether to force overwrite a `.md` when it already exists.

### clearTargetDir

- **type:** `boolean`
- **default:** `false`

Whether to clear target directory before converting.

### sitemap

- **type:** `string`
- **default:** `undefined`

The sitemap URL for the source website.

### getFileName

- **type:** `(url: string) => string`
- **default:** `url => String(++index)`

The name of the file to save as. If a falsy value is returned, the corresponding file is not downloaded.

### parseHTML

- **type:** `($: CheerioElement, render: ($: CheerioElement) => string) => ParsedResult`
- **default:** `undefined`

Generates a function corresponding to the `ParsedResult` object from the crawled HTML. A `ParsedResult` is an object with the following properties:

```ts
interface ParsedResult {
  frontmatter?: any
  filename?: string
  content?: string
}
```

## Contribution

Contribution Welcome!
