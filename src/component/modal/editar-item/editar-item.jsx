import React, { useState, useEffect } from 'react';
import style from './editar-item.module.css'

function EditarItem({ item, onClose, onSave }) {
    const [quantidade, setQuantidade] = useState(item.quantidade);
    const [observacao, setObservacao] = useState(item.observacao);
    const [preco, setPreco] = useState(item.preco)

    const handleSave = () => {
        const itemAtualizado = {
            ...item,
            observacao,
            quantidade,
            preco
        }
        onSave(itemAtualizado)
    }

    console.log(preco)

    const aumentarQuantidade = () => {
        if (quantidade < 9) {
            setQuantidade(quantidade + 1);
            setPreco(preco * quantidade)
        }
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
            setPreco(preco * quantidade)
        }
    };

    return (
        <div className={style.modal_overlay}>
            <div className={style.modal}>
                <h1>Editar Item</h1>
                <div className={style.container_item}>
                    <span>{item.nome}</span>
                    <div className={style.quantidade}>
                        <button onClick={diminuirQuantidade}>-</button>
                        <span>{quantidade}</span>
                        <button onClick={aumentarQuantidade}>+</button>
                    </div>
                </div>
                <div className={style.container_observacao}>
                    <h3>Observação:</h3>
                    <textarea defaultValue={item.observacao} cols="30" rows="3" onChange={(e) => setObservacao(e.target.value)} />
                </div>
                <div className={style.total}>
                    <h3>Total</h3>
                    <span>R$ {(item.preco * quantidade).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className={style.container_botoes}>
                    <button onClick={onClose} style={{ backgroundColor: '#FF6767' }}>Cancelar</button>
                    <button onClick={handleSave} style={{ backgroundColor: '#3BB03F' }}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default EditarItem;