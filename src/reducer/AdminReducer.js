import React from "react";
export const ContextReducer = React.createContext();

export const initialUserState = {
    ibope: [],
    youtube: []
,
    total: []
};

export const AdminReducer = (state, action) => {
    switch (action.type) {
        case 'GET_IBOPE':

            const _ibope = [];

            action.payload.filter((el) => {
                if(el !== null) {
                    _ibope.push(el)
                }
            })

            return { ...state, ibope:_ibope};
        case 'GET_YOUTUBE':
            const _youtube = [];

            action.payload.filter((el) => {
                if(el !== null) {
                    _youtube.push(el)
                }
            })
            return { ...state, youtube:_youtube};

        case 'GET_TOTAL':
            const _total = [];

            action.payload.filter((el) => {
                if(el !== null) {
                    _total.push(el)
                }
            })
            return { ...state, total:_total};
        default:
            return state;
    }
};
