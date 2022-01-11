import React from "react";
import Button, { WhiteButton } from "../components/button";
import styled from "styled-components";
import {
  GatsbyImage,
  GatsbyImageProps,
  IGatsbyImageData,
} from "gatsby-plugin-image";
import { graphql } from "gatsby";
import { H2, H3, H4 } from "../components/typography";
import { Col, Container, Row } from "reactstrap";
import HoneymoonModal, { HoneymoonDetailsModal } from "../components/HoneymoonModal";

interface IGatsbyImageInput {
  checked: boolean;
}

const HoneymoonForm = styled.form`
  max-width: 900px;
  margin: auto;
`;

const OptionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DestinationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[7]};
`;

const DestinationOption = styled.label`
  min-width: 200px;
  z-index: 400;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
  }
`;

const HiddenInput = styled.input`
  opacity: 0;
  height: 0px;
  width: 0px;
`;

const GatsbyImageInput = styled(GatsbyImage)<
  GatsbyImageProps & IGatsbyImageInput
>`
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
`;

async function submit(paymentAmount: number, destination: string) {
  const res = await fetch("/.netlify/functions/pay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: paymentAmount,
      destination: destination,
    }),
  });
  const json = await res.json();
  window.location.replace(json.redirect_url);
}

export type HoneymoonOptionProps = {
  id: string;
  data: {
    name: string;
    location: string;
    description: string;
    activities: string[];
    image: {
      localFiles: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      }[];
    };
  };
};

export type HoneymoonPageProps = {
  data: {
    allAirtable: {
      edges: {
        node: HoneymoonOptionProps;
      }[];
    };
  };
};


const Honeymoon = ({ data }: HoneymoonPageProps) => {
console.log(data.allAirtable)
function findDestination(id: string) {
  return data.allAirtable.edges.find((option) => option.node.id === id);
}
  const [paymentAmount, setPaymentAmount] = React.useState(10);
  const [selected, setSelected] = React.useState("");
  const [isPayOpen, setIsPayOpen] = React.useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(paymentAmount, data.allAirtable.edges.find((e) => e.node.id === selected)?.node?.data?.name || "any");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(e.target?.value))) {
      setPaymentAmount(0);
      return;
    }
    setPaymentAmount(parseInt(e.target.value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    setIsPayOpen(true);
  };

  const handlePayFromDetails = () => {
    setIsDetailsOpen(false);
    setIsPayOpen(true);
  }

  return (
    <>
      <H2 centered>Honeymoon</H2>
      <H4 centered inline={false} alwaysdark>
        Help us choose our honeymoon destination by casting your vote below!
      </H4>
      <Container className="mt-5">
        {isPayOpen && (
          <HoneymoonModal
            destination={findDestination(selected)?.node}
            handleAmountChange={handleAmountChange}
            paymentAmount={paymentAmount}
            isOpen={isPayOpen}
            handleClose={() => setIsPayOpen(false)}
            handleSubmit={handleSubmit}
          />
        )}
        {isDetailsOpen && (
          <HoneymoonDetailsModal
            isOpen={isDetailsOpen}
            handleClose={() => setIsDetailsOpen(false)}
            destination={findDestination(selected)?.node}
            handlePay={handlePayFromDetails}
          />
        )}
        <HoneymoonForm onSubmit={handleSubmit}>
          <OptionContainer>
            <Row className="justify-content-center mb-5">
              {data.allAirtable.edges.map(({ node }) => {
                const { name, image, location } = node.data;
                const { gatsbyImageData: destinationImage } =
                  image.localFiles[0].childImageSharp;
                return (
                  <Col key={node.id} xs={12} md={6} lg={6} className="mb-5">
                    <DestinationWrapper key={node.id}>
                      <H3>{name}</H3>
                      {/* @ts-ignore */}
                      <H4 alwaysdark>{location}</H4>
                      <DestinationOption>
                        <GatsbyImageInput
                          image={destinationImage}
                          alt={name}
                          checked={node.id === selected}
                        />
                        <HiddenInput
                          type="radio"
                          name="destination"
                          value={name}
                          checked={node.id === selected}
                          onChange={handleChange}
                        />
                      </DestinationOption>
                      <Button
                        className="my-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelected(node.id);
                          setIsPayOpen(true);
                        }}
                      >
                        Vote and pay
                      </Button>
                      <WhiteButton
                        className="my-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelected(node.id);
                          setIsDetailsOpen(true);
                        }}
                      >
                        More info
                      </WhiteButton>
                    </DestinationWrapper>
                  </Col>
                );
              })}
            </Row>
          </OptionContainer>
        </HoneymoonForm>
      </Container>
    </>
  );
};

export default Honeymoon;

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "honeymoon" } }) {
      edges {
        node {
          id
          data {
            activities
            name
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            location
            description
          }
        }
      }
    }
  }
`;
