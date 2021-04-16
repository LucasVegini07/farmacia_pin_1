import React, { useState } from "react";
import Warning from "../../components/Warning";
import Decision from "../../components/Decision";
import history from "../../history";
import InputMask from "react-input-mask";

import * as userAPI from "../../util/API/userAPI";
import * as pedidoAPI from "../../util/API/pedidoAPI";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as ProdutoActions } from "../../store/ducks/Produto";
import { Creators as PedidoActions } from "../../store/ducks/Pedido";

import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Autocomplete from "@material-ui/lab/Autocomplete";

const mapStateToProps = (state) => ({
  produto: state.produto,
  user: state.user.user,
  pedido: state.pedido.pedidos,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...ProdutoActions, ...PedidoActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [openDecision, setOpenDecision] = useState(false);
  const [titleDecision, setTitleDecision] = useState("");
  const [produtoEscolhido, setProdutoEscolhido] = useState("");
  const [descriptionDecision, setDescriptionDecision] = useState("");
  const [handleConfirmDecision, setHandleConfirmDecision] = useState(() => {});
  const [quantidadeProdutoTotal, setQuantidadeProdutoTotal] = useState(0);
  const [produtosAdicionados, setProdutosAdicionados] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [nomeCliente, setNomeCliente] = useState("");
  const [cpfCliente, setCpfCliente] = useState("");
  const [pontosCliente, setPontosCliente] = useState(0);
  const [comissao, setComissao] = useState(0);

  const [
    quantidadeProdutoAdicionado,
    setQuantidadeProdutoAdicionado,
  ] = useState(0);

  function handleChangeProdutoEscolhido(value) {
    setProdutoEscolhido(value.nome);
    setQuantidadeProdutoTotal(value.quantidade);
  }

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

  async function verificaCpfCliente() {
    if (!cpfCliente)
      return handleWarning("CPF não pode estar em branco", "error");

    if (cpfCliente.length !== 11)
      return handleWarning("Você precisa informar um cpf válido", "error");

    const response = await userAPI.buscaUsuarioByCPF(cpfCliente);


    if (!response.data.id) {
      handleWarning("Usuário não encontrado em nosso banco de dados", "error");
    } else {
      handleWarning("CPF encontrado em nosso banco de dados", "success");
      setNomeCliente(response.data.nome);
      setPontosCliente(response.data.pontos);
    }
  }

  function handleAdicionarProduto() {
    let produto = props.produto.produtos.filter(
      (produto) => produto.nome === produtoEscolhido
    );

    let finalProduto = {
      id: produto[0].id,
      nome: produto[0].nome,
      setor: produto[0].setor,
      preco: produto[0].preco,
      comissao: produto[0].comissao,
      quantidade: quantidadeProdutoAdicionado,
    };

    setComissao(
      comissao +
        finalProduto.comissao *
          finalProduto.quantidade *
          finalProduto.preco *
          0.01
    );

    let valorCompra = valorTotal + finalProduto.preco * finalProduto.quantidade;
    setValorTotal(valorCompra);
    let finalProdutos = produtosAdicionados;
    finalProdutos.push(finalProduto);
    setProdutosAdicionados(finalProdutos);
    setProdutoEscolhido("");
    setQuantidadeProdutoTotal(0);
    setQuantidadeProdutoAdicionado(0);
    props.setProdutos(
      props.produto.produtos.filter(
        (produto) => produto.nome !== produtoEscolhido
      )
    );

    handleWarning("Produto adicionado com sucesso!", "success");
  }

  async function handleConcluirPedido() {
    let pedido = {
      nomeCliente: nomeCliente,
      valor: valorTotal,
      cpfCliente: cpfCliente,
      cpfFuncionario: props.user.cpf,
    };

    const response = await pedidoAPI.registerPedido(
      pedido,
      produtosAdicionados
    );

    if (!response || response.status === 404) {
      handleWarning(
        "Houve um erro ao tentar realizar a compra. Tente novamente ou contate o suporte tecnico",
        "error"
      );
    } else if (response.status < 200 || response.status > 299) {
      handleWarning("Não foi possível realizar o pedido!", "error");
    } else {
      handleWarning("Pedido feito com sucesso", "success");

      let newPedidos = props.pedido;
      newPedidos.push(response.data);
      props.setPedidos(newPedidos);

      setTimeout(() => {
        history.push(
          props.user.escopo === "Gerente" ? "/gerente" : "/funcionario"
        );
      }, 2000);
    }
  }

  function handleChangeDecision(title, description) {
    setTitleDecision(title);
    setDescriptionDecision(description);
    setOpenDecision(true);
    setHandleConfirmDecision(() => handleConcluirPedido);
  }

  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          <Grid container justify="flex-start" alignItems="center">
            <Typography variant="h5" gutterBottom>
              Novo pedido
            </Typography>
            <Grid item xs={12}>
              <Accordion
                defaultExpanded={true}
                style={{ marginBottom: 16, marginTop: 16 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6">Informações do cliente</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    spacing={1}
                  >
                    <Grid item xs={5}>
                      <TextField
                        id="outlined-required"
                        label="Nome cliente"
                        variant="outlined"
                        value={nomeCliente}
                        onChange={(event) => {
                          setNomeCliente(event.target.value);
                        }}
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <InputMask
                        mask="999.999.999-99"
                        value={cpfCliente}
                        onChange={(event) => {
                          setCpfCliente(
                            event.target.value.replace(/[^\d]+/g, "")
                          );
                        }}
                      >
                        {() => (
                          <TextField
                            required
                            id="outlined-required"
                            label="CPF"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            value={cpfCliente}
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container justify="flex-start">
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          onClick={verificaCpfCliente}
                        >
                          Verifica cpf
                        </Button>
                      </Grid>
                    </Grid>
                    {/* <Grid item xs={5}>
                      <TextField
                        id="outlined-required"
                        label="Valor da compra"
                        variant="outlined"
                        disabled={true}
                        type="number"
                        value={valorTotal}
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container justify="flex-start">
                        <Button
                          color="primary"
                          fullWidth
                          disabled={pontosCliente === 0}
                          variant="contained"
                          onClick={() =>
                            setValorTotal(valorTotal - valorTotal * 0.1)
                          }
                        >
                          Aplicar desconto
                        </Button>
                      </Grid>
                    </Grid> */}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Accordion
                defaultExpanded={true}
                style={{ marginBottom: 16, marginTop: 16 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6">Adicionar produtos</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    spacing={1}
                  >
                    <Grid item xs={5}>
                      <Autocomplete
                        id="combo-box-demo"
                        options={props.produto.produtos}
                        getOptionLabel={(option) => option.nome}
                        onChange={(event, newValue) => {
                          handleChangeProdutoEscolhido(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            value={produtoEscolhido}
                            margin="dense"
                            {...params}
                            label="Escolha o produto"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        id="outlined-required"
                        label="Quantidade"
                        disabled={!produtoEscolhido}
                        variant="outlined"
                        type="number"
                        value={quantidadeProdutoAdicionado}
                        InputProps={{
                          inputProps: { min: 0, max: quantidadeProdutoTotal },
                        }}
                        onChange={(event) => {
                          setQuantidadeProdutoAdicionado(event.target.value);
                        }}
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        fullWidth
                        color="primary"
                        disabled={!quantidadeProdutoAdicionado}
                        variant="contained"
                        onClick={handleAdicionarProduto}
                        fullWidth
                      >
                        Incluir produto
                      </Button>
                    </Grid>

                    <Grid item xs={12}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} style={{ marginBottom: 16 }}>
              <TableContainer component={Paper}>
                <Table>
                  <caption>Valor total da compra: {valorTotal} R$</caption>

                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          backgroundColor: "#001E4D",
                          color: "#FFF",
                        }}
                      >
                        Produto
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#001E4D",
                          color: "#FFF",
                        }}
                        align="right"
                      >
                        Setor
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#001E4D",
                          color: "#FFF",
                        }}
                        align="right"
                      >
                        Quantidade
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#001E4D",
                          color: "#FFF",
                        }}
                        align="right"
                      >
                        Valor unitário
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#001E4D",
                          color: "#FFF",
                        }}
                        align="right"
                      >
                        Subtotal
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {produtosAdicionados.length > 0 ? (
                      produtosAdicionados.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.nome}
                          </TableCell>
                          <TableCell align="right">{row.setor}</TableCell>
                          <TableCell align="right">{row.quantidade}</TableCell>
                          <TableCell align="right">{row.preco} </TableCell>
                          <TableCell align="right">
                            {row.preco * row.quantidade}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* <Grid item xs={12}>
              <Accordion
                defaultExpanded={true}
                style={{ marginBottom: 16, marginTop: 16 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="subtitle2">
                    Informações do cliente
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    spacing={1}
                  >
                    <Grid item xs={5}>
                      <InputMask
                        mask="999.999.999-99"
                        value={cpfCliente}
                        onChange={(event) => {
                          setCpfCliente(
                            event.target.value.replace(/[^\d]+/g, "")
                          );
                        }}
                      >
                        {() => (
                          <TextField
                            required
                            id="outlined-required"
                            label="CPF"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            value={cpfCliente}
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container justify="flex-start">
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          onClick={verificaCpfCliente}
                        >
                          Verifica cpf
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={5} />
                    <Grid item xs={5}>
                      <TextField
                        id="outlined-required"
                        label="Nome cliente"
                        variant="outlined"
                        value={nomeCliente}
                        onChange={(event) => {
                          setNomeCliente(event.target.value);
                        }}
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        id="outlined-required"
                        label="Valor da compra"
                        variant="outlined"
                        disabled={true}
                        type="number"
                        value={valorTotal}
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container justify="flex-start">
                        <Button
                          color="primary"
                          fullWidth
                          disabled={pontosCliente === 0}
                          variant="contained"
                          onClick={() =>
                            setValorTotal(valorTotal - valorTotal * 0.1)
                          }
                        >
                          Aplicar desconto
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid> */}

            {/* <Grid container justify="space-between" alignItems="center">
              <Grid item xs={2}>
                <TextField
                  id="outlined-required"
                  label="Valor da compra"
                  variant="outlined"
                  disabled={true}
                  type="number"
                  value={valorTotal}
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <InputMask
                  mask="999.999.999-99"
                  value={cpfCliente}
                  onChange={(event) => {
                    setCpfCliente(event.target.value.replace(/[^\d]+/g, ""));
                  }}
                >
                  {() => (
                    <TextField
                      required
                      id="outlined-required"
                      label="CPF"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      value={cpfCliente}
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="flex-start">
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={verificaCpfCliente}
                  >
                    Verifica cpf
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="outlined-required"
                  label="Nome cliente"
                  variant="outlined"
                  value={nomeCliente}
                  onChange={(event) => {
                    setNomeCliente(event.target.value);
                  }}
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="flex-start">
                  <Button
                    color="primary"
                    fullWidth
                    disabled={pontosCliente === 0}
                    variant="contained"
                    onClick={() => setValorTotal(valorTotal - valorTotal * 0.1)}
                  >
                    Aplicar desconto
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider style={{ marginTop: 32, marginBottom: 32 }} />
            </Grid> */}

            <Grid container justify="space-between">
              <Grid item xs={1}>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    history.push(window.location.pathname.split("/pedidos")[0])
                  }
                >
                  Voltar
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Grid
                  container
                  justify="flex-end"
                  alignItems="center"
                  spacing={2}
                >
                  {pontosCliente > 0 && (
                    <Grid item xs={3}>
                      <Button
                        color="primary"
                        fullWidth
                        disabled={pontosCliente === 0}
                        variant="contained"
                        onClick={() =>
                          setValorTotal(valorTotal - valorTotal * 0.1)
                        }
                      >
                        Aplicar desconto
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={3}>
                    <Button
                      color="primary"
                      fullWidth
                      variant="contained"
                      onClick={() =>
                        handleChangeDecision(
                          "Concluir pedido?",
                          "Ao confirmar esta ação, você estará concluindo esse pedido. Deseja continuar?"
                        )
                      }
                    >
                      Concluir pedido
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
});
