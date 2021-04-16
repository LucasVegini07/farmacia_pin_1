import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "./HomePage";
import AppBar from "../../../components/AppBar";
import Funcionarios from "./Funcionarios";
import Produtos from "./Produtos";
import Pedidos from "../../Pedidos";

export default class Gerente extends Component {
  render() {
    return (
      <>
        <AppBar></AppBar>
        <Route exact path="/gerente" component={HomePage} />
        <Route exact path="/gerente/funcionarios" component={Funcionarios} />
        <Route exact path="/gerente/produtos" component={Produtos} />
        <Route exact path="/gerente/pedidos" component={Pedidos} />
      </>
    );
  }
}
