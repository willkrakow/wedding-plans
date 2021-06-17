import React from 'react'
import { H3, H2, P, H4 } from '../components/typography'
import Slide from 'react-reveal/Slide'
import styled from 'styled-components'
import Button from '../components/button'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { ClassyCard } from './classyCard'
import FunFact from '../components/funFact'
import { GatsbyImage } from 'gatsby-plugin-image'

const PageSectionImage = styled.img`
width: 100%;
height: auto;
`


const PageSection = ({ sectionData }) => {
    const { label, title, subtitle, sectionImg, bodyText, cta, funFact, sectionFluid } = sectionData
    return (
        <Slide left>
            <ClassyCard fluid >
                <Row>
                    <Col xs={12} lg={3}>
                    </Col>
                    <Col xs={12} lg={6}>
                        {label && <H2>{label}</H2>}
                        {funFact ? (
                            <FunFact body={funFact.body} header={funFact.header} >
                                <H3 factTitle >{title}</H3>
                            </FunFact>
                        )
                            : <H3 nosubtitle={subtitle ? false : true} >{title}</H3>
                        }
                        {subtitle && <H4>{subtitle}</H4>}
                        {sectionImg && <PageSectionImage src={sectionImg.src} alt={sectionImg.alt || title} />}
                        {sectionFluid && <GatsbyImage image={sectionFluid.image} alt={sectionFluid.alt || sectionImg.alt || title} />}
                        {bodyText && <P>{bodyText}</P>}
                        {cta && (
                            <a href={cta.link} alt={cta.label} className={cta.centered ? "d-block" : ""}><Button>{cta.label}</Button></a>
                        )}
                    </Col>
                </Row>
            </ClassyCard>
        </Slide>
    )
}

PageSection.propTypes = {
    sectionData: PropTypes.shape({
        label: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        sectionImg: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string,
            isUrl: PropTypes.bool,
        }),
        bodyText: PropTypes.string,
        cta: PropTypes.shape({
            link: PropTypes.string,
            label: PropTypes.string,
            centered: PropTypes.bool,
        }),
        funFact: PropTypes.shape({
            placement: PropTypes.oneOf(["bottom", "top", "left", "right"]),
            header: PropTypes.string,
            body: PropTypes.string,
        }),
        sectionFluid: PropTypes.shape({
            image: PropTypes.any,
            alt: PropTypes.string,
        })
    }),
}

PageSection.defaultProps = {
    sectionData: {
        label: "Section label",
        title: "Section title",
        sectionImg: {
            isUrl: true,
        },
    },
}


export default PageSection