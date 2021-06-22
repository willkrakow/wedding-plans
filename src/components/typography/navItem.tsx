import styled from 'styled-components'
import { Link, GatsbyLinkProps } from 'gatsby';


export const NavItem = styled(Link)<GatsbyLinkProps<{}>>`
  display: inline-block;
  padding: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.fontSizes[1]};
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.borders[1]};
  font-weight: ${props => props.theme.fontWeights.body};
  font-family: ${props => props.theme.fonts.headers};
  transition: all 0.5s ease;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration-color: ${props => props.theme.colors.primary},
  };
`;
