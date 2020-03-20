import React from "react";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(1),
    textAlign: "center"
  }
}));

export default function DeletePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (props.onClose) {
      props.onClose();
    }
  };

  const handleYes = () => {
    setAnchorEl(null);
    if (props.onYes) {
      props.onYes();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <span aria-describedby={id} onClick={handleClick}>
        {props.label}
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Box p={2}>
          <Typography className={classes.typography}>
            {props.title || "Are you sure?"}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color={props.yesColor || "secondary"}
              onClick={handleYes}
            >
              {props.yesLabel || "Yes"}
            </Button>
            <Box p={2}></Box>
            <Button
              variant="contained"
              color={props.noColor || "primary"}
              onClick={handleClose}
            >
              {props.noLabel || "No"}
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}

DeletePopover.propType = {
  yesLabel: PropType.string,
  noLabel: PropType.string,
  yesColor: PropType.string,
  noColor: PropType.string,
  title: PropType.string,
  onClose: PropType.func
};
