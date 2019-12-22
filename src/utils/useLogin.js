import React from "react";
import { AppContext } from "./../provider/AppContext";
import { useMutation } from "./useMutation";
import useStorage from "./useStorage";
import gql from "graphql-tag";

const UPDATE_LOGIN = gql`
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
  const { setCache, cache } = React.useContext(AppContext);
  const [loginIsUpdated, setLoginIsUpdated] = React.useState(false);
  const localCache = useStorage("cache");
  const { runMutation } = useMutation({
    mutation: UPDATE_LOGIN,
    onSuccess: res => {
      runLogin(res.loginUpdate);
    },
    onError: err => {},
    hideSuccessMessage: true
  });

  const runLogin = ({ user_id, features, role, token, ban }) => {
    const user = {
      user_id,
      features,
      role,
      token,
      ban
    };
    try {
      setCache(user);
    } catch (err) {}
  };

  const isLoggedIn = () => {
    try {
      if (localCache.get().user_id) {
        if (!localCache.get().ban) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
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
        runMutation({});
      }
    }
  };

  return { runLogin, isLoggedIn, showLoginDialog, runUpdateLogin };
}
