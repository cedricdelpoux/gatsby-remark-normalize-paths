const {getRelativePath} = require("./utils")

describe("utils", () => {
  describe("when pluginOptions prefix parameter is defined", () => {
    it("should add the prefix to the beginning of the path", () => {
      const fileAbsolutePath =
        "/Users/person/projects/project/content/blog/article/item/index.md"
      const path = "/images/blog/article-1.jpg"
      const prefix = "content"
      const result = getRelativePath(fileAbsolutePath, path, prefix)

      expect(result).toEqual(
        "../../../../../../../../content/images/blog/article-1.jpg"
      )
    })
  })

  describe("when pluginOptions prefix parameter is not defined", () => {
    it("should not add the prefix to the beginning of the path", () => {
      const fileAbsolutePath =
        "/Users/person/projects/project/content/blog/article/item/index.md"
      const path = "/images/blog/article-1.jpg"
      const prefix = undefined
      const result = getRelativePath(fileAbsolutePath, path, prefix)

      expect(result).toEqual(
        "../../../../../../../../images/blog/article-1.jpg"
      )
    })
  })
})
