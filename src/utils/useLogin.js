import React from "react";
import useStorage from "./useStorage";

export function useLogin() {
  const token = useStorage("token");
  const userId = useStorage("user_id");
  const role = useStorage("role");
  const access = useStorage("access");

  const runLogin = data => {
    try {
      token.set(data.token);
      userId.set(data.id);
      role.set(data.role);
      access.set(data.role.access);
    } catch (err) {}
  };

  const updateLogin = data => {
    try {
      userId.set(data.id);
      access.set(data.role.access);
    } catch (err) {}
  };

  const isLoggedIn = () => {
    if (token.get()) {
      return true;
    } else {
      return false;
    }
  };

  return { runLogin, updateLogin, isLoggedIn };
}
