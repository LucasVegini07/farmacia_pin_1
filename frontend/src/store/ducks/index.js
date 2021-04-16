import { combineReducers } from "redux";

import user from "./User";
import produto from "./Produto";
import pedido from "./Pedido";

export default combineReducers({
  user,
  produto,
  pedido,
});
