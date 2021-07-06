import React from 'react'
import styled from 'styled-components'
import { Row, Col, Container } from 'reactstrap'
import { P, H5 } from '../components/typography'

const FooterWrapper = styled(Container)(props => ({
    padding: props.theme.spacing[3],
    backgroundColor: props.theme.colors.background,
}));

const Footer = () => {
    
    return (
        <FooterWrapper as="footer">
            <Row className="justify-content-center">
                <Col xs={10} md={6} lg={4}>
                    <P as="address" className="text-center">
                        Designed and Developed by{" "}
                        <a href="https://williamkrakow.dev/" >
                            William Krakow
                        </a>
                    </P>
                    <H5 centered={false} className="text-center">&copy; {new Date().getFullYear().toString()}</H5>
                </Col>
            </Row>
        </FooterWrapper>
    )
};


export default Footer