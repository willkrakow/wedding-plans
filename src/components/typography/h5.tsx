import styled from 'styled-components'

type H5Props = {
  readonly centered?: boolean;
  readonly className?: string;
} & typeof defaultH5

const defaultH5 = {
  centered: false,
}

export const H5 = styled.h5<H5Props>`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes[2]};
  margin-bottom: ${props => props.theme.spacing[2]};
  text-align: ${props => props.centered ? "center" : "left"};
  font-family: ${props => props.theme.fonts.cursive};
  font-weight: ${props => props.theme.fontWeights.heavy};
  border-bottom: ${props => `${props.theme.borders[2]} solid ${props.theme.colors.text}`};
`

H5.defaultProps = defaultH5