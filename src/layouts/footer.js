import React from 'react'
import styled from 'styled-components'
import { Row, Col, Container } from 'reactstrap'
import { ElementText, SubtleText } from '../components/typography'

const FooterWrapper = styled(Container)(props => ({
    padding: props.theme.spacing[3],
    backgroundColor: props.theme.colors.background,
}));

const Footer = () => (
    <FooterWrapper as="footer">
        <Row className="justify-content-center">
            <Col xs={10} md={6} lg={4}>
                <ElementText as="address" className="text-center">
                    Designed and Developed by{" "}
                    <a href="https://williamkrakow.dev/" alt="William Krakow | Portfolio">
                        William Krakow
                    </a>
                </ElementText>
                <SubtleText className="text-center">&copy; 2021</SubtleText>
            </Col>
        </Row>
    </FooterWrapper>
);


export default Footer