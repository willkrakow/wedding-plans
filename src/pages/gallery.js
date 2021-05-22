import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { H2 } from '../components/typography'
import { ClassyCard } from '../containers/classyCard'
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
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
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
    <ClassyCard>
      <H2 centered>Gallery</H2>
      <PhotoGrid photos={photoData} />
    </ClassyCard>
  )
}




export default Gallery