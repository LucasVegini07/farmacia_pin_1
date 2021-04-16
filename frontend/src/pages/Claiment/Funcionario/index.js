import React, { Component } from "react";
import { Route } from "react-router-dom";
import AppBar from "../../../components/AppBar";
import HomePage from "./HomePage";
import Pedidos from "../../Pedidos";

export default class Funcionario extends Component {
  render() {
    return (
      <>
        <AppBar></AppBar>
        <Route exact path="/funcionario" component={HomePage} />
        <Route exact path="/funcionario/pedidos" component={Pedidos} />
      </>
    );
  }
}
