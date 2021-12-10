const Airtable = require("airtable");

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});


const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
);

async function createRsvp(data) {
    const toAdd = [{
        fields: {
            name: data.name,
            phone_number: data.phone_number,
            email: data.email,
            over_21: data.over21 ? "Yes" : "No",
            notes: data.notes,
            rsvp: "Yes",
            user_account_id: data.user_account_id,
        },
    }]

    const res = await base("rsvps").create(toAdd);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "RSVP created",
            data: {
                ...res[0].fields,
                id: res[0].id,
            },
        }),
    }
}

async function createRsvps(data) {
    const { test: guestData, user } = data;
    const toAdd = guestData.map((guest) => ({
        fields: {
            name: guest.name,
            phone_number: guest.phoneNumber,
            over_21: guest.over21 ? "Yes" : "No",
            notes: guest.notes,
            rsvp: "Yes",
            user_account_id: user.id,
            user_account_email: user.email,
        },
    }));

    base("rsvps").create([...toAdd], (err, records) => {
        if (err) {
            console.error("Something went wron: ", err);
            return false;
        }
        records.forEach((record) => {
            console.log("All went right. Created record ", record.getId());
        });
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Form submitted",
        }),
    };
}

async function getRsvps(userId) {
    const query = `user_account_id = "${userId}"`;

    const queryResults = await base("rsvps").select({
        filterByFormula: query,
    }).all();

    const data = queryResults.map(result => {
        return {
            ...result.fields,
            id: result.id,
            over_21: result.fields.over_21 === "Yes",
            rsvp: result.fields.rsvp === "Yes",
        }
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Form submitted",
            data
        }),
    };
}

async function deleteRsvp(recordId) {
    const queryResults = await base("rsvps").destroy(recordId);

    if (queryResults?.deletedRecords?.length === 0) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: "RSVP not found",
            }),
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Record deleted",
            id: recordId,
        }),
    };
}

async function updateRsvp(id, data) {
    const toUpdate = [{
        id: id,
        fields: {
            name: data.name,
            phone_number: data.phone_number,
            over_21: (data.over21 || data.over_21) ? "Yes" : "No",
            notes: data.notes,
            rsvp: data.rsvp ? "Yes" : "No",
            user_account_id: data.user_account_id,
        },
    }];
    const res = await base("rsvps").update(toUpdate);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "RSVP updated",
            data: res[0],
        }),
    }
}

module.exports = {
    createRsvp,
    createRsvps,
    getRsvps,
    deleteRsvp,
    updateRsvp,
};
