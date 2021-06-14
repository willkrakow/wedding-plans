import React from 'react'
import { makeDateString } from '../utils'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import { P } from './typography'

const Grid = styled.section`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
grid-auto-flow: dense;
width: 100vw;
position: absolute;
left: 0;
`

const GridItem = styled.div`
grid-column: span ${props => props.aspectRatio > 1.25 ? 2 : 1};
grid-row: span ${props => 1};
overflow: hidden;
height: 100%;
cursor: pointer;
transition: all 0.6s ease;
z-index: 400;
transition-delay: 1s;
&:hover {
    overflow: visible;
    transform: scale(1.2);
    z-index: 501;
    box-shadow: 0px ${props => props.theme.spacing[3]} ${props => props.theme.spacing[2]} rgba(10, 10, 10, 0.5);
}
`

const ModalGateway = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: ${props => props.open ? 0 : "100%"};
overflow: hidden;
background-color: rgba(10, 10, 10, 0.9);
background-blend-mode: hard-light;
opacity: ${props => props.open ? 1.0 : 0.0};
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 1fr 7fr 2fr;
transition: all 0.7s ease;
z-index: 600;
max-width: 100vw;
max-height: 100vh;
height: ${props => props.open ? "-webkit-fill-available" : 0};
`


const ModalItem = styled.div`
opacity: 1.0;
height: auto;
max-width: 100vw;
position: relative;
left: 0;
display: flex;
flex-direction: column;
justify-content: center;
overflow: hidden;
`


const ModalControls = styled.div`
display: grid;
grid-template-columns: 1fr 3fr 1fr;
grid-template-rows: 1fr;
width: 100%;
`

const NextButton = styled.button`
display: inline-block;
border: none;
color: ${props => props.theme.colors.alwayslight};
background: transparent;
font-size: ${props => props.theme.fontSizes[4]};
transition: all 0.5s ease;
text-decoration: underline;
text-decoration-color: transparent;
text-align: center;
text-decoration-thickness: ${props => props.theme.spacing[1]};
&:hover {
    text-decoration-color: ${props => props.theme.colors.accent};
}
`

const CornerButton = styled(NextButton)`
position: fixed;
top: ${props => props.theme.spacing[3]};
left: ${props => props.theme.spacing[3]};
display: ${props => props.open ? 'inherit' : 'none'};
z-index: 601;
`

const CaptionText = styled(P)`
color: ${props => props.muted ? props.theme.colors.muted : props.theme.colors.alwayslight};
text-align: center;
display: inline-block;
width: 100%;
font-size: ${props => props.muted ? props.theme.fontSizes[1] : props.theme.fontSizes[2]};
`

const Caption = styled.div`
flex-basis: 50%;
`


const PhotoGrid = (props) => {
    const { options, itemOptions, photos } = props;

    const [open, setOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0)

    const handleClick = (itemIndex) => {
        setOpen(!open)
        setCurrentIndex(itemIndex)
    }

    const handleIncrement = () => {
        if (currentIndex < photos.length - 2) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentIndex(0)
        }
    }

    const handleDecrement = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        } else {
            setCurrentIndex(0)
        }
    }



    React.useEffect(() => {
        const handleKeypress = (e) => {
            if (e.key === "Escape" && open) {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeypress)

        return () => document.removeEventListener('keydown', handleKeypress)
    })

    return (
        <React.Fragment>
            <Grid {...options} >
                {photos.map((photo, index) => (
                    <GridItem aspectRatio={photo.node.localFiles[0].childImageSharp.resize.aspectRatio}  {...itemOptions} key={index} index={index} onClick={() => handleClick(index)}  >
                        <GatsbyImage style={{ maxWidth: "100%", height: "100%" }} image={photo.node.localFiles[0].childImageSharp.gatsbyImageData} alt={photo.node.parent.data.title} />
                    </GridItem>
                ))}
            </Grid>
            <CornerButton onClick={() => handleClick(currentIndex)} open={open}>&times;</CornerButton>
            <ModalGateway open={open} >
                <div></div>
                <ModalItem aspectRatio={photos[currentIndex].node.localFiles[0].childImageSharp.resize.aspectRatio} >
                    <GatsbyImage image={photos[currentIndex].node.localFiles[0].childImageSharp.gatsbyImageData} alt={photos[currentIndex].node.parent.data.title} />
                </ModalItem>
                <ModalControls>
                    <NextButton onClick={handleDecrement}>&larr;</NextButton>
                    <Caption>
                        <CaptionText>{photos[currentIndex].node.parent.data.description}</CaptionText>
                        <CaptionText muted >
                            {makeDateString(photos[currentIndex].node.parent.data.date)}
                            <br />
                            {photos[currentIndex].node.parent.data.location}</CaptionText>
                    </Caption>
                    <NextButton onClick={handleIncrement}>&rarr;</NextButton>
                </ModalControls>
            </ModalGateway>
        </React.Fragment>
    )
}

PhotoGrid.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
            localFiles: PropTypes.arrayOf(PropTypes.shape({
                childImageSharp: PropTypes.shape({
                    gatsbyImageData: PropTypes.object,
                }),
            })),
            parent: PropTypes.shape({
                data: PropTypes.shape({
                    title: PropTypes.string,
                    description: PropTypes.string,
                    date: PropTypes.string,
                    location: PropTypes.string,
                    id: PropTypes.string,
                })
            })
        })
    })),
    options: PropTypes.shape({
        columns: PropTypes.number,
        rowGap: PropTypes.string,
        columnGap: PropTypes.string,
        rowHeight: PropTypes.string,
    }),
    itemOptions: PropTypes.shape({
        minWidth: PropTypes.number,
        maxWidth: PropTypes.number,
    }),
}

PhotoGrid.defaultProps = {
    options: {
        columns: 5,
        rowGap: "8px",
        columnGap: "8px",
        rowHeight: "400px",
    },
    itemOptions: {
        minWidth: 200,
        maxWidth: 400,
    },
}


export default PhotoGrid