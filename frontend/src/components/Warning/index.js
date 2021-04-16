import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  withStyles,
} from "@material-ui/core";
import { CheckCircle, Error, Info, Close } from "@material-ui/icons";
import WarningIcon from "@material-ui/icons/Warning";
import { green, amber } from "@material-ui/core/colors";

const variantIcon = {
  success: CheckCircle,
  warning: WarningIcon,
  error: Error,
  info: Info,
};

const styles = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <Close className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

const styles2 = (theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
});

class Warning extends Component {
  render() {
    const { message, open, typeMessage, onClose } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={5000}
          onClose={onClose}
        >
          <MySnackbarContentWrapper
            onClose={onClose}
            variant={typeMessage}
            message={message}
          />
        </Snackbar>
      </div>
    );
  }
}

Warning.propTypes = {
  onClose: PropTypes.func,
  typeMessage: PropTypes.oneOf(["error", "info", "success", "warning"])
    .isRequired,
  message: PropTypes.string,
  open: PropTypes.bool,
};

export default withStyles(styles2)(Warning);
