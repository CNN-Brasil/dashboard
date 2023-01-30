import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ContextReducer } from '../../reducer/AdminReducer';

import config from '../../config/config'

const { isLogged } = config;

const Auth = () => {

    const {state} = useContext(ContextReducer)

    if(state.login.status === 201 && state.login.credential) {
        return <Navigate to={"/"} />
    }

    return <Outlet />
}

export default Auth;