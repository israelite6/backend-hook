import React from "react";
import { AppContext } from "../provider/AppContext";
import useStorage from "./useStorage";
import Toast from "react-toast-notifications";
const { useToasts } = Toast;

export function useFetch(props) {
  const { setOptions, options } = React.useContext(AppContext);
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const tokenStorage = useStorage("token");
  const { addToast } = useToasts();

  const runFetch = ({ service, uri, data, method }) => {
    const localMethod = method ? method : "GET";
    let urlParam = "";

    setOptions({ appLoading: true });
    const token = tokenStorage.get();
    const fetchData = {
      method: localMethod,
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: token ? `Bearer ${token}` : ""
      })
    };

    if (localMethod !== "GET") {
      Object.assign(fetchData, { body: JSON.stringify(data ? data : {}) });
    } else {
      if (data) {
        Object.keys(data).map(key => {
          urlParam += key + "=" + encodeURIComponent(data[key]) + "&";
        });
      }
    }
    console.log(
      options.services[service] +
        uri +
        (localMethod === "GET" ? "?" + urlParam : "")
    );

    fetch(
      options.services[service] +
        uri +
        (localMethod === "GET" ? "?" + urlParam : ""),
      fetchData
    )
      .then(res => {
        setOptions({ appLoading: false });
        console.log(res);
        if (res.status === 200) {
          res
            .json()
            .then(res => {
              setData(res);

              if (localMethod !== "GET") {
                setOptions({
                  responseStatus: "success",
                  responseMessage: props.responseMessage
                    ? props.responseSuccessMessage
                    : "Successful!"
                });
                addToast(
                  props.responseMessage
                    ? props.responseSuccessMessage
                    : "Successful!",
                  { appearance: "success" }
                );
              }

              if (props) {
                if (props.onSuccess) {
                  props.onSuccess(res);
                }
              }
            })
            .catch(err => {
              setError(err);

              addToast(
                props.responseMessage
                  ? props.responseErrorMessage
                  : "Error! Please try again",
                { appearance: "error" }
              );

              setOptions({
                responseStatus: "error",
                responseMessage: props.responseMessage
                  ? props.responseErrorMessage
                  : "Error! Please try again"
              });

              if (props) {
                if (props.onError) {
                  props.onError(err);
                }
              }
            });
        } else {
          res
            .json()
            .then(err => {
              setError(err);

              setOptions({
                responseStatus: "error",
                responseMessage: props.responseMessage
                  ? props.responseErrorMessage
                  : "Error! Please try again"
              });

              addToast(
                props.responseMessage
                  ? props.responseErrorMessage
                  : "Error! Please try again",
                { appearance: "error" }
              );
              if (props) {
                if (props.onError) {
                  props.onError(err);
                }
              }
            })
            .catch(err => {
              setError(err);

              setOptions({
                responseStatus: "error",
                responseMessage: props.responseMessage
                  ? props.responseErrorMessage
                  : "Error! Please try again"
              });

              addToast(
                props.responseMessage
                  ? props.responseErrorMessage
                  : "Error! Please try again",
                { appearance: "error" }
              );

              if (props) {
                if (props.onError) {
                  props.onError(err);
                }
              }
            });
        }
      })
      .catch(err => {
        console.log(err);
        setOptions({ appLoading: false });
        addToast(
          props.responseMessage
            ? props.responseErrorMessage
            : "Error! Check your internet conectivity",
          { appearance: "error" }
        );

        setOptions({
          responseStatus: "error",
          responseMessage: props.responseMessage
            ? props.responseErrorMessage
            : "Error! Check your internet conectivity"
        });
      });
  };

  return { runFetch, error, data };
}
