import React from 'react'
import { makeDateString } from '../utils'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import { P } from './typography'

const Grid = styled.section`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-auto-rows: 400px;
grid-auto-flow: dense;
width: 100%;
position: relative;
grid-gap: ${props => props.theme.spacing[2]};
left: 0;
right: 0;
max-width: 100vw;
overflow: hidden;
@media (max-width: 575px){
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
}
`

const GridItem = styled.div`
grid-column: span ${props => props.aspectRatio > 1.25 ? 2 : 1};
grid-row: span 1;
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
@media (max-width: 575px){
    grid-column: span 1;
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
grid-template-rows: 2fr 8fr 2fr;
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
padding: 0 ${props => props.theme.spacing[2]};
`


const ModalControls = styled.div`
display: flex;
flex-direction: row;
`

const ModalInfoBox = styled.div`
display: flex;
flex-direction: row;
`


const NextButton = styled.button`
display: block;
border: none;
color: ${props => props.theme.colors.alwayslight};
background: transparent;
font-size: ${props => props.theme.fontSizes[4]};
transition: all 0.5s ease;
text-decoration: underline;
text-decoration-color: transparent;
text-align: center;
position: absolute;
right: 0;
text-decoration-thickness: ${props => props.theme.spacing[1]};
&:hover {
    text-decoration-color: ${props => props.theme.colors.accent};
}
`

const PrevButton = styled(NextButton)`
right: auto;
left: 0;
`

const CornerButton = styled(NextButton)`
position: absolute;
top: ${props => props.theme.spacing[3]};
left: ${props => props.theme.spacing[3]};
display: ${props => props.open ? 'inherit' : 'none'};
z-index: 601;
`

const CaptionText = styled(P)`
color: ${props => props.muted ? props.theme.colors.muted : props.theme.colors.alwayslight};
text-align: center;
flex: 0 1 500px;
width: 100%;
font-size: ${props => props.muted ? props.theme.fontSizes[1] : props.theme.fontSizes[2]};
`

const Caption = styled.div`
flex: 0 1 500px;
padding: 0 ${props => props.theme.spacing[2]};
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

        const handleNext = (e) => {
            if (e.key === "ArrowRight" && open){
                handleIncrement()
            }
        }

        const handlePrevious = (e) => {
            if (e.key === "ArrowLeft" && open){
                handleDecrement()
            }
        }

        document.addEventListener('keydown', handleKeypress)
        document.addEventListener('keydown', handleNext)
        document.addEventListener('keydown', handlePrevious)
        return () => {
            document.removeEventListener('keydown', handleKeypress)
            document.removeEventListener('keydown', handleNext)
            document.removeEventListener('keydown', handlePrevious)
        }
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
            <ModalGateway open={open} >
                <div>
                    <CornerButton onClick={() => handleClick(currentIndex)} open={open}>&times;</CornerButton>
                </div>
                <ModalItem aspectRatio={photos[currentIndex].node.localFiles[0].childImageSharp.resize.aspectRatio} >
                    <GatsbyImage objectFit="contain" image={photos[currentIndex].node.localFiles[0].childImageSharp.gatsbyImageData} alt={photos[currentIndex].node.parent.data.title} />
                </ModalItem>
                <PrevButton onClick={handleDecrement}>&larr;</PrevButton>
                <NextButton onClick={handleIncrement}>&rarr;</NextButton>
                <ModalControls>
                    <Caption>
                        <CaptionText>{photos[currentIndex].node.parent.data.description}</CaptionText>
                        <CaptionText muted >
                            {photos[currentIndex].node.parent.data.date && makeDateString(photos[currentIndex].node.parent.data.date)}
                            <br />
                            {photos[currentIndex].node.parent.data.location}</CaptionText>
                    </Caption>
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