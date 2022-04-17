import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Seo from '../utils/seo'
import { theme, darkTheme } from '../theme';
import { useStaticQuery, graphql, } from 'gatsby'
import GlobalStyles from '../theme/globalStyles'
import Footer from './footer'
import MenuBar from './menuBar'
import { H1, H2, H3, H4, H5, P, ElementLink } from '../components/typography'
import { MDXProvider } from '@mdx-js/react'
import _ from 'lodash';

const Main = styled.main(props => ({
  maxWidth: '90rem',
  margin: 'auto',
  minHeight: '100vh',
}))



export default function Layout({ children, location }) {
  const [isPrevious, setIsPrevious] = React.useState(false)

  React.useEffect(() => {
    const setCookie = (cname, cvalue, exdays) => {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      console.log(cname, cvalue)
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const getCookie = (cname) => {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    const checkCookie = () => {
      var user = getCookie("_wtk_lgc");
      console.log(user)
      if (user !== "") {
        setIsPrevious(true)
      } else {
        setIsPrevious(false)
        setCookie("_wtk_lgc", 'previous', 365);
      }
    }

    checkCookie()
    setTimeout(() => setIsPrevious(true), 6000)
  }, [isPrevious])

  React.useEffect(() => {
    const getInfo = async (windowLocation) => {
      const request = await fetch("https://ipinfo.io/json?token=76509fbee1f6a6")
      const json = await request.json();
      
      await fetch('/.netlify/functions/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({json, windowLocation}),
      });
      }
    if (typeof window !== 'undefined') {
      getInfo(window?.location)
    }
  }, [])

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          menuLinks {
            title
            path
          }
        }
      }
    }
  `)

  const { title, description, menuLinks } = data.site.siteMetadata


  const activePage = _.find(menuLinks, (o) => { return o.path === location.pathname })
  const [lightTheme, setLightTheme] = React.useState(true)

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
          <Seo title={activePage?.title || title} description={description} />
          <MenuBar links={menuLinks} />
          <Main>
            <MDXProvider components={components}>
              {children}
            </MDXProvider>
          </Main>
          <Footer />
        </React.Fragment>
      </ThemeProvider>
    </>
  );
}