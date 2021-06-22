import React from 'react'
import { Container, ContainerProps } from 'reactstrap'
import styled, { DefaultTheme } from 'styled-components'

interface CardProps extends ContainerProps {
  className?: string,
  theme?: DefaultTheme
}

export const ClassyWrapper: React.FunctionComponent<CardProps> = (props) => <Container {...props}>{props.children}</Container>


export const ClassyCard = styled(ClassyWrapper)`
  scroll-snap-align: start;
  margin-top: ${props => props.theme.spacing[5]};
  margin-bottom: ${props => props.theme.spacing[4]};
  padding-top: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[4]};
`
