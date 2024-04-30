import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Inicio from './pages/inicio/inicio';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Inicio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
