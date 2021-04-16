import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Card,
  makeStyles,
  Button,
} from "@material-ui/core";
import * as userAPI from "../../../util/API/userAPI";
import Warning from "../../../components/Warning";
import Decision from "../../../components/Decision";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as UserActions } from "../../../store/ducks/User";
import FuncionarioCard from "../../../components/Cards/Funcionários";
import EditarFuncionario from "../../../components/Dialogs/EditarFuncionario";
import InputMask from "react-input-mask";
import validator from "validator";

const useStyles = makeStyles(() => ({
  marginBottom16: {
    marginBottom: 16,
  },
  grid: {
    marginLeft: 116,
    marginRight: 32,
  },
}));

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...UserActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  const classes = useStyles();
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [openDecision, setOpenDecision] = useState(false);
  const [
    openDialogEditarFuncionario,
    setOpenDialogEditarFuncionario,
  ] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [titleDecision, setTitleDecision] = useState("");
  const [descriptionDecision, setDescriptionDecision] = useState("");
  const [handleConfirmDecision, setHandleConfirmDecision] = useState(() => {});
  const [user, setUser] = useState({
    nome: "",
    cpf: "",
    apelido: "",
    escopo: "Funcionario",
    email: "",
    senha: "",
    salario: "",
    comissao: "",
    ativo: true,
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

  function functionOpenEditarFuncionario(funcionario) {
    setEditedUser(funcionario);
    setOpenDialogEditarFuncionario(true);
  }

  async function cadastrarFuncionario() {
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
      let newEmployee = props.user.funcionarios;
      newEmployee.push(response.data);
      props.setFuncionarios(newEmployee);
      handleWarning("Funcionário cadastrado com sucesso", "success");
    }
  }

  async function handleAtualizaFuncionarioEditado() {
    const response = await userAPI.buscaTodosFuncionarios();
    props.setFuncionarios(response.data);
  }

  async function zerarComissao() {
    await userAPI.zerarComissao();
    const response = await userAPI.buscaTodosFuncionarios();
    props.setFuncionarios(response.data);
  }

  function handleChangeDecision(title, description, type) {
    setTitleDecision(title);
    setDescriptionDecision(description);
    setOpenDecision(true);
    setHandleConfirmDecision(() =>
      type === "Cadastrar" ? cadastrarFuncionario : zerarComissao
    );
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={3} className={classes.grid}>
          <Typography variant="h6" className={classes.marginBottom16}>
            Cadastrar
          </Typography>
          <Card
            style={{
              padding: 8,
            }}
          >
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
              style={{ marginBottom: 8 }}
            />
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
              style={{ marginBottom: 8 }}
            />
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
              style={{ marginBottom: 8 }}
            />
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
              style={{ marginBottom: 8 }}
            />
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
              style={{ marginBottom: 8 }}
            />
            <Button
              style={{ marginBottom: 8 }}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                handleChangeDecision(
                  "Cadastrar usuário",
                  "Ao confirmar, você estará cadastrando este usuário no sistema. Deseja continuar?",
                  "Cadastrar"
                )
              }
            >
              Cadastrar
            </Button>
          </Card>
        </Grid>
        <Grid item md={7}>
          <Grid container justify="space-between">
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.marginBottom16}>
                Funcionários
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                onClick={() =>
                  handleChangeDecision(
                    "Pagar comissão",
                    "Ao confirmar, você estará zerando a comissão de todos os funcionários do sistema. Deseja continuar?"
                  )
                }
                variant="contained"
                color="primary"
                fullWidth
              >
                Pagar comissão{" "}
              </Button>
            </Grid>
          </Grid>
          {props.user.funcionarios.length > 1 ? (
            props.user.funcionarios.map((funcionario) => {
              return (
                <Grid
                  item
                  xs={12}
                  style={{ marginBottom: 8 }}
                  key={funcionario.id}
                >
                  {funcionario.escopo !== "Gerente" && (
                    <FuncionarioCard
                      funcionario={funcionario}
                      openEditarFuncionario={functionOpenEditarFuncionario}
                    ></FuncionarioCard>
                  )}
                </Grid>
              );
            })
          ) : (
            <Grid container justify="center">
              <Grid item md={12}>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    marginTop: 16,
                    marginBottom: 32,
                  }}
                >
                  Ainda não há funcionários cadastrados
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Typography paragraph style={{ textAlign: "center" }}>
                  Notamos que você ainda não cadastrou nenhum funcionário no
                  sistema. Para isso, complete os dados ao lado e clique no
                  botão
                  <span style={{ fontWeight: 600 }}> Cadastrar </span>
                  que se encontra abaixo dos dados.
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      {openDialogEditarFuncionario && (
        <EditarFuncionario
          open={openDialogEditarFuncionario}
          onClose={() => setOpenDialogEditarFuncionario(false)}
          user={editedUser}
          handleAtualizaFuncionarioEditado={handleAtualizaFuncionarioEditado}
        ></EditarFuncionario>
      )}
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
});
