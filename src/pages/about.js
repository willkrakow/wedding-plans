import React from 'react'
import { Row, Col } from "reactstrap";
import Layout, { ClassyCard } from '../components/layout'
import { ElementText, ElementTitle } from '../components/typography'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Slide from 'react-reveal/Slide'

const AboutImage = styled.img`
width: 100%;
height: auto;
`

export default function About({data}) {
  const { allAirtable } = data
    return (
      <Layout
        metatitle="About us"
        bannerimage="https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      >
        <ClassyCard className="mx-auto w-75">
          {allAirtable.edges.map((node, index) => (
            <Slide>
              <Row className="my-5" key={index}>
                <Col xs={12} md={6}>
                  <ElementTitle>{node.node.data.section_title}</ElementTitle>
                  <ElementText>{node.node.data.section_text}</ElementText>
                </Col>
                <Col xs={12} md={6}>
                  <AboutImage
                    src={node.node.data.image[0].url}
                    alt={node.node.data.section_title}
                  />
                </Col>
              </Row>
            </Slide>
          ))}
        </ClassyCard>
      </Layout>
    );
}
export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "About" } }
      sort: { fields: data___order }
    ) {
      edges {
        node {
          data {
            section_title
            image {
              url
            }
            section_text
            order
          }
        }
      }
    }
  }
`;