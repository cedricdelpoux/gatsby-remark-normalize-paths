const {onCreateNode} = require("./gatsby-node")

describe("gatsby-node", () => {
  it("should not change a node without frontmatter", () => {
    const pluginOptions = {pathFields: []}
    const node = {
      fileAbsolutePath: "test",
      frontmatter: {},
      internal: {
        type: "MarkdownRemark",
      },
    }

    onCreateNode({node}, pluginOptions)

    expect(node.frontmatter).toEqual({})
  })
})
