import React from 'react'
import { ElementTitle, SectionTitle, ElementText, ElementSubtitle } from '../components/typography'
import Slide from 'react-reveal/Slide'
import styled from 'styled-components'
import Button from '../components/button'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { ClassyCard } from '../components/layout'
import FunFact from '../components/funFact'

const PageSectionImage = styled.img`
width: 100%;
height: auto;
`


const PageSection = ({ sectionData }) => {
    const { label, title, subtitle, sectionImg, bodyText, cta, funFact } = sectionData
    return (
        <Slide left>
            <ClassyCard fluid>
                <Row>
                    <Col xs={12} lg={3}>
                    </Col>
                    <Col xs={12} lg={6}>
                        <SectionTitle>{label}</SectionTitle>
                        {funFact ? (
                            <FunFact body={funFact.body} header={funFact.header} >
                                <ElementTitle factTitle >{title}</ElementTitle>
                            </FunFact>
                        )
                            : <ElementTitle>{title}</ElementTitle>
                        }
                        {subtitle && <ElementSubtitle>{subtitle}</ElementSubtitle>}
                        {sectionImg && <PageSectionImage src={sectionImg.src} alt={sectionImg.alt || title} />}
                        {bodyText && <ElementText>{bodyText}</ElementText>}
                        {cta && (
                            <a href={cta.link} alt={cta.label} className={cta.centered ? "d-block text-center" : ""}><Button>{cta.label}</Button></a>
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
    }),
}

PageSection.defaultProps = {
    sectionData: {
        label: "Section label",
        title: "Section title",
    },
}


export default PageSection