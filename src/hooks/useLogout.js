import useGraphql from "./useGraphql";
import { getResetCachefn } from "./../utils/Cache";

const LOGOUT_MUTATION = `
  mutation logout {
    logout {
      result
    }
  }
`;
export default function useLogout(props) {
  const resetCache = getResetCachefn();

  const fetch = useGraphql({
    query: LOGOUT_MUTATION,
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
    fetch.runGraphql({});
  };

  return { runLogout, ...fetch };
}
