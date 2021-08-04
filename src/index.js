const fs = require("fs")
const {isAbsolute, join} = require("path")
const visit = require(`unist-util-visit`)

const {getRelativePath} = require(`./utils.js`)

module.exports = ({getNode, markdownAST, markdownNode}, pluginOptions) => {
  const {prefix} = pluginOptions

  visit(markdownAST, `image`, (node) => {
    const isAbsoluteUrl = isAbsolute(node.url)
    const {absolutePath} = getNode(markdownNode.parent)

    if (node.url && isAbsoluteUrl) {
      const newPath = prefix ? join(`/${prefix}`, node.url) : node.url
      const fullPath = `${process.cwd()}${newPath}`

      if (!fs.existsSync(fullPath)) {
        console.error(
          `Check the following file:\n${absolutePath}\n\nWhere the following image could not be found:\n${node.url}`
        )
        return
      }

      node.url = getRelativePath(absolutePath, node.url, prefix)
    }
  })
}
