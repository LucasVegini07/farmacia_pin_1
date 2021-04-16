import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Button, Typography, Divider } from "@material-ui/core";

import PedidoCard from "../../../components/Cards/Pedidos";
import { bindActionCreators } from "redux";
import history from "../../../history";

const mapStateToProps = (state) => ({
  user: state.user.user,
  pedido: state.pedido.pedidos,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={10} style={{ marginBottom: 16 }}>
            <Typography>
              Seja bem vindo ao nosso sistema, você está atuando como:
              <span style={{ fontWeight: 600 }}> Gerente </span>
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ marginBottom: 16 }}>
            <Grid justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => history.push("/funcionario/pedidos")}
              >
                Cadastrar venda
              </Button>{" "}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 16 }}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 16 }}>
            <Typography variant="h6">Histórico de vendas</Typography>
          </Grid>

          {props.pedido.length === 0 ? (
            <>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    marginTop: 16,
                    marginBottom: 32,
                  }}
                >
                  Ainda não há registros de vendas
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography paragraph style={{ textAlign: "center" }}>
                  Notamos que não há nenhuma compra cadastrada no sistema. Você
                  como gerente, tem a função de gerenciar os funcionários e
                  remédios dentro do sistema. Para isso clique no botão que se
                  encontra ao lado do seu nome e faça as cadastra que
                  trabalharam no sistema
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              {props.pedido.map((pedido) => (
                <Grid container>
                  <Grid item xs={12} style={{ marginBottom: 8 }}>
                    <PedidoCard pedido={pedido}></PedidoCard>
                  </Grid>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
});
