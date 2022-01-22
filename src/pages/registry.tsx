import React from "react";
import { Col, Container, Row } from "reactstrap";
import { H2, H3, H4, H5, P } from "../components/typography";
import "./registry.css";
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image";
import { PageProps, graphql } from "gatsby";
import Button from "../components/button";
import styled from "styled-components";

// const specialStrings  = {
//   str: "",
//   getFirstPartOfTitle() {
//     this.str = this.str.split("with")[0].split("-")[0].split(",")[0].trim();
//     return this;
//   },
//   trimFirstN(n: number) {
//     this.str = this.str.slice(n);
//     return this
//   },
//   capitalize(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
//   },
//   removeAllChars(chars: string[]) {
//     this.str = chars.reduce((acc, char) => acc.replace(char, " "), this.str);
//   },
//   toString() {
//     return this.str;
//   },
//   inspect() {
//     return this.str;
//   }
// }

// function pipe<T>(...fns: ((a: T, ...rest?: any) => T)[]) {
//   return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
// }


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
}`;

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

type RegistryPageProps = PageProps<Props>;

function getFirstPartOfTitle(title: string) {
  return title.split("with")[0].split("-")[0].split(",")[0].trim();
}

function trimFirstN(str: string, n = 1) {
  return str.slice(n);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeAllChars(str: string, chars: string[]) {
  return chars.reduce((acc, char) => acc.replace(char, " "), str);
}

async function submit(paymentAmount: number, purpose: string) {
  const res = await fetch("/.netlify/functions/honeymoondFund", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: paymentAmount,
      purpose,
    }),
  });
  const json = await res.json();
  window.location.replace(json.redirect_url);
}

const Registry = ({ data }: RegistryPageProps) => {
  const { nodes: products } = data.allAmazonProduct;
  const [ amount, setAmount ] = React.useState(0);
  const [purpose, setPurpose] = React.useState("");

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  }
  
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
            <Col className="my-3 px-4" xs={12} md={6} lg={4} key={product.id}>
              <article className="d-flex flex-column h-100 position-relative">
                <GatsbyImage
                  image={product.localImage.childImageSharp.gatsbyImageData}
                  alt={product.title}
                />
                <CategoryTitle centered={false} alwaysdark inline>
                  {removeAllChars(capitalize(trimFirstN(product.category, 3)), [
                    "_",
                  ])}
                </CategoryTitle>
                <DetailsBox>
                  <Name>{getFirstPartOfTitle(product.title)}</Name>
                </DetailsBox>
                <FlexPrice>
                  <FlexNeed>
                    <Price>{product.priceString}</Price>
                    <MutedP>{product.inStock && "In stock"}</MutedP>
                  </FlexNeed>
                  <FlexNeed>
                    <NeededP style={{ textAlign: "right" }}>{product.needed} still needed</NeededP>
                    <MutedP style={{ textAlign: "right" }}>
                       {product.requested} requested
                    </MutedP>
                  </FlexNeed>
                </FlexPrice>
                <a href={product.productUrl}>
                  <Button>
                    View{product.inStock && product.needed > 0 && " and buy"}
                  </Button>
                </a>
              </article>
            </Col>
          ))}
          <Col>
                  <form onSubmit={() => {submit(amount, purpose)}}>
                    <input type="number" value={amount} onChange={handleAmount} />
                    <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                    <Button type="submit">Submit</Button>
                  </form>
          </Col>
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
        id
        localImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        priceString
        price
        needed
        productUrl
        purchased
        requested
        title
        productId
        primeShippingEligible
        inStock
        category
      }
    }
  }
`;
