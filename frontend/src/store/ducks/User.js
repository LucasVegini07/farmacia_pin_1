// Types
export const Types = {
  SET_USER: "set_user",
  SET_FUNCIONARIOS: "set_funcionarios",
};

// Reducers
const INITIAL_STATE = {
  user: {},
  funcionarios: [],
};

export default function User(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case Types.SET_FUNCIONARIOS: {
      return {
        ...state,
        funcionarios: action.payload,
      };
    }
    default:
      return state;
  }
}

// Actions
export const Creators = {
  setUser: (user) => ({
    type: Types.SET_USER,
    payload: user,
  }),
  setFuncionarios: (funcionarios) => ({
    type: Types.SET_FUNCIONARIOS,
    payload: funcionarios,
  }),
};
