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
    if (event.httpMethod === "POST") {
        const {guests} = JSON.parse(event.body);
        let response= {
            message: "Success",
            guests: []
        }
        await guests.forEach(async (guest) => {
            try{
                const result = await base('rsvps').create({
                    _id: guest.id,
                    first_name: guest.first_name,
                    last_name: guest.last_name,
                    age: parseInt(guest.age),
                    email: guest.email,
                    attending: guest.attending,
                    phone_number: guest.phone_number,
                    notes: guest.notes,
                    created_at: new Date().toISOString(),
                    dietary_restrictions: guest.dietary_restrictions,
                });
                response.guests.push({ id: result.id, ...result.fields })
            }
            catch(error){
                console.log(error)
                response.message = "Error"
            }
            
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Rsvps created",
                data: response,
            }),
        };
    }
}