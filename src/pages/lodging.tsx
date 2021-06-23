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
    description: string | undefined,
    booking_url: string,
    main_url: string,
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

const determineDollarSigns = (price: number): number => {
  if (price < 200){
    return 1
  }
  if (price < 260){
    return 2
  }
  return 3
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
              bodyText={hotel.data.description}
              cta={{ label: "Book Now", link: hotel.data.booking_url }}
              cta_secondary={{ label: "Learn More", link: hotel.data.main_url }}
              finalSymbol={{ symbol: "$", count: determineDollarSigns(hotel.data.price_range) }}
              finalMessage={ `From $${hotel.data.price_range.toString()} a night` }
            />
            
        ))}
        </>
    )
}
export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "lodging" } }) {
      nodes {
        data {
          booking_url
          main_url
          name
          price_range
          description
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          location
        }
      }
    }
  }
`;


export default Lodging