import React, { useEffect, useState } from 'react';
import style from './resumo-pedido.module.css';
import user from '../../../assets/profile.svg'
import local from "../../../assets/map-point-svgrepo2.svg"
import money from "../../../assets/money.svg"

function ResumoPedido({ pedido, fechar }) {

    const handleCloseModal = () => {
        fechar();
    };

    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            fechar();
        }
    };

    const carrinho = pedido.carrinho
    function calcularValorTotal(pedido) {
        if (!pedido || !pedido.carrinho || !Array.isArray(pedido.carrinho)) {
            return 0;
        }

        let valorTotal = 0;

        pedido.carrinho.forEach(item => {
            const precoItem = parseFloat(item.preco);
            valorTotal += precoItem * item.quantidade;
        });

        return valorTotal += pedido.entrega.taxa;
    }

    const valorTotal = calcularValorTotal(pedido).toFixed(2).replace('.', ',');
    const observacaoFormatada = "item.observacao ? ` (${item.observacao})` : ''";
    const monospace = "```"
    const whatsapp = "55" + pedido.telefone;

    function renderizaFormaPagamentoEmoji(formaPagamento) {
        switch (formaPagamento) {
            case 'Credito':
                return '💳';
            case 'Débito':
                return '💳';
            case 'Dinheiro':
                return '💵';
            default:
                return '';
        }
    }
    const formaPagamentoEmoji = renderizaFormaPagamentoEmoji(pedido.pagamento.forma);

    const mensagem = `
Olá ${pedido.cliente}, recebemos o seu pedido e ele já está sendo preparado!

*Itens:*
${pedido.carrinho.map(item => `
➡ ${item.quantidade}x ${monospace}${item.nome}${monospace}
${monospace}    R$ ${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}${monospace} ${item.observacao ? ` ${monospace}(${item.observacao})${monospace}` : ''}
`).join('')}
${formaPagamentoEmoji} ${pedido.pagamento.forma}${pedido.pagamento.troco ? ` (troco: R$ ${pedido.pagamento.troco})` : ''}

🛵 ${pedido.entrega.forma} (taxa de: R$ ${pedido.entrega.taxa.toFixed(2).replace('.', ',')})
🏠 ${pedido.entrega.rua}, Nº ${pedido.entrega.numero}${pedido.entrega.complemento ? ` - ${pedido.entrega.complemento}` : ''}, ${pedido.entrega.bairro}

Total: *R$ ${calcularValorTotal(pedido).toFixed(2).replace('.', ',')}*

Obrigado pela preferência, se precisar de algo é só chamar! 😉`;

    console.log(mensagem)

    const finalizarPedido = async () => {
        const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message";

        try {
            const response = await fetch(GZAPPY_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    user_token_id: "817ac47a-6d80-4233-b0c6-afda3773726a"
                },
                body: JSON.stringify({
                    instance_id: "MSBDVMULNZ213LNJ0GWCAKA3",
                    instance_token: "a2f897b4-651b-47d0-8a6b-c8cc9f4c0cd7",
                    message: [mensagem],
                    phone: whatsapp
                })
            });


        } catch (error) {
            console.error("Erro ao enviar a mensagem:", error);
        }

        // console.log(pedido)

        sessionStorage.removeItem('cesta');
        window.location.href = '/';
    };


    return (
        <>
            <div className={style.modal_overlay} onClick={handleModalClick} >
                <div className={style.modal}>
                    <h1>Resumo do Pedido:</h1>
                    <div className={style.container_info}>
                        <div className={style.container_titulo}>
                            <img src={user} alt="" className={style.icon} />
                            <h2>Cliente</h2>
                        </div>
                        <span><b>Nome: </b>{pedido.cliente}</span>
                        <span><b>Telefone: </b>{pedido.telefone}</span>
                    </div>

                    <div className={style.container_info}>
                        <div className={style.container_titulo}>
                            <img src={local} alt="" className={style.icon} />
                            <h2>{pedido.entrega.forma}</h2>
                        </div>
                        <span>
                            <b>Endereço: </b>
                            {pedido.entrega.rua}, {pedido.entrega.numero}{pedido.entrega.complemento && `, ${pedido.entrega.complemento}`} - {pedido.entrega.bairro}
                        </span>
                    </div>
                    <div className={style.container_info}>
                        <div className={style.container_titulo}>
                            <img src={money} alt="" className={style.icon} />
                            <h2>Pagamento</h2>
                        </div>
                        <span><b>Forma: </b>{pedido.pagamento.forma}</span>
                        {pedido.pagamento.troco > 0 && (
                            <span><b>Troco: </b> {pedido.pagamento.troco}</span>
                        )}
                    </div>

                    <div className={style.container_itens}>
                        <div className={style.itens_preco}>
                            <h2>Itens</h2>
                            <h2>Preço</h2>
                        </div>
                        {pedido.carrinho.map((item, index) => (
                            <div key={index} className={style.container_item}>
                                <div className={style.item}>
                                    <span>
                                        <b>{item.quantidade}×</b> {item.nome}
                                    </span>
                                    <span>R$ {(parseFloat(item.preco) * item.quantidade).toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>
                        ))}
                        <div className={style.container_item}>
                            <div className={style.item}>
                                <span>Taxa de entrega</span>
                                <span>R$ {pedido.entrega.taxa.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>
                        <div className={style.total}>
                            <h2>Total</h2>
                            <h2>R$ {valorTotal}</h2>
                        </div>
                    </div>
                    <button className={style.botao} onClick={finalizarPedido}>Finalizar Pedido</button>
                </div>
            </div>
        </>
    );
};

export default ResumoPedido;