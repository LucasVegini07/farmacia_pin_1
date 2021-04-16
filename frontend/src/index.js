import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Router } from "react-router-dom";
import history from "./history";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#0046b3",
      main: "#001E4D",
      dark: "#262626",
    },
    secondary: {
      light: "#f7aa9e",
      main: "#F0573F",
      dark: "#ba260f",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router history={history}>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
