/* eslint-disable quotes */
import React from "react";
import {
  getSetCache,
  getCache,
  getTempCache,
  setTempCache,
} from "./../utils/Cache";
import useStorage from "./useStorage";

export default function useFetch({
  service,
  uri,
  method,
  cache: propsCache,
  onError,
  onSuccess,
  persist,
  fetchMode,
  headers: propsHeader,
}) {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const setCache = getSetCache();
  const cache = getCache();
  const tempCache = getTempCache();
  const token = useStorage("token");
  const state = { active: true };
  const headers = propsHeader || {};

  const runFetch = (data, header) => {
    Object.assign(headers, { ...(header || {}) });

    if (propsCache) {
      if (persist) {
        setData(cache[propsCache]);
      } else {
        setData(tempCache[propsCache]);
      }
    }
    if (fetchMode === "once") {
      if (propsCache) {
        if (persist) {
          if (cache[propsCache]) {
            onSuccess(cache[propsCache]);
            return;
          }
        } else {
          if (tempCache[propsCache]) {
            onSuccess(tempCache[propsCache]);
            return;
          }
        }
      }
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
        ...headers,
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
      (cache.services ? cache.services[service] : "undefined") +
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
                  if (persist) {
                    setCache({ [propsCache]: res });
                  } else {
                    setTempCache({ [propsCache]: res });
                  }
                }
                if (state.active) {
                  setSuccess(true);
                  setData(res);
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
        if (err.code !== 20) {
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
    // eslint-disable-next-line
  }, []);

  return { runFetch, error, data, loading, success };
}
