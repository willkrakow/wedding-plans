import React from 'react'
import { H2 } from '../components/typography'
import { graphql, PageProps } from 'gatsby'
import PageSection from '../containers/pageSection';

const About: React.FC<AboutProps> = ({data}) => {
  const sections = data.allAirtable.edges
    return (
      <React.Fragment>
      <H2 centered>About Us</H2>
      {sections.map((section, index) => (
        <PageSection key={index} {...{
          title: section.node.data.section_title,
          bodyText: section.node.data.section_text,
          sectionFluid: {
            alt: section.node.data.section_title,
            image: section.node.data.image.localFiles[0].childImageSharp.gatsbyImageData 
          } 
        }} />
      ))}
      </React.Fragment>
    );
}

interface LocalFileProps {
  id: string,
  childImageSharp: any
}

interface AboutEdge extends PageProps{
  node: {
    data: {
      image: {
        localFiles: Array<LocalFileProps>
      }
      section_title: string,
      section_text: string,
    }
  }
}

type AboutProps = {
  data: {
    allAirtable: {
      edges: Array<AboutEdge>
    }
  }
}



export const query: any = graphql`
  {
    allAirtable(
      filter: {table: {eq: "About"}}
      sort: {order: ASC, fields: data___order}
    ) {
      edges {
        node {
          data {
            image {
              localFiles {
                id
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            section_title
            section_text
          }
        }
      }
    }
  }
`

export default About