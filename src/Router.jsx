import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Inicio from './pages/inicio/inicio';
import Cardapio from './pages/cardapio/cardapio';
import PaginaPrato from './pages/prato/pagina-prato'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Inicio />} />
                <Route path={"/cardapio"} element={<Cardapio />} />
                <Route path={"/cardapio/:id"} element={<PaginaPrato />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
