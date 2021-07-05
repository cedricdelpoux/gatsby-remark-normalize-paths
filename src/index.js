const fs = require('fs');
const {isAbsolute} = require("path")
const visit = require(`unist-util-visit`)

const {getRelativePath} = require(`./utils.js`)

module.exports = ({getNode, markdownAST, markdownNode}, pluginOptions) => {
  const { prefix } = pluginOptions;

  visit(markdownAST, `image`, node => {
    const isAbsoluteUrl = isAbsolute(node.url)
    const {absolutePath} = getNode(markdownNode.parent)

    if (node.url && isAbsoluteUrl) {
      const imagePath = getRelativePath(absolutePath, node.url, prefix);
      const fullPath = `${__dirname}/${imagePath}`;

      fs.access(fullPath, fs.F_OK, (error) => {
        if (error) {

          if (error.code === 'ENOENT') {
            console.error('Image could not be found:', imagePath);
            return
          }

          console.error(error);
          return
        }
      })

      node.url = getRelativePath(absolutePath, node.url, prefix)
    }
  })
}
