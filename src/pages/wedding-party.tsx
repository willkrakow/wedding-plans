import React from "react";
import { Container, Row, Col } from "reactstrap";
import { H2, H3, H4, H5, P } from "../components/typography";
import styled from "styled-components";
import { PageProps, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";

const WPMember = styled(Container)`
    padding-bottom: 1em;
    margin-bottom: 1em;
`;

const WPMemberName = styled(H5)`
  margin-bottom: 0.5rem;
  line-height: 1;
  margin-top: 0.5rem;
`;

const WPMemberRole = styled(P)`
  margin-top: 0;
  line-height: 1;
`;

type WeddingPartyMember = {
  data: {
    name: string;
    role: string;
    image: {
      localFiles: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      }[];
    };
    description: string;
    side: "Bride" | "Groom";
  };
};

type WeddingPartyProps = {
  allAirtable: {
    nodes: WeddingPartyMember[];
  };
};

const WeddingParty = ({ data }: PageProps<WeddingPartyProps>) => {
  const { nodes } = data.allAirtable;

  const brideSide = nodes.filter((node) => node.data.side === "Bride");
  const groomSide = nodes.filter((node) => node.data.side === "Groom");

  return (
    <>
      <Container>
        <Row>
          <Col>
            <H2 centered>Wedding Party</H2>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-between">
          {/* Bride side */}
          <Col xs={12} md={6} lg={5}>
              <H3>Bride</H3>
            {brideSide.map((node) => (
              <MemberCard
                member={node}
                textAlign="text-end"
                key={node.data.name}
              />
            ))}
          </Col>
          {/* Groom side */}
          <Col xs={12} md={6} lg={5}>
            <H3>Groom</H3>
            {groomSide.map((node) => (
              <MemberCard
                key={node.data.name}
                member={node}
                textAlign={"text-start"}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WeddingParty;

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "wedding_party" } }) {
      nodes {
        data {
          name
          description
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.33)
              }
            }
          }
          side
          role
        }
      }
    }
  }
`;

const MemberCard = ({
  member,
  textAlign,
}: {
  member: WeddingPartyMember;
  textAlign: "text-start" | "text-end";
}) => (
  <WPMember tag="article" key={member.data.name}>
    <Row>
      <Col xs={12} md={12}>
        <GatsbyImage
          image={
            member.data.image?.localFiles?.[0]?.childImageSharp.gatsbyImageData
          }
          alt={member.data.name}
        />
      </Col>
      <Col
        key={member.data.name}
        xs={12}
        md={12}
        lg={6}
        className="d-flex flex-column justify-content-center"
      >
        <WPMemberName className={textAlign} centered={false}>
          {member.data.name}
        </WPMemberName>
        <WPMemberRole className={textAlign}>{member.data.role}</WPMemberRole>
      </Col>
    </Row>
  </WPMember>
);
