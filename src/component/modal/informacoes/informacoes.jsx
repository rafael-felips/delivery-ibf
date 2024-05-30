import React from 'react';
import style from './informacoes.module.css';
import local from '../../../assets/map-point-svgrepo2.svg'
import relogio from '../../../assets/clock-check-svgrepo-com.svg'
import pagamento from '../../../assets/money.svg'

function Informacoes({ onClose, infos }) {
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
                        <a href="https://maps.app.goo.gl/wCS7qL3pRYrabKEN6" target="_blank">Rua Presidente Oscár Benavides, 58 - Cidade Tiradentes</a>
                    </div>
                    <div className={style.container_informacoes}>
                        <div className={style.container_titulo}>
                            <img src={relogio} className={style.icon} alt="" />
                            <h3>Funcionamento</h3>
                        </div>
                        <span>Sábado: {infos.Abre} ás {infos.Fecha}</span>
                    </div>
                    <div className={style.container_informacoes}>
                        <div className={style.container_titulo}>
                            <img src={pagamento} className={style.icon} alt="" />
                            <h3>Formas de Pagamento</h3>
                        </div>
                        <div className={style.container_pagamento}>
                            {
                                infos.Pagamento.map((item) => (
                                    <span className={style.pagamento} key={item}>{item}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <button className={style.botao} onClick={handleCloseModal}>Fechar</button>
            </div>
        </div>
    );
};

export default Informacoes;
