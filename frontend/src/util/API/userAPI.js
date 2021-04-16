// let api = "http://localhost:8080/api";

import axios from "axios";

export const existGerente = async () => {
  return await axios
    .get("http://localhost:8085/api/funcionario/existe/gerente")
    .then((res) => res)
    .catch((err) => err.response);
};

export const buscaTodosFuncionarios = async () => {
  return await axios
    .get("http://localhost:8085/api/funcionario/busca-todos")
    .then((res) => res)
    .catch((err) => err.response);
};

export const registerFuncionario = async (funcionario) => {
  let formData = new FormData();
  formData.append("funcionario", JSON.stringify(funcionario));

  return await axios
    .post("http://localhost:8085/api/funcionario", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const editFuncionario = async (funcionario) => {
  let formData = new FormData();
  formData.append("funcionario", JSON.stringify(funcionario));

  return await axios
    .put("http://localhost:8085/api/funcionario", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const ativaFuncionario = async (funcionario) => {
  let formData = new FormData();
  formData.append("funcionario", JSON.stringify(funcionario));

  return await axios
    .put("http://localhost:8085/api/funcionario/ativa", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const desativaFuncionario = async (funcionario) => {
  let formData = new FormData();
  formData.append("funcionario", JSON.stringify(funcionario));

  return await axios
    .put("http://localhost:8085/api/funcionario/desativa", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const registerCliente = async (cliente) => {
  let formData = new FormData();
  formData.append("cliente", JSON.stringify(cliente));

  return await axios
    .post("http://localhost:8085/api/cliente", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const login = async (email, senha) => {
  let formData = new FormData();
  formData.append("email", email);
  formData.append("senha", senha);
  return await axios
    .post("http://localhost:8085/api/login", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const buscaUsuarioById = async (id) => {
  return await axios
    .get(`http://localhost:8085/api/funcionario/busca/id/${id}`)
    .then((res) => res)
    .catch((err) => err.response);
};

export const buscaUsuarioByEmail = async (email) => {
  return await axios
    .get(`http://localhost:8085/api/funcionario/busca/email/${email}`)
    .then((res) => res)
    .catch((err) => err.response);
};

export const buscaUsuarioByCPF = async (cpf) => {
  return await axios
    .get(`http://localhost:8085/api/cliente/busca/cpf/${cpf}`)
    .then((res) => res)
    .catch((err) => err.response);
};

export const zerarComissao = async () => {
  return await axios
    .put(`http://localhost:8085/api/funcionario/zerar/comissao`)
    .then((res) => res)
    .catch((err) => err.response);
};
