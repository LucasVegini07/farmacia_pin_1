import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Card,
  makeStyles,
  Button,
  MenuItem,
} from "@material-ui/core";
import * as produtoAPI from "../../../util/API/produtoAPI";
import Warning from "../../../components/Warning";
import Decision from "../../../components/Decision";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as ProdutoActions } from "../../../store/ducks/Produto";
import ProdutoCard from "../../../components/Cards/Produto";
import EditarProduto from "../../../components/Dialogs/EditarProduto";

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
  produto: state.produto,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...ProdutoActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  const classes = useStyles();
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [openDecision, setOpenDecision] = useState(false);
  const [titleDecision, setTitleDecision] = useState("");
  const [descriptionDecision, setDescriptionDecision] = useState("");
  const [handleConfirmDecision, setHandleConfirmDecision] = useState(() => {});
  const [editedProduct, setEditedProduct] = useState({});

  const [setores] = useState(["Medicamento", "Dermocosmético", "Perfumaria"]);
  const [produto, setProduto] = useState({
    nome: "",
    setor: "",
    preco: "",
    quantidade: "",
    comissao: "",
  });
  const [openDialogEditarProduto, setOpenDialogEditarProduto] = useState(false);

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

  async function cadastrarProduto() {
    if (!produto.nome)
      return handleWarning(
        "Para concluir o cadastro você deve informar o nome do produto",
        "error"
      );
    if (!produto.setor)
      return handleWarning(
        "Para concluir o cadastro você deve informar o setor do produto",
        "error"
      );
    if (!produto.preco)
      return handleWarning(
        "Para concluir o cadastro você deve informar o preço do produto",
        "error"
      );
    if (!produto.quantidade)
      return handleWarning(
        "Para concluir o cadastro você deve informar a quantidade do produto",
        "error"
      );
    if (!produto.comissao)
      return handleWarning(
        "Para concluir o cadastro você deve informar a comissão do produto",
        "error"
      );

    const response = await produtoAPI.registerProduto(produto);

    let newProdutos = props.produto.produtos;
    newProdutos.push(response.data);
    props.setProdutos(newProdutos);
    handleWarning("Produto cadastrado com sucesso", "success");
  }

  function handleChangeDecision(title, description) {
    setTitleDecision(title);
    setDescriptionDecision(description);
    setOpenDecision(true);
    setHandleConfirmDecision(() => cadastrarProduto);
  }

  function openEditProduct(produto) {
    setEditedProduct(produto);
    setOpenDialogEditarProduto(true);
  }

  async function handleSetProduct() {
    const response = await produtoAPI.buscaTodosProdutos();
    props.setProdutos(response.data);
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
              label="Nome"
              variant="outlined"
              margin="dense"
              fullWidth
              value={produto.nome}
              onChange={(event) =>
                setProduto({ ...produto, nome: event.target.value })
              }
              style={{ marginBottom: 8 }}
            />
            <TextField
              required
              id="outlined-required"
              select
              label="Setor"
              variant="outlined"
              margin="dense"
              fullWidth
              value={produto.setor}
              onChange={(event) =>
                setProduto({ ...produto, setor: event.target.value })
              }
              style={{ marginBottom: 8 }}
            >
              {setores.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="outlined-required"
              label="Preço"
              variant="outlined"
              margin="dense"
              fullWidth
              value={produto.preco}
              onChange={(event) =>
                setProduto({ ...produto, preco: event.target.value })
              }
              style={{ marginBottom: 8 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Quantidade"
              variant="outlined"
              margin="dense"
              fullWidth
              value={produto.quantidade}
              onChange={(event) =>
                setProduto({ ...produto, quantidade: event.target.value })
              }
              style={{ marginBottom: 8 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Comissão"
              variant="outlined"
              margin="dense"
              fullWidth
              value={produto.comissao}
              onChange={(event) =>
                setProduto({ ...produto, comissao: event.target.value })
              }
              style={{ marginBottom: 8 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                handleChangeDecision(
                  "Cadastrar produto",
                  "Ao confirmar, você estará cadastrando este produto no sistema. Deseja continuar?"
                )
              }
            >
              Cadastrar
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h6" className={classes.marginBottom16}>
            Remédios
          </Typography>
          {props.produto.produtos.length > 0 ? (
            props.produto.produtos.map((produto) => {
              return (
                <Grid item xs={12} style={{ marginBottom: 8 }} key={produto.id}>
                  <ProdutoCard
                    produto={produto}
                    openEditProduct={openEditProduct}
                  ></ProdutoCard>
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

      {openDialogEditarProduto && (
        <EditarProduto
          open={openDialogEditarProduto}
          onClose={() => setOpenDialogEditarProduto(false)}
          produto={editedProduct}
          handleSetProduct={handleSetProduct}
        ></EditarProduto>
      )}
    </>
  );
});
