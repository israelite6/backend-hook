import React from "react";
import { Reducer, TempReducer } from "./../utils/Reducer";

export default function useStore(props) {
  const [cache, setCache] = React.useReducer(Reducer, props ? props : {});
  return { cache, setCache };
}

export function useTempStore() {
  const [tempCache, setTempCache] = React.useReducer(TempReducer, {});
  return { tempCache, setTempCache };
}
