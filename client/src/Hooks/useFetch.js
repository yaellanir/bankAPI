import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      const config = {
        headers: {
          header1: "access-control-allow-origin",
          // Access-Control-Allow-Origin
        },
      };
      try {
        const { data } = await axios.get(url, config);
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, [url]);
  return [data, error, loading];
}
export default useFetch;
