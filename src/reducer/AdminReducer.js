import React from "react";
export const ContextReducer = React.createContext();

export const initialUserState = {
    ibope: []
};

export const AdminReducer = (state, action) => {
    switch (action.type) {
        case 'GET_IBOPE':
            return { ...state, ibope:action.payload};
        default:
            return state;
    }
};
