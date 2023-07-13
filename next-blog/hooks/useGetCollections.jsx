import { useEffect, useState } from "react";

export const useGetCollections = (url, updateState) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCollections = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message || "Error getting data.");
      }
      setLoading(false);
    };
    getCollections();
  }, [updateState]);

  return {
    loading,
    error,
    data,
  };
};
