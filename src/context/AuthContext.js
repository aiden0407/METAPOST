//React
import { createContext, useReducer } from "react";

//initial state
const initialState = {
  login: false,
};

//create context
const AuthContext = createContext({});

//create reducer
const reducer = (state, action) => {
  switch (action.type) {
    
    case 'LOGIN':
      return {
        ...state,
        login: true,
      };

      case 'LOGOUT':
        return {
          ...state,
          login: false,
        };

    default:
      return state;
  }
};

//create Provider component
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(`login: ${state.login}`);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };