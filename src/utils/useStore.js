import React from "react";
import { OptionReducer, Reducer } from "./Reducer";

export default function useStore(props) {
  console.log(props);
  const [cache, setCache] = React.useReducer(Reducer, props ? props : {});
  const [options, setOptions] = React.useReducer(OptionReducer, {});
  return { cache, setCache, options, setOptions };
}
