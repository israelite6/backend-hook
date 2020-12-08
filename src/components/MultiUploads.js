import React from "react";
import useUpload from "../hooks/useUpload";

export default function MultipUploads({ ...props }) {
  const data = [{ file: "", resize: "" }];
  return (
    <React.Fragment>
      {data.map((item, index) => (
        <Upload />
      ))}
    </React.Fragment>
  );
}

function Upload({ onChange, ...props }) {
  const fetchUpload = useUpload({
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { progress, loading, runUpload, success, error } = fetchUpload;

  React.useEffect(() => {
    if (onChange) {
      onChange(fetchUpload);
    }
  }, [fetchUpload]);

  return <></>;
}
