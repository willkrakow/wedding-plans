import React from "react";
import {SnipcartContext} from 'gatsby-plugin-snipcart-advanced/context'
import { graphql } from 'gatsby'
import Button, { WhiteButton } from '../components/button'
import { H2, ProductName, ProductPrice, ProductCategory } from "../components/typography";
import { ClassyCard } from '../containers/classyCard';
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { centsToDollars } from '../utils'
import Img from 'gatsby-image'

const BuyButton = styled(Button)`
margin: auto;
display: block;
`

const ProductCard = styled(Col)`
margin-bottom: ${props => props.theme.spacing[6]};
margin-top: ${props => props.theme.spacing[7]};
`

const ProductRow = styled(Row)`
align-items: flex-end;
`

const Registry = ({ data }) => {
  const products = data.allAirtable.edges;
  const { state } = React.useContext(SnipcartContext)
  const { userStatus, cartQuantity } = state;


  const [ location, setLocation ] = React.useState()


  React.useEffect(() => {
    setLocation(window.location.href)
  }, [])

  return (
      <ClassyCard>
        <H2 centered>Gift Registry</H2>
      <Row>
        <Col xs={6} className="text-center">
        {userStatus === "SignedOut" ? (
          <Button className="snipcart-customer-signin mx-auto">Sign in</Button>
        ) : (
          <WhiteButton className="snipcart-customer-signout">Sign out</WhiteButton>
        )}
        </Col>
        <Col xs={6} className="text-center">
          <Button className="snipcart-checkout">{`Cart (${cartQuantity})`}</Button>
        </Col>
        </Row>
        <ProductRow>
        {products.map((product) => (
          <ProductCard xs={12} md={4} lg={3} key={product.node.id}>
              <Img fluid={product.node.data.image.localFiles[0].childImageSharp.fluid} alt={product.node.data.name} />
            <header>
              <a href={product.node.data.product_url} alt={product.node.data.name}>
              <ProductName>{product.node.data.name}</ProductName>
              <ProductCategory>{product.node.data.category[0]}</ProductCategory>
              </a>
            </header>
            <ProductPrice>{`$${centsToDollars(product.node.data.price, "str")}`}</ProductPrice>
          <BuyButton
            className="snipcart-add-item"
            data-item-id={product.node.id}
            data-item-url={location}
            data-item-image={product.node.data.image.localFiles[0].publicURL}
            data-item-price={product.node.data.price}
            data-item-description={product.node.data.category[0]}
            data-item-name={product.node.data.name}
          >
            Add to cart
          </BuyButton>
          </ProductCard>
        ))}
      </ProductRow>
      
      </ClassyCard>
  );
}

export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "registry"}}) {
      edges {
        node {
          id
          data {
            image {
              localFiles {
                publicURL
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                    src
                  }
                }
              }
            }
            price
            name
            purchased
            category
            product_url
          }
        }
      }
    }
  }
`


export default Registry