import React from 'react'
import { Row, Col } from "reactstrap";
import Layout, { ClassyCard } from '../components/layout'
import { ElementText, ElementTitle } from '../components/typography'
import styled from 'styled-components'

const AboutImage = styled.img`
width: 100%;
height: auto;
`

export default function About() {
    return (
      <Layout
        metatitle="About"
        bannerimage="https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      >
        <ClassyCard className="mx-auto w-75">
          <Row>
            <Col xs={12} md={6}>
              <ElementTitle>How we met</ElementTitle>
              <ElementText></ElementText>
            </Col>
            <Col xs={12} md={6}>
              <AboutImage
                src="https://images.pexels.com/photos/2624875/pexels-photo-2624875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Us as kiddos"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <AboutImage
                src="https://images.pexels.com/photos/2624875/pexels-photo-2624875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Us as kiddos"
              />
            </Col>
            <Col xs={12} md={6}>
              <ElementTitle>Our story</ElementTitle>
              <ElementText></ElementText>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <ElementTitle>Our future</ElementTitle>
              <ElementText></ElementText>
            </Col>
            <Col xs={12} md={6}>
              <AboutImage
                src="https://images.pexels.com/photos/2624875/pexels-photo-2624875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Us as kiddos"
              />{" "}
            </Col>
          </Row>
        </ClassyCard>
      </Layout>
    );
}