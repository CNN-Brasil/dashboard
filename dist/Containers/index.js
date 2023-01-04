import { useEffect, useReducer } from "react";
import { ContextReducer, initialUserState, AdminReducer } from "../reducer/AdminReducer";
import { useLocation } from "react-router-dom";
import Router from '../config/routes';
import GlobalStyles from "../config/GlobalStyles";
export const App = props => {
  const [state, dispatch] = useReducer(AdminReducer, initialUserState);
  return /*#__PURE__*/React.createElement(ContextReducer.Provider, {
    value: {
      state,
      dispatch
    }
  }, /*#__PURE__*/React.createElement(GlobalStyles, {
    padding: state?.actualRoute
  }), /*#__PURE__*/React.createElement(Router, null));
};