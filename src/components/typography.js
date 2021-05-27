import styled from "styled-components";
import { Link } from 'gatsby'
import "@fontsource/open-sans";
import "@fontsource/courgette";

export const H1 = styled.h1(props => ({
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


export const H2 = styled.h2(props => ({
  lineHeight: props.theme.spacing[7],
  paddingTop: props.theme.spacing[3],
  paddingBottom: props.theme.spacing[2],
  marginBottom: props.theme.spacing[3],
  marginTop: props.theme.spacing[6],
  textAlign: props.centered ? "center" : "left",
  borderBottom: "2px solid",
  borderColor: props.theme.colors.muted,
  fontFamily: props.theme.fonts.cursive,
  fontSize: props.theme.fontSizes[5],
  color: props.theme.colors.text,
  letterSpacing: props.theme.spacing[2],
  marginLeft: 'auto',
  marginRight: 'auto',
}))


export const H3 = styled.h3(props => ({
  color: props.theme.colors.text,
  fontSize: props.theme.fontSizes[4],
  fontFamily: props.theme.fonts.headers,
  fontWeight: props.theme.fontWeights.heavy,
  paddingTop: props.theme.spacing[0],
  marginBottom: props.nosubtitle ? props.theme.spacing[2] : props.theme.spacing[0],
  display: "inline-block",
  textAlign: props.centered ? "center" : "left",
  width: "100%",
  marginTop: props.theme.spacing[0],
  lineHeight: "1.1em",
  cursor: props.factTitle ? "pointer" : "inherit",
}))

export const H4 = styled.h4(props => ({
  color: props.alwaysdark ? props.theme.colors.alwaysdark : props.theme.colors.muted,
  fontSize: props.theme.fontSizes[2],
  fontFamily: props.theme.fonts.headers,
  fontWeight: props.theme.fontWeights.body,
  textAlign: props.centered ? "center" : "left",
  display: "inline-block",
  width: "100%",
  marginBottom: props.theme.spacing[4],
  marginTop: props.theme.spacing[1],
}))

export const H5 = styled.h5(props => ({
  color: props.theme.colors.muted,
  fontSize: props.theme.fontSizes[0],
  marginBottom: props.theme.spacing[1],
  fontFamily: props.theme.fonts.body,
  fontWeight: props.theme.fontWeights.body,
}))


export const P = styled.p(props => ({
  color: props.theme.colors.text,
  fontWeight: props.theme.fontWeights.light,
  fontFamily: props.theme.fonts.body,
  marginTop: props.theme.spacing[2],
  marginBottom: props.theme.spacing[3],
  fontSize: props.theme.fontSizes[1],
}))

export const NavItem = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.fontSizes[1]};
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.spacing[1]};
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

export const ProductName = styled(H3)`
font-size: ${props => props.theme.fontSizes[3]};
margin-bottom: ${props => props.theme.spacing[0]};
margin-top: ${props => props.theme.spacing[2]};
`

export const ProductCategory = styled(H4)`
font-size: ${props => props.theme.fontSizes[1]};
margin-top: ${props => props.theme.spacing[0]};
margin-bottom: ${props => props.theme.spacing[0]};
text-align: center;
`

export const ProductPrice = styled(P)`
text-align: center;
`


export const ElementLink = styled.a`
text-decoration: underline;
text-decoration-color: ${props => props.theme.colors.accent};
color: ${props => props.theme.colors.text};
text-decoration-thickness: ${props => props.theme.spacing[1]};
`