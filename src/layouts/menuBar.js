import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import { BannerText, ElementSubtitle, NavItem } from '../components/typography'

const MenuWrapper = styled(Container)(props => ({
    paddingTop: props.theme.spacing[4],
    paddingBottom: props.theme.spacing[3],
    zIndex: '10',
    maxWidth: '90rem',
}))


const MobileMenuWrapper = styled.div`
display: ${props => props.isMobile ? "flex" : "none"};
`

const links = [
    {
        url: '/',
        alt: 'Home',
    },
    {
        url: '/registry',
        alt: 'Registry',
    },
    {
        url: '/rsvp',
        alt: 'RSVP',
    },
    {
        url: '/about',
        alt: 'About us'
    }
]

const MenuBar = () => {
    
    return (
    <MenuWrapper fluid>
        <Row>
            <Col xs={12}>
              <BannerText>Laura Gale Campbell <br /> &amp; <br />William Tompkins Krakow</BannerText>
              <ElementSubtitle alwaysdark ><time dateTime="2022-05-01">May 1, 2022</time></ElementSubtitle>
            </Col>
          </Row>
          <Row className="d-xs-none">
            {links.map((link, index) => (
              <Col className="text-center" key={index}>
                <NavItem to={link.url} alt={link.alt}>{link.alt}</NavItem>
              </Col>
            ))}
          </Row>
          <MobileMenuWrapper>
              <p>hi there</p>
          </MobileMenuWrapper>
    </MenuWrapper>
    )
}

export default MenuBar