import React from "react";
import Button from "../components/button";
import HoneymoonResultsChart from "../components/honeymoonResults";
import styled from "styled-components";
import { GatsbyImage, GatsbyImageProps, IGatsbyImageData } from 'gatsby-plugin-image'
import { graphql } from "gatsby";
import { H3, H4, P } from "../components/typography";

const ResultsContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    min-height: 500px;
    padding: 20px;
    margin: auto;
`

const HoneymoonForm = styled.form`
max-width: 900px;
margin: auto;
`

const OptionContainer = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const DestinationWrapper = styled.div`
display: flex;
flex-direction: column;
margin-bottom: ${props => props.theme.spacing[6]};
`

const DestinationOption = styled.label`
flex: 1;
min-width: 200px;
z-index: 400;
transition: all 0.3s ease-in-out;
&:hover {
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.3);
}
`

const HiddenInput = styled.input`
  opacity: 0.0;
  height: 0px;
  width: 0px;
`

interface IGatsbyImageInput {
  checked: boolean;
}

const GatsbyImageInput = styled(GatsbyImage)<GatsbyImageProps & IGatsbyImageInput>`
cursor: pointer;
position: relative;
transition: all 0.3s ease-in-out;
&:before {
  transition: all 0.3s ease-in-out;
  content: ${(props) => props.checked ? 'x' : 'none'};
  position: absolute;
  inset: 0;;
  background-color: ${(props) => props.checked ? "rgba(0,20,30,0.5)" : "transparent"} ;
}
&:hover {
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0,0,0,0.4);
  }
};
`

const MoneyInput = styled.input`
&:before {
  content: "$";
}
`

export type Destination = {
    title: string;
    totalPaymentValue: number;
    totalPaymentCount: number;
}

export type HoneymoonResults = {
    results: Destination[];
    sumCount?: number;
    sumTotal: number;
}

export type ApiResponse = {
  data: HoneymoonResults;
  message: string;
}

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
        }
      }[];
    }
  }

}

export type HoneymoonPageProps = {
  data: {
    allAirtable: {
      edges: {
        node: HoneymoonOptionProps;
      }[];
    }
  }
}



const Honeymoon = ({ data }: HoneymoonPageProps) => {
  const [paymentAmount, setPaymentAmount] = React.useState(10);
  const [destination, setDestination] = React.useState("");
  const [ loading, setLoading ] = React.useState(false);
  const [ apiData, setApiData ] = React.useState<ApiResponse | null>(null);

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

  React.useEffect(() => {
    console.log(destination)
    console.log(data.allAirtable.edges[0].node.data.name)
    setLoading(true)
    fetch("/.netlify/functions/honeymoonResults", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(setApiData)
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <HoneymoonForm onSubmit={handleSubmit}>
        <OptionContainer>
          {data.allAirtable.edges.map(({ node }) => (
            <DestinationWrapper key={node.id}>
              <H3>{node.data.name}</H3>
              {/* @ts-ignore */}
              <H4 alwaysdark >{node.data.location}</H4>
              <DestinationOption>
                <GatsbyImageInput
                  image={
                    node.data.image.localFiles[0].childImageSharp
                      .gatsbyImageData
                  }
                  alt={node.data.name}
                  checked={
                    destination.toLowerCase() === node.data.name.toLowerCase()
                  }
                />
                <HiddenInput
                  type="radio"
                  name="destination"
                  value={node.data.name}
                  checked={destination === node.data.name}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </DestinationOption>
              <P>{node.data.description}</P>
              <Button onClick={(e) => {e.preventDefault(); setDestination(node.data.name)}}>{destination === node.data.name ? "✅ " : ""} Vote for {node.data.name}</Button>
            </DestinationWrapper>
          ))}
        </OptionContainer>
        <label>
          <MoneyInput
            type="number"
            value={paymentAmount}
            onChange={handleAmountChange}
          />
        </label>
        <Button type="submit">Cast your vote!</Button>
      </HoneymoonForm>
      <ResultsContainer>
        {!loading && apiData?.data.results && (
          <HoneymoonResultsChart
            results={apiData.data.results}
            sumCount={apiData.data.sumCount}
            sumTotal={apiData.data.sumTotal}
          />
        )}
      </ResultsContainer>
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