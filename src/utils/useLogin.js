import useGrpahql from "./useGraphql";
import useStorage from "./useStorage";
import { getSetCache } from "./Cache";

const UPDATE_LOGIN = `
  mutation loginUpdate {
    loginUpdate {
      user_id
      features
      role
      token
      ban
    }
  }
`;
const RUN_UPDATE_LOGIN = { status: false };

export function useLogin() {
  const token = useStorage("token");
  const features = useStorage("features");
  const setCache = getSetCache();
  const { runGraphql } = useGrpahql({
    query: UPDATE_LOGIN,
    onSuccess: (res) => {
      runLogin(res.loginUpdate);
    },
    onError: (err) => {},
    hideSuccessMessage: true,
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
      setCache(user);
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
      if (features.get().filter((ff) => ff === feature).length > 0) {
        return true;
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
        runGraphql({});
      }
    }
  };

  return { runLogin, isLoggedIn, showLoginDialog, runUpdateLogin, isExist };
}
