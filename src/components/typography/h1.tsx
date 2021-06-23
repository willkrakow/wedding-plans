import styled from 'styled-components'

export const H1 = styled.h1`
  display: block;
  text-align: center;
  font-size: ${props => props.theme.fontSizes[3]};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.cursive};
  line-height: normal;
  font-weight: ${props => props.theme.fontWeights.lightest};
  letter-spacing: ${props => props.theme.spacing[3]};
`
