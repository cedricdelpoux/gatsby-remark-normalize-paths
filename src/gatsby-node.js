const {isAbsolute} = require("path")
const eachProps = require("each-props")
const isValidPath = require("is-valid-path")

const {getRelativePath} = require("./utils.js")

function normalizePath(path, keyChain, nodeInfo) {
  const {name, fileAbsolutePath, pathFields} = nodeInfo
  const isString = typeof path === "string"

  // Stop if pathFields is specified and do not include field name
  if (
    pathFields &&
    Array.isArray(pathFields) &&
    pathFields.indexOf(name) === -1
  ) {
    return
  }

  // Stop if field is not a valid path
  if (!path || !isString || !isValidPath(path)) {
    // Remove field if empty to prevent Gatsby crashing
    if (isString && path.length === 0) {
      nodeInfo.parent[name] = undefined
    }
    return
  }

  // Normalize path field from absolute to relative
  if (path && isString && isAbsolute(path)) {
    nodeInfo.parent[name] = getRelativePath(fileAbsolutePath, path)
  }
}

exports.onCreateNode = ({node}, pluginOptions) => {
  const isMarkdownRemark = node.internal.type === "MarkdownRemark"

  if (!isMarkdownRemark) {
    return
  }

  eachProps(node.frontmatter, normalizePath, {
    pathFields: pluginOptions.pathFields,
    fileAbsolutePath: node.fileAbsolutePath,
  })
}
