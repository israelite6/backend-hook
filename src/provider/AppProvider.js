import React from "react";
import useStore from "./../utils/useStore";
import { setCacheFn, setCacheData, setResetCachefn } from "./../utils/Cache";
let counter = 0;
const loadCache = (options) => {
  let savedCache = {};
  try {
    savedCache = JSON.parse(localStorage.getItem(options.name + "_cache"));
  } catch (e) {
    console.log(e);
  }

  if (options) {
    return { ...savedCache, ...options };
  } else {
    return {};
  }
};

export function AppProvider(props) {
  const { cache, setCache } = useStore(loadCache(props.options));

  if (counter === 0) {
    loadCache();
  }

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

  counter++;
  console.log(counter);
  return <React.Fragment>{children}</React.Fragment>;
}
