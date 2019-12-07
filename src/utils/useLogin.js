import React from "react";
import { AppContext } from "./../provider/AppContext";

export function useLogin() {
  const { setCache, cache } = React.useContext(AppContext);

  const runLogin = data => {
    try {
      setCache(data);
    } catch (err) {}
  };

  const updateLogin = ({ role, access }) => {
    try {
      setCache({ role, access });
    } catch (err) {}
  };

  const isLoggedIn = () => {
    if (cache.user_id) {
      return true;
    } else {
      return false;
    }
  };

  return { runLogin, updateLogin, isLoggedIn };
}
