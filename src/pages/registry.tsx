import React from "react";
import { Col, Container, Row, Modal, ModalBody, Spinner } from "reactstrap";
import { ElementLink, H2, H3, H4, H5, P } from "../components/typography";
import { IGatsbyImageData, GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { PageProps, graphql } from "gatsby";
import Button, { WhiteButton } from "../components/button";
import styled from "styled-components";
import { Input } from "../components/forms";
import { TextArea } from "./rsvp";

type LocalImage = {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
};

const NeededP = styled(P)`
  font-weight: bolder;
  margin-top: 0;
  margin-bottom: 0;
`;

const MutedP = styled(P)`
  color: ${(props) => props.theme.colors.muted};
  margin-top: 0;
`;

const FlexNeed = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

type AmazonProduct = {
  id: string;
  productId: string;
  title: string;
  price: number;
  priceString: string;
  requested: number;
  needed: number;
  purchased: number;
  primeShippingEligible: boolean;
  productUrl: string;
  inStock: boolean;
  category: string;
  image: string;
  localImage: LocalImage;
};

interface Props {
  allAmazonProduct: {
    nodes: AmazonProduct[];
  };
}

const FlexPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailsBox = styled.div`
  flex: 1;
  margin-top: ${(props) => props.theme.spacing[2]};
  margin-bottom: ${(props) => props.theme.spacing[3]};
`;

const Price = styled(H5)`
font-family: ${(props) => props.theme.fonts.body};
font-weight: bold;
font-size: ${(props) => props.theme.fontSizes[2]};
margin-bottom: 0;
`;

const Name = styled(H3)`
  font-size: ${(props) => props.theme.fontSizes[3]};
  margin-top: 0;
`;

const CategoryTitle = styled(H4)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: 0;
  font-family: ${(props) => props.theme.fonts.cursive};
  line-height: 1;
`;

const AmountInput = styled(Input)`
  margin-top: ${(props) => props.theme.spacing[2]};
  margin-bottom: ${(props) => props.theme.spacing[2]};
  padding-left: ${(props) => props.theme.spacing[6]};
  width: 100%;
`

const AmountInputWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`

const MoneySymbol = styled.span`
  font-size: ${(props) => props.theme.fontSizes[2]};
  padding-right: ${(props) => props.theme.spacing[1]};
  position: absolute;
  padding-left: ${(props) => props.theme.spacing[1]};
  display: flex;
  align-items: center;
  top: 12px;
  bottom: 12px;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.text};
`

type RegistryPageProps = PageProps<Props>;

function trimFirstN(str: string, n = 1) {
  return str.slice(n);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeAllChars(str: string, chars: string[]) {
  return chars.reduce((acc, char) => acc.replace(char, " "), str);
}

const Registry = ({ data }: RegistryPageProps) => {
  const { nodes: products } = data.allAmazonProduct;
  console.log(data)

  
  return (
    <Container>
      <H2 centered>Registry</H2>
      <H4 centered alwaysdark inline>
        We're registered on Amazon, so you'll be directed to the Amazon product
        page when you click <strong>View and buy</strong>. Thanks to a little
        URL hacking, when you click <strong>Add to cart</strong> on Amazon,
        it'll check that item off our registry list.
      </H4>
      <Container fluid>
        <Row>
          {products.map((product) => (
            <Col className="my-3 p-4" xs={12} md={6} lg={6} xl={4} key={product.id}>
              <article className="d-flex flex-column h-100 position-relative">
                <GatsbyImage
                  image={product.localImage.childImageSharp.gatsbyImageData}
                  alt={product.title}
                  className="mb-2"
                />
                <CategoryTitle centered={false} alwaysdark inline>
                  {product.category === "Other" ? "Other" : removeAllChars(capitalize(trimFirstN(product.category, 3)), [
                    "_",
                  ])}
                </CategoryTitle>
                <DetailsBox>
                  <Name>
                    {product.title.slice(0,50)}...
                  </Name>
                </DetailsBox>
                <FlexPrice>
                  <FlexNeed>
                    <Price>{product?.priceString}</Price>
                    <MutedP>{product?.inStock && "In stock"}</MutedP>
                  </FlexNeed>
                  <FlexNeed>
                    <NeededP style={{ textAlign: "right" }}>
                      {product?.needed} still needed
                    </NeededP>
                    <MutedP style={{ textAlign: "right" }}>
                      {product?.requested} requested
                    </MutedP>
                  </FlexNeed>
                </FlexPrice>
                <a href={product.productUrl} target="_blank">
                  <Button>
                    View{product?.inStock && product?.needed > 0 && " and buy"}
                  </Button>
                </a>
              </article>
            </Col>
          ))}
          <HoneymoonDonation />
        </Row>
      </Container>
    </Container>
  );
};

export default Registry;

export const query = graphql`
  {
    allAmazonProduct {
      nodes {
        inStock
        image
        localImage {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1)
          }
        }
        category
        id
        needed
        primeShippingEligible
        productId
        productUrl
        purchased
        requested
        title
        price
        priceString
      }
    }
  }
`;

const HoneymoonDonation = () => {
  const [formData, setFormData] = React.useState({note: '', amount: 0});
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === "amount") {
      setFormData({...formData, amount: Number(event.target.value)});
    } else {
      setFormData({...formData, note: event.target.value});
    }
  };

  const handleClick = () => {
    setIsOpen(true);
  }
  const handleCancel = () => {
    setIsOpen(false);
    setFormData({
      note: '',
      amount: 0
    });
  }

  const handleSubmit = async () => {
    const res = await fetch('/.netlify/functions/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if(res.ok){
      setIsSubmitting(false);
      const data = await res.json();
      window.location.href = data.redirect_url;
    }
    else {
      setIsSubmitting(false);
      setError(await res.text());
    }
  }

  const handlePresetButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFormData({...formData, amount: Number(event.currentTarget.value)});
  }

  return (
    <>
      <Col className="my-3 p-4 bg-dark" xs={12} md={6} lg={4} xl={4}>
        <article className="d-flex flex-column h-100 position-relative">
          <StaticImage
            src="https://res.cloudinary.com/djmk8xgrk/image/upload/c_fill,g_center,q_100/v1646961579/carolinabeach_pdbbgq.jpg"
            alt="Our potential honeymoon destination"
            className="mb-2"
            aspectRatio={1}
          />
          <CategoryTitle
            className="text-light"
            centered={false}
            alwaysdark={false}
            inline
          >
            Honeymoon
          </CategoryTitle>
          <DetailsBox>
            <Name className="text-light">Honeymoon Fund</Name>
          </DetailsBox>
          <FlexPrice>
            <FlexNeed>
              <Price className="text-light">$?.??</Price>
              <MutedP className="text-muted">You pick!</MutedP>
            </FlexNeed>
          </FlexPrice>
          <WhiteButton onClick={handleClick}>Make a contribution</WhiteButton>
        </article>
      </Col>
      <Modal isOpen={isOpen} onClosed={handleCancel}>
        <ModalBody>
          <H3>Honeymoon Fund</H3>
          <P>Help us go on a lovely vacation to celebrate getting married.</P>
          <P>
            Have an opinion on where we should go? <ElementLink href="/honeymoon">Let us know</ElementLink>.
          </P>
          {error && <P className="text-danger">{error}</P>}
          {isSubmitting ? (
            <Spinner children={null} title="loading" />
          ) : (
            <>
              <Container className="mt-5">
                <Row className="align-center">
                  <Col
                    xs={4}
                    className="position-relative px-0 d-flex align-items-center"
                  >
                    <MoneySymbol>$</MoneySymbol>
                    <AmountInput
                      onChange={handleChange}
                      value={formData.amount}
                      name="amount"
                      type="number"
                      placeholder="0"
                    />
                  </Col>
                  <Col
                    xs={8}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <Button value={25} onClick={handlePresetButton}>
                      25
                    </Button>
                    <Button value={50} onClick={handlePresetButton}>
                      50
                    </Button>
                    <Button value={100} onClick={handlePresetButton}>
                      100
                    </Button>
                  </Col>
                </Row>
              </Container>

              <TextArea
                className="w-100 p-2 mb-4"
                onChange={handleChange}
                value={formData.note}
                name="note"
                placeholder="Add a note..."
              />
              <Button onClick={handleSubmit}>Submit</Button>
              <WhiteButton onClick={handleCancel}>Cancel</WhiteButton>
              <P className="text-muted">
                You will be redirected to Stripe to enter your payment details.
              </P>
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}