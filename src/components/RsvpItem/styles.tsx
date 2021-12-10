import styled from 'styled-components'
import { P } from '../typography'
import { Container } from 'reactstrap'

export const GuestBox = styled.article`
  border: 1px solid ${(props) => props.theme.colors.muted};
  padding: ${(props) => props.theme.spacing[2]};
  margin: ${(props) => props.theme.spacing[3]} 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ErrorMessage = styled(P)`
  color: ${(props) => props.theme.colors.danger};
  margin-top: ${(props) => props.theme.spacing[2]};
  font-weight: bold;
`;

export const GuestFieldLabel = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.accent};
  font-size: ${(props) => props.theme.fontSizes[0]};
  margin-top: ${(props) => props.theme.spacing[1]};
`;


export const FullHeightContainer = styled(Container)`
  height: 100%;
  flex: 1;
`;

export const OwnerBadge = styled.span`
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.spacing[0]} ${(props) => props.theme.spacing[1]};
    border-radius: 5px;
    font-size: ${(props) => props.theme.fontSizes[0]};
    font-weight: bold;
    position: absolute;
    right: 0;
`