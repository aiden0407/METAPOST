//React
import { createContext, useReducer } from "react";

//initial state
const initialState = {
  loginData: undefined,
};

//create context
const AuthContext = createContext({});

//create reducer
const reducer = (state, action) => {
  switch (action.type) {
    
    case 'LOGIN':
      return {
        ...state,
        loginData: action.loginData,
      };

      case 'LOGOUT':
        return {
          ...state,
          loginData: undefined,
        };

    default:
      return state;
  }
};

//create Provider component
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };