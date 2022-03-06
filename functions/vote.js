const dotenv = require("dotenv");
const v4 = require('uuid').v4

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const Airtable = require("airtable");

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Max-Age': '2592000',
    'Access-Control-Allow-Credentials': 'true',
};

exports.handler = async function (event, context) {

    const { vote = {} } = JSON.parse(event.body);
    try {
        const result = await base('honeymoon_votes').create({
            _id: v4(),
            first_name: vote.first_name,
            last_name: vote.last_name,
            destination: vote.destination,
            notes: vote.notes,
            created_at: new Date().toISOString(),
        });

        if (result.fields) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    message: "Success",
                    vote: result.fields,
                }),
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: "Error",
                error: result,
            }),
        }
    }
}