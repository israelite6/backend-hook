import React from "react";
import useStore from "./useStore";

export function useFetch(props) {
  const { cache, options, setCache } = useStore();
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const runFetch = ({ service, uri, data, method }) => {
    if (props.cache) {
      setData(cache[props.cache]);
    }

    const localMethod = method ? method : "GET";
    let urlParam = "";

    setLoading(true);
    const fetchData = {
      method: localMethod,
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: cache.token ? `Bearer ${cache.token}` : "",
      }),
    };

    if (localMethod !== "GET") {
      Object.assign(fetchData, { body: JSON.stringify(data ? data : {}) });
    } else {
      if (data) {
        Object.keys(data).map((key) => {
          urlParam += key + "=" + encodeURIComponent(data[key]) + "&";
        });
      }
    }

    fetch(
      options.services[service] +
        uri +
        (localMethod === "GET" ? "?" + urlParam : ""),
      fetchData
    )
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          res
            .json()
            .then((res) => {
              setData(res);

              if (props.cache) {
                setCache({ [props.cache]: res });
              }

              if (props) {
                if (props.onSuccess) {
                  props.onSuccess(res);
                }
              }
            })
            .catch((err) => {
              setError(err);

              if (props) {
                if (props.onError) {
                  props.onError(err);
                }
              }
            });
        } else {
          res
            .json()
            .then((err) => {
              if (props) {
                if (props.onError) {
                  props.onError(err);
                }
              }
            })
            .catch((err) => {
              setError(err);

              if (props) {
                if (props.onError) {
                  props.onError(err);
                }
              }
            });
        }
      })
      .catch((err) => {
        if (props) {
          if (props.onError) {
            props.onError(err);
          }
        }
        setLoading(false);
      });
  };

  return { runFetch, error, data, loading };
}
