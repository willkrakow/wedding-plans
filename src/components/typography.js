import styled from "styled-components";
import { Link } from 'gatsby'
import "@fontsource/open-sans";
import "@fontsource/courgette";

// const fadeIn = keyframes`
// 0% {
//   opacity: 0;
// }

// 40% {
//   opacity: 1.0;
// }

// 100% {
//   opacity: 1.0;
// }
// `

export const BannerText = styled.h1(props => ({
  display: 'block',
  textAlign: 'center',
  fontWeight: props.theme.fontWeights.lightest,
  fontSize: props.theme.fontSizes[3],
  color: props.theme.colors.alwaysdark,
  animationDuration: "6s",
  animationTimingFunction: "ease",
  fontFamily: props.theme.fonts.cursive,
  lineHeight: 'normal',
}))

export const SectionTitle = styled.h2(props => ({
  color: props.theme.colors.text,
  fontSize: props.theme.fontSizes[3],
  fontFamily: props.theme.fonts.cursive,
  fontWeight: props.theme.fontWeights.heavy,
  lineHeight: props.theme.spacing[5],
  paddingTop: props.theme.spacing[0],
  marginBottom: props.theme.spacing[5],
  marginTop: props.theme.spacing[0],
  textAlign: 'center',
  borderBottom: "2px solid",
  borderColor: props.theme.colors.muted,
  maxWidth: "10rem",
  marginLeft: 'auto',
  marginRight: 'auto'
}))

export const ElementTitle = styled.h3(props => ({
  color: props.theme.colors.text,
  fontSize: props.theme.fontSizes[5],
  fontFamily: props.theme.fonts.headers,
  fontWeight: props.theme.fontWeights.heavy,
  paddingTop: props.theme.spacing[0],
  marginBottom: props.theme.spacing[3],
  display: "inline-block",
  width: "100%",
  marginTop: props.theme.spacing[0],
  textAlign: 'center',
  lineHeight: "1.1em",
  cursor: props.factTitle ? "pointer" : "inherit",
}))

export const ElementSubtitle = styled.h4(props => ({
  color: props.alwaysdark ? props.theme.colors.alwaysdark : props.theme.colors.muted,
  fontSize: props.theme.fontSizes[2],
  fontFamily: props.theme.fonts.headers,
  fontWeight: props.theme.fontWeights.body,
  textAlign: "center",
  display: "inline-block",
  width: "100%",
  marginBottom: props.theme.spacing[3],
  marginTop: props.theme.spacing[3],
}))

export const ElementText = styled.p(props => ({
  color: props.theme.colors.text,
  fontWeight: props.theme.fontWeights.light,
  fontFamily: props.theme.fonts.body,
  marginTop: props.theme.spacing[2],
  marginBottom: props.theme.spacing[3],
  fontSize: props.theme.fontSizes[1],
}))

export const SubtleText = styled.h5(props => ({
  color: props.theme.colors.muted,
  fontSize: props.theme.fontSizes[0],
  marginBottom: props.theme.spacing[1],
  fontFamily: props.theme.fonts.body,
  fontWeight: props.theme.fontWeights.body,
}))

export const NavItem = styled(Link)`
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