import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Inicio from './pages/inicio/inicio';
import Cardapio from './pages/cardapio/cardapio';


function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Inicio />} />
                <Route path={"/cardapio"} element={<Cardapio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
