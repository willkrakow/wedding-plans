import React from "react";
import styled from "styled-components";
import { SectionTitle, ElementTitle, ElementText } from "./typography";
import { ClassyCard } from './layout'
import { Row, Col, Button } from 'reactstrap'
import Slide from 'react-reveal/Slide'
import { useStaticQuery, graphql } from 'gatsby'

const LocationImage = styled.img`
  width: 100%;
  height: auto;
`;

export default function Location() {

  const data = useStaticQuery(graphql`
    {
      airtable(data: { Name: { eq: "Location" } }, table: { eq: "Home" }) {
        data {
          Name
          Subtitle
          Title
          Image
          Description
          Website
        }
      }
    }
  `);
  return (
    <Slide left fraction={0.3}>
      <ClassyCard className="w-100">
        <Row>
          <Col xs={12} md={3}>
            <SectionTitle>{data.airtable.data.Name}</SectionTitle>
          </Col>
          <Col xs={12} md={6}>
                <ElementTitle>{data.airtable.data.Title}</ElementTitle>
                <LocationImage src={data.airtable.data.Image} alt={data.airtable.data.Name} />
                <ElementText>{data.airtable.data.Description}</ElementText>
                <a href={data.airtable.data.Website} alt={data.airtable.data.Title}>
                  <Button className="btn-dark rounded-0">Learn more</Button>
                </a>
          </Col>
        </Row>
      </ClassyCard>
    </Slide>
  );
}
