import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import { H1, H4, NavItem } from '../components/typography'
import MobileMenu from './mobileMenu'
import { Link } from 'gatsby'

const MenuWrapper = styled(Container)`
    padding-top: ${props => props.theme.spacing[4]};
    padding-bottom: ${props => props.theme.spacing[3]};
    z-index: 10;
    max-width: 90rem;
`

const DesktopMenu = styled(Row)`
@media (max-width: 575px) {
  display: none;
}
`

const BannerHeader = styled(Link)`
text-decoration: none;
`
export interface MenuBarLinkProps {
  path: string,
  title: string,
}

interface MenuBarProps {
  links: Array<MenuBarLinkProps>,
}

const MenuBar = ({links}: MenuBarProps): JSX.Element => {    
    return (
      <MenuWrapper fluid>
        <Row>
          <Col xs={12}>
            <BannerHeader to={"/"}>
              <H1>Laura &amp; Will</H1>
            </BannerHeader>
            <H4 alwaysdark={false} inline={false} centered={true}>
              <time dateTime="2022-05-01">May 1, 2022</time>
            </H4>
          </Col>
        </Row>
        <DesktopMenu noGutters className="justify-content-center">
          {links.map((link, index) => (
            <Col
              sm={3}
              md={3}
              lg={2}
              xl={2}
              className="text-center"
              key={index}
            >
              <NavItem to={link.path}>{link.title}</NavItem>
            </Col>
          ))}
        </DesktopMenu>
        <Row>
          <Col className="text-center">
            <MobileMenu menulinks={links} />
          </Col>
        </Row>
      </MenuWrapper>
    );
}


export default MenuBar