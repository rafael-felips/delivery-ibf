import React from 'react';
import style from './informacoes.module.css';
import local from '../../../assets/map-point-svgrepo2.svg'
import relogio from '../../../assets/clock-check-svgrepo-com.svg'
import pagamento from '../../../assets/money.svg'

function Informacoes({ onClose }) {
    const handleCloseModal = () => {
        onClose();
    };

    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={style.fundo} onClick={handleModalClick}>
            <div className={style.card}>
                <h2>Delivery Igreja Batista</h2>
                <div className={style.container}>
                    <div className={style.container_informacoes}>
                        <div className={style.container_titulo}>
                            <img src={local} className={style.icon} alt="" />
                            <h3>Endereço</h3>
                        </div>
                        <a href="https://maps.app.goo.gl/wCS7qL3pRYrabKEN6" target="_blank">Rua Presidente Oscár Benavides, 58 - Cid Tiradentes, São Paulo - SP</a>
                    </div>
                    <div className={style.container_informacoes}>
                        <div className={style.container_titulo}>
                            <img src={relogio} className={style.icon} alt="" />
                            <h3>Funcionamento</h3>
                        </div>
                        <span>Sábado: 11h ás 15h</span>
                    </div>
                    <div className={style.container_informacoes}>
                        <div className={style.container_titulo}>
                            <img src={pagamento} className={style.icon} alt="" />
                            <h3>Formas de Pagamento</h3>
                        </div>
                        <div className={style.container_pagamento}>
                            <span className={style.pagamento}>Dinheiro</span>
                            <span className={style.pagamento}>Pix</span>
                            <span className={style.pagamento}>Débito</span>
                            <span className={style.pagamento}>Crédito</span>
                        </div>
                    </div>
                </div>
                <button className={style.botao} onClick={handleCloseModal}>Fechar</button>
            </div>
        </div>
    );
};

export default Informacoes;
