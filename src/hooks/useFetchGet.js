import { useState } from "react";
import axios from "axios";

const useFetchGet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (url, config) => {
    setIsLoading(true);

    try {
      const response = await axios.get(url, config);
      setData(response.data);
      setError(null); // Clear the error on successful response
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, fetchData };
};

export default useFetchGet;
