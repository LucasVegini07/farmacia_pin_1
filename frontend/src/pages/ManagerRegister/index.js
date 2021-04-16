import React, { useState } from "react";
import * as userAPI from "../../util/API/userAPI";
import Warning from "../../components/Warning";
import Decision from "../../components/Decision";
import history from "../../history";
import InputMask from "react-input-mask";
import validator from "validator";

import {
  Typography,
  TextField,
  makeStyles,
  Button,
  Grid,
  Card,
} from "@material-ui/core";

export default function ManagerRegister(props) {
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [openDecision, setOpenDecision] = useState(false);
  const [titleDecision, setTitleDecision] = useState("");
  const [descriptionDecision, setDescriptionDecision] = useState("");
  const [handleConfirmDecision, setHandleConfirmDecision] = useState(() => {});
  const [user, setUser] = useState({
    nome: "",
    cpf: "",
    apelido: "",
    escopo: "Gerente",
    ativo: true,
    email: "",
    senha: "",
    salario: "",
  });

  function handleWarning(message, type) {
    setOpenWarning(true);
    setWarningMessage(message);
    setTypeWarning(type);
  }

  function onCloseWarning() {
    setOpenWarning(false);
  }

  function handleNotSure() {
    setOpenDecision(false);
  }

  function handleChangeDecision(title, description) {
    setTitleDecision(title);
    setDescriptionDecision(description);
    setOpenDecision(true);
    setHandleConfirmDecision(() => RegisterManager);
  }

  async function RegisterManager() {
    if (!user.nome)
      return handleWarning(
        "Para concluir o cadastro você deve informar o nome do usuário",
        "error"
      );
    if (!user.cpf)
      return handleWarning(
        "Para concluir o cadastro você deve informar o cpf do usuário",
        "error"
      );
    if (user.cpf.length !== 11)
      return handleWarning(
        "Para concluir o cadastro você deve informar um cpf válido",
        "error"
      );
    if (!user.apelido)
      return handleWarning(
        "Para concluir o cadastro você deve informar o apelido do usuário",
        "error"
      );
    if (!user.email)
      return handleWarning(
        "Para concluir o cadastro você deve informar o email do usuário",
        "error"
      );
    if (!validator.isEmail(user.email))
      return handleWarning("E-mail informado inválido!", "error");
    if (!user.salario)
      return handleWarning(
        "Para concluir o cadastro você deve informar o salario do usuário",
        "error"
      );
    if (!user.senha)
      return handleWarning(
        "Para concluir o cadastro você deve informar o senha do usuário",
        "error"
      );
    if (user.senha.length < 5)
      return handleWarning(
        "A senha deve conter mais de 5 caracteres!",
        "error"
      );

    const response = userAPI.registerFuncionario(user);

    if (!response || response.status === 404) {
      return handleWarning(
        "Houve um erro ao tentar realizar o cadastro. Tente novamente ou contate o suporte tecnico",
        "error"
      );
    } else if (response.status < 200 || response.status > 299) {
      return handleWarning(
        "Houve um erro ao tentar realizar o cadastro. Tente novamente ou contate o suporte tecnico!",
        "error"
      );
    } else {
      handleWarning("Gerente cadastrado com sucesso", "success");
      setTimeout(() => {
        history.push(`/`);
      }, 3000);
    }
  }

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={6} style={{ marginTop: 240 }}>
          <Card
            style={{
              padding: 16,
            }}
          >
            <Grid container justify="flex-start" spacing={1}>
              <Grid item xs={12}>
                <Typography style={{ marginBottom: 16 }} variant="h6">
                  Cadastro Gerente
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Nome completo"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={user.nome}
                  onChange={(event) =>
                    setUser({ ...user, nome: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputMask
                  mask="999.999.999-99"
                  value={user.cpf}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      cpf: event.target.value.replace(/[^\d]+/g, ""),
                    })
                  }
                >
                  {() => (
                    <TextField
                      required
                      id="outlined-required"
                      label="CPF"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      value={user.cpf}
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Apelido"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={user.apelido}
                  onChange={(event) =>
                    setUser({ ...user, apelido: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="E-mail"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={user.email}
                  onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Salário"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={user.salario}
                  type="numeric"
                  onChange={(event) =>
                    setUser({ ...user, salario: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Senha"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  type="password"
                  value={user.senha}
                  onChange={(event) =>
                    setUser({ ...user, senha: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() =>
                    handleChangeDecision(
                      "Cadastrar gerente",
                      "Atenção! Você só poderá cadastrar um gerente no sistema, desaja continuar?"
                    )
                  }
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {openWarning && (
        <Warning
          message={warningMessage}
          open={openWarning}
          typeMessage={typeWarning}
          onClose={onCloseWarning}
        />
      )}
      {openDecision && (
        <Decision
          open={openDecision}
          handleConfirm={handleConfirmDecision}
          notSure={handleNotSure}
          title={titleDecision}
          description={descriptionDecision}
        />
      )}
    </>
  );
}
