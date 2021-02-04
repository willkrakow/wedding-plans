import React, { useState } from "react";
import { ClassyCard } from "./layout";
import { SectionTitle, ElementText, ElementTitle } from "./typography";
import { Row, Col } from "reactstrap";
import styled from 'styled-components'


const ColorBox = styled.div.attrs(props => ({
  className: props.isactive ? "shadow-lg" : "" 
}))`
  background-color: ${(props) => props.color};
  height: 250px;
  width: 100%;
  z-index: ${props => props.isactive ? 4 : 3 - props.index};
  transform: ${props => props.isactive ? "scale(1.2)" : null};
  padding: 20px;
  margin: auto;
  transition: all 0.3s ease;
  &:hover{
    width: 175%;
  }
  @media (max-width: 575px) {
    width: 100vw;
    margin-left: -15px;
    margin-right: 0;
    border-radius: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
`;


const colors = ["#2AD477", "#66E896", "#18b5c7"];


export default function Colors() {
  const [isactive, setIsActive] = useState(0)

  function handleHover(index) {
    setIsActive(index);
  }
    return (

<ClassyCard>
  <Row onMouseLeave={() => handleHover(5)}>
    <Col xs={8} md={3}>
      <SectionTitle>Colors</SectionTitle>
    </Col>
    {colors.map((color, index) => (
      <Col
        className="col-md-2"
        xs={{ span: 10, offset: index >= 1 ? 2 : 0 }}
        md={{ span: 2, offset: index > 3 ? 0 : 0 }}
        key={index}
      >
        <ColorBox color={color} index={index} onMouseEnter={() => handleHover(index)} isactive={index === isactive}>
          <ElementTitle>Green Teal Grass</ElementTitle>
    <ElementText>{color}</ElementText>
        </ColorBox>
      </Col>
    ))}
    <Col xs={0} md={3}></Col>
  </Row>
</ClassyCard>
    )
}

