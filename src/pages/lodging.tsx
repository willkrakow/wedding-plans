import React from "react";
import { graphql } from "gatsby";
import { H2, H3, H4, P } from "../components/typography";
import styled from "styled-components";
import Button, { WhiteButton } from "../components/button";
import {GatsbyImage} from 'gatsby-plugin-image'
import { Col, Row } from "reactstrap";
import { ClassyCard } from "../containers/classyCard";

interface LodgingNodeProps {
  id: string;
  data: {
    price_range: number;
    blocked_rooms: number;
    location: string;
    description: string | undefined;
    booking_url: string;
    booking_info: string;
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

// const determineDollarSigns = (price: number): number => {
//   if (price < 200) {
//     return 1;
//   }
//   if (price < 260) {
//     return 2;
//   }
//   return 3;
// };

const BookingSection = styled.section`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing[3]} 0;
  flex-wrap: wrap;
`;

const BookingInfo = styled(P)`
flex-basis: 100%;
color: ${(props) => props.theme.colors.muted};
`

const Lodging = ({ data }: LodgingProps) => {
  const hotels = data.allAirtable.nodes;

  return (
    <>
      <H2 centered>Lodging</H2>
      <ClassyCard>
        {hotels.map((hotel) => (
          <Row className="justify-content-center">
            <Col xs={12} md={9} lg={6}>
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
              <BookingSection>
                <BookingInfo>{hotel.data.booking_info}</BookingInfo>
                <a href={hotel.data.booking_url}>
                  <Button>Call to book</Button>
                </a>
                <a href={hotel.data.main_url}>
                  <WhiteButton>More info</WhiteButton>
                </a>
              </BookingSection>
            </Col>
          </Row>
        ))}
      </ClassyCard>
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
          booking_info
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
