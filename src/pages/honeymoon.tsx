import React from "react";
import Button from "../components/button";
import styled from "styled-components";
import {
  GatsbyImage,
  GatsbyImageProps,
  IGatsbyImageData,
} from "gatsby-plugin-image";
import { graphql } from "gatsby";
import { H2, H3, H4 } from "../components/typography";
import { Col, Container, Row } from "reactstrap";
import HoneymoonModal from '../components/HoneymoonModal'


interface IGatsbyImageInput {
  checked: boolean;
}

const DestinationButton = styled(Button)`
width: fit-content;
`

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

const GatsbyImageInput = styled(GatsbyImage)<GatsbyImageProps & IGatsbyImageInput>`
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
  border: ${(props) => props.checked ? `${props.theme.spacing[3]} solid ${props.theme.colors.secondary}` : "2px solid transparent"};
  &:before {
    transition: all 0.3s ease-in-out;
    content: ${(props) => (props.checked ? "x" : "none")};
    position: absolute;
    inset: 0;
    background-color: ${(props) =>
      props.checked ? "rgba(0,20,30,0.5)" : "transparent"};
  }
  &:hover {
    &:before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
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
  const [paymentAmount, setPaymentAmount] = React.useState(10);
  const [destination, setDestination] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<IGatsbyImageData | null>(null);
  const [selectedDescription, setSelectedDescription] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(paymentAmount, destination);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(e.target?.value))) {
      setPaymentAmount(0);
      return;
    }
    setPaymentAmount(parseInt(e.target.value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    setIsOpen(true);
  };

  return (
    <>
      <H2 centered>Honeymoon</H2>
      <H4 centered inline={false} alwaysdark>
        Help us choose our honeymoon destination by casting your vote below!
      </H4>
      <Container className="mt-5">
      {isOpen && selectedImage && <HoneymoonModal description={selectedDescription || ""} handleAmountChange={handleAmountChange} paymentAmount={paymentAmount} isOpen={isOpen} handleClose={() => setIsOpen(false)} image={selectedImage} destination={destination} handleSubmit={handleSubmit} />}
        <HoneymoonForm onSubmit={handleSubmit}>
          <OptionContainer>
            <Row className="justify-content-center mb-5">
              {data.allAirtable.edges.map(({ node }) => {
                const { name, image, location, description } = node.data
                const { gatsbyImageData: destinationImage } = image.localFiles[0].childImageSharp;
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
                        checked={
                          destination.toLowerCase() ===
                          name.toLowerCase()
                        }
                      />
                      <HiddenInput
                        type="radio"
                        name="destination"
                        value={name}
                        checked={destination === name}
                        onChange={handleChange}
                      />
                    </DestinationOption>
                    <DestinationButton
                    className="mt-3"
                      onClick={(e) => {
                        e.preventDefault();
                        setDestination(name);
                        setSelectedImage(destinationImage);
                        setSelectedDescription(description);
                        setIsOpen(true);
                      }}
                    >
                      {destination === name ? "✅ " : ""} Vote for{" "}
                      {name}
                    </DestinationButton>
                  </DestinationWrapper>
                </Col>
                )}
              )}
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
