export default function FetchFn({ uri, data, method }) {
  const token = localStorage.getItem("token");
  const fetchData = {
    method: method,
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : ""
    })
  };
  if (data) {
    Object.assign(fetchData, { body: JSON.stringify(data) });
  }

  return new Promise((resolve, reject) => {
    fetch(uri, fetchData)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}
