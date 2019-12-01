import React from "react";
import { useMutation as UseMutation } from "@apollo/react-hooks";
import { AppContext } from "./../provider/AppProvider";

export function useMutation(props) {
  /* The component refreshes after api called and appLoading is set to false
    That is why we have apiCallerCounter, So when the component refresh 
    api will not fetch again. 
    When apiCallerCounter  is 2 it means the api fetch cycle have completed
  */

  const { setOptions } = React.useContext(AppContext);

  const [mutate, { loading, error, data }] = UseMutation(props.mutation, {
    errorPolicy: "all",
    onCompleted: data => {
      setOptions({ appLoading: false });
      if (props.hasOwnProperty("onSuccess")) {
        props.onSuccess(data);
      }
    },
    onError: err => {
      setOptions({ appLoading: false });
      if (props.hasOwnProperty("onError")) {
        props.onError(err);
      }
    },
    fetchPolicy: "no-cache"
  });
  const runMutation = datas => {
    mutate({ variables: datas });
    // setApiCalledCounter(1);
  };

  return { runMutation, data, error, loading };
}
