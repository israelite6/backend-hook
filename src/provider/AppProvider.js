import React from "react";
//import ApolloClient from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createUploadLink } from "apollo-upload-client";
import { AppContext } from "./AppContext";
import UpdateObject from "./../utils/UpdateObject";
import Toast from "react-toast-notifications";
import CustomFetch from "./../utils/CustomFetch";
import Reducer from "./../utils/Reducer";
const { ToastProvider } = Toast;

export function AppProvider(props) {
  //const cache = new InMemoryCache();
  const [options, setOptionsData] = React.useState(
    Object.assign({ appLoading: false, ...props.options })
  );

  const [cache, setCache] = React.useReducer(Reducer, props.options);
  //const [cache, setCacheData] = React.useState({});

  const httpLink = createUploadLink({
    uri: props.options.graphqlUrl,
    fetch: typeof window === "undefined" ? global.fetch : CustomFetch
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: cache.token ? `Bearer ${cache.token}` : ""
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  // this data deals with the app configurations
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

  const LoadingBar = props.options.loadingBar;

  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      cache
    });
  });

  React.useEffect(() => {
    //loadCache();
  }, []);
  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={
          {
            // cache,
            // setCache,
            // options,
            // setOptions,
            // resetCache
          }
        }
      >
        {typeof document != "undefined" && (
          <ToastProvider autoDismissTimeout={5000} autoDismiss={true}>
            {props.children}
            {options.appLoading && props.options.loadingBar && <LoadingBar />}
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
