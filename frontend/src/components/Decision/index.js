import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  CircularProgress,
} from "@material-ui/core";

export default function Decision(props) {
  const [loading, setLoading] = useState(false);

  function handleChangeLoading() {
    setLoading(!loading);
  }

  async function handleRenderPage() {

    handleChangeLoading();
    await props.handleConfirm();
    handleChangeLoading();
    props.notSure();
  }

  const { notSure, open } = props;
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={notSure}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!loading ? (
            <>
              <Button onClick={notSure} color="primary">
                Não
              </Button>
              <Button color="primary" onClick={handleRenderPage}>
                Sim
              </Button>
            </>
          ) : (
            <CircularProgress disableShrink />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
