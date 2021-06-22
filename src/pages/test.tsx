import React from 'react'
import { PageProps } from 'gatsby';
import TestComponents from '../components/test-components';

const Test = (props: PageProps) => {

    const thinger = () => console.log("passed function called")
    return (
        <>
        <p>hi {props.path}</p>
        <TestComponents name={`will`} func={thinger} response={4} />
        </>
    );
};

export default Test