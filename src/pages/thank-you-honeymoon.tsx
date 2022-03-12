import React from 'react'
import {H2, H4, P} from '../components/typography'
import { navigate } from 'gatsby'

const ThankYouHoneymoon = () => {
    const [counter, setCounter] = React.useState(10);

    React.useEffect(() => {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        navigate("/");
      }
    }, [counter]);
    return (
      <>
        <H2 centered>Thank you!</H2>
        <H4 alwaysdark inline centered>
          We can't wait to see you at the wedding!
        </H4>
        <P className="text-center w-100 d-block">
          Redirecting back to home page in <span>{counter.toString()}</span>...
        </P>
      </>
    );
}

export default ThankYouHoneymoon;