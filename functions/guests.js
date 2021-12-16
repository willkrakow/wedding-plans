require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});
var Airtable = require("airtable");

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

async function getFamilyData(familyName) {
    const family = await base
        .table("guest_list")
        .select({
            filterByFormula: `family = '${familyName}'`,
        })
        .all()
    return family;
}


const responseObject = (statusCode, message, data) => {
    return {
        statusCode,
        body: JSON.stringify({
            message,
            data: data,
        })
    }
}


async function getGuestById (id) {
    const guest = await base('guest_list').find(id);
    return guest;
}

async function updateGuests(data) {
    const newData = data.map((member) => {
        return {
            id: member?.id || member?.record_id,
            fields: {
                name: member?.name,
                email: member?.email || "",
                phone_number: member?.phone_number || "",
                over_21: member?.over_21 ? "Yes" : "No",
                rsvp: member?.rsvp ? "Yes" : "No",
                notes: member?.notes || "",
                dinner_option: member?.dinner_option || "",
            }
        }
    });
    const updated = await base.table("guest_list").update(newData)
    return updated;
}


exports.handler = async (event, context) => {
    if (event.httpMethod === "GET") {
        const { familyName, id } = event.queryStringParameters;
        // If family name provided, return all guests in that family
        if (familyName) {
            const decodedName = decodeURIComponent(familyName);
            const family = await getFamilyData(decodedName);
            
            return family?.length === 0
                ? responseObject(404, "Family not found", {})
                : responseObject(200, "Success", family)
        }
        if (id) {
            // If id is provided, return that guest
            const guest = await getGuestById(id);
            if (guest === undefined) {
                return responseObject(404, "Guest not found", {});
            }
            // Then return the guest's family
            const family = await getFamilyData(guest.fields.family[0]);

            return family?.length 
            ? responseObject(201, "Family not found", family)
            : responseObject(200, "Success", family);
        }
            
        return responseObject(400, "Invalid request", {});
    }
    if (event.httpMethod === "PUT") {
        const { data } = JSON.parse(event.body);

        const updated = await updateGuests(data);

        return updated?.length === 0
        ? responseObject(500, "Error updating data", {})
        : responseObject(200, "Family updated", updated)
    }
};

