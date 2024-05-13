import React, { useRef } from 'react';
import style from './pix.module.css';

function Pix({ onClose, onConfirmar }) {
    const textToCopy = '11961495524';
    const textRef = useRef(null);

    const copyText = () => {
        textRef.current.select();

        try {
            document.execCommand('copy');
            console.log('Texto copiado para a área de transferência.');
        } catch (err) {
            console.error('Erro ao copiar texto:', err);
        }
    };

    return (
        <div className={style.modal_overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <h1>Pix</h1>
                <h3>Chave PIX:</h3>
                <span>(11) 96149-5524 - Telefone</span>
                <button className={style.botao_copiar} onClick={copyText}>Copiar chave PIX</button>
                <input
                    type="text"
                    value={textToCopy}
                    readOnly
                    style={{ position: 'absolute', left: '-9999px' }}
                    ref={textRef}
                />
                <div className={style.container_botoes}>
                    <button style={{ backgroundColor: '#FF6767' }} onClick={onClose}>Cancelar</button>
                    <button style={{ backgroundColor: '#85DC40' }} onClick={onConfirmar}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default Pix;