import { useState, useEffect } from "react";
import fetchDataFromAPI from "../utils/api";
import { homeMovieType } from "../@types/home";
import { MovieType, dataAPItype } from "../@types/dataAPI";

const useFetch = (url: string) => {
  const [data, setData] = useState<dataAPItype | null>();
  const [loading, setLoading] = useState<string | null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading("Loading...");
    setData(null);
    setError(null);

    fetchDataFromAPI(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
