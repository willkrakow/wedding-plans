const dotenv = require("dotenv");
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const Airtable = require("airtable");

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

let HEADERS = {
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
    'Content-Type': 'application/json', //optional
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '8640'
}

HEADERS['Access-Control-Allow-Origin'] = '*'
HEADERS['Vary'] = 'Origin'

exports.handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: '204', HEADERS }
    }
    if (event.httpMethod === "GET") {
        const {inviteId} = event.queryStringParameters;

        if (inviteId) {
            const invite = await base("invites").find(inviteId);
            const formattedInvite = {
                id: invite.id,
                ...invite.fields
            }
            const rsvps = await base("rsvps").select({
                filterByFormula: `{family_id} = '${inviteId}'`,
            }).all();
            const formattedRsvps = rsvps.map((rsvp) => {
                return {
                    id: rsvp.id,
                    ...rsvp.fields,
                }
            });

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Invite found",
                    data: {
                        invite: formattedInvite,
                        rsvps: formattedRsvps,
                    },
                }),
                HEADERS,
            };
        }
    }

    if (event.httpMethod === "POST") {
        const {name, email, phone_number, notes, family_id} = JSON.parse(event.body);

        const newRsvp = {
            name,
            email,
            phone_number,
            notes,
            family_id,
        }

        const rsvpCreated = await base("rsvps").create(newRsvp);
        const formattedRsvp = {
            id: rsvpCreated.id,
            ...rsvpCreated.fields,
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Rsvp created",
                data: formattedRsvp,
            }),
        };
    }

    if (event.httpMethod === "PUT") {
        const {id, name, email, phone_number, notes, family_id} = JSON.parse(event.body);

        const updatedRsvp = {
            name,
            email,
            phone_number,
            notes,
            family_id,
        }

        const rsvpUpdated = await base("rsvps").update(id, updatedRsvp);
        const formattedUpdatedRsvp = {
            id: rsvpUpdated.id,
            ...rsvpUpdated.fields,
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Rsvp updated",
                data: formattedUpdatedRsvp,
            }),
        };
    }

    if (event.httpMethod === "DELETE") {
        const {id} = JSON.parse(event.body);
        const rsvpDeleted = await base("rsvps").destroy(id);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Rsvp deleted",
                data: rsvpDeleted,
            }),
        };
    }
}