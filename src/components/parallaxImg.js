import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'


const ParallaxImg = () => {
    return (
        <>
                <StaticImage src={`../images/us.jpg`} alt="Laura and Will, sitting on a log as the sun sets on the Hillsborough meadows" placeholder="blurred" layout="fullWidth" aspectRatio={16/12} />
        </>
    )
}

export default ParallaxImg
