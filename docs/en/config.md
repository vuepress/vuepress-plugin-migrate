# Configurations

## targetDir

- **type:** `string`
- **default:** `'_posts'`

The directory for generated markdown files.

## downloadDir

- **type:** `string`
- **default:** `'.vuepress/downloads'`

The directory for downloaded HTMLs.

## maxConcurrentTasks

- **type:** `number`
- **default:** `10`

The maximum number of concurrent downloads allowed.

## forceDownload

- **type:** `boolean`
- **default:** `false`

Whether to force download a `.html` file when it already exists.

## forceConvert

- **type:** `boolean`
- **default:** `false`

Whether to force overwrite a `.md` when it already exists.

## sitemap

- **type:** `string`
- **default:** `undefined`

The sitemap URL for the source website.

## getFileName

- **type:** `(url: string) => string`
- **default:** `url => String(++index)`

The name of the file to save as. If a falsy value is returned, the corresponding file is not downloaded.

## parseHTML

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
