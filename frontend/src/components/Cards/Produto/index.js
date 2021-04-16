import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";

export default function FuncionarioCard(props) {
  const { produto } = props;

  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <span style={{ fontWeight: 550 }}> Nome </span>
              <Typography> {produto.nome} </Typography>
            </Grid>
            <Grid item>
              <span style={{ fontWeight: 550 }}> Preço </span>
              <Typography> {produto.preco} </Typography>
            </Grid>
            <Grid item>
              <span style={{ fontWeight: 550 }}> Quantidade </span>
              <Typography> {produto.quantidade} </Typography>
            </Grid>
            <Grid item>
              <span style={{ fontWeight: 550 }}> Setor </span>
              <Typography> {produto.setor} </Typography>
            </Grid>
            <Grid item>
              <Grid container justify="flex-end">
                <IconButton onClick={() => props.openEditProduct(produto)}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
