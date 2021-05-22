import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import Slide from 'react-reveal/Slide'

export const ClassyWrapper = styled(Container)`
  scroll-snap-align: start;
  margin-top: ${props => props.theme.spacing[5]};
  margin-bottom: ${props => props.theme.spacing[4]};
  padding-top: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[4]};
`

export const ClassyCard = ({children}) => (
  <Slide>
    <ClassyWrapper>
    {children}
    </ClassyWrapper>
  </Slide>
)
