import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { AppContext } from "./../provider/AppProvider";

export default function Mutation(props) {
  /* The component refreshes after api called and appLoading is set to false
    That is why we have apiCallerCounter, So when the component refresh 
    api will not fetch again. 
    When apiCallerCounter  is 2 it means the api fetch cycle have completed
  */
  const [apiCalledCounter, setApiCalledCounter] = React.useState(0);

  const { setOptions } = React.useContext(AppContext);

  const [mutate, { loading, error, data }] = useMutation(props.mutation, {
    errorPolicy: "all",
    onCompleted: data => {
      if (props.hasOwnProperty("onSuccess")) {
        props.onSuccess(data);
      }
    },
    onError: err => {
      if (props.hasOwnProperty("onError")) {
        props.onError(err);
      }
    },
    fetchPolicy: "no-cache"
  });
  const runMutation = datas => {
    console.log(datas);
    if (props.hasOwnProperty("beforeSend")) {
      datas = props.beforeSend(datas);
      if (data === false) {
        return false;
      }
    }
    mutate({ variables: datas });
    setApiCalledCounter(1);
  };

  React.useEffect(() => {
    if (!loading && apiCalledCounter === 1) {
      //if (apiCalledCounter === 1) {
      setOptions({ appLoading: false });
      //setApiCalledCounter(2);
      // }
    } else if (loading && apiCalledCounter === 1) {
      setOptions({ appLoading: true });
    }
  }, [loading]);

  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      index,
      runMutation
    });
  });

  /*React.useEffect(() => {
    if (loading) {
      dispatchState({ TYPE: "LOADING" });
    } else {
      dispatchState({ TYPE: "DONE_LOADING" });
    }
  }, [loading]);*/
  if (loading) {
    return <React.Fragment>Loading..</React.Fragment>;
  }
  if (error) {
    return <React.Fragment>Error</React.Fragment>;
  }
  return <React.Fragment>{children}</React.Fragment>;
}
