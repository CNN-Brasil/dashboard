import React from "react";
export const ContextReducer = /*#__PURE__*/React.createContext();
export const initialUserState = {
  graph: [["Horário", "CNN Brasil", "Globo News", "Record News", "Jovem Pan News", "Band News"], ['09:20', 37.8, 80.8, 41.8, 100, 150], ['09:21', 30.9, 69.5, 32.4, 150, 150], ['09:22', 25.4, 57, 25.7, 200, 150], ['09:23', 11.7, 18.8, 10.5, 300, 150], ['09:24', 11.9, 17.6, 10.4, 400, 150], ['09:25', 8.8, 13.6, 7.7, 500, 150], ['09:26', 7.6, 12.3, 9.6, 600, 150]]
};
export const AdminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GRAPH':
      return {
        ...state,
        graph: action.payload
      };
    default:
      return state;
  }
};