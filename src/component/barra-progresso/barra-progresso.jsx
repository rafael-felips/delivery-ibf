import React, { useState, useEffect } from 'react';
import style from './barra-progresso.module.css'

function BarraDeProgresso({ progresso, mensagem }) {
    return (
        <div className={style.barra_progresso_overlay}>
            <div className={style.card}>
                <h2>{mensagem}</h2>
                <div className={style.barra}>
                    <div className={style.progresso} style={{ width: `${progresso}%` }} />
                </div>
            </div>
        </div>
    )
}

export default BarraDeProgresso;