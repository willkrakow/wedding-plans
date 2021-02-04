import React from 'react'
import Layout from '../components/layout'
import { ElementText, ElementTitle } from '../components/typography'

const ThankYou = () => (
    <Layout metatitle="Thank you!">
        <ElementTitle className="text-center w-100 d-block">We can't wait to see you there!</ElementTitle>
        <ElementText className="text-center w-100 d-block">Redirecting back to home page in ...<span></span></ElementText>
    </Layout>
)

export default ThankYou