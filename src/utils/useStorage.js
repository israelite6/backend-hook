import React from "react";
import { AppContext } from "./../provider/AppContext";
import UpdateObject from "./UpdateObject";

export default function useStorage(key) {
  const { options } = React.useContext(AppContext);

  if (!localStorage.getItem(options.name + "_" + "cache")) {
    localStorage.setItem(options.name + "_" + "cache", JSON.stringify({}));
  }

  const set = data => {
    const newData = UpdateObject(getAll(), { [key]: data });

    localStorage.setItem(options.name + "_" + "cache", JSON.stringify(newData));
  };

  const get = () => {
    const data = getAll();
    return data[key];
  };

  const getAll = () => {
    try {
      return JSON.parse(localStorage.getItem(options.name + "_" + "cache"));
    } catch (e) {
      return {};
    }
  };

  const reset = () => {
    localStorage.removeItem(options.name + "_" + "cache");
  };
  return { set, get, reset, getAll };
}
