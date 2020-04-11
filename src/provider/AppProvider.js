import React from "react";
//import ApolloClient from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createUploadLink } from "apollo-upload-client";
import useStorage from "./../utils/useStorage";
//import { AppContext } from "./AppContext";
//import UpdateObject from "./../utils/UpdateObject";
//import Toast from "react-toast-notifications";
import CustomFetch from "./../utils/CustomFetch";
//const { ToastProvider } = Toast;
import useStore from "./../utils/useStore";
import { setCacheFn, setCacheData, setResetCachefn } from "./../utils/Cache";

export function AppProvider(props) {
  console.log(props.options);
  const { cache, setCache } = useStore(props.options);
  const token = useStorage("token");
  setCacheFn(setCache);
  setCacheData(cache);

  const httpLink = createUploadLink({
    uri: props.options.graphqlUrl,
    fetch: typeof window === "undefined" ? global.fetch : CustomFetch,
  });

  const authLink = setContext((_, { headers }) => {
    console.log(token.get() ? `Bearer ${token.get()}` : "");

    return {
      headers: {
        ...headers,
        authorization: token.get() ? `Bearer ${token.get()}` : "",
      },
    };
  });

  const resetCache = () => {
    console.log("reseting");
    setCache({ resetCache: true, options: props.options });
  };

  setResetCachefn(resetCache);

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // this data deals with the app configurations

  const loadCache = () => {
    if (localStorage.getItem(props.options.name + "_cache")) {
      try {
        setCache(
          JSON.parse(localStorage.getItem(props.options.name + "_cache"))
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  // const resetCache = () => {
  //   setCache({ resetCache: true });
  //   setCache(props.options);
  //   setOptions(props.options);
  //   // try {
  //   //   localStorage.setItem(
  //   //     props.options.name + "_cache",
  //   //     JSON.stringify(props.defaultCache ? props.defaultCache : {})
  //   //   );
  //   // } catch (e) {}
  // };

  const children = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      cache,
      setCache,
    });
  });

  React.useEffect(() => {
    loadCache();
  }, []);
  return (
    <ApolloProvider client={client}>
      {children}
      {typeof navigator != "undefined" &&
        navigator.product == "ReactNative" && (
          <React.Fragment>{props.children}</React.Fragment>
        )}
      {/* </AppContext.Provider> */}
    </ApolloProvider>
  );
}
