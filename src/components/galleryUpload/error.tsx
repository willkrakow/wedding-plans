import React from 'react'
import styled from 'styled-components'
import Button, { RedButton } from '../button'
import { H3 } from '../typography'

const ErrorText = styled(H3)`
    color: ${(props) => props.theme.colors.danger};
`

interface ErrorProps {
    message: string;
    handleNewUpload: () => void;
    handleCancel: () => void;
}

const Error = ({ message, handleNewUpload, handleCancel }: ErrorProps) => {
    return (
      <>
        <ErrorText>{message}</ErrorText>
        <Button onClick={handleNewUpload}>Try again</Button>
        <RedButton onClick={handleCancel}>Cancel</RedButton>
      </>
    );
}

export default Error