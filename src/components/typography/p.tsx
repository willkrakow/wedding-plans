import styled from 'styled-components'

type ParagraphProps = {
    centered?: boolean;
}

export const P = styled.p<ParagraphProps>`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.fontWeights.light};
  font-family: ${props => props.theme.fonts.body};
  text-align: ${props => props.centered ? "center" : "left"};
  margin-top: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes[1]};
`

export const ProductPrice = styled(P)`
text-align: center;
`