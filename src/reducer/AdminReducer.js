import React from "react";
export const ContextReducer = React.createContext();

export const initialUserState = {
    ibope: [
      ['Horário', 'CNN Brasil', 'Globo News', 'Jovem Pan News', 'Band News', 'Record News'],
      ['00:00', 0, 0, 0, 0, 0]
    ],
    youtube: [
      ['Horário', 'CNN Brasil', 'Globo News', 'Jovem Pan News', 'Band News', 'Record News'],
      ['00:00', 0, 0, 0, 0, 0]
    ],
    total: [
      ['Horário', 'CNN Brasil', 'Globo News', 'Jovem Pan News', 'Band News', 'Record News'],
      ['00:00', 0, 0, 0, 0, 0]
    ],
    share: [
        ['CNN Brasil', 'Globo News', 'Jovem Pan News', 'Band News', 'Record News'],
        [0, 0, 0, 0, 0]
      ],
    isLogged: false
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

        case 'GET_SHARE':
            const _share = [];

            action.payload.filter((el) => {
                if(el !== null) {
                    _share.push(el)
                }
            })
            return { ...state, share:_share};
        case 'SET_LOGIN':
            return {...state, isLogged: action.payload}
        default:
            return state;
    }
};
