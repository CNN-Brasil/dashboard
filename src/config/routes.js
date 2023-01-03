import React from "react";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";

import Total from "../Containers/Total"


const Router = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Total />} path={"/"} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
