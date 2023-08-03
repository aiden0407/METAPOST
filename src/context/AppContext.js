//React
import { createContext, useReducer } from "react";

//initial state
const initialState = {
  isProfileToggleOpened: false,
  isSearchPopupOpened: false,
  isReportPopupOpened: false,
  reportData: {
    subject: undefined,
    id: undefined
  },
};

//create context
const AppContext = createContext({});

//create reducer
const reducer = (state, action) => {
  switch (action.type) {

    case 'OPEN_PROFILE_TOGGLE':
      return {
        ...state,
        isProfileToggleOpened: true,
      };

    case 'CLOSE_PROFILE_TOGGLE':
      return {
        ...state,
        isProfileToggleOpened: false,
      };

    case 'OPEN_SEARCH_POPUP':
      return {
        ...state,
        isSearchPopupOpened: true,
      };

    case 'CLOSE_SEARCH_POPUP':
      return {
        ...state,
        isSearchPopupOpened: false,
      };

    case 'OPEN_REPORT_POPUP':
      return {
        ...state,
        isReportPopupOpened: true,
        reportData: {
          subject: action.subject,
          id: action.id
        }
      };

    case 'CLOSE_REPORT_POPUP':
      return {
        ...state,
        isReportPopupOpened: false,
        reportData: {
          subject: undefined,
          id: undefined
        }
      };

    default:
      return state;
  }
};

//create Provider component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  //console.log(state);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };