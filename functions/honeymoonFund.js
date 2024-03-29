// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const dotenv = require('dotenv');

dotenv.config();
exports.handler = async function (event, context) {
    const success_url = process.env.NODE_ENV === 'production' ? 'https://campbellkrakow.com/thank-you' : 'http://localhost:8888/thank-you';
    const { amount } = JSON.parse(event.body);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: "Honeymoon Fund",
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


    return {
        statusCode: 200,
        body: JSON.stringify({
            redirect_url: session.url
        }),
    }
}
