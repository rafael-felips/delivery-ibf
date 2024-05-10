import React, { createContext, useState } from 'react';

const CestaContext = createContext();

const CestaProvider = ({ children }) => {
    const [cesta, setCesta] = useState([]);

    const adicionarPrato = (prato) => {
        setCesta([...cesta, prato]);
    };

    return (
        <CestaContext.Provider value={{ cesta, adicionarPrato }}>
            {children}
        </CestaContext.Provider>
    );
};

export { CestaContext, CestaProvider };
