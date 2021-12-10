const {createRsvps, createRsvp, getRsvps, deleteRsvp, updateRsvp} = require("./helpers")

async function handler(event, context) {
    if (event.httpMethod === "POST") {
        const formBody = JSON.parse(event.body);
        try {
            return await createRsvp(formBody);
        }
        catch (err) {
            console.log(err)
            return {
                statusCode: 500,
                body: JSON.stringify(err)
            }
        }
    }

    if (event.httpMethod === "GET") {
        const { id } = event.queryStringParameters;
        try {
            return await getRsvps(id);
        }
        catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify(err)
            }
        }
    }

    if (event.httpMethod === "DELETE") {
        const { id } = JSON.parse(event.body);
        try {
            return await deleteRsvp(id);
        }
        catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify(err)
            }
        }
    }

    if (event.httpMethod === "PUT") {
        const {data, id} = JSON.parse(event.body);
        try {
            const stuff = await updateRsvp(id, data);
            return {
                statusCode: 200,
                body: JSON.stringify(stuff)
            }
        }
        catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify(err)
            }
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Don't have that method yet",
        }),
    };
};
module.exports = { handler };