import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function PedidoCard(props) {
  const [open, setOpen] = useState(false);

  const { pedido } = props;

  return (
    <>
      <Card>
        <CardContent>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={1}>
              <Tooltip title="Aprovado" placement="top">
                <div
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#001E4D",
                    borderRadius: "50%",
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <span style={{ fontWeight: 550 }}> Nome do Cliente </span>
              <Typography> {pedido.nomeCliente} </Typography>
            </Grid>
            <Grid item xs={4}>
              <span style={{ fontWeight: 550 }}> Valor da Venda </span>
              <Typography> {pedido.valor} reais </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                fullWidth
              >
                Produtos comprados
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <Dialog
          open={open}
          keepMounted
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Produtos</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {pedido.produtos.map((produto, index) => (
                <Typography>
                  {" "}
                  Nome: {produto} | Quantidade: {pedido.quantidade[index]}{" "}
                </Typography>
              ))}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
