import React from "react";
import { AppContext } from "../provider/AppContext";
import { useFetch } from "./useFetch";

export function useLogout(props) {
  const { options, resetCache } = React.useContext(AppContext);
  const { runFetch } = useFetch({
    onSuccess: res => {
      Object.keys(localStorage).map(key => {
        let keys = key.split("_");
        if (keys[0] === options.name) {
          localStorage.removeItem(key);
        }
      });
      resetCache();
      if (props) {
        if (props.onSuccess) {
          props.onSuccess(res);
        }
      }
    },
    onError: err => {
      if (props) {
        if (props.onError) {
          props.onError(err);
        }
      }
    }
  });
  const runLogout = () => {
    runFetch({ service: "auth", uri: "/logout" });
  };

  return { runLogout };
}
