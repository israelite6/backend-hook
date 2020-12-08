import { getCache } from "./../utils/Cache";
import UpdateObject from "./../utils/UpdateObject";
import { Store } from "./../utils/SetterGetter";

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
    try {
      const data = getAll()[key];
      return data;
    } catch (e) {
      return null;
    }
  };

  const getAll = () => {
    try {
      return JSON.parse(
        localStorage.getItem(`${Store("config").get()["name"]}_cache`)
      );
    } catch (e) {
      return {};
    }
  };

  const reset = () => {
    localStorage.removeItem(cache.name + "_" + "cache");
  };
  return { set, get, reset, getAll };
}
