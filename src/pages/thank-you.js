import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { ElementText, ElementTitle } from '../components/typography'
import { navigate } from 'gatsby'
const ThankYou = () => {
    const [counter, setCounter] = useState(5)

    useEffect(() => {
        if(counter > 0) {
            setTimeout(() => setCounter(counter -1), 1000)
        }
        else {
            navigate("/")
        }
       
    }, [counter])
    return (
      <Layout metatitle="Thank you!">
        <ElementTitle className="text-center w-100 d-block">
          We can't wait to see you there!
        </ElementTitle>
        <ElementText className="text-center w-100 d-block">
    Redirecting back to home page in <span>{counter.toString()}</span>...
        </ElementText>
      </Layout>
    );
    }


export default ThankYou