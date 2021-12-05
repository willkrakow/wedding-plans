import React from 'react'
import styled from 'styled-components'
import Chart from './chart'


export type Destination = {
  title: string;
  totalPaymentValue: number;
  totalPaymentCount: number;
};

export type HoneymoonResultsProps = {
  results: Destination[];
  sumCount?: number;
  sumTotal: number;
};
export type ApiResponse = {
  data: HoneymoonResultsProps;
  message: string;
};

const ResultsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  min-height: 500px;
  padding: 20px;
  margin: auto;
`;


const HoneymoonResults = () => {
  const [loading, setLoading] = React.useState(false);
  const [apiData, setApiData] = React.useState<ApiResponse | null>(null);

    React.useEffect(() => {
      setLoading(true);
      fetch("/.netlify/functions/honeymoonResults", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(setApiData)
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, []);
    return (
      <ResultsContainer>
        {!loading && apiData?.data.results && (
          <Chart
            results={apiData.data.results}
            sumCount={apiData.data.sumCount}
            sumTotal={apiData.data.sumTotal}
          />
        )}
      </ResultsContainer>
    );
}

export default HoneymoonResults