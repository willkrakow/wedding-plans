import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { ElementText } from '../components/typography'
import { makeDateString } from '../utils'

const Grid = styled.section`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
grid-auto-flow: dense;
width: 100%;

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
    box-shadow: 0px ${props => props.theme.spacing[3]} ${props => props.theme.spacing[2] } rgba(10, 10, 10, 0.5);
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
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
align-content: center;
transition: all 0.7s ease;
z-index: 600;
`

const ModalItem = styled.div`
opacity: 1.0;
height: auto;
width: ${props => 500 * props.aspectRatio}px;
max-width: 100vw;
`

const fadeIn = keyframes`
0% {
    opacity: 0;
}

100% {
    opacity: 1.0;
}
`

const ModalImg = styled(Img)`
animation: ${fadeIn} 0.6s ease forwards;
`

const ModalControls = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
width: 100%;
flex: 0 0 15%;
`

const NextButton = styled.button`
display: block;
border: none;
color: ${props => props.theme.colors.alwayslight};
background: transparent;
padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[4]};
font-size: ${props => props.theme.fontSizes[4]};
transition: all 0.5s ease;
text-decoration: underline;
text-decoration-color: transparent;
text-decoration-thickness: ${props => props.theme.spacing[1]};
flex-basis: 25%;
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

const CaptionText = styled(ElementText)`
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

    const [ open, setOpen ] = React.useState(false);
    const [ currentIndex, setCurrentIndex ] = React.useState(0)

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
                    <GridItem aspectRatio={photo.node.localFiles[0].childImageSharp.fluid.aspectRatio}  {...itemOptions} key={index} index={index} onClick={() => handleClick(index)}  >
                        <Img style={{ maxWidth: "100%", height: "100%" }} fluid={photo.node.localFiles[0].childImageSharp.fluid} alt={photo.node.parent.data.title} />
                    </GridItem>

                ))}
            </Grid>
            <CornerButton onClick={() => handleClick(currentIndex)} open={open}>&times;</CornerButton>
            <ModalGateway open={open} >
                <ModalItem aspectRatio={photos[currentIndex].node.localFiles[0].childImageSharp.fluid.aspectRatio} >
                    <ModalImg fluid={photos[currentIndex].node.localFiles[0].childImageSharp.fluid} aspectRatio={photos[currentIndex].node.localFiles[0].childImageSharp.fluid.aspectRatio} alt={photos[currentIndex].node.parent.data.title} />
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
                    fluid: PropTypes.shape({
                        aspectRatio: PropTypes.number,
                        base64: PropTypes.string,
                        sizes: PropTypes.string,
                        src: PropTypes.string,
                        srcset: PropTypes.string,
                    }),
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


const Test = () => {
    const data = useStaticQuery(graphql`
    {
      allAirtableField {
        edges {
          node {
            parent {
              id
              ... on Airtable {
                id
                data {
                  location
                  date
                  description
                  title
                }
              }
            }
            localFiles {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)

    const photoData = data.allAirtableField.edges
    return (
        <PhotoGrid photos={photoData} />
    )
}




export default Test