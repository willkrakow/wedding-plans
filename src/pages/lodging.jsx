import React from 'react'
import PageSection from '../containers/pageSection'
import { graphql } from 'gatsby'

const Lodging = ({ data }) => {
    const hotels = data.allAirtable.nodes;

    return (
        hotels.map(hotel => (
            <PageSection key={hotel.id} sectionData={{ title: hotel.data.name, subtitle: hotel.data.location, sectionFluid: { fluid: hotel.data.image.localFiles[0].childImageSharp.fluid, alt: hotel.data.name }, bodyText: `$${hotel.data.price_range}+ per night` }} />
        ))
    )
}

export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "lodging"}}) {
      nodes {
        id
        data {
          price_range
          blocked_rooms
          location
          name
          image {
            localFiles {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`


export default Lodging