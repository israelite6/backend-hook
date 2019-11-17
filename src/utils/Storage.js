export default function Storage(key) {
  const set = data => {
    try {
      data = JSON.stringify(data);
    } catch (e) {}
    localStorage.setItem(key, data);
  };
  const get = () => {
    let data = localStorage.getItem(key);
    try {
      data = JSON.parse(data);
    } catch (e) {}
    return data;
  };
  return { set, get };
}
