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

type ZolaProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  localImage: LocalImage;
  productId: string;
  stillNeeds: string;
}

interface Props {
    allZolaProduct: {
      nodes: ZolaProduct[]
    }
}

const DetailsBox = styled.div`
flex: 1;
margin-top: ${(props) => props.theme.spacing[3]};
margin-bottom: ${(props) => props.theme.spacing[3]};
`

const Price = styled(H5)`
font-family: ${(props) => props.theme.fonts.body};
font-weight: bold;
font-size: ${(props) => props.theme.fontSizes[2]};
}`

const Name = styled(H3)`
font-size: ${(props) => props.theme.fontSizes[3]};
`
type RegistryPageProps = PageProps<Props>

const Registry = ({ data }: RegistryPageProps) => {
  const {nodes: products} = data.allZolaProduct
  return (
    <Container>
      <H2 centered>Registry</H2>
      <H4 centered alwaysdark inline></H4>
      <Container>
        <Row>
          {products.map((product) => (
            <Col className="my-3" xs={12} md={6} lg={3} key={product.id}>
              <article className="d-flex flex-column h-100">
                <GatsbyImage
                  image={product.localImage.childImageSharp.gatsbyImageData}
                  alt={product.name}
                />
                <DetailsBox>
                  <Name>{product.name}</Name>
                </DetailsBox>
                <Price>${product.price}</Price>
                <P>Still need: {product.stillNeeds}</P>
                <a
                  href={`https://www.zola.com/registry/collection-item/${product.productId}`}
                >
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
    allZolaProduct {
      nodes {
        localImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        id
        name
        price
        stillNeeds
        productId
      }
    }
  }
`;