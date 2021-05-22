import React, { useState, useEffect } from 'react'
import { P, H2 } from '../components/typography'
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
      <React.Fragment>
        <H2 className="text-center w-100 d-block">
          We can't wait to see you there!
        </H2>
        <P className="text-center w-100 d-block">
    Redirecting back to home page in <span>{counter.toString()}</span>...
        </P>
      </React.Fragment>
    );
    }


export default ThankYou