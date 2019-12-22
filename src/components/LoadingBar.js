import React from "react";
import Loading from "react-top-loading-bar";
import { AppContext } from "./../provider/AppContext";
const loadingState = { status: false };

export default function LoadingBar() {
  const [loadingBarProgress, setLoadingBarProgress] = React.useState(0);
  const { options } = React.useContext(AppContext);
  const [interval, setIntervals] = React.useState(null);

  const add = value => {
    setLoadingBarProgress(r => r + value);
  };

  const onLoaderFinished = () => {
    setLoadingBarProgress(0);
  };

  const addToLoader = () => {
    if (loadingBarProgress < 90 && loadingState.status) {
      add(Math.floor(Math.random() * 11));
      setTimeout(() => addToLoader(), 1000);
    }
  };

  React.useEffect(() => {
    Object.assign(loadingState, { status: options.appLoading });
    if (options.appLoading) {
      addToLoader();
    } else {
      clearInterval(interval);
      onLoaderFinished();
    }
  }, [options.appLoading]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
      <Loading
        height={3}
        color={options.loadingBarColor ? options.loadingBarColor : "#f11946"}
        progress={loadingBarProgress}
      />
    </div>
  );
}
