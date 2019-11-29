export function ReloadPage({ location, history }) {
  const current = location.pathname;
  history.replace(`/reload`);
  setTimeout(() => {
    history.replace(current);
  });
}

export function GotoEdit({ history, to, params }) {
  history.push(to, params);
}
