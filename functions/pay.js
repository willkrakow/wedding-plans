// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
const dotenv = require("dotenv");
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const Airtable = require("airtable");

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
    const success_url = process.env.NODE_ENV === 'production' ? 'https://campbellkrakow.com/thank-you-honeymoon' : 'http://localhost:8888/thank-you-honeymoon';
    const { amount = 0, note = '' } = JSON.parse(event.body);
    if (amount < 1) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Sorry, we can\'t accept payments less than $1.',
            }),
        };
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: "William and Laura's Honeymoon Fund",
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: success_url,
        cancel_url: event.headers.referer,
    });

    await base('honeymoon_fund').create({
        amount: amount.toString(),
        note,
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            redirect_url: session.url
        }),
    }
}
