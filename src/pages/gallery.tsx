import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { H2 } from '../components/typography'
import PhotoGrid from '../components/photoGrid'
import { IImage } from 'gatsby-plugin-image'
interface GalleryNodeProps {
  node: {
    parent: {
      id: String,
      data: {
        location: string | undefined,
        date: string | undefined,
        description: string | undefined,
        title: string | undefined,
      }
    },
    localFiles: Array<IImage>,
  }
}

interface GalleryProps extends PageProps {
  data: {
    allAirtableField: {
      edges: Array<GalleryNodeProps>
    }
  }
}


const Gallery = ({data}: GalleryProps) => {

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