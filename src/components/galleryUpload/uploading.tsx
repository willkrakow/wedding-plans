import React from "react";
import styled, { keyframes } from "styled-components";
import { H3 } from "../typography";
import { Row, Col } from "reactstrap";


const loading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoadingIndicator = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.colors.accent};
    border-bottom: 1px solid ${(props) => props.theme.colors.background};
    animation: ${loading} 1s linear infinite;
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
`



const Uploading = () => {
  return (
      <Row className="justify-content-center">
        <Col>
          <H3 centered>Uploading...</H3>
          <LoadingIndicator />
        </Col>
      </Row>
  );
};

export default Uploading
