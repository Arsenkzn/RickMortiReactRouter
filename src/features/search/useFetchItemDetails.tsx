import { useState, useEffect } from "react";
import axios from "axios";

const useFetchItemDetails = (category: string, id: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const getApiUrl = (category: string, id: string): string => {
          switch (category) {
            case "characters":
              return `https://rickandmortyapi.com/api/character/${id}`;
            case "locations":
              return `https://rickandmortyapi.com/api/location/${id}`;
            case "episodes":
              return `https://rickandmortyapi.com/api/episode/${id}`;
            default:
              throw new Error(`Unknown category: ${category}`);
          }
        };
        const response = await axios.get(getApiUrl(category, id));
        setItem(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, id]);

  return { loading, error, item };
};

export default useFetchItemDetails;
