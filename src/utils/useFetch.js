import React from "react";
import { getSetCache, getCache } from "./Cache";
import useStorage from "./useStorage";

export default function useFetch({
  service,
  uri,
  method,
  cache: propsCache,
  onError,
  onSuccess,
}) {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const setCache = getSetCache();
  const cache = getCache();
  const token = useStorage("token");
  const state = { active: true };

  const runFetch = (data) => {
    if (propsCache) {
      setData(cache[propsCache]);
    }

    const localMethod = method ? method : "GET";
    let urlParam = "";

    setLoading(true);

    const fetchData = {
      method: localMethod,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: token.get() ? `Bearer ${token.get()}` : "",
      }),
    };

    if (localMethod !== "GET") {
      Object.assign(fetchData, { body: JSON.stringify(data ? data : {}) });
    } else {
      if (data) {
        Object.keys(data).map((key) => {
          urlParam += key + "=" + encodeURIComponent(data[key]) + "&";
          return key;
        });
      }
    }

    setSuccess(false);
    setError(null);

    fetch(
      cache.services[service] +
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
              if (res.errors) {
                onError(res);
                setError(res);
              } else {
                if (propsCache) {
                  setCache({ [propsCache]: res });
                }
                if (state.active) {
                  setSuccess(true);
                  setData(res);

                  if (propsCache) {
                    setCache({ [propsCache]: res });
                  }

                  if (onSuccess) {
                    onSuccess(res);
                  }
                } else {
                  console.log("state is not active");
                }
              }
            })
            .catch((err) => {
              if (state.active) {
                setError(err);

                if (onError) {
                  onError(err);
                }
              } else {
                console.log("state is not active");
              }
            });
        } else {
          res
            .json()
            .then((err) => {
              if (state.active) {
                setError({ errors: [{ message: "Invalid server response" }] });
                if (onError) {
                  onError(err);
                }
              }
            })
            .catch((err) => {
              if (state.active) {
                setError({ errors: [{ message: "Invalid server response" }] });

                if (onError) {
                  onError(err);
                }
              }
            });
        }
      })
      .catch((err) => {
        if (state.active) {
          if (onError) {
            onError({ errors: [{ message: "No Internet Connectivity" }] });
          }
          setError({ errors: [{ message: "No Internet Connectivity" }] });

          setLoading(false);
        }
      });
  };

  React.useEffect(() => {
    return () => {
      state.active = false;
    };
  }, []);

  return { runFetch, error, data, loading, success };
}
