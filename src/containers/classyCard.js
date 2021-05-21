import { Container } from 'reactstrap'
import styled from 'styled-components'

export const ClassyCard = styled(Container)`
  scroll-snap-align: start;
  margin-top: ${props => props.theme.spacing[5]};
  margin-bottom: ${props => props.theme.spacing[4]};
  padding-top: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[4]};
`
