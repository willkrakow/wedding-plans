import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { H2, H3, H4, H5, P } from '../components/typography'
import './registry.css'
import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image'
import { PageProps, graphql } from 'gatsby'
import Button from '../components/button'
import styled from 'styled-components'

type LocalImage = {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
}

const NeededP = styled(P)`
  font-weight: bolder;
`

const MutedP = styled(P)`
  color: ${props => props.theme.colors.muted};
  margin-top: 0;
`

const FlexNeed = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`

type AmazonProduct = {
  id: string;
  productId: string;
  title: string;
  price: number;
  priceString: string;
  requested: number;
  needed: number;
  purchased: number;
  primeShippingEligible: boolean;
  productUrl: string;
  inStock: boolean;
  category: string;
  image: string;
  localImage: LocalImage;
}

interface Props {
    allAmazonProduct: {
      nodes: AmazonProduct[]
    }
}

const FlexPrice = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const DetailsBox = styled.div`
flex: 1;
margin-top: ${(props) => props.theme.spacing[2]};
margin-bottom: ${(props) => props.theme.spacing[3]};
`

const Price = styled(H5)`
font-family: ${(props) => props.theme.fonts.body};
font-weight: bold;
font-size: ${(props) => props.theme.fontSizes[2]};
margin-bottom: 0;
}`

const Name = styled(H3)`
font-size: ${(props) => props.theme.fontSizes[3]};
margin-top: 0;
`

const CategoryTitle = styled(H4)`
font-size: 24px;
color: ${(props) => props.theme.colors.accent};
margin-bottom: 0;
font-family: ${(props) => props.theme.fonts.cursive};
line-height: 1;
`

type RegistryPageProps = PageProps<Props>

function getFirstPartOfTitle(title: string){
  return title.split('with')[0].split("-")[0].split(",")[0].trim()
}

function trimFirstN(str: string, n: number){
  return str.slice(n)
}

function capitalize(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function removeAllChars(str: string, chars: string[]){
  return chars.reduce((acc, char) => acc.replace(char, " "), str)
}

const Registry = ({ data }: RegistryPageProps) => {
  const {nodes: products} = data.allAmazonProduct
  return (
    <Container>
      <H2 centered>Registry</H2>
      <H4 centered alwaysdark inline></H4>
      <Container fluid>
        <Row>
          {products.map((product) => (
            <Col className="my-3 px-4" xs={12} md={6} lg={4} key={product.id}>
              <article className="d-flex flex-column h-100 position-relative">
                <GatsbyImage
                  image={product.localImage.childImageSharp.gatsbyImageData}
                  alt={product.title}
                />
                  <CategoryTitle centered={false} alwaysdark inline >
                    {removeAllChars(
                      capitalize(trimFirstN(product.category, 3)),
                      ["_"]
                    )}
                  </CategoryTitle>
                <DetailsBox>
                  <Name>{getFirstPartOfTitle(product.title)}</Name>
                </DetailsBox>
                <FlexPrice>
                  <FlexNeed>
                    <Price>{product.priceString}</Price>
                    <MutedP>{product.inStock && "In stock"}</MutedP>
                  </FlexNeed>
                  <NeededP>Still need: {product.needed}</NeededP>
                </FlexPrice>
                <a href={product.productUrl}>
                  <Button>View and buy</Button>
                </a>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Registry

export const query = graphql`
  {
    allAmazonProduct {
      nodes {
        id
        localImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        priceString
        price
        needed
        productUrl
        purchased
        requested
        title
        productId
        primeShippingEligible
        inStock
        category
      }
    }
  }
`;
