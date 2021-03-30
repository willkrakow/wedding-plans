import React from "react";
import Layout from "../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { Col, Row, Container } from "reactstrap";

export default function Registry() {
  const data = useStaticQuery(graphql`
    {
      allAirtable(filter: { table: { eq: "registry" } }) {
        edges {
          node {
            recordId
            data {
              name
              product_url
              purchased
              price
              description
            }
          }
        }
      }
    }
  `);

  const slugifyName = (name) => {
    return name.replace(" ", "-").toLowerCase();
  };

  const priceRemaining = (percPurchased, price) => {
    let moneyLeft = price - percPurchased * price;
    return Math.round(moneyLeft);
  };
  const { allAirtable } = data;
  return (
    <Layout
      metatitle="Registry"
      bannerimage="https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    >
      <Container>
        <Row className="justify-content-center">
          {allAirtable.edges.map((edge) => {
            return (
              edge.node.data && (
                <Col
                  key={edge.node.recordId}
                  xs={6}
                  md={4}
                  lg={3}
                  className="d-flex justify-content-center align-items-end flex-wrap text-center"
                >
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/I/81RA3dDS6EL._AC_SL300_.jpg"
                    className="w-100 p-4"
                    alt={edge.node.data.name}
                  />
                  <button
                    className="snipcart-add-item btn-outline-dark rounded-0 w-75 my-2"
                    data-item-id={slugifyName(edge.node.data.name)}
                    data-item-price={edge.node.data.price}
                    data-item-url="/"
                    data-item-description={edge.node.data.description}
                    data-item-name={edge.node.data.name}
                  >
                    Add to cart
                    <br />
                  </button>
                  <span className="small text-muted">
                    $
                    {priceRemaining(
                      edge.node.data.purchased,
                      edge.node.data.price
                    ).toString()}{" "}
                    to go
                  </span>
                </Col>
              )
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}
