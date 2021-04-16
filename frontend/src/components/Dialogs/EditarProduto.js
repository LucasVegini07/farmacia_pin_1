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
import * as produtoAPI from "../../util/API/produtoAPI";
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
  const [setores] = useState(["Medicamento", "Dermocosmético", "Perfumaria"]);
  const [produto, setProduto] = useState({
    nome: props.produto.nome,
    setor: props.produto.setor,
    preco: props.produto.preco,
    quantidade: props.produto.quantidade,
    comissao: props.produto.comissao,
    id: props.produto.id,
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

  async function editProduto() {
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

    const response = await produtoAPI.editProduto(produto);
    handleWarning("Produto editado com sucesso!", "success");
    setTimeout(() => {
      props.onClose();
    }, 2000);

    props.handleSetProduct();
  }

  function handleChangeDecision(title, description, type) {
    setTitleDecision(title);
    setDescriptionDecision(description);
    setOpenDecision(true);
    setHandleConfirmDecision(() => editProduto);
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
          Editar Produto
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => props.onClose()}
              >
                Voltar
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  handleChangeDecision(
                    "Editar produto",
                    "Ao confirmar, você estará editando as informações deste produto no sistema. Deseja continuar?"
                  )
                }
              >
                Salvar
              </Button>
            </Grid>
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
