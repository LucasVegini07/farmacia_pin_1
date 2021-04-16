import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from "@material-ui/core";

export default function FuncionarioCard(props) {
  const { funcionario } = props;

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
            <Grid item xs={12} md={1}>
              {funcionario.ativo ? (
                <Tooltip title="Funcionário ativo" placement="top">
                  <Chip
                    size="small"
                    style={{
                      backgroundColor: "#00e676",
                      color: "white",
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Funcionário desativado" placement="top">
                  <Chip color="secondary" size="small" />
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={12} md={5}>
              <span style={{ fontWeight: 550 }}> Nome Completo </span>
              <Typography> {funcionario.nome} </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <span style={{ fontWeight: 550 }}> C.P.F. </span>
              <Typography> {funcionario.cpf} </Typography>
            </Grid>
            <Grid item xs={12} md={1}>
              <Grid container justify="flex-end">
                <IconButton
                  onClick={() => props.openEditarFuncionario(funcionario)}
                >
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
