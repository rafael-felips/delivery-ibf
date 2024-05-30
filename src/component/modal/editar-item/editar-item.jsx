import React, { useState } from 'react';
import style from './editar-item.module.css'
import trash from '../../../assets/trash-svgrepo-com.svg'
import { ImGift } from 'react-icons/im';

function EditarItem({ item, onClose, onSave, removerItem }) {
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

    const aumentarQuantidade = () => {
        if (quantidade < 9) {
            setQuantidade(quantidade + 1);
        }
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        } else {
            removerItem(item.id)
        }
    };

    return (
        <div className={style.modal_overlay}>
            <div className={style.modal}>
                <h1>Editar Item</h1>
                <div className={style.container_item}>
                    <span>{item.nome}</span>
                    <div className={style.quantidade}>
                        {quantidade > 1 ? <button onClick={diminuirQuantidade}>-</button> : <img src={trash} onClick={diminuirQuantidade} className={style.trash} />}
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
                    <span>R$ {(preco * quantidade).toFixed(2).replace('.', ',')}</span>
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