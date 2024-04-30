import React from 'react';
import style from './inicio.module.css'
import perfil from '../../assets/logo.png'
import whatsapp from '../../assets/whatsapp.svg'

function Inicio() {
    return (
        <>
            <div className={style.corpo}>
                <div className={style.perfil}>
                    <div className={style.foto_perfil}>
                        <img src={perfil} alt="foto de perfil" />
                    </div>
                    <h1>Delivery Igreja Batista</h1>
                </div>
                <span className={style.funcionamento}>Aberto até as 14h</span>
                <button className={style.botao} onClick={() => window.location.href = '/cardapio'}>Iniciar Pedido</button>
            </div>
            <a href="https://wa.me/5511981910988" target="_blank" >
                <img src={whatsapp} className={style.whatsapp} alt="Icone de WhatsApp" />

            </a>
        </>
    );
};

export default Inicio;