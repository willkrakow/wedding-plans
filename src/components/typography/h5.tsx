import styled from 'styled-components'

type H5Props = {
  centered?: boolean;
  className?: string;
}


export const H5 = styled.h5<H5Props>`
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.fontSizes[2]};
  margin-bottom: ${props => props.theme.spacing[2]};
  text-align: ${props => props.centered ? "center" : "left"};
  font-family: ${props => props.theme.fonts.cursive};
  font-weight: ${props => props.theme.fontWeights.heavy};
  position: relative;
  text-decoration: underline;

`
