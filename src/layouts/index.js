import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import SEO from '../utils/seo'
import { theme, darkTheme } from '../theme';
import {StickyButton, StickyWhiteButton} from '../components/button';
import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalStyles from '../theme/globalStyles'
import Footer from './footer'
import MenuBar from './menuBar'
import { H1, H2, H3, H4, H5, P, ElementLink } from '../components/typography'
import { MDXProvider } from '@mdx-js/react'

const Main = styled.main(props => ({
  backgroundColor: props.theme.colors.background,
  maxWidth: '90rem',
  margin: 'auto',
}))




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
  const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    p: P,
    a: ElementLink,
  }

  return (
    <>
    <ThemeProvider theme={lightTheme ? theme : darkTheme}>
      <React.Fragment>
      <GlobalStyles theme={lightTheme ? theme : darkTheme} />
      <SEO title={""} description={"Wedding Website for Laura Gale Campbell and William Tompkins Krakow"} />
      <header>
        <BackgroundImage as="nav" fluid={imageData} alt="Dandelions blowing in the wind" isDarken={lightTheme} key={lightTheme ? `dark` : `light`} >
          <MenuBar />
        </BackgroundImage>
      </header>
      <Main>
            <MDXProvider components={components}>
              {children}
            </MDXProvider>
      </Main>
      <Footer />

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