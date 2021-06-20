import React from 'react'
import { graphql } from 'gatsby'
import { H2 } from '../components/typography'
import PhotoGrid from '../components/photoGrid'

const Gallery = ({data}) => {

  const photoData = data.allAirtableField.edges;

  return (
    <>
      <H2 centered>Gallery</H2>
      <PhotoGrid photos={photoData} />
    </>
  )
}

export const query = graphql`
  {
    allAirtableField {
      edges {
        node {
          parent {
            id
            ... on Airtable {
              id
              data {
                location
                date
                description
                title
              }
            }
          }
          localFiles {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
              resize(fit: CONTAIN) {
                aspectRatio
              }
            }
          }
        }
      }
    }
  }
`




export default Gallery