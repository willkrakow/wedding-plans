
const dotenv = require("dotenv");
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

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


const TWILIO_FROM = "+15614685895"
const guestMessage = (name) => `Hi ${name}, thanks for RSVPing for the wedding! We can't wait to see you there! - Laura and William`
const ourMessage = (name) => `${name} just RSVP'd for the wedding!`
async function sendResponseMessage(client, toPhoneNumber, name, isGuest){
    const message = isGuest ? guestMessage(name) : ourMessage(name)
    client.messages.create({
        from: TWILIO_FROM,
        to: toPhoneNumber,
        body: message
    })
}

exports.handler = async (event, context) => {
    if (event.httpMethod === "POST") {
        const {guests} = JSON.parse(event.body);
        const response = {
            message: "Success",
            guests: []
        }
        for (const guest of guests) {
            try{
                const cleaned_phone_number = guest?.phone_number ? guest.phone_number?.replace(/\D/g, '') : ""
                const cleaned_country_code = guest?.phone_country_code?.[0] === "+" ? guest.phone_country_code : `+${guest.phone_country_code}`
                const cleaned_phone_number_with_country_code = `${cleaned_country_code}${cleaned_phone_number}`
                const result = await base('rsvps').create({
                    _id: guest.id,
                    first_name: guest.first_name,
                    last_name: guest.last_name,
                    age: parseInt(guest.age),
                    email: guest.email,
                    attending: guest.attending,
                    phone_number: `${guest?.phone_country_code || ''}${cleaned_phone_number}`,
                    notes: guest.notes,
                    created_at: new Date().toISOString(),
                    dietary_restrictions: guest.dietary_restrictions,
                });
                if (guest.phone_number && guest.attending) {
                    await sendResponseMessage(twilioClient, cleaned_phone_number_with_country_code, guest.first_name, true)
                }
                await sendResponseMessage(twilioClient, "+19199239882", guest.first_name, false);
                await sendResponseMessage(twilioClient, "+9197251099", guest.first_name, false);
                
                response.guests.push({ id: result.id, ...result.fields })
            }
            catch(error){
                console.log(error)
                response.message = "Error"
            }
            
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(response),
        };
    }
}