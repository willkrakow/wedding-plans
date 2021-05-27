import React from 'react'
import styled from 'styled-components'
import { Parallax } from 'react-parallax'

const Inner = styled.div`
height: 120vh;
margin-top: -20vh;
`

const ParallaxCustom = styled(Parallax)`
max-width: 100vw;
width: 100vw;
position: relative;
overflow: hidden;
left: calc(calc(100vw - 100%) * -1 / 2);
`

const ParallaxImg = () => {
    return (

        <ParallaxCustom style={{ maxWidth: "100vw" }} strength={-200} bgImage="https://images.pexels.com/photos/1067194/pexels-photo-1067194.jpeg?cs=srgb&dl=pexels-jennifer-murray-1067194.jpg&fm=jpg" >
            <Inner />
        </ParallaxCustom>
    )
}

export default ParallaxImg
