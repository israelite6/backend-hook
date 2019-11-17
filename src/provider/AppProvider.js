import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import UpdateObject from "./../utils/UpdateObject";
import Storage from "./../utils/Storage";

export const AppContext = React.createContext({});

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
      const token = localStorage.getItem(props.options.name + "_token");
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ""
        }
      });
    }
  });

  //This data will be wipe off on logout
  const setCache = data => {
    setCacheData(r => {
      const update = UpdateObject(r, data);
      Storage(props.options.name + "_cache").set(update);
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
    if (Storage(props.options.name + "_cache").get()) {
      setOptions(Storage(props.options.name + "_cache").get());
    }
  };

  const resetCache = () => {
    setCacheData(props.defaultData ? props.defaultData : {});
    Storage(props.options.name + "_cache").set(
      props.defaultData ? props.defaultData : {}
    );
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
        {props.children}
      </AppContext.Provider>
    </ApolloProvider>
  );
}
