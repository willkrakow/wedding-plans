import React from 'react'

interface testProps {
    name: string,
    func: React.MouseEventHandler,
    response: Number
}

const TestComponents = (props: testProps) => {

    const handleThis = props.func
    console.log(props.response)

    return (
        <button onClick={handleThis} >hi</button>
    )
}

export default TestComponents

