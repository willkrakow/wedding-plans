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
                        images: [
                            "https://res.cloudinary.com/djmk8xgrk/image/upload/v1646961579/carolinabeach_pdbbgq.jpg",
                            "https://res.cloudinary.com/djmk8xgrk/image/upload/v1616892285/E9AFBD2F-9C59-4623-9C90-0C1EE710E2D7_1_201_a_nx9xyj.jpg",
                            "https://res.cloudinary.com/djmk8xgrk/image/upload/v1647049555/772583BD-9489-4E20-9E4C-82ABC9094D57_1_201_a_uejxkp.jpg",
                            "https://res.cloudinary.com/djmk8xgrk/image/upload/v1647049604/smilesatbeach_zv6imm.jpg"
                        ]
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
    if (session?.id) {
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
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: 'Sorry, something went wrong. Please try again.',
        }),
    };

    
}
