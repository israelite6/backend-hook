import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { AppContext } from "./AppContext";
import UpdateObject from "./../utils/UpdateObject";
import Toast from "react-toast-notifications";
import LoadingBar from "./../components/LoadingBar";
const { ToastProvider } = Toast;

export function AppProvider(props) {
  //const cache = new InMemoryCache();
  const [options, setOptionsData] = React.useState(
    Object.assign({ appLoading: false, ...props.options })
  );
  const [cache, setCacheData] = React.useState({});

  const client = new ApolloClient({
    //uri: "http://localhost:8081/v1/graphql",
    uri: props.options.graphqlUrl,

    request: operation => {
      operation.setContext({
        headers: {
          authorization: cache.token ? `Bearer ${cache.token}` : ""
        }
      });
    }
  });

  //This data will be wipe off on logout
  const setCache = data => {
    setCacheData(r => {
      const update = UpdateObject(r, data);

      localStorage.setItem(
        props.options.name + "_cache",
        JSON.stringify(update)
      );
      return update;
    });
  };

  // this data deals with the app configuration
  const setOptions = data => {
    setOptionsData(r => {
      return UpdateObject(r, data);
    });
  };

  const loadCache = () => {
    if (localStorage.getItem(props.options.name + "_cache")) {
      try {
        setCache(
          JSON.parse(localStorage.getItem(props.options.name + "_cache"))
        );
      } catch (e) {}
    }
  };

  const resetCache = () => {
    setCacheData(props.defaultData ? props.defaultData : {});
    try {
      localStorage.setItem(
        props.options.name + "_cache",
        JSON.stringify(props.defaultCache ? props.defaultCache : {})
      );
    } catch (e) {}
  };

  React.useEffect(() => {
    loadCache();
  }, []);
  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={{
          cache,
          setCache,
          options,
          setOptions,
          resetCache
        }}
      >
        {typeof document != "undefined" && (
          <ToastProvider autoDismissTimeout={5000} autoDismiss={true}>
            <LoadingBar />

            {props.children}
          </ToastProvider>
        )}
        {typeof navigator != "undefined" &&
          navigator.product == "ReactNative" && (
            <React.Fragment>{props.children}</React.Fragment>
          )}
      </AppContext.Provider>
    </ApolloProvider>
  );
}
