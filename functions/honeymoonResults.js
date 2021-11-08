// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {    
    const sessions = await stripe.checkout.sessions.list();
    

    

    const paidSessions = sessions.data.filter((session) => session.payment_status === 'paid')

    const allSessionsLineItems = await Promise.all(paidSessions.map(async (session) => {
        const data = await new Promise((resolve, reject) => {
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
        return {...data.data[0]}
    }))

    

    const destinations = [
        {title: "Big Sur"},
        {title: "Swiss Alps"},
        {title: "Rocky Mountains"},
    ]

    const results = destinations.map(destination => {
        const { title } = destination
        const destinationPayments = allSessionsLineItems.filter(session => {
            return session.description === destination.title
        })
        const totalPaymentValue = destinationPayments.reduce((prev, curr) => prev + curr.amount_total, 0)
        const totalPaymentCount = destinationPayments.length

        return {
            title,
            totalPaymentValue,
            totalPaymentCount
        }
    })

    
    const sumTotal = results.reduce((prev, curr) => prev + curr.totalPaymentValue, 0)
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
