import React from 'react'
import styled, {keyframes} from 'styled-components'
import { BannerText, SubtleText } from './typography'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap';
import '@fontsource/open-sans';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import SEO from '../utils/seo'

const slide = keyframes`
  0% {
    height: 100vh;
  }

  40% {
    height: 100vh;
  }

  100% {
    height: 80vh;
  }
`;

const NavigationIn = keyframes`
0% {
  transform: translateY(-10vh);
}

40% {
  transform: translateY(-10vh);
}

100% {
  transform: translateY(0vh);
}
`;


const Banner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  height: 80vh;
  margin-right: 0;
  margin-top: -10vh;
  animation: ${slide} ${props => props.metatitle === "LGC + WTK" ? "5s ease" : "0s ease"};
  background: rgba(255, 255, 255, 1);
  background-size: cover;
  background: url(${props => props.bannerimage});
  background-blend-mode: multiply;
`

const SecondaryBanner = styled(Banner)`
  height: 40vh;
  animation: none;
`

const Navigation = styled.div`
  width: 100vw;
  height: 10vh;
  background: transparent;
  display: flex;
  max-width: 100%;
  animation: ${NavigationIn} ${props => props.metatitle === "LGC + WTK" ? "5s ease" : "1s ease"};
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`;

const NavItem = styled(AniLink)`
  display: inline-block;
  padding: 0.5rem;
  color: #4e5755;
  font-size: 1.25em;
  font-weight: 300;
`;


export default function Layout({children, metatitle, bannerimage}) {


    return (
      <>
      <SEO title={metatitle} description={"Wedding Website for Laura Gale Campbell and William Tompkins Krakow"} />
        <Navigation>
          <NavItem swipe to="/" alt="Home">
            Home
          </NavItem>
          <NavItem swipe to="/registry" alt="Registry">
            Registry
          </NavItem>
          <NavItem swipe to="/rsvp" alt="RSVP">
            RSVP
          </NavItem>
          <NavItem swipe to="/about" alt="About">
            About
          </NavItem>
        </Navigation>
        {metatitle !== "Home" ? 
        <SecondaryBanner bannerimage={bannerimage} metatitle={metatitle}>
          <BannerText>{metatitle}</BannerText>
        </SecondaryBanner>
        : <Banner bannerimage={bannerimage} metatitle={metatitle}>
            <BannerText>LGC + WTK</BannerText>
        </Banner>}
        {children}
        <Footer />
      </>
    );
}

export const ClassyCard = styled(Container).attrs(props => ({
    className: "mb-5 py-4 mt-4"
}))``

const FooterWrapper = styled(Container).attrs((props) => ({
  className: "mt-5 py-5",
}))`
  background-color: #fafcfe;
`;

const Footer = () => (
  <FooterWrapper>
    <Row className="justify-content-center">
      <Col xs={10} md={6} lg={4}>
        <SubtleText className="text-center">
          Designed and Developed by{" "}
          <a href="https://williamkrakow.dev/" alt="William Krakow | Portfolio" className="text-muted">
            William Krakow
          </a>
        </SubtleText>
        <SubtleText className="text-center">&copy; 2021</SubtleText>
      </Col>
    </Row>
  </FooterWrapper>
);