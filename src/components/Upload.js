import React from "react";
import PropTypes from "prop-types";
import { useUploadMutation } from "./../utils/useUploadMutation";
import gql from "graphql-tag";

const UPLOAD_FILE = gql`
  mutation uploadSingleFile($file: UploadInput!) {
    uploadSingleFile(input: $file) {
      url
      id
      path
    }
  }
`;

export default function Upload(props) {
  const classes = useStyles();
  const [uploadingState, setUploadingState] = React.useState(false);
  const { runMutation, progress } = useUploadMutation({
    mutation: UPLOAD_FILE,
    onError: err => {
      console.log(err);
    },
    onSuccess: res => {
      setUploadingState(false);
      if (props.onSuccess) {
        props.onSuccess(res.uploadSingleFile);
      }
    }
  });

  const onChange = file => {
    //console.log(validity);
    if (props.onChange) {
      props.onChange(file);
    }

    setUploadingState(true);
    const data = {
      file: file.target.files[0]
    };
    console.log(file.target.files[0]);
    if (props.callbacks) {
      Object.assign(data, { callbacks: props.callbacks });
    }
    runMutation({
      file: data
    });
  };

  React.useEffect(() => {
    if (props.progress) {
      props.onProgress(progress);
    }
  }, [progress]);

  return (
    <React.Fragment>
      <input
        style={{ display: "none" }}
        accept={props.accept}
        type="file"
        id="file-input"
        onChange={onChange}
      />
      <label htmlFor="file-input">
        {props.label && props.label} {props.labelElement && props.labelElement}
      </label>
      {/* {uploadingState && !props.hideProgress && (
        <LinearProgress
          variant="determinate"
          value={progress}
          color={props.progressBarColor}
        />
      )} */}
    </React.Fragment>
  );
}

Upload.propTypes = {
  accept: PropTypes.string,
  callbacks: PropTypes.array,
  label: PropTypes.string,
  onProgress: PropTypes.func,
  onChange: PropTypes.func,
  hideProgress: PropTypes.bool,
  progressBarColor: PropTypes.string,
  labelElement: PropTypes.object
};
Upload.defaultProps = {
  //label: "Upload",
  accept: "image/*",
  progressBarColor: "secondary"
};
/*
callbacks: [{ mutation: "string", variable: JSON.stringify({upload_id: ''}) }];

*/
