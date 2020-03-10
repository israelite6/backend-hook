import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AppContext } from "./../provider/AppContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
    top: 0,
    left: 0,
    right: 0,
    position: "fixed"
  }
}));

export default function LoadingBar() {
  const { options } = React.useContext(AppContext);
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progress = React.useRef(() => {});
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 85) {
        //setCompleted(0);
        //setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    if (!options.appLoading) {
      setCompleted(0);
      setBuffer(10);
    }
  }, [options.appLoading]);

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress
        variant="buffer"
        value={completed}
        valueBuffer={buffer}
        color={options.loadingBarColor ? options.loadingBarColor : "secondary"}
      />
    </div>
  );
}
