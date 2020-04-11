import { useMutation } from "./useMutation";
import gql from "graphql-tag";
import { getResetCachefn } from "./Cache";

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      status
    }
  }
`;
export function useLogout(props) {
  const resetCache = getResetCachefn;

  const { runMutation } = useMutation({
    mutation: LOGOUT_MUTATION,
    onError: (err) => {
      if (props) {
        if (props.onError) {
          props.onError(err);
        }
      }
    },
    onSuccess: (res) => {
      resetCache();
      //resetCache();
      if (props) {
        if (props.onSuccess) {
          props.onSuccess(res);
        }
      }

      // Object.keys(localStorage).map(key => {
      //   let keys = key.split("_");
      //   if (keys[0] === options.name) {
      //     localStorage.removeItem(key);
      //   }
      //   resetCache();

      // });
    },
  });

  const runLogout = () => {
    runMutation({});
  };

  return { runLogout };
}
