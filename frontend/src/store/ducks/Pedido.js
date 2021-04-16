// Types
export const Types = {
  SET_PEDIDO: "set_pedido",
};

// Reducers
const INITIAL_STATE = {
  pedidos: [],
};

export default function Pedido(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_PEDIDO: {
      return {
        ...state,
        pedidos: action.payload,
      };
    }
    default:
      return state;
  }
}

// Actions
export const Creators = {
  setPedidos: (pedidos) => ({
    type: Types.SET_PEDIDO,
    payload: pedidos,
  }),
};
