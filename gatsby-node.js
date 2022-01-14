const { createRemoteFileNode } = require('gatsby-source-filesystem')
const puppeteer = require('puppeteer')

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
        page.matchPath = "/app/*"
        // Update the page.
        createPage(page)
    }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions
    const ZOLA_URL = 'https://www.zola.com/registry/campbellkrakow'

    // Data can come from anywhere, but for now create it manually
    const browser = await puppeteer.launch({
        headless: true,
    })
    const page = await browser.newPage()
    await page.goto(ZOLA_URL)
    await page.waitForSelector('.registry-collection-item-tile_container')
    const resultsSelector = '.product-tile'
    // Remove last item
    
    const data = await page.evaluate(resultsSelector => {
        const tiles = Array.from(document.querySelectorAll(resultsSelector))
        return tiles
        .map(tile => {
            const price = tile.querySelector('.price')?.innerText?.split("$")?.[1] || ""
            const name = tile.querySelector('.register-item-name_entity-name')?.innerText || ""
            const image = tile.querySelector('.entity-image picture img')?.getAttribute('src') || ""
            const stillNeeds = tile.querySelector('.still-needs')?.innerText?.split(":")?.[1].trim() || ""
            const productId = tile.querySelector('.registry-item-thumbnail')?.getAttribute('href')?.split('/')?.pop() || ""
            return {
                productId,
                price,
                name,
                image,
                stillNeeds
            }
        })
        .filter((item) => item.name !== "Gift Card")
    }, resultsSelector)

    await browser.close()


    data.forEach(item => {
        const nodeMeta = {
            id: createNodeId(`zola-product-${item.productId}`),
            parent: null,
            children: [],
            internal: {
                type: `ZolaProduct`,
                content: JSON.stringify(item),
                contentDigest: createContentDigest(item),
                mediaType: `text/html`
            }
        }
        const node = Object.assign({}, item, nodeMeta)
        createNode(node)
    })

    await browser.close()
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    type ZolaProduct implements Node {
        id: ID!
        productId: String!
        price: String!
        name: String!
        image: String!
        stillNeeds: String!
        localImage: File @link(from: "fields.localFile")
    }
    `
    createTypes(typeDefs)
}

exports.onCreateNode = async ({
    node,
    actions,
    createNodeId,
    getCache,
}) => {
    const { createNode, createNodeField } = actions
    // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
    if (
        node.internal.type === "ZolaProduct" &&
        node.image !== null
    ) {
        const fileNode = await createRemoteFileNode({
            url: node.image, // string that points to the URL of the image
            parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
            createNode, // helper function in gatsby-node to generate the node
            createNodeId, // helper function in gatsby-node to generate the node id
            getCache,
        })
        // if the file was created, extend the node with "localFile"
        if (fileNode) {
            createNodeField({ node, name: "localFile", value: fileNode.id })
        }
    }
}