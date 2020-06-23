import React from "react";
import { getCache } from "./../utils/Cache";
import useStorage from "./useStorage";

export default function useUpload(props) {
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const cache = getCache();
  const token = useStorage("token");

  const progressHandler = (event) => {
    setProgress((event.loaded / event.total) * 100);
  };

  const completeHandler = (event) => {
    setLoading(false);
    setSuccess(event.target.responseText);

    setProgress(0);
    try {
      if (props.onSuccess) {
        props.onSuccess(JSON.parse(event.target.responseText));
      }
    } catch (e) {
      setError("Upload Error");
    }
  };

  const errorHandler = (event) => {
    setLoading(false);
    if (props.onError) {
      props.onError("Upload Failed");
      setError("Upload Failed");
    }
  };

  const abortHandler = (event) => {
    setLoading(false);
    if (props.onError) {
      props.onError("Upload Aborted");
      setError("Upload Aborted");
    }
  };

  const runUpload = ({ file, resize }) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    const formdata = new FormData();

    formdata.append("file", file);
    if (resize) {
      formdata.append("resize", JSON.stringify(resize));
    }

    const ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", cache.services["upload"]);
    ajax.setRequestHeader(
      "Authorization",
      token.get() ? `Bearer ${token.get()}` : ""
    );
    ajax.send(formdata);
  };
  //var file = _("image").files[0];

  return { progress, loading, runUpload, success, error };
}
