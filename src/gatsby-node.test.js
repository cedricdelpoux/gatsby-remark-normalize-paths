const {onCreateNode} = require("./gatsby-node")
const utils = require("./utils")

jest.mock("./utils.js")

describe("gatsby-node", () => {
  const pluginOptions = {pathFields: ["image"]}

  it("should not change a node without frontmatter", () => {
    const node = new Node()

    onCreateNode({node}, pluginOptions)

    expect(node.frontmatter).toEqual({})
  })

  describe("when pluginOptions includes a pathsFields", () => {
    const pluginOptions = {pathFields: ["image"]}
    it("should convert fields listed in pathFields", () => {
      const node = new Node({image: "/path/to/image.jpg"})
      const relativePath = "./path/to/image.jpg"
      utils.getRelativePath.mockImplementation(() => relativePath)

      onCreateNode({node}, pluginOptions)

      expect(node.frontmatter).toEqual({image: relativePath})
    })

    it("should not convert fields not listed in pathFields", () => {
      const node = new Node({not_an_image: "/path/to/image.jpg"})

      onCreateNode({node}, pluginOptions)

      expect(node.frontmatter).toEqual({not_an_image: "/path/to/image.jpg"})
    })
  })

  describe("when pluginOptions does not include pathsFields", () => {
    const pluginOptions = {pathFields: undefined}

    it("should convert any string starting with '/' into a relative path", () => {
      utils.getRelativePath.mockImplementation(() => "./something.jpg")
      const node = new Node({pic: "/something"})

      onCreateNode({node}, pluginOptions)

      expect(node.frontmatter).toEqual({pic: "./something.jpg"})
    })

    it("should convert fields objects", () => {
      utils.getRelativePath.mockImplementation(() => "./something.jpg")
      const node = new Node({author: {portrait: "/something"}})

      onCreateNode({node}, pluginOptions)

      expect(node.frontmatter).toEqual({author: {portrait: "./something.jpg"}})
    })

    it("should convert arrays of paths", () => {
      utils.getRelativePath.mockImplementation(() => "./something.jpg")
      const node = new Node({gallery: ["/something", "/toot"]})

      onCreateNode({node}, pluginOptions)

      expect(node.frontmatter).toEqual({gallery: ["/something", "/toot"]})
    })

    it("should not convert fields of objects nested in arrays", () => {
      utils.getRelativePath.mockImplementation(() => "./something.jpg")
      const node = new Node({author: [{portrait: "/something"}]})

      onCreateNode({node}, pluginOptions)

      expect(node.frontmatter).not.toEqual({
        authors: [{portrait: "./something.jpg"}],
      })
    })
  })
})

class Node {
  constructor(frontmatter = {}) {
    this.frontmatter = frontmatter
    this.fileAbsolutePath = "some/file/path.md"
    this.internal = {type: "MarkdownRemark"}
  }
}
