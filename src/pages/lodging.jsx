import React from 'react'
import PageSection from '../containers/pageSection'
import { graphql } from 'gatsby'
import { H2 } from '../components/typography';

const Lodging = ({ data }) => {
    const hotels = data.allAirtable.nodes;

    return (
      <>
      <H2 centered>Lodging</H2>
        {hotels.map(hotel => (
            <PageSection key={hotel.id} sectionData={{ title: hotel.data.name, subtitle: hotel.data.location, sectionFluid: { fluid: hotel.data.image.localFiles[0].childImageSharp.fluid, alt: hotel.data.name }, bodyText: `$${hotel.data.price_range}+ per night` }} />
        ))}
        </>
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