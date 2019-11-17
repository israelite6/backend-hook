/* This compnent handle all query fetch. */
import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { AppContext } from "./../provider/AppProvider";

export default function Query(props) {
  /* The component refreshes after api called and appLoading is set to false
    That is why we have apiCallerCounter, So when the component refresh 
    api will not fetch again. 
    When apiCallerCounter  is 2 it means the api fetch cycle have completed
  */
  const [apiCalledCounter, setApiCalledCounter] = React.useState(0);

  const { setOptions } = React.useContext(AppContext);

  const [loadFetch, { called, loading, data }] = useLazyQuery(props.query, {
    variables: props.hasOwnProperty("variables") ? props.variables : {},

    onCompleted: data => {
      if (props.hasOwnProperty("onSuccess")) {
        props.onSuccess(data);
      }
    },
    onError: err => {
      if (props.hasOwnProperty("onError")) {
        props.onError(err);
      }
    }
  });

  React.useEffect(() => {
    if (!loading) {
      if (apiCalledCounter === 1) {
        setOptions({ appLoading: false });
        setApiCalledCounter(2);
      }
    }
  }, [loading]);

  React.useEffect(() => {
    if (!called && apiCalledCounter === 0) {
      setApiCalledCounter(1);
      setOptions({ appLoading: true });
      loadFetch();
    }
  }, [called]);

  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      data,
      loading
    });
  });

  if (error) {
    //return <Error handleRetry={handleRetry}></Error>;
  }
  return <React.Fragment>{children}</React.Fragment>;
}
