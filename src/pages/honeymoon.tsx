import React from "react";
import Button from "../components/button";

type Destination = {
    title: string;
    totalPaymentValue: number;
    totalPaymentCount: number;
}

type HoneymoonResults = {
    results: Destination[];
    sumCount: number;
    sumTotal: number;
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

async function fetchData() {
  const res = await fetch("/.netlify/functions/honeymoonResults");
  const json = await res.json();
  return json;
}

const Honeymoon = () => {
  const [paymentAmount, setPaymentAmount] = React.useState(10);
  const [destination, setDestination] = React.useState("");
  const [results, setResults] = React.useState<null | HoneymoonResults>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(paymentAmount, destination);
  };

  React.useEffect(() => {
    fetchData().then(setResults);
  }, []);

  const destinationOptions = [
    { title: "Swiss Alps" },
    { title: "Rocky Mountains" },
    { title: "Big Sur" },
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(e.target?.value))) {
      setPaymentAmount(0);
      return;
    }
    setPaymentAmount(parseInt(e.target.value));
  };

  return (
      <>
      <pre><code>{JSON.stringify(results)}</code></pre>
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
    </>
  );
};

export default Honeymoon;
