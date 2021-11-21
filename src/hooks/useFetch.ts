import React from "react";

const useFetch = (url: string) => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    setData(json);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, setData, setLoading };
};

export default useFetch;
