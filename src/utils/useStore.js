import React from "react";
import { Reducer } from "./Reducer";

export default function useStore(props) {
  const [cache, setCache] = React.useReducer(Reducer, props ? props : {});
  return { cache, setCache };
}
