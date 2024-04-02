import { useState } from "react";
import axios from "axios";

const useResponse = (url) => {
  const [response, setResponse] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getApi = () => {
    setIsLoading(true)
    axios
      .get(url)
      .then((res) => setResponse(res.data))
      .catch((err) => {
        setHasError(err);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const getApiTypes = (urlTypes) => {
    axios.get(urlTypes).then((res) => {
      const obj = {
        results: res.data.pokemon.map((poke) => poke.pokemon),
      };
      setResponse(obj)
    });
  };

  return [response, getApi, hasError, isLoading, getApiTypes];
};

export default useResponse;

