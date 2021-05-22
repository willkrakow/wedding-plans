import React from 'react'
import { H2 } from '../components/typography'
import { graphql } from 'gatsby'
import PageSection from '../containers/pageSection';
import PropTypes from 'prop-types'


export default function About({data}) {
  const sections = data.allAirtable.edges
    return (
      <React.Fragment>
      <H2 centered>About Us</H2>
      {sections.map((section, index) => (
        <PageSection key={index} sectionData={{
          title: section.node.data.section_title,
          bodyText: section.node.data.section_text,
          sectionFluid: {
            alt: section.node.data.section_title,
            isUrl: false,
            fluid: section.node.data.image.localFiles[0].childImageSharp.fluid 
          } 
        }} />
      ))}
      </React.Fragment>
    );
}

About.propTypes = {
  data: PropTypes.shape({
    allAirtable: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          data: PropTypes.shape({
            image: PropTypes.shape({
              localFiles: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                childImageSharp: PropTypes.shape({
                  fluid: PropTypes.any,
                })
              }))
            }),
            section_title: PropTypes.string,
            section_text: PropTypes.string,
          })
        })
      }))
    })
  })
}


export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "About"}}, sort: {order: ASC, fields: data___order}) {
      edges {
        node {
          data {
            image {
              localFiles {
                id
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
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