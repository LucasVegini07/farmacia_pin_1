import React, { useState } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Decision from "../Decision";
import Warning from "../Warning";
import * as userAPI from "../../util/API/userAPI";
import InputMask from "react-input-mask";
import validator from "validator";

export default function EditEmployee(props) {
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [openDecision, setOpenDecision] = useState(false);
  const [titleDecision, setTitleDecision] = useState("");
  const [descriptionDecision, setDescriptionDecision] = useState("");
  const [handleConfirmDecision, setHandleConfirmDecision] = useState(() => {});

  const [user, setUser] = useState({
    nome: props.user.nome,
    cpf: props.user.cpf,
    apelido: props.user.apelido,
    email: props.user.email,
    senha: props.user.senha,
    escopo: props.user.escopo,
    salario: props.user.salario,
    id: props.user.id,
    ativo: props.user.ativo,
    comissao: props.user.comissao,
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

  async function editaFuncionario() {
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

    const response = await userAPI.registerFuncionario(user);

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
      handleWarning("Usuário editado com sucesso!", "success");
      props.handleAtualizaFuncionarioEditado();
      setTimeout(() => {
        props.onClose();
      }, 2000);
    }
  }

  async function ativaFuncionario() {
    await userAPI.ativaFuncionario(user);
    handleWarning("Usuário ativado com sucesso!", "success");
    props.handleAtualizaFuncionarioEditado();
    setTimeout(() => {
      props.onClose();
    }, 2000);
  }

  async function desativaFuncionario() {
    await userAPI.desativaFuncionario(user);
    handleWarning("Usuário desativado com sucesso!", "success");
    props.handleAtualizaFuncionarioEditado();
    setTimeout(() => {
      props.onClose();
    }, 2000);
  }

  function handleChangeDecision(title, description, type) {
    setTitleDecision(title);
    setDescriptionDecision(description);
    setOpenDecision(true);
    setHandleConfirmDecision(() =>
      type === "Salvar"
        ? editaFuncionario
        : type === "Ativar"
        ? ativaFuncionario
        : desativaFuncionario
    );
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        keepMounted
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
          Editar Funcionário
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
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
                value={user.salario + user.comissao}
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
                type="password"
                fullWidth
                value={user.senha}
                onChange={(event) =>
                  setUser({ ...user, senha: event.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <>
              <Grid item>
                {user.ativo ? (
                  <Button
                    onClick={() =>
                      handleChangeDecision(
                        "Desativar funcionário",
                        "Ao confirmar, você estará desativando as funções deste usuário no sistema. Deseja continuar?",
                        "Desativar"
                      )
                    }
                    variant="contained"
                    color="secondary"
                  >
                    Desativar
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleChangeDecision(
                        "Ativar usuário",
                        "Ao confirmar, você estará ativando as funções deste usuário no sistema. Deseja continuar?",
                        "Ativar"
                      )
                    }
                    variant="contained"
                    style={{
                      backgroundColor: "#00e676",
                      color: "white",
                    }}
                  >
                    Ativar
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    handleChangeDecision(
                      "Editar usuário",
                      "Ao confirmar, você estará editando as informações deste usuário no sistema. Deseja continuar?",
                      "Salvar"
                    )
                  }
                >
                  Salvar
                </Button>
              </Grid>
            </>
          </Grid>
        </DialogActions>
      </Dialog>
      {openDecision && (
        <Decision
          open={openDecision}
          handleConfirm={handleConfirmDecision}
          notSure={handleNotSure}
          title={titleDecision}
          description={descriptionDecision}
        />
      )}
      {openWarning && (
        <Warning
          message={warningMessage}
          open={openWarning}
          typeMessage={typeWarning}
          onClose={onCloseWarning}
        />
      )}
    </>
  );
}
