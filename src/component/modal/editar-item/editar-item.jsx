import React from 'react';
import style from './editar-item.module.css'

function EditarItem() {
    return (
        <div className={style.modal_overlay}>
            <div className={style.modal}>
                <h1>Editar Item</h1>
                <div className={style.container_item}>
                    <span>Nome Item</span>
                    <div className={style.quantidade}>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                </div>
                <div className={style.container_observacao}>
                    <h3>Observação:</h3>
                    <textarea name="" cols="30" rows="3" id=""></textarea>
                </div>
                <div className={style.total}>
                    <h3>Total</h3>
                    <span>R$ 38,00</span>
                </div>
                <div className={style.container_botoes}>
                    <button style={{ backgroundColor: '#FF6767' }}>Cancelar</button>
                    <button style={{ backgroundColor: '#3BB03F' }}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}
export default EditarItem;