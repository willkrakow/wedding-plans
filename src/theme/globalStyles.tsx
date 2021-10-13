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
    transition: all 0.3s ease;
    font-size: 18px;
    min-height: 100vh;
  }
  body {
    letter-spacing: 0;
    line-height: 1.5em;
    background-color: ${(props) => props.theme.colors.background};
    background: linear-gradient(142deg, rgba(34,193,195,0.0) 0%, rgba(34,193,195,0.05) 100%);
    font-size: 18px;
    max-width: 100vw;
    overflow-x: hidden;
  }
`;

export default GlobalStyles