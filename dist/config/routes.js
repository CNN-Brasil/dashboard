import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Total from "../Containers/Total";
import Separados from "../Containers/Separados";
const Router = () => {
  return /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
    element: /*#__PURE__*/React.createElement(Total, null),
    path: "/"
  }), /*#__PURE__*/React.createElement(Route, {
    element: /*#__PURE__*/React.createElement(Separados, null),
    path: "/detalhado"
  })));
};
export default Router;