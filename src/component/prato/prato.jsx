import React, { useState, useEffect } from 'react';
import style from './prato.module.css';

function Prato({ id, nome, resumo, preco, imagem }) {

    function substituirPontoPorVirgula(texto) {
        return texto.replace(/\./g, ',');
    }

    const precoFormatado = substituirPontoPorVirgula(preco);

    return (
        <>
            <div onClick={() => window.location.href = `/cardapio/${id}`} className={style.prato}>
                <img src={imagem} className={style.foto} />
                <div className={style.container_texto}>
                    <h3>{nome}</h3>
                    <span>{resumo}</span>
                    <span className={style.preco}>R$ {precoFormatado}</span>
                </div>
            </div>
        </>
    );
};

export default Prato;