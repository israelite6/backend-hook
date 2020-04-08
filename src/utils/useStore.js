import React from "react";
import { OptionReducer, Reducer } from "./Reducer";

export default function useStore() {
  const [cache, setCache] = React.useReducer(Reducer, {});
  const [options, setOptions] = React.useReducer(OptionReducer, {});
  return { cache, setCache, options, setOptions };
}
