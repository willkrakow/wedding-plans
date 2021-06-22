import styled from 'styled-components'

const defaultH4 = {
  alwaysdark: false,
  centered: false,
  inline: false,
};

type H4Props = {
  readonly alwaysdark?: boolean;
  readonly centered?: boolean;
  readonly inline?: boolean;
} & typeof defaultH4


const H4 = styled.h4<H4Props>`
  color: ${props => props.alwaysdark ? props.theme.colors.alwaysdark : props.theme.colors.muted};
  font-size: ${props => props.theme.fontSizes[2]};
  font-family: ${props =>  props.theme.fonts.headers};
  font-weight: ${props => props.theme.fontWeights.body};
  text-align: ${props => props.centered ? "center" : "left"};
  display: inline-block;
  width: 100%;
  margin-bottom: ${props => props.inline ? props.theme.spacing[1] : props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[1]};
`

H4.defaultProps = defaultH4


const ProductCategory = styled(H4)`
font-size: ${props => props.theme.fontSizes[1]};
margin-top: ${props => props.theme.spacing[0]};
margin-bottom: ${props => props.theme.spacing[0]};
text-align: center;
`

export { H4, ProductCategory }