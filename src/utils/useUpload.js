import React from "react";

export default function useUpload({ onSuccess, onError }) {
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const progressHandler = (event) => {
    setProgress((event.loaded / event.total) * 100);
  };

  const completeHandler = (event) => {
    setLoading(false);
    setSuccess(event.target.responseText);
    if (onSuccess) {
      onSuccess(event);
    }
    setProgress(0);
  };

  const errorHandler = (event) => {
    setLoading(false);
    if (onError) {
      onError("Upload Failed");
      setError("Upload Failed");
    }
  };

  const abortHandler = (event) => {
    setLoading(false);
    if (onError) {
      onError("Upload Aborted");
      setError("Upload Aborted");
    }
  };

  const runUpload = (file) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("file", file);
    const ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "file_upload.php");
    ajax.send(formdata);
  };
  //var file = _("image").files[0];

  return { progress, loading, runUpload, success, error };
}
