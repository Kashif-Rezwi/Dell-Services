import { useState } from "react";
import axios from "axios";

const useFetchPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (url, payload) => {
    setIsLoading(true);

    try {
      if (!payload) {
        throw new Error("Payload is empty.");
      }

      const response = await axios.post(url, payload);
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

export default useFetchPost;
