import React from "react";
import Loading from "react-top-loading-bar";
import { AppContext } from "./../provider/AppContext";

export default function LoadingBar() {
  const [loadingBarProgress, setLoadingBarProgress] = React.useState(0);
  const { options } = React.useContext(AppContext);
  const [loadingState, setLoadingState] = React.useState();

  const add = value => {
    setLoadingBarProgress(r => r + value);
  };

  const onLoaderFinished = () => {
    setLoadingBarProgress(0);
  };

  const addToLoader = () => {
    if (loadingBarProgress < 90 && loadingState === true) {
      add(Math.floor(Math.random() * 11));
      setTimeout(() => addToLoader(), 1000);
    }
  };

  React.useEffect(() => {
    setLoadingState(options.appLoading);
    if (options.appLoading) {
      addToLoader();
    } else {
      onLoaderFinished();
    }
  }, [options.appLoading]);

  return (
    <Loading
      height={3}
      color="#f11946"
      color={options.loadingBarColor}
      progress={loadingBarProgress}
    />
  );
}
