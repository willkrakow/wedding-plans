import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}

  *, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  body {
    letter-spacing: 0;
    line-height: 1.5em;
    background-color: ${props => props.theme.colors.background};
    font-size: 18px;
    max-width: 100vw;
    overflow-x: hidden;
  }
`

export default GlobalStyles