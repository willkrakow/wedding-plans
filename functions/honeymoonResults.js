// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
    const DESTINATIONS = [
        { title: "Basque Country" },
        { title: "Provence" },
        { title: "Valais" },
        { title: "Big Sur"}
    ]


    // Get all checkout sessions from stripe
    const sessions = await stripe.checkout.sessions.list();

    // Filter out unpaid sessions
    const paidSessions = sessions.data.filter((session) => session.payment_status === 'paid')

    // Helper to get line items for a session
    async function getLineItems(session) {
        return await new Promise((resolve, reject) => {
            stripe.checkout.sessions.listLineItems(
                session.id,
                {},
                function (err, lineItems) {
                    if (err) {
                        reject(err);
                    }
                    resolve(lineItems);
                }
            )
        })
    }
    // Get first line item for paid sessions
    const allSessionsLineItems = await Promise.all(paidSessions.map(async (session) => {
        const data = await getLineItems(session);
        return { ...data.data[0] }
    }))



    const results = DESTINATIONS.map(destination => {
        const { title } = destination
        // All completed sessions for this destination
        const destinationPayments = allSessionsLineItems.filter(session => {
            return session.description === destination.title
        })

        // Total of all payments for this destination
        const totalPaymentValue = destinationPayments.reduce((prev, curr) => prev + curr.amount_total, 0)

        // Total count of all payments for this destination
        const totalPaymentCount = destinationPayments.length

        return {
            title,
            totalPaymentValue,
            totalPaymentCount
        }
    })

    // Total value of all payments
    const sumTotal = results.reduce((prev, curr) => prev + curr.totalPaymentValue, 0)

    // Total count of all payments
    const sumCount = results.reduce((prev, curr) => prev + curr.totalPaymentCount, 0)

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "hit the honeymoon results",
            data: {
                results,
                sumTotal,
                sumCount
            }
        }),
    }
}
