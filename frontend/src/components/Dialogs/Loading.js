/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Creators as UserActions } from "../../store/ducks/User";
import { Creators as ProdutoActions } from "../../store/ducks/Produto";
import { Creators as PedidoActions } from "../../store/ducks/Pedido";

import { bindActionCreators } from "redux";
import * as userAPI from "../../util/API/userAPI";
import * as produtoAPI from "../../util/API/produtoAPI";
import * as pedidoAPI from "../../util/API/pedidoAPI";

import { connect } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import history from "../../history";

const mapStateToProps = (state) => ({
  user: state.user,
  produto: state.produto,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { ...UserActions, ...ProdutoActions, ...PedidoActions },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  useEffect(() => {
    async function Loading() {
      await Login();
    }
    Loading();
  }, [props, Login]);

  async function Login() {
    if (
      localStorage.getItem("user_id") === undefined ||
      localStorage.getItem("user_id") === "0"
    ) {
      return history.push("/login");
    }

    if (localStorage.getItem("user_id") === "1") {
      let funcionarios = await userAPI.buscaTodosFuncionarios();
      props.setFuncionarios(funcionarios.data);
    }

    let produtos = await produtoAPI.buscaTodosProdutos();
    let pedidos = await pedidoAPI.buscaTodosPedidos();
    props.setProdutos(produtos.data);
    props.setPedidos(pedidos.data);

    const user = await userAPI.buscaUsuarioById(
      localStorage.getItem("user_id")
    );
    props.setUser(user.data);
    props.onClose();
  }

  return (
    <>
      <Dialog
        open={props.open}
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Carregando informações
        </DialogTitle>
        <DialogContent style={{ marginBottom: 16 }}>
          <DialogContentText id="alert-dialog-slide-description">
            Solicitando informações do usuário...
          </DialogContentText>
          <LinearProgress />
        </DialogContent>
      </Dialog>
    </>
  );
});
