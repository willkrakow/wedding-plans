import React from "react";
import { Col, Container, Modal, Row, Spinner } from "reactstrap";
import Button, { WhiteButton } from "../components/button";
import { Input } from "../components/forms";
import { H2, H3, H4, H5, P } from "../components/typography";
import { TextArea } from "./rsvp";
import { graphql, navigate } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

const Honeymoon = ({ data }: HoneymoonPageProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function verifyVote(formData) {
    if (!formData.first_name) {
      setErrors(["Please enter your first name"]);
      return false;
    }
    if (!formData.last_name) {
      setErrors(["Please enter your last name"]);
      return false;
    }
    if (!formData.destination) {
      setErrors(["Please choose a destination"]);
      return false;
    }
    return true;
  }

  const handleSubmit = async () => {
    setLoading(true);
    const validated = verifyVote(formData);
    if (!validated) {
      return;
    }
    setErrors([]);
    const res = await fetch("/.netlify/functions/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: formData }),
    });
    if (res.ok) {
      setIsOpen(false);
      setLoading(false);
      navigate("/honeymoonthankyou");
      return;
    }
    setLoading(false);
    setErrors(["Something went wrong, please try again later"]);
    return;
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSelectDestination = (str: string) => {
    setFormData({
      ...formData,
      destination: str,
    });
    handleOpen();
  };

  return (
    <section>
      {loading && <Spinner title={"loading"} children={null} />}
      <Container>
        <Row className="mb-5">
          <Col>
            <H2 centered>Honeymoon</H2>
            <H4 centered inline alwaysdark>
              We still aren't sure where to go for our honeymoon. Help us
              decide!
            </H4>
          </Col>
        </Row>
        <Row>
          {data.allAirtable.edges.map((e) => (
            <Col key={e.node.id} sm={12} md={6} className="mb-5 px-5">
              <GatsbyImage
                image={
                  e.node.data.image.localFiles[0].childImageSharp
                    .gatsbyImageData
                }
                alt={e.node.data.name}
              />
              <H5 className="mt-3 mb-0">{e.node.data.location}</H5>
              <H4 centered={false} alwaysdark inline>
                {e.node.data.name}
              </H4>
              <P centered={false}>{e.node.data.description}</P>
              <Button onClick={() => handleSelectDestination(e.node.data.name)}>
                Vote for {e.node.data.name}
              </Button>
            </Col>
          ))}
        </Row>
        <FormModal
          isOpen={isOpen}
          formData={formData}
          handleChange={handleChange}
          handleClose={handleClose}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      </Container>
    </section>
  );
};

const FormModal = ({
  isOpen,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  errors,
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Modal isOpen={isOpen} toggle={handleClose}>
      <form onSubmit={onSubmit}>
        <Container>
          <Row className="p-3">
            <Col xs={12}>
              <H3 centered className="mb-3">
                {formData.destination}
              </H3>
            </Col>
            <Col xs={12} md={6}>
              <Input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First name"
              />
            </Col>
            <Col xs={12} md={6}>
              <Input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last name"
              />
            </Col>
            <Col xs={12} className="w-100">
              <TextArea
                className="w-100 mb-3 p-2"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Why should we go here?"
              />
            </Col>
            <Col xs={12}>
              <WhiteButton onClick={(e) => {e.preventDefault(); handleClose()}}>Cancel</WhiteButton>
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
          {errors.length > 0 && errors.map((e) => <span>{e}</span>)}
        </Container>
      </form>
    </Modal>
  );
};

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
                  gatsbyImageData(aspectRatio: 1.7, quality: 40)
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

export default Honeymoon;

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
