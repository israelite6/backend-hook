import React from "react";
import useFetch from "./useFetch";

export default function useGraphql({
  query,
  onSuccess: gqlOnSuccess,
  onError: gqlOnError,
  cache: propsCache,
  persist,
  fetchMode,
}) {
  const [dataState, setDataState] = React.useState(null);
  const { runFetch, error, data, loading, success } = useFetch({
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
    persist,
    fetchMode,
  });

  const runGraphql = (data) => {
    let headers = null;
    if (data) {
      if (data.hasOwnProperty("where")) {
        headers = { where: JSON.stringify(data.where) };
        delete data.where;
      }
    }

    setDataState({ query, variables: data });
    runFetch({ query, variables: data }, headers);
  };

  const refetch = () => {
    runFetch(dataState);
  };

  return {
    runGraphql,
    error: error
      ? error.errors
        ? error.errors.map((err) => err.message).join("\n")
        : null
      : null,
    data: data ? data.data : null,
    loading,
    refetch,
    success,
  };
}
