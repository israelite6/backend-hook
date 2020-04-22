import React from "react";
import useFetch from "./useFetch";

export default function useGraphql({
  query,
  onSuccess: gqlOnSuccess,
  onError: gqlOnError,
  cache: propsCache,
}) {
  const [dataState, setDataState] = React.useState(null);
  const { runFetch, error, data, loading } = useFetch({
    onSuccess: (res) => {
      if (gqlOnSuccess) {
        gqlOnSuccess(res.data);
      }
    },
    onError: (err) => {
      if (gqlOnError) {
        gqlOnError(err);
      }
    },
    method: "POST",
    service: "app",
    uri: "",
    cache: propsCache,
  });

  const runGraphql = (data) => {
    setDataState({ query, variables: data });
    runFetch({ query, variables: data });
  };

  const refetch = () => {
    runFetch(dataState);
  };

  return {
    runGraphql,
    error: error ? error.errors.map((err) => err.message).join("\n") : null,
    data: data ? data.data : null,
    loading,
    refetch,
  };
}
