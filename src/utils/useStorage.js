import React from "react";
import { AppContext } from "./../provider/AppContext";

export default function useStorage(key) {
  const { options } = React.useContext(AppContext);

  const set = data => {
    if (Array.isArray(data) || typeof data === "object") {
      try {
        data = JSON.stringify(data);
      } catch (e) {}
    }

    localStorage.setItem(options.name + "_" + key, data);
  };

  const get = () => {
    let data = localStorage.getItem(options.name + "_" + key);
    try {
      data = JSON.parse(data);
    } catch (e) {}
    return data;
  };

  const reset = () => {
    for (var key in localStorage) {
      console.log(key);
    }
  };
  return { set, get };
}
