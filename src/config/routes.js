import React from "react";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";

import Total from "../Containers/Total"
import Separados from "../Containers/Separados"


const Router = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Total />} path={"/"} />
                <Route element={ <Separados />} path={"/detalhado"} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
