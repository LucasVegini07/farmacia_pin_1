import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Grid, Paper } from "@material-ui/core";
import * as userApi from "../../util/API/userAPI";
import Warning from "../../components/Warning";
import history from "../../history";
import LogoFarmacia from "../../Assets/Imagem.png";

export default function Login(props) {
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [existGerente, setExistGerente] = useState(true);

  useEffect(() => {
    async function verifyGerente() {
      await existeGerente();
    }
    verifyGerente();
  }, []);

  async function existeGerente() {
    const response = await userApi.existGerente();
    setExistGerente(response.data);
  }

  function handleWarning(message, type) {
    setOpenWarning(true);
    setWarningMessage(message);
    setTypeWarning(type);
  }

  function onCloseWarning() {
    setOpenWarning(false);
  }

  async function login() {
    const response = await userApi.login(email, senha);

    if (response.data) {
      let user = await userApi.buscaUsuarioByEmail(email);
      localStorage.setItem("user_id", user.data.id);
      user.data.escopo === "Gerente"
        ? history.push("/gerente")
        : history.push("/funcionario");
    } else
      return handleWarning(
        "Usuário não encontrado ou senha incorreta",
        "error"
      );
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ padding: 8 }}
    >
      <Grid item xs={4}>
        <Paper style={{ marginTop: 116, padding: 16 }}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid container justify="center" item xs={12}>
              <img
                src={LogoFarmacia}
                alt={"Simbolo da farmácia"}
                style={{ maxWidth: 100 }}
              ></img>
            </Grid>
            <Grid container justify="center" item xs={12}>
              <Typography
                variant="body1"
                style={{
                  textAlign: "justify",
                  marginTop: 16,
                }}
              >
                <span style={{ fontWeight: 500 }}>Disciplina: </span>
                Projeto Integrador I
              </Typography>
            </Grid>
            <Grid container justify="center" item xs={12}>
              <Typography
                variant="body1"
                style={{
                  textAlign: "justify",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontWeight: 500 }}>Aluno: </span>
                Lucas Ramthum Vegini
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginBottom: 16 }}
                variant="outlined"
                id="outlined-required"
                label="E-mail"
                margin="dense"
                fullWidth
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginBottom: 16 }}
                variant="filled"
                id="outlined-required"
                label="Senha"
                variant="outlined"
                margin="dense"
                type="password"
                fullWidth
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ marginBottom: 16 }}
                variant="contained"
                color="primary"
                fullWidth
                onClick={login}
              >
                Entrar
              </Button>
            </Grid>
            {!existGerente && (
              <Grid item xs={12}>
                <Button
                  style={{ marginBottom: 16 }}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => history.push("/manager-register")}
                >
                  Cadastrar gerente
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
      {openWarning && (
        <Warning
          message={warningMessage}
          open={openWarning}
          typeMessage={typeWarning}
          onClose={onCloseWarning}
        />
      )}
    </Grid>
  );
}
