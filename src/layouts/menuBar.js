import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'
import { H1, H4, NavItem } from '../components/typography'
import PropTypes from 'prop-types'
import MobileMenu from './mobileMenu'
import { Link } from 'gatsby'
const MenuWrapper = styled(Container)(props => ({
    paddingTop: props.theme.spacing[4],
    paddingBottom: props.theme.spacing[3],
    zIndex: '10',
    maxWidth: '90rem',
}))

const DesktopMenu = styled(Row)`
@media (max-width: 575px) {
  display: none;
}
`

const BannerHeader = styled(Link)`
text-decoration: none;
`


const MenuBar = ({isPrevious, links, activePage}) => {
    
    return (
    <MenuWrapper fluid>
        <Row>
            <Col xs={12}>
            <BannerHeader to={'/'} alt={'Laura Gale Campbell & William Tompkins Krakow | Home'}><H1>Laura Gale Campbell <br /> &amp; <br />William Tompkins Krakow</H1></BannerHeader>
              <H4 centered><time dateTime="2022-05-01">May 1, 2022</time></H4>
            </Col>
          </Row>
          <DesktopMenu noGutters className="justify-content-center">
            {links.map((link, index) => (
              <Col sm={3} md={3} lg={3} xl={2} className="text-center" key={index}>
                <NavItem isprevious={isPrevious ? 'true' : 'false'} to={link.path} alt={link.title}>{link.title}</NavItem>
              </Col>
            ))}
          </DesktopMenu>
          <Row>
            <Col >
             
            </Col>
            <Col className="text-end">
              <MobileMenu menulinks={links} activePage={activePage} />
            </Col>
          </Row>
    </MenuWrapper>
    )
}

MenuBar.propTypes = {
  isPrevious: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
  })),
  activePage: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
  })
}

export default MenuBar