require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});
var Airtable = require("airtable");

const secret = "ST_ZDhhYmJjNmMtODdhMi00MTU5LWIxYzMtODljY2NmMGI5ZWQwNjM3NjMxNjAwNDEzMjc1MTcz"
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
);

exports.handler = async function order(event) {
    const eventJson = JSON.parse(event.body);

    
    console.log(eventJson.body.eventName)
    if (eventJson.body.eventName === "order.completed") {
        const { items } = eventJson.body.content
        items.forEach((item) => {
            base("registry").update(item.id, {
                purchased: 100,
            })
        })
    }
    console.log("Hit endpoint")
    return {
        statusCode: 200,
        body: JSON.stringify({ "message": "got it" })
    }
}