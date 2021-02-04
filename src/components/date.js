import React from 'react'
import { ClassyCard } from './layout'
import { SectionTitle, ElementTitle } from './typography'
import { Row, Col } from 'reactstrap'
import Slide from 'react-reveal/Slide'
import { useStaticQuery, graphql } from 'gatsby'


export default function Date(){
const data = useStaticQuery(graphql`
  {
    airtable(data: { Name: { eq: "Date" } }, table: { eq: "Home" }) {
      data {
        Name
        Subtitle
        Title
      }
    }
  }
`);
console.log(data.airtable.data.Name)
    return (
      <Slide left>
        <ClassyCard>
          <Row>
            <Col xs={12} md={3}>
              <SectionTitle>{data.airtable.data.Name}</SectionTitle>
            </Col>
            <Col xs={12} md={6}>
              <ElementTitle>{data.airtable.data.Title}</ElementTitle>
              <ElementTitle>{data.airtable.data.Subtitle}</ElementTitle>
            </Col>
          </Row>
        </ClassyCard>
      </Slide>
    );
}