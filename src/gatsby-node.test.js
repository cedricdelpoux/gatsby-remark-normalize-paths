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

  it("should change top-level field marked as a path", () => {
    const node = new Node({image: "/path/to/image.jpg"})
    const relativePath = "./path/to/image.jpg"
    utils.getRelativePath.mockImplementation(() => relativePath)

    onCreateNode({node}, pluginOptions)

    expect(node.frontmatter).toEqual({image: relativePath})
  })

  it("should not change top-level field that's not been marked as a field", () => {
    const node = new Node({not_an_image: "/path/to/image.jpg"})

    onCreateNode({node}, pluginOptions)

    expect(node.frontmatter).toEqual({not_an_image: "/path/to/image.jpg"})
  })
})

class Node {
  constructor(frontmatter = {}) {
    this.frontmatter = frontmatter
    this.fileAbsolutePath = "some/file/path.md"
    this.internal = {type: "MarkdownRemark"}
  }
}
