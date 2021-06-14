import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { H2 } from '../components/typography'
import PhotoGrid from '../components/photoGrid'

const Gallery = () => {
  const data = useStaticQuery(graphql`
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
                gatsbyImageData
                resize {
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  `)

  const photoData = data.allAirtableField.edges;

  return (
    <>
      <H2 centered>Gallery</H2>
      <PhotoGrid photos={photoData} />
    </>
  )
}




export default Gallery