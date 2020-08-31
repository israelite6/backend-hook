import React from "react";
import useStore, { useTempStore } from "./../hooks/useStore";
import { setCacheFn, setCacheData, setResetCachefn } from "./../utils/Cache";
import { setVariable } from "./../utils/SetterGetter";
//import Signature from "./../utils/Signature";

const loadCache = (options) => {
  let savedCache = {};
  try {
    savedCache = JSON.parse(localStorage.getItem(options.name + "_cache"));
  } catch (e) {}

  if (options) {
    if (!savedCache) {
      savedCache = {};
    }
    const data = { ...savedCache, ...options };

    setVariable({ key: "config", value: data });
    return data;
    // if (Object.keys(savedCache).length === 0) {
    //   Object.assign(options, { opxi: Signature().generate() });
    //   return { ...savedCache, ...options };
    // } else {
    //   if (savedCache.hasOwnProperty("opxi")) {
    //     if (Signature().verify(savedCache.opxi)) {
    //       return { ...savedCache, ...options };
    //     }
    //   }
    //   return {};
    // }
  } else {
    return {};
  }
};

export function AppProvider(props) {
  const { cache, setCache } = useStore(loadCache(props.options));
  const { tempCache, setTempCache } = useTempStore(loadCache());

  setCacheFn(setCache);
  setCacheData(cache);

  const resetCache = () => {
    if (props.options) {
      setCache({ resetCache: true, ...props.options });
    }
  };

  setResetCachefn(resetCache);

  const children = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      cache,
      setCache,
      tempCache,
      setTempCache,
    });
  });

  return <React.Fragment>{children}</React.Fragment>;
}
