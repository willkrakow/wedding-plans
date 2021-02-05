import styled, { keyframes } from "styled-components";
import "@fontsource/open-sans";
import "@fontsource/courgette";

const fadeIn = keyframes`
0% {
  opacity: 0;
}

40% {
  opacity: 1.0;
}

100% {
  opacity: 1.0;
}
`

export const BannerText = styled.h1`
  display: block;
  text-align: center;
  font-weight: 200;
  font-size: 3em;
  color: #4f4f4f;
  animation: ${fadeIn} 6s ease;
  font-family: 'Courgette', cursive;
`;

export const SectionTitle = styled.h4`
  color: #bfd5e0;
  margin-top: 0;
  font-family: 'Courgette', cursive;
  font-weight: 800;
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;  

export const ElementTitle = styled.h4`
  color: #4f4f4f;
  font-weight: bold;
  font-size: 1.75rem;
  padding-top: 0;
  margin-top: 0;
  font-family: "Open Sans";
  margin-bottom: 1rem;
`;

export const ElementText = styled.p`
  color: #4e5755;
  font-size: 1em;
  margin-top: 0;
  font-weight: 300;
  font-family: 'Open Sans';
  margin-bottom: 0;
`;

export const SubtleText = styled.p`
  font-size: 1em;
  color: #bfd5e0;
  margin-bottom: 0.5em;
  font-family: 'Open Sans';
  font-weight: 400;
`;