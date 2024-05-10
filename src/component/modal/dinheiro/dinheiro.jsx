import React, { useState } from 'react';
import style from './dinheiro.module.css';

function Dinheiro({ onClose, onConfirmar }) {
    const [trocoValor, setTrocoValor] = useState(0);
    const [trocoSelecionado, setTrocoSelecionado] = useState(0);

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const confirmar = () => {
        if (trocoSelecionado === 0) {
            alert("Você não disse se precisa de troco ou não");
        } else if (trocoSelecionado === 1) {
            if (onConfirmar) {
                onConfirmar(trocoValor);
            }
        }
        else if (trocoSelecionado === 2) {
            if (trocoValor <= 0) {
                alert("O troco precisa ser maior que R$ 00,00")
            }
            else {
                if (onConfirmar) {
                    onConfirmar(trocoValor);
                }
            }
        }
    }
    return (
        <div className={style.modal_overlay} onClick={handleClose}>
            <div className={style.modal}>
                <h2>Precisa de troco?</h2>
                <div className={style.container_decisao}>
                    <div className={style.decisao}>
                        <input type='radio' name='troco' id='nao' onChange={() => setTrocoSelecionado(1)} />
                        <label htmlFor='nao'>Não</label>
                    </div>
                    <div className={style.decisao}>
                        <input type='radio' name='troco' id='sim' onChange={() => setTrocoSelecionado(2)} />
                        <label htmlFor='sim'>Sim</label>
                    </div>
                </div>
                <div className={style.input}>
                    <label htmlFor="">Troco para quanto:</label>
                    <input type="number" min={0} placeholder='R$' value={trocoValor} onChange={(e) => setTrocoValor(e.target.value)} disabled={trocoSelecionado === 0 || trocoSelecionado === 1} />
                </div>
                <div className={style.container_botoes}>
                    <button style={{ backgroundColor: '#FF6767' }} onClick={onClose}>Cancelar</button>
                    <button style={{ backgroundColor: '#85DC40' }} onClick={confirmar}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default Dinheiro;