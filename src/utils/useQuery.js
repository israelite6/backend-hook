/* This compnent handle all query fetch. */
import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { AppContext } from "../provider/AppProvider";
import Toast from "react-toast-notifications";
const { useToasts } = Toast;

export function useQuery(props) {
  /* The component refreshes after api called and appLoading is set to false
    That is why we have apiCallerCounter, So when the component refresh 
    api will not fetch again. 
    When apiCallerCounter  is 2 it means the api fetch cycle have completed
  */
  const [apiCalledCounter, setApiCalledCounter] = React.useState(0);
  const { setOptions } = React.useContext(AppContext);
  const [data, setData] = React.useState();
  const { addToast } = useToasts();
  const [query, { called, loading, error }] = useLazyQuery(props.query, {
    variables: props.hasOwnProperty("variables") ? props.variables : {},

    onCompleted: data => {
      setData(data);
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
        if (error) {
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
        }

        setOptions({ appLoading: false });
        setApiCalledCounter(2);
      }
    }
  }, [loading]);

  const runQuery = () => {
    if (apiCalledCounter === 0) {
      setOptions({ appLoading: true });
      setApiCalledCounter(1);

      query();
    }
  };

  const reload = () => {
    setOptions({ appLoading: true });
    setApiCalledCounter(1);

    query();
  };

  return { runQuery, data, reload };
}
