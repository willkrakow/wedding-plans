import React from "react";
import { SnipcartContext } from "gatsby-plugin-snipcart-advanced/context";
import { graphql, PageProps } from "gatsby";
import Button, { RedButton, WhiteButton } from "../components/button";
import { H2, H3, P } from "../components/typography";
import { Row, Col, Container } from "reactstrap";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";

interface RegistryNodeProps {
  node: {
    id: string;
    recordId: string;
    data: {
      image: {
        localFiles: Array<any>;
      };
      price: number;
      name: string;
      purchased: boolean;
      category: string;
      product_url: string;
      description: string | undefined;
    };
  };
}

interface IRegistry {
  data: {
    allAirtable: {
      edges: Array<RegistryNodeProps>;
    };
  };
}

type RegistryProps = IRegistry & PageProps;

const BuyButton = styled(Button)`
  display: block;
`;

const ProductHeader = styled.header`
flex: 1 1 25%;
margin-top: 1rem;
`

const PadImage = styled(GatsbyImage)`
`

const ProductCard = styled(Col)`
  margin-bottom: ${(props) => props.theme.spacing[6]};
  margin-top: ${(props) => props.theme.spacing[7]};
  padding-left: ${(props) => props.theme.spacing[5]};
  padding-right: ${(props) => props.theme.spacing[5]};
  display: flex;
  flex-direction: column;
`;

const Registry = ({ data }: RegistryProps) => {
  const products = data.allAirtable.edges;
  const { state } = React.useContext(SnipcartContext);
  const { userStatus, cartQuantity } = state;


  return (
    <>
      <H2 centered>Gift Registry</H2>
      <Container>
        <Row>
          <Col xs={6} className="text-center">
            {userStatus === "SignedOut" ? (
              <Button className="snipcart-customer-signin mx-auto">
                Sign in
              </Button>
            ) : (
              <RedButton className="snipcart-customer-signout">
                Sign out
              </RedButton>
            )}
          </Col>
          <Col xs={6} className="text-center">
            <WhiteButton className="snipcart-checkout">{`Cart (${cartQuantity})`}</WhiteButton>
          </Col>
        </Row>
        <Row>
          {products.map((product) => (
            <ProductCard xs={12} md={6} lg={4} key={product.node.id}>
              <PadImage
                image={
                  product.node.data.image.localFiles[0].childImageSharp
                    .gatsbyImageData
                }
                alt={product.node.data.name}
              />
              <ProductHeader>
                <H3 nosubtitle={false} factTitle={false}>
                  {product.node.data.name}
                </H3>
                <P>
                  <strong>{`$${product.node.data.price}`}</strong>
                </P>
                <P>
                  {product.node.data.description}
                </P>
              </ProductHeader>
              <BuyButton
                className="snipcart-add-item"
                data-item-id={`${product.node.recordId}`}
                data-item-url={"/registry"}
                data-item-image={
                  product.node.data.image.localFiles[0].publicURL
                }
                data-item-price={`${product.node.data.price}`}
                data-item-description={product.node.data.description}
                data-item-name={`${product.node.data.name}`}
              >
                Add to cart
              </BuyButton>
            </ProductCard>
          ))}
        </Row>
      </Container>
    </>
  );
};

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "registry" } }) {
      edges {
        node {
          recordId
          data {
            image {
              localFiles {
                publicURL
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1,
                    backgroundColor: "transparent",
                    transformOptions: {
                      fit: CONTAIN
                    }
                  )
                }
              }
            }
            price
            name
            purchased
            category
            product_url
            description
          }
        }
      }
    }
  }
`;

export default Registry;
