What's different in this forked version?

Primarily, it's the addition of `prefix` option in `pluginOptions`

This means that if you have a number of images referenced as `/image/location/img-123.jpg`, setting `prefix` to `content` will transform the image path to `/content/image/location/img-123.jpg`

These changes [have been proposed](https://github.com/cedricdelpoux/gatsby-remark-normalize-paths/pull/13) to the author of the plugin. If these have been merged since, then assume this fork outdated.

---

<div align="center">
  <h1>gatsby-remark-normalize-paths</h1>

[![Npm version][badge-npm]][npm]
[![Npm downloads][badge-npm-dl]][npm]
[![MIT license][badge-licence]](./LICENCE.md)
[![PRs welcome][badge-prs-welcome]](#contributing)

</div>

---

`gatsby-remark-normalize-paths` normalize your paths to be gatsby compliant.

It finds absolute paths deeply in the frontmatter and the body of your markdown files and transforms them to relative paths. If you have empty fields, it deletes them (optional).

## Usecase

-   You use a CMS (eg: [Netlify-cms](https://github.com/netlify/netlify-cms)) to manage your markdown files but it does not format gatsby-friendly paths.
-   You use `gatsby-transformer-sharp` and your images fields should not be empty to avoid the error `GraphQL Error Field must not have a selection since type "String" has no subfields` when you build,

Let's imagine your gatsby data structure is the following:

```
/
  ↳ content
    ↳ posts
      ↳ post-1.md
    ↳ images
      ↳ image-1.jpeg
      ↳ image-2.jpeg
      ↳ image-3.jpeg
      ↳ image-4.jpeg
      ↳ image-5.jpeg
  ↳ src
  ↳ public
  ↳ static
```

And your markdown files contain absolute paths:

```markdown
---
title: "Post 1"
cover: "/content/images/image-1.jpg"
images:
    - "/content/images/image-2.jpg"
    - "/content/images/image-3.jpg"
    - "/content/images/image-4.jpg"
---

Lorem ipsum ![](/content/images/image-5.jpg) Lorem ipsum
```

In your markdown frontmatter or body, you can use absolute paths (`/content/images/image-1.jpg`) and they will be converted to relative paths (`../images/image-1.jpg`)

## Getting started

[![gatsby-remark-normalize-paths](https://nodei.co/npm/gatsby-remark-normalize-paths.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gatsby-remark-normalize-paths/)

You can download `gatsby-remark-normalize-paths` from the NPM registry via the
`npm` or `yarn` commands

```shell
yarn add gatsby-remark-normalize-paths
npm install gatsby-remark-normalize-paths --save
```

## Usage

Add the plugin in your `gatsby-config.js` file:

```js
module.exports = {
    plugins: [
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    // without options
                    "gatsby-remark-normalize-paths"
                    // or
                    // with options
                    {
                        resolve: "gatsby-remark-normalize-paths",
                        options: {
                            pathFields: ["image", "cover"],
                            // Will change your image path from /image/location/img-123.jpg
                            // to /content/image/location/img-123.jpg
                            prefix: "content"
                        },
                    },
                ],
            },
        },
    ],
}
```

> Note:
> If you don't want this plugin to delete empty frontmatter of some fields, you need to specify pathFields

## Contributing

-   ⇄ Pull/Merge requests and ★ Stars are always welcome.
-   For bugs and feature requests, please [create an issue][github-issue].

See [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## License

This project is licensed under the MIT License - see the
[LICENCE.md](./LICENCE.md) file for details

[badge-npm]: https://img.shields.io/npm/v/gatsby-remark-normalize-paths.svg?style=flat-square
[badge-npm-dl]: https://img.shields.io/npm/dt/gatsby-remark-normalize-paths.svg?style=flat-square
[badge-licence]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[badge-prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-remark-normalize-paths
[github-issue]: https://github.com/xuopled/gatsby-remark-normalize-paths/issues/new
