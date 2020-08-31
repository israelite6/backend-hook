var cache = {};
var setCache = null;
var resetCache = null;

export function setCacheFn(fn) {
  setCache = fn;
}

export function setCacheData(data) {
  cache = data;
}

export function getCache() {
  return cache;
}

export function getSetCache(data) {
  if (data) {
    return setCache(data);
  }
  return setCache;
}

export function setResetCachefn(fn) {
  resetCache = fn;
}

export function getResetCachefn() {
  return resetCache;
}
