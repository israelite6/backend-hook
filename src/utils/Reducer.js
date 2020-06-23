import UpdateObject from "./UpdateObject";
import { setCacheData } from "./Cache";

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

  // if (state.name || newState.name) {
  //   if (newState.resetCache) {
  //     delete newState.resetCache;
  //     Cookie(newState.name + "_cache").removeAll();
  //     return newState;
  //   }
  //   let d = Object.assign({}, UpdateObject(state, newState));
  //   Cookie(newState.name + "_cache").set(JSON.stringify(d));

  //   setCacheData(d);
  //   return d;
  // }
  return state;
}
