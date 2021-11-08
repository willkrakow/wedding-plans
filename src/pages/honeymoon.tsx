import React from "react";
import Button from "../components/button";
import HoneymoonResultsChart from "../components/honeymoonResults";
import styled from "styled-components";

const ResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    min-height: 500px;
    padding: 20px;
    margin: auto;
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

export const destinationOptions = [
    { title: "Swiss Alps" },
    { title: "Rocky Mountains" },
    { title: "Big Sur" },
  ];

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

async function fetchData() {
  const res = await fetch("/.netlify/functions/honeymoonResults");
  const json = await res.json();
  return json;
}

const Honeymoon = () => {
  const [paymentAmount, setPaymentAmount] = React.useState(10);
  const [destination, setDestination] = React.useState("");
  const [response, setResponse] = React.useState<null | HoneymoonResults>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(paymentAmount, destination);
  };

  React.useEffect(() => {
    setLoading(true);
    fetchData()
    .then((res) => setResponse(res.data))
    .then(() => setLoading(false));
  }, []);


  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(e.target?.value))) {
      setPaymentAmount(0);
      return;
    }
    setPaymentAmount(parseInt(e.target.value));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {destinationOptions.map((option) => (
          <label key={option.title}>
            <input
              type="radio"
              name="destination"
              value={option.title}
              checked={destination === option.title}
              onChange={(e) => setDestination(e.target.value)}
            />
            {option.title}
          </label>
        ))}
        <label>
          <input
            type="number"
            value={paymentAmount}
            onChange={handleAmountChange}
          />
        </label>
        <Button type="submit">Cast your vote!</Button>
      </form>
      <ResultsContainer>
        {!loading && response?.results && (
          <HoneymoonResultsChart
            results={response.results}
            sumCount={response.sumCount}
            sumTotal={response.sumTotal}
          />
        )}
      </ResultsContainer>
    </>
  );
};

export default Honeymoon;
