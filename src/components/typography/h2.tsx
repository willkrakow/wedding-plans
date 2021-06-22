import styled from 'styled-components'

type H2Props = {
  centered?: boolean;
}

const H2 = styled.h2<H2Props>`
  line-height: ${props => props.theme.spacing[7]};
  padding-top: ${props => props.theme.spacing[3]}; 
  padding-bottom: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[3]}; 
  margin-top: ${props => props.theme.spacing[6]}; 
  text-align: ${props => props.centered ? "center" : "left"};
  font-family: ${props => props.theme.fonts.cursive};
  font-size: ${props => props.theme.fontSizes[5]};
  color: ${props => props.theme.colors.accent};
  letter-spacing: ${props => props.theme.spacing[2]};
  margin-left: auto;
  margin-right: auto;
`

export { H2 }