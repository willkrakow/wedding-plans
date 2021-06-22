import styled from 'styled-components'

type H3Props = {
  centered?: boolean;
  nosubtitle?: boolean;
  factTitle?: boolean;
}

export const H3 = styled.h3<H3Props>`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes[4]};
  font-family: ${props => props.theme.fonts.headers};
  font-weight: ${props => props.theme.fontWeights.heavy};
  padding-top: ${props => props.theme.spacing[0]};
  margin-bottom: ${props => props.nosubtitle ? props.theme.spacing[2] : props.theme.spacing[0]};
  display: inline-block;
  text-align: ${props => props.centered ? "center" : "left"};
  width: 100%;
  margin-top: ${props => props.theme.spacing[0]};
  line-height: 1.1em;
  cursor: ${props => props.factTitle ? "pointer" : "inherit"};
`



export const ProductName = styled(H3)`
font-size: ${props => props.theme.fontSizes[3]};
margin-bottom: ${props => props.theme.spacing[0]};
margin-top: ${props => props.theme.spacing[2]};
`
