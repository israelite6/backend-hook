import UpdateObject from "./UpdateObject";
import { setCacheData, setTempCacheData } from "./Cache";

export function setExpireTime({ name, expires }) {
  const t = new Date();
  t.setSeconds(t.getSeconds() + expires);
}

export function Reducer(state, newState) {
  if (state.name || newState.name) {
    if (newState.resetCache) {
      delete newState.resetCache;
      localStorage.setItem(newState.name + "_cache", JSON.stringify(newState));
      setCacheData(newState);
      return newState;
    }
    let d = Object.assign({}, UpdateObject(state, newState));
    localStorage.setItem(
      (state.name ? state.name : newState.name) + "_cache",
      JSON.stringify(d)
    );
    setCacheData(d);
    return d;
  }
  return state;
}

export function TempReducer(state, newState) {
  let d = Object.assign({}, UpdateObject(state, newState));
  setTempCacheData(d);
  return d;
}
