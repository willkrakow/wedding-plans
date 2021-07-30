const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const results = await graphql(`
    query MyQuery {
        allSanityPage {
            nodes {
                content {
                    _rawChildren(resolveReferences: {maxDepth: 10})
                    _type
                    style
                }
                slug {
                    current
                }
                title
            }
        }
    }
    `)
    if (results.errors) {
        reporter.panicOnBuild("Error building graphql page queries")
        return
    }

    const pageTemplate = path.resolve('src/templates/page.tsx')
    results.data.allSanityPage.nodes.forEach(page => {
        createPage({
            path: page.slug.current,
            component: pageTemplate,
            context: {
                page: page.content,
                title: page.title,
            },
        })
    })
}