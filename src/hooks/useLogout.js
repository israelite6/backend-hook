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
          resetCache();
          if (props.onSuccess) {
            props.onSuccess(err);
          }
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
    },
  });

  const runLogout = () => {
    fetch.runGraphql({});
  };

  return { runLogout, ...fetch };
}
