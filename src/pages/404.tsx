import * as React from "react"
import { Link } from "gatsby"
import { H2, P } from '../components/typography'

const NotFoundPage = () => {
  return (
    <>
      <H2 centered>Page Not Found</H2>
      <P centered={true} >What the frick. Sorry about that.</P>
      <P centered={true} ><a href="mailto:willkrakow@gmail.com">Let me know</a> how you broke my site, or just <Link to="/">go back to the homepage.</Link></P>
    </>
  );
}

export default NotFoundPage
