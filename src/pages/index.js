import * as React from "react"
import Layout from '../components/layout'
import Location from '../components/location'
import Date from '../components/date'
import Colors from '../components/colors'
import Cake from '../components/cake'

const IndexPage = () => {
  return (
    <Layout
      metatitle="Home"
      bannerimage="https://images.pexels.com/photos/1145353/pexels-photo-1145353.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <Date />
      <Location />
      <Colors />
      <Cake />
    </Layout>
  );
}

export default IndexPage
