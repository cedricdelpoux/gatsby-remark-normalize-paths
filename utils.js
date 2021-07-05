const {relative, dirname} = require("path")

function getRelativePath(fileAbsolutePath, path) {
  const currentAbsoluteDir = process.cwd()
  const nodeFileAbsoluteDir = dirname(fileAbsolutePath)
  const nodeFileRelativeDir = nodeFileAbsoluteDir.replace(
    `${currentAbsoluteDir}`,
    ""
  )

  return relative(nodeFileRelativeDir, path)
}

module.exports = {getRelativePath}
