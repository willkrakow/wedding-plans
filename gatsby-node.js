const { createRemoteFileNode } = require('gatsby-source-filesystem')
const fetch = require('node-fetch')
require('gatsby')

const AMAZON_REGISTRY_ID = "A5UU7G422X2I"
const AMAZON_REGISTRY_URL = "https://www.amazon.com/wedding/items/A5UU7G422X2I"
const AMAZON_REGISTRY_QUERY = "?ref_=wedding_guest_view_product_tile&colid=A5UU7G422X2I"

const createAmazonUrl = (item) => {
    return `https://www.amazon.com${item.productUrl}${AMAZON_REGISTRY_QUERY}&coliid=${item.legacyItemId}&registryId=${AMAZON_REGISTRY_ID}`
}
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

exports.sourceNodes = async ({ actions, reporter, createNodeId, createContentDigest, cache }) => {
    const { createNode } = actions
    const getAmazonData = async () => {
        const cacheName = "amazon-data"

        const value = await cache.get(cacheName)
        if (value) {
            reporter.info("Using Amazon cached data")
            return value
        }
        reporter.info("Fetching Amazon data")
        const res = await fetch(AMAZON_REGISTRY_URL)
        const data = await res.json()

        if (!data.success) {
            reporter.error("Error fetching Amazon data")
            return
        }

        reporter.info(`Fetched ${data.result.minimalRegistryItems.length} items from Amazon`)
        await cache.set(cacheName, data)
        return data
    }

    const data = await getAmazonData()
    data.result.minimalRegistryItems.forEach((item) => {
        const nodeMeta = {
            id: createNodeId(`amazon-product-${item.itemId}`),
            parent: null,
            children: [],
            internal: {
                type: `AmazonProduct`,
                content: JSON.stringify(item),
                contentDigest: createContentDigest(item),
            },
        }

        const extractedData = {
            productId: item.itemId,
            legacyItemId: item.legacyItemId,
            requested: item.qtyRequested,
            needed: item.qtyNeeded,
            purchased: item.qtyPurchased,
            image: item.imageUrl,
            title: item.productTitle,
            category: item.productGroupType,
            price: item.itemPrice.amount,
            priceString: item.itemPrice.displayString,
            inStock: item.inStock,
            primeShippingEligible: item.primeShippingEligible,
            productUrl: createAmazonUrl(item),
        }

        const node = Object.assign({}, extractedData, nodeMeta)
        createNode(node)
    })
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    type AmazonProduct implements Node {
        id: ID!
        productId: String!
        requested: Int!
        needed: Int!
        purchased: Int!
        image: String!
        title: String!
        category: String!
        price: Float!
        priceString: String!
        inStock: Boolean!
        primeShippingEligible: Boolean!
        productUrl: String!
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
        node.internal.type === "AmazonProduct" &&
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