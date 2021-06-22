import React from 'react'
import PageSection from '../containers/pageSection'
import { graphql } from 'gatsby'
import { H2 } from '../components/typography';

interface LodgingNodeProps {
  id: string,
  data: {
    price_range: number,
    blocked_rooms: number,
    location: string,
    name: string,
    image: {
      localFiles: Array<any>
    }
  }
}

interface LodgingProps {
  data: {
    allAirtable: {
      nodes: Array<LodgingNodeProps>
    }
  }
}

const Lodging = ({ data }: LodgingProps) => {
    const hotels = data.allAirtable.nodes;

    return (
      <>
      <H2 centered>Lodging</H2>
        {hotels.map(hotel => (
            <PageSection
              key={hotel.id}
              title={hotel.data.name}
              subtitle={hotel.data.location}
              sectionFluid={{image: hotel.data.image.localFiles[0].childImageSharp.gatsbyImageData, alt: hotel.data.name}}
              bodyText={`$${hotel.data.price_range}+ per night`}
            />
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
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`


export default Lodging