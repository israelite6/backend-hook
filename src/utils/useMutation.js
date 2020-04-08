import React from "react";
import { useMutation as UseMutation } from "@apollo/react-hooks";
//import Toast from "react-toast-notifications";
//const { useToasts } = Toast;

export function useMutation(props) {
  /* The component refreshes after api called and appLoading is set to false
    That is why we have apiCallerCounter, So when the component refresh 
    api will not fetch again. 
    When apiCallerCounter  is 2 it means the api fetch cycle have completed
  */

  //const [progress, setProgress] = React.useState(0);
  const [customLoading, setCustomLoading] = React.useState(false);
  const [customError, setCustomError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  //const { addToast } = useToasts();
  const [mutate, { error, data }] = UseMutation(props.mutation, {
    errorPolicy: "all",
    onCompleted: (data) => {
      setSuccess(true);
      // setOptions({ appLoading: false });
      setCustomLoading(false);
      //setProgress(100);
      if (!props.hideSuccessMessage) {
        // addToast(
        //   props.responseMessage ? props.responseSuccessMessage : "Successful!",
        //   { appearance: "success" }
        // );
      }

      // setOptions({
      //   responseStatus: "success",
      //   responseMessage: props.responseMessage
      //     ? props.responseSuccessMessage
      //     : "Successful!",
      // });
      if (props.hasOwnProperty("onSuccess")) {
        props.onSuccess(data);
      }
    },
    onError: (err) => {
      setCustomLoading(false);
      const { graphQLErrors, networkError } = err;
      let errors = [];
      if (graphQLErrors) {
        graphQLErrors.map((error) => {
          if (error.extensions.code === "validation-failed") {
            errors.push("No permission");
          }
          if (error.extensions.code === "custom") {
            errors.push(error.message);
          }
        });
        setCustomError({ graphql: errors.join("\n") });
      }

      if (networkError) {
        setCustomError({ network: "No Network connectivity" });
      }

      // if (networkError) {
      //   addToast(
      //     props.responseMessage
      //       ? props.responseErrorMessage
      //       : "Error! Check your internet connectivity",
      //     { appearance: "error" }
      //   );
      // }
      // if (graphQLErrors) {
      //   console.log(graphQLErrors);

      //   addToast(
      //     props.responseMessage
      //       ? props.responseErrorMessage
      //       : graphQLErrors.map(gm => gm.message).join(" "),
      //     { appearance: "error" }
      //   );
      // }
      // setOptions({ appLoading: false });

      // setOptions({
      //   responseStatus: "error",
      //   responseMessage: props.responseMessage
      //     ? props.responseErrorMessage
      //     : "Error! Please try again",
      // });
      if (props.hasOwnProperty("onError")) {
        props.onError(err);
      }
    },
    fetchPolicy: "no-cache",
  });
  const runMutation = (datas) => {
    // setOptions({ appLoading: true });
    setCustomError(null);
    setCustomLoading(true);
    setSuccess(false);
    mutate({
      variables: datas,
      // context: {
      //   fetchOptions: {
      //     useUpload: true,
      //     onProgress: (ev) => {
      //       //console.log(ev.loaded / ev.total);
      //       setProgress(Math.floor((ev.loaded / ev.total) * 100 - 1));
      //     },
      //     onAbortPossible: (abortHandler) => {
      //       //console.log(abortHandler);
      //     },
      //   },
      // },
    }).catch((err) => {});
    // setApiCalledCounter(1);
  };

  return {
    runMutation,
    data,
    error: customError,
    loading: customLoading,
    success,
  };
}
