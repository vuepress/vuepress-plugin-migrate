# 配置

## targetDir

- **类型:** `string`
- **默认值:** `'_posts'`

要输出 markdown 文件的目录。

## downloadDir

- **类型:** `string`
- **默认值:** `'.vuepress/downloads'`

用于存储下载文件的目录。

## maxConcurrentTasks

- **类型:** `number`
- **默认值:** `10`

允许的最大下载并发数。

## forceDownload

- **类型:** `boolean`
- **默认值:** `false`

当检测到 `.html` 文件已存在时是否强制下载。

## forceConvert

- **类型:** `boolean`
- **默认值:** `false`

当检测到 `.md` 文件已存在时是否强制覆盖。

## sitemap

- **类型:** `string`
- **默认值:** `undefined`

原网站的 sitemap 链接。

## getFileName

- **类型:** `(url: string) => string`
- **默认值:** `url => String(++index)`

要保存为的文件名。如果返回一个 falsy 值，则不下载对应的文件。

## parseHTML

- **类型:** `($: CheerioElement, render: ($: CheerioElement) => string) => ParsedResult`
- **默认值:** `undefined`

从爬取的 HTML 生成对应 `ParsedResult` 对象的函数。一个 `ParsedResult` 是一个含有以下属性的对象：

```ts
interface ParsedResult {
  frontmatter?: any
  filename?: string
  content?: string
}
```
