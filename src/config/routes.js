import React from "react";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";

import Total from "../Containers/Total"
import Separados from "../Containers/Separados"
import Login from "../Containers/Login"
import Auth from '../Containers/Auth'

const Router = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Auth />}>
                    <Route element={ <Total />} path={"/total"} />
                    <Route element={ <Separados />} path={"/detalhado"} />
                </Route>
                <Route element={<Navigate to={"/"} replace={true} path="*" />} />
                <Route element={ <Login /> } path={"/"} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
