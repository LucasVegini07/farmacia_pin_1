// Types
export const Types = {
  SET_PRODUTOS: "set_produtos",
};

// Reducers
const INITIAL_STATE = {
  produtos: [],
};

export default function Produto(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_PRODUTOS: {
      return {
        ...state,
        produtos: action.payload,
      };
    }
    default:
      return state;
  }
}

// Actions
export const Creators = {
  setProdutos: (produtos) => ({
    type: Types.SET_PRODUTOS,
    payload: produtos,
  }),
};
