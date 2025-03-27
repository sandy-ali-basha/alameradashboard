
import { useState } from "react";
import { useQuery } from "react-query";
import { _Productcolors } from "api/productcolors/productcolors";

export const useProductcolors = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["productcolors", page, count, query],
    () =>
      _Productcolors
        .index({
          query,
          page,
          count,
        })
        .then((res) => res)
  );

  return {
    data,
    isLoading,
    page,
    setPage,
    count,
    setCount,
    refetch,
    setQuery,
  };
};
