const dotenv = require("dotenv");
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const Airtable = require("airtable");

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

exports.handler = async (event, context) => {
    if (event.httpMethod === "GET") {
        const {inviteId} = event.queryStringParameters;
        if (inviteId) {
            const invite = await base("invites").find(inviteId);
            const formattedInvite = {
                id: invite.id,
                ...invite.fields
            }
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Invite found",
                    data: formattedInvite,
                }),
            };
        }
    }
}
