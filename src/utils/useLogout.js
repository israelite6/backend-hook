import { useMutation } from "./useMutation";
import useStore from "./useStore";
import gql from "graphql-tag";

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      status
    }
  }
`;
export function useLogout(props) {
  const { options, setCache } = useStore();
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
      setCache({ resetCache: true });
      setCache(options);
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
