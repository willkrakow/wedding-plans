const dotenv = require("dotenv");

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const Airtable = require("airtable");

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

exports.handler = async function (event, context) {
    const ipinfo = JSON.parse(event.body)
    console.log(ipinfo);
    console.log(event);
    console.log(context);
    try {
        await base('track').create({ event: JSON.stringify(event), context: JSON.stringify(context), ipinfo: JSON.stringify(ipinfo) });
        return {
            statusCode: 200,
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
        }
    }
}