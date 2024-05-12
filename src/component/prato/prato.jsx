import React, { useState, useEffect } from 'react';
import style from './prato.module.css';

function Prato({ id, nome, resumo, preco, imagem }) {

    return (
        <>
            <div onClick={() => window.location.href = `/cardapio/${id}`} className={style.prato}>
                <img src={imagem} className={style.foto} />
                <div className={style.container_texto}>
                    <h3>{nome}</h3>
                    <span>{resumo}</span>
                    <span className={style.preco}>R$ {preco.toFixed(2).replace('.',',')}</span>
                </div>
            </div>
        </>
    );
};

export default Prato;