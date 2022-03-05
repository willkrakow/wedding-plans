import React, { useState, useEffect } from 'react'
import { P, H2, H4 } from '../components/typography'
import { navigate, PageProps } from 'gatsby'
const isBrowser = typeof window !== 'undefined'
const ThankYou = (props: PageProps<any, any, {data: any}>) => {
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
        <H2 className="text-center w-100 d-block">Thank you!</H2>
        {(props.location.state?.data?.guests?.length > 0 && isBrowser) && props.location.state?.data?.guests?.map((guest) => (
          <H4 alwaysdark inline centered className="text-center w-100 d-block">
            {guest.first_name} {guest.last_name}
          </H4>   
        ))}
        <H4 centered alwaysdark inline>
          We can't wait to see you there!
        </H4>
        <P className="text-center w-100 d-block">
          Redirecting back to home page in <span>{counter.toString()}</span>...
        </P>
      </React.Fragment>
    );
    }


export default ThankYou