import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { H2, P } from '../components/typography'


const Catering: React.FC<PageProps> = (props) => {
    console.log(props)
    return (
        <>
        <H2>Catering</H2>
        <P>Catering stuff</P>
        </>
    )
}

export default Catering
