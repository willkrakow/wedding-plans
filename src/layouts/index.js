import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { BannerText, ElementSubtitle, ElementText } from '../components/typography'
import { Container, Row, Col } from 'reactstrap';
import '@fontsource/open-sans';
import SEO from '../utils/seo'
import { theme, darkTheme } from '../theme';
import Button, { WhiteButton } from '../components/button';
import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, graphql, Link } from 'gatsby'
import 'bootstrap/dist/css/bootstrap.min.css'



const NavItem = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.fontSizes[2]};
  font-weight: ${props => props.theme.fontWeights.body};
  font-family: ${props => props.theme.fonts.headers};
  transition: all 0.5s ease;
  text-decoration: underline;
  text-decoration-color: transparent;
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration-color: ${props => props.theme.colors.primary},
  };
`;

const MenuBar = styled(Container)(props => ({
  paddingTop: props.theme.spacing[3],
  paddingBottom: props.theme.spacing[3],
  zIndex: '10',
}))

const Main = styled.main(props => ({
  backgroundColor: props.theme.colors.background,
}))

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

const StickyButton = styled(Button)`
position: sticky;
bottom: ${props => props.theme.spacing[4]};
left: 100vw;
z-index: 50;
`

const StickyWhiteButton = styled(WhiteButton)`
position: sticky;
bottom: ${props => props.theme.spacing[4]};
left: 100vw;
z-index: 50;
`


export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    {
      file(name: {eq: "dosdandelions"}) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const imageData = data.file.childImageSharp.fluid


  const [ lightTheme, setLightTheme ] = React.useState(true)

  const handleTheme = () => setLightTheme(!lightTheme)

  return (
    <>
    <ThemeProvider theme={lightTheme ? theme : darkTheme}>
      <React.Fragment>
      <SEO title={""} description={"Wedding Website for Laura Gale Campbell and William Tompkins Krakow"} />
      <BackgroundImage as="nav" fluid={imageData} alt="Dandelions blowing in the wind" isDarken={lightTheme} key={lightTheme ? `dark` : `light`} >
        <MenuBar fluid>
          <Row>
            <Col xs={12}>
              <BannerText>Laura Gale Campbell <br /> &amp; <br />William Tompkins Krakow</BannerText>
              <ElementSubtitle alwaysdark ><time dateTime="2022-05-01">May 1, 2022</time></ElementSubtitle>
            </Col>
          </Row>
          <Row>
            {links.map((link, index) => (
              <Col className="text-center" key={index}>
                <NavItem swipe to={link.url} alt={link.alt}>{link.alt}</NavItem>
              </Col>
            ))}
          </Row>
        </MenuBar>
      </BackgroundImage>
      <Main>
      {children}
      <Footer />
      </Main>
      {lightTheme ? (
        <StickyButton onClick={handleTheme}>
          Dark mode
        </StickyButton>
      )
        : (
          <StickyWhiteButton onClick={handleTheme} >
            Light mode
          </StickyWhiteButton>
        )}
        </React.Fragment>
    </ThemeProvider>
    </>
  );
}

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
        <ElementSubtitle className="text-center">&copy; 2021</ElementSubtitle>
      </Col>
    </Row>
  </FooterWrapper>
);