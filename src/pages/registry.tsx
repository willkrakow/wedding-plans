import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import { H2, H4 } from '../components/typography'
import './registry.css'

const ZolaHide = styled.div`
border-bottom: 150px solid ${(props) => props.theme.colors.background};
`

const Registry = () => {
  React.useEffect(() => {
    document.createElement('script')
    const script = document.createElement('script')
    script.innerHTML = `!function(e,t,n){var s,a=e.getElementsByTagName(t)[0];e.getElementById(n)||(s=e.createElement(t),s.id=n,s.async=!0,s.src="https://widget.zola.com/js/widget.js",a.parentNode.insertBefore(s,a))}(document,"script","zola-wjs");`;

    document.body.appendChild(script)

  }, [])
  return (
    <Container>
      <H2 centered>Registry</H2>
      <H4 centered alwaysdark inline></H4>
      <ZolaHide />
      <a
        className="zola-registry-embed"
        href="www.zola.com/registry/campbellkrakow"
        data-registry-key="campbellkrakow"
      >
        Our Zola Wedding Registry
      </a>
    </Container>
  );
}

export default Registry