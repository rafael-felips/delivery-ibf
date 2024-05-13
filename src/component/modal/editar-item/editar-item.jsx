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
                    <span>Observação</span>
                    <textarea name="" id=""></textarea>
                <div className={style.container_botoes}>
                    <button>Cancelar</button>
                    <button>Confirmar</button>
                </div>
            </div>
        </div>
    )
}
export default EditarItem;