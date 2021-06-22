import React from 'react'
import { H3, P, H4, H5 } from '../components/typography'
import Slide from 'react-reveal/Slide'
import styled from 'styled-components'
import Button from '../components/button'
import { Row, Col } from 'reactstrap'
import { ClassyCard } from './classyCard'
import FunFact, { factProps } from '../components/funFact'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

const PageSectionImage = styled.img`
width: 100%;
height: auto;
`

interface imageTypes {
    src?: string,
    alt?: string | undefined,
    isUrl?: boolean,
}

interface ctaTypes {
    link?: string,
    label?: string,
    centered?: boolean,
}


type SectionProps = {
    label?: string,
    title: string,
    subtitle?: string,
    sectionImg?: imageTypes | undefined,
    bodyText?: string,
    cta?: ctaTypes,
    funFact?: factProps,
    sectionFluid?: sectionFluidTypes,    
}

interface sectionFluidTypes {
    image: IGatsbyImageData,
    alt?: string | undefined,
}

const PageSection: React.FC<SectionProps> = (sectionData) => {
    const { label, title, subtitle, sectionImg, bodyText, cta, funFact, sectionFluid } = sectionData
    return (
        <Slide up>
            <ClassyCard fluid >
                <Row>
                    <Col xs={12} lg={3}>
                    </Col>
                    <Col xs={12} lg={6}>
                        <H5 centered={false} >{label}</H5>
                        {funFact ? (
                            <FunFact body={funFact.body} header={funFact.header} >
                                <H3 factTitle={true} nosubtitle={true} centered={false}>{title}</H3>
                            </FunFact>
                        )
                            : <H3 centered={false} factTitle={false} nosubtitle={subtitle ? false : true} >{title}</H3>
                        }
                        {subtitle && <H4 centered={false} alwaysdark={false} inline={false} >{subtitle}</H4>}
                        {sectionImg && <PageSectionImage src={sectionImg.src} alt={sectionImg.alt || title} />}
                        {sectionFluid && <GatsbyImage image={sectionFluid.image} alt={title} />}
                        {bodyText && <P centered={false} >{bodyText}</P>}
                        {cta && (
                            <a href={cta.link} className={cta.centered ? "d-block" : ""}><Button>{cta.label}</Button></a>
                        )}
                    </Col>
                </Row>
            </ClassyCard>
        </Slide>
    )
}


export default PageSection