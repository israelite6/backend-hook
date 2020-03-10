import React from "react";
import { AppContext } from "../provider/AppContext";
import { useFetch } from "./useFetch";
import { useMutation } from "./useMutation";
import gql from "graphql-tag";

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      status
    }
  }
`;
export function useLogout(props) {
  const { options, resetCache } = React.useContext(AppContext);
  const { runMutation } = useMutation({
    mutation: LOGOUT_MUTATION,
    onError: err => {
      if (props) {
        if (props.onError) {
          props.onError(err);
        }
      }
    },
    onSuccess: res => {
      if (props) {
        if (props.onSuccess) {
          props.onSuccess(res);
        }
      }
      resetCache();

      // Object.keys(localStorage).map(key => {
      //   let keys = key.split("_");
      //   if (keys[0] === options.name) {
      //     localStorage.removeItem(key);
      //   }
      //   resetCache();

      // });
    }
  });

  const runLogout = () => {
    runMutation({});
  };

  return { runLogout };
}
