import React from "react";
import useStore, { useTempStore } from "./../hooks/useStore";
import {
  setCacheFn,
  setCacheData,
  setResetCachefn,
  setTempCacheFn,
} from "./../utils/Cache";
import { Store } from "./../utils/SetterGetter";
import { firebaseInit } from "./../hooks/useSocialAuth";
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

    Store("config").set(data);
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

export function AppProvider({ options, firebaseConfig, ...props }) {
  const { cache, setCache } = useStore(loadCache(options));
  const { tempCache, setTempCache } = useTempStore({});

  setCacheFn(setCache);
  setCacheData(cache);
  setTempCacheFn(setTempCache);

  const resetCache = () => {
    Store("all").clear();
    if (options) {
      setCache({ resetCache: true, ...options });
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

  React.useEffect(() => {
    if (firebaseConfig) {
      firebaseInit(firebaseConfig);
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
