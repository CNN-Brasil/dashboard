import {useEffect, useReducer} from "react";
import {ContextReducer, initialUserState, AdminReducer} from "../reducer/AdminReducer";
import {useLocation} from "react-router-dom";
import Router from '../config/routes';
import GlobalStyles from "../config/GlobalStyles";

export const App = props => {
    const [state, dispatch] = useReducer(AdminReducer, initialUserState);
    
    return(
        
        <ContextReducer.Provider value={{state, dispatch}}>
            <GlobalStyles theme={state?.actualRoute} />
            <Router />
        </ContextReducer.Provider>

    )
}
