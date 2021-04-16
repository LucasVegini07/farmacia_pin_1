import axios from "axios";

export const buscaTodosProdutos = async () => {
  return await axios
    .get("http://localhost:8085/api/produto/busca-todos")
    .then((res) => res)
    .catch((err) => err.response);
};

export const registerProduto = async (produto) => {
  let formData = new FormData();
  formData.append("produto", JSON.stringify(produto));

  return await axios
    .post("http://localhost:8085/api/produto", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const editProduto = async (produto) => {
  let formData = new FormData();
  formData.append("produto", JSON.stringify(produto));

  return await axios
    .put("http://localhost:8085/api/produto", formData)
    .then((res) => res)
    .catch((err) => err.response);
};
