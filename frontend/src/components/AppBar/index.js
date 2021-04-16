import React, { useState, useEffect } from "react";
import history from "../../history";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import Menu from "./Menu";
import Loading from "../../components/Dialogs/Loading";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  marginLeft8: {
    marginLeft: 32,
  },
  root: {
    flexGrow: 1,
    marginBottom: 32,
  },
}));

const mapStateToProps = (state) => ({
  user: state.user,
  run: state.run,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  const classes = useStyles();
  const { user } = props.user;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  function handleLogout() {
    localStorage.setItem("user_id", 0);
    history.push("/login");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={9}>
              <Button
                color="inherit"
                onClick={() =>
                  history.push(
                    props.user.user.escopo === "Gerente"
                      ? "/gerente"
                      : "/funcionario"
                  )
                }
                variant="outlined"
              >
                Farmácia | PIN I
              </Button>
            </Grid>
            {props.user.user.escopo === "Gerente" ? (
              <Grid item xs={1}>
                <Grid container justify="flex-end">
                  <Menu></Menu>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={1}></Grid>
            )}
            <Grid item xs={1}>
              <Grid container justify="center">
                <Typography variant="h6">{user.apelido} </Typography>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Button
                fullWidth
                color="inherit"
                onClick={handleLogout}
                variant="outlined"
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {open && <Loading open={open} onClose={() => setOpen(false)} />}
    </div>
  );
});
