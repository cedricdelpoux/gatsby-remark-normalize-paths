const {isAbsolute} = require("path")
const visit = require(`unist-util-visit`)

const {getRelativePath} = require(`./utils.js`)

module.exports = ({getNode, markdownAST, markdownNode}) => {
  visit(markdownAST, `image`, node => {
    const isAbsoluteUrl = isAbsolute(node.url)
    const {absolutePath} = getNode(markdownNode.parent)

    if (node.url && isAbsoluteUrl) {
      node.url = getRelativePath(absolutePath, node.url)
    }
  })
}
