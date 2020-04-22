import React from "react";
//import ContentLoader from "react-content-loader";
import { getCache } from "./../utils/Cache";

export default function FetchContainer({
  loading,
  data,
  error,
  refetch,
  empty: propsEmpty,
  emptyIcon,
  emptyLabel,
  ...props
}) {
  const cache = getCache();

  const { ErrorBoard, Loader, EmptyBoard } = cache;

  const loader = <Loader></Loader>;

  if (loading && !data) {
    return loader;
  }

  if (error) {
    return (
      <React.Fragment>
        <ErrorBoard reload={refetch} error={error}></ErrorBoard>
      </React.Fragment>
    );
  }
  try {
    if (data.data) {
      let empty = false;
      Object.keys(data.data).map((key, index) => {
        if (index === 0) {
          if (data[key].length === 0) {
            empty = true;
          }
        }
      });

      if (empty) {
        return (
          <React.Fragment>
            {propsEmpty ? (
              <React.Fragment>{propsEmpty}</React.Fragment>
            ) : (
              <EmptyBoard icon={emptyIcon} label={emptyLabel}></EmptyBoard>
            )}
          </React.Fragment>
        );
      }
    }
  } catch (e) {}

  if (data && loading) {
    return (
      <React.Fragment>
        <Loader />
        {props.children}
      </React.Fragment>
    );
  }

  return <React.Fragment>{props.children}</React.Fragment>;
}
