/* This compnent handle all query fetch. */
import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { AppContext } from "../provider/AppContext";

export function useQuery(props) {
	/* The component refreshes after api called and appLoading is set to false
    That is why we have apiCallerCounter, So when the component refresh 
    api will not fetch again. 
    When apiCallerCounter  is 2 it means the api fetch cycle have completed
  */
	const [apiCalledCounter, setApiCalledCounter] = React.useState(0);
	const { setOptions, setCache, cache } = React.useContext(AppContext);
	const [data, setData] = React.useState();
	const [customLoading, setCustomLoading] = React.useState(false);
	const [customError, setCustomError] = React.useState(null);
	const [query, { error }] = useLazyQuery(props.query, {
		variables: props.hasOwnProperty("variables") ? props.variables : {},

		onCompleted: data => {
			if (props.cache) {
				setCache({ [props.cache]: data });
			}
			setData(data);
			setCustomLoading(false);
			if (props.hasOwnProperty("onSuccess")) {
				props.onSuccess(data);
			}
		},
		onError: err => {
			setCustomLoading(false);
			const { graphQLErrors, networkError } = err;
			let errors = [];
			if (graphQLErrors) {
				graphQLErrors.map(error => {
					if (error.extensions.code === "validation-failed") {
						errors.push("No permission");
					}
					if (error.extensions.code === "custom") {
						errors.push(error.message);
					}
				});
				setCustomError({ graphql: errors.join("\n") });
			}

			if (networkError) {
				setCustomError({ network: "No Network connectivity" });
			}

			if (props.hasOwnProperty("onError")) {
				props.onError(err);
			}
		}
	});

	React.useEffect(() => {
		if (props.cache) {
			setData(cache[props.cache]);
		}
	}, []);

	React.useEffect(() => {
		if (!customLoading) {
			if (apiCalledCounter === 1) {
				setApiCalledCounter(2);
				if (error) {
					setOptions({
						responseStatus: "error",
						responseMessage: props.responseMessage
							? props.responseErrorMessage
							: "Error! Please try again"
					});
				}

				setOptions({ appLoading: false });
			}
		}
	}, [customLoading]);

	/*React.useEffect(() => {
    console.log(loading + " is loading");
    if (!loading) {
      if (apiCalledCounter === 1) {
        setApiCalledCounter(2);
        if (error) {
          setOptions({
            responseStatus: "error",
            responseMessage: props.responseMessage
              ? props.responseErrorMessage
              : "Error! Please try again"
          });
          setApiCalledCounter(3);
        }

        setOptions({ appLoading: false });
      }
    }
  }, [loading]);*/

	const runQuery = () => {
		if (apiCalledCounter === 0) {
			setOptions({ appLoading: true });
			setApiCalledCounter(1);
			query();
			setCustomLoading(true);
		}
	};

	const reload = () => {
		setOptions({ appLoading: true });
		setApiCalledCounter(1);
		setCustomLoading(true);
		setCustomError(null);
		query();
	};

	return {
		runQuery,
		data,
		reload,
		loading: customLoading,
		error: customError,
		cache: props.cache ? true : false
	};
}
