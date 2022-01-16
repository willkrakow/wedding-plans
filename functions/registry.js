const chromium = require('chrome-aws-lambda')

const ZOLA_URL = 'https://www.zola.com/registry/campbellkrakow'


exports.handler = async (event, context) => {
// Data can come from anywhere, but for now create it manually
    const browser = await chromium.puppeteer.launch({
        // Required
        executablePath: await chromium.executablePath,

        // Optional
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless
    });

const page = await browser.newPage()
await page.goto(ZOLA_URL)
await page.waitForSelector('.registry-collection-item-tile_container')
const resultsSelector = '.product-tile'
// Remove last item

const data = await page.evaluate(resultsSelector => {
    const tiles = Array.from(document.querySelectorAll(resultsSelector))
    return tiles
        .map(tile => {
            const price = tile.querySelector('.price')?.innerText?.split("$")[1] || ""
            const name = tile.querySelector('.register-item-name_entity-name')?.innerText || ""
            const image = tile.querySelector('.entity-image picture img')?.getAttribute('src') || ""
            const stillNeeds = tile.querySelector('.still-needs')?.innerText?.split(":")[1]?.trim() || ""
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

return {
    statusCode: 200,
    body: JSON.stringify(data),
}
}