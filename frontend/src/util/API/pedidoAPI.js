import axios from "axios";

export const registerPedido = async (pedido, produtos) => {
  let formData = new FormData();

  produtos.map((produto) =>
    formData.append("produtos", JSON.stringify(produto))
  );

  formData.append("pedido", JSON.stringify(pedido));

  return await axios
    .post("http://localhost:8085/api/pedido", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const buscaTodosPedidos = async () => {
  return await axios
    .get("http://localhost:8085/api/pedido/busca-todos")
    .then((res) => res)
    .catch((err) => err.response);
};
