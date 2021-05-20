import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

const GlobalStyle = createGlobalStyle`
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
  }
`

export default GlobalStyle