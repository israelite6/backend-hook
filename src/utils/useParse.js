import React from "react";
import Parse from "parse";
import { AppContext } from "./../provider/AppContext";

export default function useParse(props) {
  const { setOptions } = React.useContext(AppContext);
  const [state, setStates] = React.useState({ loading: false, data: null });
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const setState = data => setStates(prev => ({ ...prev, data }));

  const insert = ({ className, data }) => {
    setOptions({ appLoading: true });
    setLoading(true);

    const obj = Parse.Object.extend(className);
    new obj()
      .save(data)
      .then(res => {
        setLoading(false);
        setOptions({ appLoading: false });
        setData(JSON.parse(JSON.stringify(res)));
        if (props) {
          if (props.onSuccess) {
            props.onSuccess(res);
          }
        }
      })
      .catch(err => {
        setLoading(false);
        setOptions({ appLoading: false });
        if (props) {
          if (props.onError) {
            props.onError(err);
          }
        }
      });
  };

  const query = ({ className }) => {
    const obj = Parse.Object.extend(className);
    return new Parse.Query(obj);
  };

  const find = query => {
    setOptions({ appLoading: true });
    setLoading(true);
    query
      .find()
      .then(res => {
        setLoading(false);
        setOptions({ appLoading: false });
        console.log(JSON.parse(JSON.stringify(res)));
        setData(JSON.parse(JSON.stringify(res)));

        if (props) {
          if (props.onSuccess) {
            props.onSuccess(res);
          }
        }
      })
      .catch(err => {
        setLoading(false);
        setOptions({ appLoading: false });
        if (props) {
          if (props.onError) {
            props.onError(err);
          }
        }
      });
  };

  const remove = ({ className, ...other }) => {
    setOptions({ appLoading: true });
    setLoading(true);
    const obj = Parse.Object.extend(className);
    new obj({ ...other })
      .destroy()
      .then(res => {
        setLoading(false);
        setOptions({ appLoading: false });
        setState({ data: JSON.parse(JSON.stringify(res)) });
        if (props) {
          if (props.onSuccess) {
            props.onSuccess(res);
          }
        }
      })
      .catch(err => {
        setLoading(false);
        setOptions({ appLoading: false });
        if (props) {
          if (props.onError) {
            props.onError(err);
          }
        }
      });
  };

  const pointer = ({ className, id }) => {
    const obj = Parse.Object.extend(className);
    return obj.createWithoutData(id);
  };

  return {
    loading,
    data,
    insert,
    query,
    destroy: remove,
    pointer,
    find
  };
}
