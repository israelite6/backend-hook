import React from "react";
import { useMutation as UseMutation } from "@apollo/react-hooks";
import { AppContext } from "./../provider/AppContext";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import CustomFetch from "./CustomFetch";
import Toast from "react-toast-notifications";
const { useToasts } = Toast;

export function useUploadMutation(props) {
  /* The component refreshes after api called and appLoading is set to false
    That is why we have apiCallerCounter, So when the component refresh 
    api will not fetch again. 
    When apiCallerCounter  is 2 it means the api fetch cycle have completed
  */

  const { setOptions, cache, options } = React.useContext(AppContext);
  const [progress, setProgress] = React.useState(0);
  const { addToast } = useToasts();

  const httpLink = createUploadLink({
    uri: options.graphqlUploadUrl,
    fetch: typeof window === "undefined" ? global.fetch : CustomFetch
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: cache.token ? `Bearer ${cache.token}` : ""
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  const [mutate, { loading, error, data }] = UseMutation(props.mutation, {
    client,
    errorPolicy: "all",
    onCompleted: data => {
      setOptions({ appLoading: false });
      setProgress(100);
      addToast(
        props.responseMessage ? props.responseSuccessMessage : "Successful!",
        { appearance: "success" }
      );
      setOptions({
        responseStatus: "success",
        responseMessage: props.responseMessage
          ? props.responseSuccessMessage
          : "Successful!"
      });
      if (props.hasOwnProperty("onSuccess")) {
        props.onSuccess(data);
      }
    },
    onError: err => {
      const { graphQLErrors, networkError } = err;
      if (networkError) {
        addToast(
          props.responseMessage
            ? props.responseErrorMessage
            : "Error! Check your internet connectivity",
          { appearance: "error" }
        );
      }
      if (graphQLErrors) {
        addToast(
          props.responseMessage
            ? props.responseErrorMessage
            : "Error! Please try again",
          { appearance: "error" }
        );
      }
      setOptions({ appLoading: false });

      setOptions({
        responseStatus: "error",
        responseMessage: props.responseMessage
          ? props.responseErrorMessage
          : "Error! Please try again"
      });
      if (props.hasOwnProperty("onError")) {
        props.onError(err);
      }
    },
    fetchPolicy: "no-cache"
  });
  const runMutation = datas => {
    setOptions({ appLoading: true });
    mutate({
      variables: datas,
      context: {
        fetchOptions: {
          useUpload: true,
          onProgress: ev => {
            //console.log(ev.loaded / ev.total);
            setProgress(Math.floor((ev.loaded / ev.total) * 100 - 1));
          },
          onAbortPossible: abortHandler => {
            //console.log(abortHandler);
            //setOptions({ appLoading: false });
          }
        }
      }
    }).catch(err => {
      setOptions({ appLoading: false });
    });
    // setApiCalledCounter(1);
  };

  return { runMutation, data, error, loading, progress };
}
