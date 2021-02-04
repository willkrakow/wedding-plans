import React from 'react'
import { SectionTitle, ElementText, ElementTitle } from './typography'
import { ClassyCard } from './layout'
import Slide from 'react-reveal/Slide'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'


const CakeImage = styled.img`
width: 100%;
height: auto;
`
export default function Cake() {
    return (
      <Slide left>
        <ClassyCard>
          <Row>
            <Col xs={12} md={3}>
              <SectionTitle>Cake</SectionTitle>
            </Col>
            <Col xs={12} md={6}>
              <ElementTitle>Peanut Butter Frosted Dandelion Cream</ElementTitle>
              <ElementText>by Appalachian Cakes</ElementText>
              <CakeImage
                src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Peanut Butter Frosted Dandelion Cream"
              />
            </Col>
          </Row>
        </ClassyCard>
      </Slide>
    );
}
