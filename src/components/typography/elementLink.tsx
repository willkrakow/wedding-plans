import styled from 'styled-components'

export const ElementLink = styled.a`
text-decoration: underline;
text-decoration-color: ${props => props.theme.colors.accent};
color: ${props => props.theme.colors.text};
text-decoration-thickness: ${props => props.theme.spacing[1]};
`