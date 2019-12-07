import React from "react";
import { useMutation as UseMutation } from "@apollo/react-hooks";
import { AppContext } from "./../provider/AppContext";
import Toast from "react-toast-notifications";
const { useToasts } = Toast;

export function useMutation(props) {
  /* The component refreshes after api called and appLoading is set to false
    That is why we have apiCallerCounter, So when the component refresh 
    api will not fetch again. 
    When apiCallerCounter  is 2 it means the api fetch cycle have completed
  */

  const { setOptions } = React.useContext(AppContext);
  const { addToast } = useToasts();
  const [mutate, { loading, error, data }] = UseMutation(props.mutation, {
    errorPolicy: "all",
    onCompleted: data => {
      setOptions({ appLoading: false });
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
      setOptions({ appLoading: false });
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
      if (props.hasOwnProperty("onError")) {
        props.onError(err);
      }
    },
    fetchPolicy: "no-cache"
  });
  const runMutation = datas => {
    setOptions({ appLoading: false });
    mutate({ variables: datas });
    // setApiCalledCounter(1);
  };

  return { runMutation, data, error, loading };
}
