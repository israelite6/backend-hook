import React from "react";
import useStore from "./../hooks/useStore";
import { setCacheFn, setCacheData, setResetCachefn } from "./../utils/Cache";
import Signature from "./../utils/Signature";

const loadCache = (options) => {
  let savedCache = {};
  try {
    savedCache = JSON.parse(localStorage.getItem(options.name + "_cache"));
  } catch (e) {}

  if (options) {
    if (!savedCache) {
      savedCache = {};
    }
    if (Object.keys(savedCache).length === 0) {
      Object.assign(options, { opxi: Signature().generate() });
      return { ...savedCache, ...options };
    } else {
      if (savedCache.hasOwnProperty("opxi")) {
        if (Signature().verify(savedCache.opxi)) {
          return { ...savedCache, ...options };
        }
      }
      return {};
    }
  } else {
    return {};
  }
};

export function AppProvider(props) {
  const { cache, setCache } = useStore(loadCache(props.options));

  setCacheFn(setCache);
  setCacheData(cache);

  const resetCache = () => {
    console.log(props.options);
    if (props.options) {
      setCache({ resetCache: true, ...props.options });
    }
  };

  setResetCachefn(resetCache);

  const children = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      cache,
      setCache,
    });
  });

  return <React.Fragment>{children}</React.Fragment>;
}
