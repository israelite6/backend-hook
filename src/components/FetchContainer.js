import React from "react";
import ContentLoader from "react-content-loader";
import { AppContext } from "./../provider/AppContext";

export default function FetchContainer(props) {
  const {
    options: { ErrorBoard, Loader, EmptyBoard }
  } = React.useContext(AppContext);

  const loader = props.shapes ? (
    <ContentLoader>{props.shapes}</ContentLoader>
  ) : (
    <Loader></Loader>
  );

  if (props.loading) {
    return loader;
  }

  if (props.error) {
    return (
      <React.Fragment>
        <ErrorBoard reload={props.reload} error={props.error}></ErrorBoard>
      </React.Fragment>
    );
  }

  if (props.data) {
    let empty = false;
    Object.keys(props.data).map((key, index) => {
      if (index === 0) {
        if (props.data[key].length === 0) {
          empty = true;
        }
      }
    });

    if (empty) {
      return (
        <EmptyBoard
          icon={props.emptyIcon}
          label={props.emptyLabel}
        ></EmptyBoard>
      );
    }
  }

  return <React.Fragment>{props.children}</React.Fragment>;
}
