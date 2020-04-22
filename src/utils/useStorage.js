import { getCache } from "./Cache";
import UpdateObject from "./UpdateObject";

export default function useStorage(key) {
  const cache = getCache();

  if (!localStorage.getItem(cache.name + "_" + "cache") && cache.name) {
    localStorage.setItem(cache.name + "_" + "cache", JSON.stringify({}));
  }

  const set = (data) => {
    const newData = UpdateObject(getAll(), { [key]: data });
    localStorage.setItem(cache.name + "_" + "cache", JSON.stringify(newData));
  };

  const get = () => {
    const data = getAll();
    return data[key];
  };

  const getAll = () => {
    try {
      return JSON.parse(localStorage.getItem(cache.name + "_" + "cache"));
    } catch (e) {
      return {};
    }
  };

  const reset = () => {
    localStorage.removeItem(cache.name + "_" + "cache");
  };
  return { set, get, reset, getAll };
}
