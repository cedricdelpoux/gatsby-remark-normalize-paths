const {isAbsolute} = require("path")
const isValidPath = require("is-valid-path")

const {getRelativePath} = require("./utils.js")

function normalizePath(path, nodeInfo) {
  const {fileAbsolutePath} = nodeInfo
  const isString = typeof path === "string"

  // Stop if field is not a valid path
  if (!path || !isString || !isValidPath(path)) {
    // Remove field if empty to prevent Gatsby crashing
    if (isString && path.length === 0) {
      return undefined
    }
  }

  // Normalize path field from absolute to relative
  if (path && isString && isAbsolute(path)) {
    return getRelativePath(fileAbsolutePath, path)
  }

  return path
}

function normalizeArray(arr, nodeInfo) {
  const newArr = []
  for (let val of arr) {
    if (Array.isArray(val)) {
      newArr.push(normalizeArray(val, nodeInfo))
    } else if (typeof val === "object") {
      newArr.push(normalizeObject(val, nodeInfo))
    } else {
      newArr.push(normalizePath(val, nodeInfo))
    }
  }
  return newArr
}

function normalizeObject(obj, nodeInfo) {
  const newObj = {}
  for (let key in obj) {
    // don't convert if pathFields is specified and this key isn't in it
    if (
      nodeInfo.pathFields &&
      Array.isArray(nodeInfo.pathFields) &&
      nodeInfo.pathFields.indexOf(key) < 0
    ) {
      newObj[key] = obj[key]
    } else if (Array.isArray(obj[key])) {
      newObj[key] = normalizeArray(obj[key], nodeInfo)
    } else if (typeof obj[key] === "object") {
      newObj[key] = normalizeObject(obj[key], nodeInfo)
    } else {
      newObj[key] = normalizePath(obj[key], nodeInfo)
    }
  }
  return newObj
}

exports.onCreateNode = ({node}, pluginOptions) => {
  const isMarkdownRemark = node.internal.type === "MarkdownRemark"

  if (!isMarkdownRemark) {
    return
  }

  node.frontmatter = normalizeObject(node.frontmatter, {
    pathFields: pluginOptions.pathFields,
    fileAbsolutePath: node.fileAbsolutePath,
  })
}
