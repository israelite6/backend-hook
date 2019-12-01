import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import UpdateObject from "./../utils/UpdateObject";

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
    if (localStorage.getItem(props.options.name + "_cache")) {
      try {
        setOptions(
          JSON.parse(localStorage.getItem(props.options.name + "_cache"))
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  const resetCache = () => {
    setCacheData(props.defaultData ? props.defaultData : {});
    try {
      localStorage.setItem(
        props.options.name + "_cache",
        JSON.stringify(props.defaultCache ? props.defaultCache : {})
      );
    } catch (e) {
      console.log(e);
    }
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
