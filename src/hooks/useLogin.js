import useGrpahql from "./useGraphql";
import useStorage from "./useStorage";
import { getSetCache } from "./../utils/Cache";

const UPDATE_LOGIN = `
  mutation login_update {
    login_update {
      result
    }
  }
`;
const RUN_UPDATE_LOGIN = { status: false };

export default function useLogin(props) {
  const token = useStorage("token");
  const features = useStorage("features");
  const setCache = getSetCache();
  const fetchUpdate = useGrpahql({
    query: UPDATE_LOGIN,
    onSuccess: (res) => {
      if (props) {
        if (props.onUpdateSuccess) {
          props.onUpdateSuccess(res);
        }
      }

      //runLogin(res.loginUpdate);
    },
    onError: (err) => {
      if (props) {
        if (props.onUpdateError) {
          props.onUpdateError(err);
        }
      }
    },
  });

  const runLogin = ({ user_id, features, role, token, ban }) => {
    const user = {
      user_id,
      features,
      role,
      token,
      ban,
    };
    try {
      //setCache(user);
    } catch (err) {}
  };

  const isLoggedIn = () => {
    try {
      if (token.get()) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const isExist = (feature) => {
    if (isLoggedIn()) {
      if (features.get()) {
        if (features.get().filter((ff) => ff === feature).length > 0) {
          return true;
        }
      }
    }

    return false;
  };

  const showLoginDialog = () => {
    if (!isLoggedIn()) {
      setCache({ anonymousDialog: true });
      return true;
    } else {
      return false;
    }
  };

  const runUpdateLogin = () => {
    if (!RUN_UPDATE_LOGIN.status) {
      if (isLoggedIn()) {
        Object.assign(RUN_UPDATE_LOGIN, { status: true });
        fetchUpdate.runGraphql({});
      }
    }
  };

  return {
    runLogin,
    isLoggedIn,
    showLoginDialog,
    runUpdateLogin,
    isExist,
    fetchUpdate,
  };
}
