import React from 'react'
import { Row, Col } from "reactstrap";
import { ElementText, ElementTitle } from '../components/typography'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Slide from 'react-reveal/Slide'
import Img from 'gatsby-image'

const AboutImage = styled(Img)`
width: auto;
overflow: hidden;
height: 100%;
display: block;
`

const Square = styled(Col)`
width: 100%;
display: flex;
flex-direction: column;
overflow: hidden;
`

const TextSquare = styled(Square)(props => ({
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  padding: props.theme.spacing[3],
  flexWrap: 'wrap',
}))

const InwardSpacer = styled.div(props => ({
  paddingLeft: props.theme.spacing[props.pl] || props.theme.spacing[props.px] || props.theme.spacing[5],
  paddingRight: props.theme.spacing[props.pr] || props.theme.spacing[props.px] || props.theme.spacing[5],
  paddingTop: props.theme.spacing[props.pt] || props.theme.spacing[props.py] || props.theme.spacing[5],
  paddingBottom: props.theme.spacing[props.pb] || props.theme.spacing[props.py] || props.theme.spacing[5],
}))

export default function About({data}) {
  const sections = data.allAirtable.edges
    return (
      <React.Fragment>
          {sections.map((section, index) => (
            <Slide left key={index}>
              <Row className="mr-0 ml-0">
                <TextSquare xs={12} md={6} className={`order-md-${(index % 2 === 0 ? '1' : '2').toString()} order-xs-2 px-0`}>
                  <InwardSpacer>
                    <ElementTitle>{section.node.data.section_title}</ElementTitle>
                    <ElementText>{section.node.data.section_text}</ElementText>
                  </InwardSpacer>
                </TextSquare>
                <Square xs={12} md={6} className={`order-md-${(index % 2 === 0 ? '2' : '1').toString()} order-xs-1 px-0`}>
                  <AboutImage fluid={section.node.data.image.localFiles[0].childImageSharp.fluid} alt={section.node.data.section_title} />
                </Square>
              </Row>
            </Slide>
          ))}
      </React.Fragment>
    );
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