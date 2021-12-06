import React from "react";
import PageSection from "../containers/pageSection";
import { graphql } from "gatsby";
import { H2, H3, H4, P } from "../components/typography";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";
import Button, { WhiteButton } from "../components/button";
import {GatsbyImage} from 'gatsby-plugin-image'
import { Col, Container, Row } from "reactstrap";

interface LodgingNodeProps {
  id: string;
  data: {
    price_range: number;
    blocked_rooms: number;
    location: string;
    description: string | undefined;
    booking_url: string;
    main_url: string;
    name: string;
    image: {
      localFiles: Array<any>;
    };
  };
}

interface LodgingProps {
  data: {
    allAirtable: {
      nodes: Array<LodgingNodeProps>;
    };
  };
}

const determineDollarSigns = (price: number): number => {
  if (price < 200) {
    return 1;
  }
  if (price < 260) {
    return 2;
  }
  return 3;
};

const LoginForm = styled.section`
  display: flex;
  max-width: 600px;
  align-items: center;
  padding: ${(props) => props.theme.spacing[3]} 0;
`;

const Lodging = ({ data }: LodgingProps) => {
  const hotels = data.allAirtable.nodes;
  const { login, logout, user, signup } = useAuth();

  return (
    <>
      <H2 centered>Lodging</H2>
      <Container>
        {hotels.map((hotel) => (
          <Row className="justify-content-center">
            <Col xs={12} md={9} lg={6} >
            {/* @ts-ignore */}
            <H3>{hotel.data.name}</H3>
            {/* @ts-ignore */}
            <H4>{hotel.data.location}</H4>
            <GatsbyImage
              image={
                hotel.data.image.localFiles[0].childImageSharp.gatsbyImageData
              }
              alt={hotel.data.name}
            />
            <P>{hotel.data.description}</P>
            <LoginForm>
              {user ? (
                <>
                  <a href={hotel.data.booking_url}>
                    <Button>Book Now</Button>
                  </a>
                  <a href={hotel.data.main_url}>
                    <WhiteButton>More Info</WhiteButton>
                  </a>
                </>
              ) : (
                <>
                  <Button onClick={login}>Login to book</Button>
                  <WhiteButton onClick={signup}>Create an account</WhiteButton>
                </>
              )}
            </LoginForm>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};
export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "lodging" } }) {
      nodes {
        data {
          booking_url
          main_url
          name
          price_range
          description
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          location
        }
      }
    }
  }
`;

export default Lodging;
