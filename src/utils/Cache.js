var ssscache = {};
var cachefn = null;
export default function Cache() {
  const set = data => {
    ssscache = data;
  };

  const setFn = fn => {
    cachefn = fn;
  };

  const get = () => {
    return ssscache;
  };

  const setCache = data => {
    cachefn(data);
  };
}
