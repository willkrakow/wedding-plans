import React from 'react'
import { IdentityContext } from '../../gatsby-browser'


export const useIdentityContext = () => {
    const identityContext = React.useContext(IdentityContext)
    return identityContext
}