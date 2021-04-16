import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Gerente from "./pages/Claiment/Gerente";
import Login from "./pages/Login";
import ManagerRegister from "./pages/ManagerRegister";
import Funcionario from "./pages/Claiment/Funcionario";
export default function routes(props) {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/manager-register" component={ManagerRegister} />
      <Route path="/funcionario" component={Funcionario} />
      <Route path="/gerente" component={Gerente} />
    </Switch>
  );
}
