import { useState } from "react";

function usePostRequest(url) {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const postRequest = async (bodyData) => {
    setIsLoading(true);
    setResponse(null);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      };
      const response = await fetch(url, options);

      const responseData = await response.json();

      setIsLoading(false);
      setResponse(responseData);
      setError(null);
    } catch (error) {
        setIsLoading(false);
        setError(error);
        setResponse(null);
    }
  };

  return [response, isLoading, error, postRequest];
}

export default usePostRequest;
