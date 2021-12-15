import React from 'react'
import { H3, P, H4, H5 } from '../components/typography'
import styled from 'styled-components'
import Button, { WhiteButton } from '../components/button'
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

interface FinalSymbolProps {
    count: number,
    symbol: string,
}


type SectionProps = {
  label?: string;
  title: string;
  subtitle?: string;
  sectionImg?: imageTypes | undefined;
  bodyText?: string;
  funFact?: factProps;
  sectionFluid?: sectionFluidTypes;
  cta?: ctaTypes;
  cta_secondary?: ctaTypes;
  finalMessage?: string;
  finalSymbol?: FinalSymbolProps;
};

interface sectionFluidTypes {
    image: IGatsbyImageData,
    alt?: string | undefined,
}

const FinalMessage = styled(P)`
  font-weight: ${(props) => props.theme.fontWeights.heavy};
  color: ${(props) => props.theme.colors.muted};
  font-style: italic;
`;

const FinalSymbol = styled.span`
font-weight: ${props => props.theme.fontWeights.heavy};
letter-spacing: ${props => props.theme.spacing[1]};
font-size: ${props => props.theme.fontSizes[2]};
`

const PageSection: React.FC<SectionProps> = (sectionData) => {
    const { label, title, subtitle, sectionImg, bodyText, cta, funFact, sectionFluid, cta_secondary, finalMessage, finalSymbol } = sectionData
    return (
        <ClassyCard fluid>
          <Row>
            <Col xs={12} lg={3}></Col>
            <Col xs={12} lg={6}>
              <H5 centered={false}>{label}</H5>
              {funFact ? (
                <FunFact body={funFact.body} header={funFact.header}>
                  <H3 factTitle={true} nosubtitle={true} centered={false}>
                    {title}
                  </H3>
                </FunFact>
              ) : (
                <H3
                  centered={false}
                  factTitle={false}
                  nosubtitle={subtitle ? false : true}
                >
                  {title}
                </H3>
              )}
              {subtitle && (
                <H4 centered={false} alwaysdark={false} inline={false}>
                  {subtitle}
                </H4>
              )}
              {sectionImg && (
                <PageSectionImage
                  src={sectionImg.src}
                  alt={sectionImg.alt || title}
                />
              )}
              {sectionFluid && (
                <GatsbyImage image={sectionFluid.image} alt={title} />
              )}
              {bodyText && <P centered={false}>{bodyText}</P>}
              {finalSymbol &&
                [...Array(finalSymbol.count)].map((_e, i) => (
                  <FinalSymbol key={i}>{finalSymbol.symbol}</FinalSymbol>
                ))}
              {finalMessage && <FinalMessage>{finalMessage}</FinalMessage>}
              {cta && (
                <a href={cta.link} className={cta.centered ? "d-block" : ""}>
                  <Button>{cta.label}</Button>
                </a>
              )}
              {cta_secondary && (
                <a href={cta_secondary.link}>
                  <WhiteButton>{cta_secondary.label}</WhiteButton>
                </a>
              )}
            </Col>
          </Row>
        </ClassyCard>
    );
}


export default PageSection