const {relative, dirname} = require("path")

function getRelativePath(fileAbsolutePath, path, prefix) {
  const currentAbsoluteDir = process.cwd()
  const nodeFileAbsoluteDir = dirname(fileAbsolutePath)
  const nodeFileRelativeDir = nodeFileAbsoluteDir.replace(
    `${currentAbsoluteDir}`,
    ""
  )

  const newPath = prefix ? `${prefix}${path}` : path

  return relative(nodeFileRelativeDir, newPath)
}

module.exports = {getRelativePath}
