import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ContextReducer } from '../../reducer/AdminReducer';

import config from '../../config/config'

const { isLogged } = config;

const Auth = () => {

    const {state} = useContext(ContextReducer)
    console.log('log ', localStorage.getItem('isLogged'))
    if(localStorage.getItem('isLogged') === 'false' || localStorage.getItem('isLogged') === null) {
        return <Navigate to={"/"} />
    }

    return <Outlet />
}

export default Auth;